import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("User") 
        private userModel: Model<UserDocument>
    ) {}

    async hashPassword(password: string) {
        return hash(password, 10);
    }

    async register(registerDto: RegisterDto): Promise<void> {
        const { email, username, password } = registerDto;
        const hashedPassword = await this.hashPassword(password);
        const user = new this.userModel({
            email,
            username,
            password: hashedPassword,
        });
        await user.save(); 
    }

}
