import { Body, Controller, Get, Post } from '@nestjs/common';
import { BowlingGameCalculator } from '../../common/bowling-game-calculator';
import { Round } from '../../common/round';
import { AppService } from './app.service';

@Controller('present')
export class AppController {
  private bowlingCalculator: BowlingGameCalculator
  constructor(private readonly appService: AppService) {
    this.bowlingCalculator = new BowlingGameCalculator()
  }

  @Post('score')
  async getBowlingPresentedScore(@Body() data: Round[]): Promise<string> {
    let bowlingGame = this.bowlingCalculator.calculateBowlingScore(data);
    return this.appService.getPresenterOutPut(bowlingGame);
  }
}
