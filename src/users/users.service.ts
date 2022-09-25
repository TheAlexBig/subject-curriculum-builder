import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './domain/users.model';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {
    this.setAdmin();
  }

  async findOne(username: string, password: string): Promise<User> {
    const result = await this.userModel.findOne({ username }).lean().exec();
    if (!result) return null;
    const match = bcrypt.compare(password, result.password);
    return match ? result : null;
  }

  async setAdmin() {
    const saltRounds = this.configService.get<string>('SALT_ROUNDS') || '10';
    const generatedSalt = bcrypt.genSaltSync(parseInt(saltRounds));
    const username = this.configService.get<string>('ADMIN_USER') || 'admin';
    const password = this.configService.get<string>('ADMIN_PASS') || 'password';

    bcrypt.hash(password, generatedSalt).then(async (hash) => {
      const result: User = await this.userModel.findOne({ username }).exec();
      if (!result) {
        const user = new this.userModel({
          username,
          password: hash,
          role: 'admin',
        });
        user.save();
      }
    });
  }
}
