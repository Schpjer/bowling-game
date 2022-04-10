import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      let rounds = [{ firstRoll: 10, secondRoll: 0 }, { firstRoll: 3, secondRoll: 7 }, { firstRoll: 4, secondRoll: 0 }]
      expect(appController.getBowlingPresentedScore(rounds)).toBe('[X=>20],[3|7=>34],[4|0=>38] => 38');
    });
  });
});
