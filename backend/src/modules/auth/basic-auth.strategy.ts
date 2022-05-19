import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { adminUserName, adminUserPass } from '../../lib/config';

/*
 * User validation strategy
 * 
 * Used to grant or restrict access to the admin panel of the demo
 */
@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<{ isValid: boolean }> => {
    if (adminUserName === username && adminUserPass === password) {
      return {
        isValid: true,
      };
    }
    throw new UnauthorizedException();
  };
}
