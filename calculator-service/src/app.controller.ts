import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Round } from './common/round';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('calculate-score')
  async handleBowlingRolls(rounds: Round[]) {
    this.appService.calculateBowlingScore(rounds);
  }

  @MessagePattern({ cmd: 'getBowlingGameCalculation' })
  async getBowlingRollGame(rounds: Round[]) {
    console.log('CalculatorService : ' + rounds)
    return this.appService.calculateBowlingScore(rounds);
  }

}
