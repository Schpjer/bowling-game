import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BowlingGame } from '../../common/bowling-game';
import { Round } from '../../common/round';
import { last } from 'rxjs';
import { BowlingGameCalculator } from '../../common/bowling-game-calculator'

@Injectable()
export class AppService {

  public getPresenterOutPut(bowlingGame: BowlingGame): string {
    let presenterString = ''
    let finalScore = 0;
    bowlingGame.rounds.forEach(element => {
      if (element.thirdRoll) {
        presenterString += this.determineFinalRoundPresenterString(element)
      } else if (element.firstRoll === 10) {
        presenterString += element.roundScore ? `[X => ${element.roundScore}]` : '[X]'
      } else {
        presenterString += element.roundScore ? `[${element.firstRoll} | ${element.secondRoll} => ${element.roundScore}]` : `[${element.firstRoll} | ${element.secondRoll}]`
      }
      if (element.roundScore)
        finalScore = element.roundScore
    })
    presenterString += ` => ${finalScore} `
    return presenterString;
  }
  private determineFinalRoundPresenterString(round: Round): string {
    let lastRoundString = ''
    switch (true) {
      case (round.firstRoll === 10 && round.secondRoll === 10 && round.thirdRoll === 10): { }
        lastRoundString += `[X|X|X => ${round.roundScore}]`
        break;
      case (round.firstRoll === 10 && round.secondRoll === 10):
        lastRoundString += `[X| X|${round.thirdRoll}=> ${round.roundScore}]`
        break;
      case (round.firstRoll === 10):
        lastRoundString += `[X|${round.secondRoll}|${round.thirdRoll} => ${round.roundScore}]`
        break;
    }
    return lastRoundString;
  }

}
