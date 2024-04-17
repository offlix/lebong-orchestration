import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { DOCKER_INSTALL, SYSTEM_QUEUE } from '../utils/constant';
import { exec } from 'child_process';
import { promisify } from 'util';
import { SystemStdOptionsInterface } from '../system/interface/system.command.interface';
@Processor(SYSTEM_QUEUE)
export class SystemConsumer {
  private readonly logger = new Logger(SystemConsumer.name);
  constructor(@InjectQueue(SYSTEM_QUEUE) private readonly systemQueue: Queue) {}

  @Process(DOCKER_INSTALL)
  async transcode(job: Job<unknown>) {
    try {
      const { stdout, stderr } = await this.executeSystemProcess(
        'chmod +x ./scripts/script.sh && sh scripts/script.sh list_docker_containers',
      );
      if (stderr) {
        throw new Error(`Error executing sudo update: ${stderr}`);
      }
      // if (job.isCompleted) {
      //   this.eventEmitter.emit(UpdateEvents.UPDATE_COMPLETED, { stdout });
      // }
      await new Promise((resolve) => setTimeout(resolve, 5000));
      this.logger.log(`Job ${job.id} processed : ${stdout}`);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @OnQueueActive()
  onActive(job: Job<unknown>) {
    this.logger.log(`Starting Job ${job.id} : ${JSON.stringify(job.data)}`);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<unknown>) {
    this.logger.log(`Job has been finished : ${job.id}`);
    await this.cleanQueue();
  }

  private async executeSystemProcess(
    command: string,
  ): Promise<SystemStdOptionsInterface> {
    const execAsync = promisify(exec);
    return await execAsync(command);
  }

  async cleanQueue() {
    try {
      const count = await this.systemQueue.getCompletedCount();
      console.log(count);
      if (count > 0) {
        await this.systemQueue.clean(0, 'completed');
        this.logger.log('Queue cleaned');
      }
    } catch (error) {
      this.logger.error(`Error cleaning queue: ${error.message}`);
    }
  }
}
