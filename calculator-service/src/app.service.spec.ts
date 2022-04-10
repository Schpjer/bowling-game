import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Round } from './common/round'

describe('AppController', () => {
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AppService]
        }).compile();

        appService = app.get<AppService>(AppService);
    });

    describe('root', () => {
        it('Calculator should return score 40', async () => {
            let rounds = [{ firstRoll: 10, secondRoll: 0 }, { firstRoll: 8, secondRoll: 2 }, { firstRoll: 4, secondRoll: 0 }]
            let bowlingGame = await appService.calculateBowlingScore(rounds)
            expect(bowlingGame.finalScore).toBe(38)
        });
    });

    describe('FiveRoundTest', () => {
        it('Current Score should return 100', async () => {
            let rounds = [{ firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 9, secondRoll: 1 }, { firstRoll: 4, secondRoll: 3 }]
            let bowlingGame = await appService.calculateBowlingScore(rounds)
            expect(bowlingGame.finalScore).toBe(100)
        });
    });

    describe('perfectGame', () => {
        it('Calculator should return score 300', async () => {
            let rounds = [{ firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 10, thirdRoll: 10 }]
            let bowlingGame = await appService.calculateBowlingScore(rounds)
            expect(bowlingGame.finalScore).toBe(300)
        });
    });
});