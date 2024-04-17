import { BadRequestException, Controller, Post } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}
  @Post('list-docker-containers')
  async test_bash() {
    try {
      const response = await this.systemService.configure_docker();
      return { message: response };
    } catch (error) {
      console.error(`Error executing bash script: ${error.message}`);
      throw new BadRequestException(error.stderr);
    }
  }
}
