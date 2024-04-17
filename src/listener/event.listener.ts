// some-listener.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UpdateEvents } from '../enums/update.event';

@Injectable()
export class SystemListenerService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  private readonly logger = new Logger(SystemListenerService.name);
  @OnEvent(UpdateEvents.UPDATE_COMPLETED)
  handleUpdateCompleted(payload: { stdout: string }) {
    this.logger.log('boom! Update completed 🥳', payload.stdout);
  }
}
