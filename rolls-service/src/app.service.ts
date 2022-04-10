import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Round } from '../../common/round';

@Injectable()
export class AppService {

  constructor(@Inject('CALCULATOR_SERVICE') private client: ClientProxy) { }

  async publishRolls(rounds: Round[]) {
    let response = this.client.emit('calculate-score', rounds);
    return response
  }
}
