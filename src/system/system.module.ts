import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SYSTEM_QUEUE } from '../utils/constant';
import { SystemConsumer } from '../queue/system.queue.consumer';
import { SystemListenerService } from '../listener/event.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: SYSTEM_QUEUE,
    }),
  ],
  controllers: [SystemController],
  providers: [SystemService, SystemConsumer, SystemListenerService],
})
export class SystemModule {}
