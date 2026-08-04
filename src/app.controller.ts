import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('arbeloa')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cono')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getHello2(): string {
    return this.appService.getHello();
  }
}
