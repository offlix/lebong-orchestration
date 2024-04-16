// some-listener.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdateEvents } from '../enums/update.event';

@Injectable()
export class SystemListenerService {
  private readonly logger = new Logger(SystemListenerService.name);
  @OnEvent(UpdateEvents.UPDATE_COMPLETED)
  handleUpdateCompleted(payload: { stdout: string }) {
    this.logger.log('boom! Update completed 🥳. Output:', payload.stdout);
  }
}
