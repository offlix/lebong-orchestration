import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { DOCKER_INSTALL, SYSTEM_QUEUE } from '../utils/constant';
import { exec } from 'child_process';
import { promisify } from 'util';
import { SystemStdOptionsInterface } from '../system/interface/system.command.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateEvents } from '../enums/update.event';

@Processor(SYSTEM_QUEUE)
export class SystemConsumer {
  private readonly logger = new Logger(SystemConsumer.name);
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Process(DOCKER_INSTALL)
  async transcode(job: Job<unknown>) {
    try {
      this.logger.log('Executing sudo update...');
      const { stdout, stderr } = await this.executeSystemProcess(
        'chmod +x scripts/script.sh && ./scripts/script.sh',
      );
      if (stderr) {
        throw new Error(`Error executing sudo update: ${stderr}`);
      }
      if (job.isCompleted) {
        this.eventEmitter.emit(UpdateEvents.UPDATE_COMPLETED, { stdout });
      }
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  private async executeSystemProcess(
    command: string,
  ): Promise<SystemStdOptionsInterface> {
    const execAsync = promisify(exec);
    return await execAsync(command);
  }
}
