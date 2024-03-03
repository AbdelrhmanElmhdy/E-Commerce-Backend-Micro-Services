import { User } from '../../entities/User';

class UserResponse {
  name!: string;

  email!: string;

  password!: string;

  constructor(user: User) {
    this.name = user.dataValues.name;
    this.email = user.dataValues.email;
  }
}

export default UserResponse;
