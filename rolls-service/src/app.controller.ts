import { Body, Controller, Post, } from '@nestjs/common';
import { AppService } from './app.service';
import { Round } from '../../common/round';

@Controller('rolls')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async postRolls(@Body() data: Round[]) {
    return this.appService.publishRolls(data);
  }
}
