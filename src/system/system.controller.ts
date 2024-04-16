import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SystemService } from './system.service';
import { exec } from 'child_process';
import { promisify } from 'util';
import { CreateSystemDto } from './dto/create-system.dto';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}
  @Post('ls')
  async getLS(@Body() CreateSystemDto) {
    return this.systemService.ls(CreateSystemDto);
  }
}
