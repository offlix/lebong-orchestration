import { Injectable } from '@nestjs/common';
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

  private async addInSystemQueue(event: string) {
    await this.systemQueue.add(event);
  }
}
