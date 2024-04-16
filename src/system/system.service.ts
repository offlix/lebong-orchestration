import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);
@Injectable()
export class SystemService {
  async ls(system: CreateSystemDto): Promise<string[]> {
    try {
      const { stdout, stderr } = await execAsync(system.command);
      if (stderr) {
        throw new Error(stderr);
      }
      const files = stdout.split('\n').filter((file) => !!file);
      return files;
    } catch (error) {
      throw new Error(error);
    }
  }
}
