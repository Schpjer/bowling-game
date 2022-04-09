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
        it('Calculator should return score 40', () => {
            let rounds = [{ firstRoll: 10, secondRoll: 0 }, { firstRoll: 8, secondRoll: 2 }, { firstRoll: 4, secondRoll: 0 }]
            expect(appService.calculateBowlingScore(rounds)).toBe(38)
        });
    });
    describe('perfectGame', () => {
        it('Calculator should return score 300', () => {
            let rounds = [{ firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 0 }, { firstRoll: 10, secondRoll: 10, thirdRoll: 10 }]
            expect(appService.calculateBowlingScore(rounds)).toBe(300)
        });
    });
});