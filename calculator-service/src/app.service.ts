import { Injectable } from '@nestjs/common';
import { BowlingGame } from '../../common/bowling-game';
import { Round } from '../../common/round';
import { BowlingGameCalculator } from '../../common/bowling-game-calculator'

@Injectable()
export class AppService {

  public async calculateBowlingScore(rounds: Round[]): Promise<number> {
    let bowlingCalculator = new BowlingGameCalculator();
    let finalScore = bowlingCalculator.calculateBowlingScore(rounds).finalScore
    return finalScore;
  }
}
