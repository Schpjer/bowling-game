import { Injectable } from '@nestjs/common';
import { FinalRound } from './common/final-round';
import { Round } from './common/round';

@Injectable()
export class AppService {

  calculateBowlingScore(rounds: Round[]) {
    let score = 0;
    const finalIndex = 9;
    for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
      let round = rounds[roundIndex]
      console.log(roundIndex)
      if (this.isFinalRound(round)) {
        console.log('FinalRound')
        score += this.calculateLastRoundScore(round)
      }

      if (this.isStrike(round) && !this.isFinalRound(round)) {
        let roundAfter = rounds[roundIndex + 1]
        let secondRoundAfter = rounds[roundIndex + 2]
        score += this.determineStrikeScore(roundAfter, secondRoundAfter);
        console.log('Strike')
      }

      let roundScore = round.firstRoll + round.secondRoll

      if (this.isSpare(round) && !this.isFinalRound(round) && roundIndex !== finalIndex) {
        console.log('Spare')
        score += 10 + rounds[roundIndex + 1].firstRoll
      } else {
        score += roundScore
      }

    }

    console.log('Score' + score)
  }
  isFinalRound(object: any): object is FinalRound {
    return 'member' in object;
  }

  calculateLastRoundScore(round: FinalRound) {
    if (round.firstRoll === 10 && round.secondRoll === 10) {
      return round.firstRoll + round.secondRoll + round.thirdRoll
    }
    else {
      return round.firstRoll + round.secondRoll
    }

  }
  calculatePenulimateRound(round: Round[]) {

  }
  determineStrikeScore(firstRoundAfter: Round, secondRoundAfter: Round): number {
    if (firstRoundAfter && secondRoundAfter) {
      if (firstRoundAfter.firstRoll === 10)
        return firstRoundAfter.firstRoll + secondRoundAfter.firstRoll
      else
        return firstRoundAfter.firstRoll + firstRoundAfter.secondRoll
    }
  }
  isStrike(round: Round) {
    return round.firstRoll === 10
  }

  isSpare(round: Round) {
    return round.firstRoll + round.secondRoll === 10
  }
}
