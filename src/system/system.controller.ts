import { Controller, Post, Body } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}
  @Post('ls')
  async getLS() {
    return this.systemService.ls();
  }
}
