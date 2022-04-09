import { Injectable } from '@nestjs/common';
import { Round } from './common/round';

@Injectable()
export class AppService {

  calculateBowlingScore(rounds: Round[]): number {
    let score = 0;
    const finalIndex = 9;
    console.log(rounds.length)
    for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
      let round = rounds[roundIndex]
      if (roundIndex == finalIndex) {
        score += this.calculateLastRoundScore(round)
        continue;
      }

      if (this.isStrike(round) && roundIndex !== finalIndex) {
        if (roundIndex == (finalIndex - 1)) {
          let finalRound = rounds[finalIndex]
          score += 10 + this.calculatePenulimateRoundForStrike(finalRound)
          console.log('Round score: ' + score)
          continue;
        } else {
          let roundAfter = rounds[roundIndex + 1]
          let secondRoundAfter = rounds[roundIndex + 2]
          score += 10 + this.determineStrikeScore(roundAfter, secondRoundAfter);
          console.log('Round score: ' + score)
          continue;
        }

      }
      let roundScore = round.firstRoll + round.secondRoll
      if (this.isSpare(round) && !round.thirdRoll && roundIndex !== finalIndex) {
        score += 10 + rounds[roundIndex + 1].firstRoll
      } else {
        score += roundScore
      }
    }
    console.log('Final score ' + score)
    return score;
  }

  calculateLastRoundScore(round: Round): number {
    if (round.firstRoll === 10 && round.secondRoll === 10) {
      return round.firstRoll + round.secondRoll + round.thirdRoll
    }
    else if (round.firstRoll + round.secondRoll == 10) {
      return 10 + round.thirdRoll
    }
    else {
      return round.firstRoll + round.secondRoll
    }

  }
  calculatePenulimateRoundForStrike(round: Round): number {
    return round.firstRoll + round.secondRoll
  }
  determineStrikeScore(firstRoundAfter: Round, secondRoundAfter: Round): number {
    if (firstRoundAfter && secondRoundAfter) {
      if (firstRoundAfter.firstRoll == 10) {
        return firstRoundAfter.firstRoll + secondRoundAfter.firstRoll
      }
      else {
        return firstRoundAfter.firstRoll + firstRoundAfter.secondRoll
      }

    }
  }
  isStrike(round: Round) {
    return round.firstRoll === 10
  }

  isSpare(round: Round) {
    return round.firstRoll + round.secondRoll === 10
  }
}
