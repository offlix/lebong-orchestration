import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './system/system.module';
import { SystemService } from './system/system.service';

@Module({
  imports: [SystemModule, SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
