import { Authority } from './authority.enum';

export class User {
  
  constructor(
    public email: string,
    public name: string,
    public phoneNumber: string,
    public enabled: boolean,
    public authorities: Array<Authority>
  ) {}

}
