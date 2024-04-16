import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { SystemStdOptionsInterface } from './interface/system.command.interface';
const execAsync = promisify(exec);
@Injectable()
export class SystemService {
  async ls(): Promise<string[]> {
    try {
      const { stdout, stderr } = await this.executeSystemProcess('ls');
      if (stderr) {
        throw new Error(stderr);
      }
      const files = stdout.split('\n').filter((file) => !!file);
      return files;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async executeSystemProcess(
    command: string,
  ): Promise<SystemStdOptionsInterface> {
    return await execAsync(command);
  }
}
