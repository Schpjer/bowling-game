import { Injectable } from '@nestjs/common';
import { BowlingGame } from './common/bowling-game';
import { Round } from './common/round';

@Injectable()
export class AppService {

  calculateBowlingScore(rounds: Round[]): BowlingGame {
    let score = 0;
    const finalIndex = 9;
    for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
      let round = rounds[roundIndex]
      if (roundIndex == finalIndex) {
        score += this.calculateLastRoundScore(round)
        round.roundScore = score;
        continue;
      }

      if (this.isStrike(round) && roundIndex !== finalIndex) {
        if (roundIndex == (finalIndex - 1)) {
          let finalRound = rounds[finalIndex]
          if (finalRound) {
            score += 10 + this.calculatePenulimateRoundForStrike(finalRound)
            round.roundScore = score;
          }
          continue;
        } else {
          let roundAfter = rounds[roundIndex + 1]
          let secondRoundAfter = rounds[roundIndex + 2]
          let strikeScore = this.determineStrikeScore(roundAfter, secondRoundAfter);
          if (strikeScore) {
            score += 10 + strikeScore
            round.roundScore = score;
          }
          continue;
        }

      }
      let roundScore = round.firstRoll + round.secondRoll
      if (this.isSpare(round) && !round.thirdRoll && roundIndex !== finalIndex) {
        let spareScore = rounds[roundIndex + 1].firstRoll
        if (spareScore) {
          score += 10 + spareScore
          round.roundScore = score;
        }

      } else {
        score += roundScore
        round.roundScore = score;
      }
    }
    let bowlingGame: BowlingGame = { finalScore: score, rounds: rounds };
    console.log(bowlingGame)
    return bowlingGame;
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
