import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

/*
 * This demo allows storing the info about existing users. New users are created manually in the [Voximplant control panel](https://manage.voximplant.com/auth). 
 * You can also create them using the [Voximplant Management API](https://voximplant.com/docs/references/httpapi/users)
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
   * Handle a Get request through the /users/ url and return all the users from the database
   */
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
