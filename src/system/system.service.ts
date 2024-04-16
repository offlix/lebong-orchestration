import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { SystemStdOptionsInterface } from './interface/system.command.interface';
import { SystemResponseInterface } from './interface/system.response.interface';
import { InjectQueue } from '@nestjs/bull';
import { DOCKER_INSTALL, SYSTEM_QUEUE } from '../utils/constant';
import { Queue } from 'bull';
@Injectable()
export class SystemService {
  constructor(@InjectQueue(SYSTEM_QUEUE) private readonly systemQueue: Queue) {}
  async configure_docker(): Promise<string> {
    await this.addInSystemQueue(DOCKER_INSTALL);
    return 'successfully';
  }

  private async executeSystemProcess(
    command: string,
  ): Promise<SystemStdOptionsInterface> {
    const execAsync = promisify(exec);
    return await execAsync(command);
  }

  private async addInSystemQueue(event: string) {
    await this.systemQueue.add(event);
  }
}
