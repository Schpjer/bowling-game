import { Round } from "./round";
import { BowlingGame } from "./bowling-game"
export class BowlingGameCalculator {

    public calculateBowlingScore(rounds: Round[]): BowlingGame {
        let score = 0;
        const finalIndex = 9;
        for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
            let currentRound = rounds[roundIndex]
            if (roundIndex == finalIndex) {
                score += this.calculateLastRoundScore(currentRound)
                currentRound.roundScore = score;
                continue;
            }

            if (this.isStrike(currentRound)) {
                if (roundIndex == (finalIndex - 1)) {
                    let finalRound = rounds[finalIndex]
                    if (finalRound) {
                        score += currentRound.firstRoll + this.calculatePenulimateRoundForStrike(finalRound)
                        currentRound.roundScore = score;
                    }
                    continue;
                } else {
                    let roundAfter = rounds[roundIndex + 1]
                    let secondRoundAfter = rounds[roundIndex + 2]
                    let strikeScore = this.determineStrikeScore(roundAfter, secondRoundAfter);
                    if (strikeScore) {
                        score += currentRound.firstRoll + strikeScore
                        currentRound.roundScore = score;
                    }
                    continue;
                }

            }
            let roundScore = currentRound.firstRoll + currentRound.secondRoll

            if (this.isSpare(currentRound)) {
                let roundAfter = rounds[roundIndex + 1]
                if (roundAfter) {
                    score += currentRound.firstRoll + currentRound.secondRoll + roundAfter.firstRoll
                    currentRound.roundScore = score;
                }
            } else {
                if (roundScore) {
                    score += roundScore
                    currentRound.roundScore = score;
                }
            }
        }
        let bowlingGame: BowlingGame = { finalScore: score, rounds: rounds };

        return bowlingGame;
    }

    private calculateLastRoundScore(round: Round): number {
        return round.firstRoll + round.secondRoll < 10 ? round.firstRoll + round.secondRoll : round.firstRoll + round.secondRoll + round.thirdRoll
    }
    private calculatePenulimateRoundForStrike(round: Round): number {
        return round.firstRoll + round.secondRoll
    }
    private determineStrikeScore(firstRoundAfter: Round, secondRoundAfter: Round): number {
        if (firstRoundAfter && secondRoundAfter) {
            if (firstRoundAfter.firstRoll === 10) {
                return firstRoundAfter.firstRoll + secondRoundAfter.firstRoll
            }
            else {
                return firstRoundAfter.firstRoll + firstRoundAfter.secondRoll
            }
        }
    }
    private isStrike(round: Round) {
        return round.firstRoll === 10
    }

    private isSpare(round: Round) {
        return round.firstRoll + round.secondRoll === 10
    }
}