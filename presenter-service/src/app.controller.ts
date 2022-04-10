import { Body, Controller, Get, Post } from '@nestjs/common';
import { BowlingGameCalculator } from '../../common/bowling-game-calculator';
import { Round } from '../../common/round';
import { AppService } from './app.service';

@Controller('present')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post('score')
  async getBowlingPresentedScore(@Body() data: Round[]): Promise<string> {
    let bowlingCalculator = new BowlingGameCalculator()
    let bowlingGame = bowlingCalculator.calculateBowlingScore(data);
    return this.appService.getPresenterOutPut(bowlingGame);
  }
}
