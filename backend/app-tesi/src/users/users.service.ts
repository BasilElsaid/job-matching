import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { Job } from '../jobs/job.schema';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  async findAll(role?: string) {
    const filter = role ? { role } : {};

    return this.userModel.find(filter).select('-password').exec();
  }

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(Job.name)
    private jobModel: Model<any>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email già registrata');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async delete(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User non trovato');
    }

    // 🔥 Se è una azienda → elimina anche i suoi job
    if (user.role === 'COMPANY') {
      await this.jobModel.deleteMany({ companyId: id });
    }

    await this.userModel.findByIdAndDelete(id);

    return { message: 'User e annunci collegati eliminati' };
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  async updateProfile(id: string, data: UpdateUserDto) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User non trovato');
    }

    user.pendingProfileUpdate = {
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      companyAddress: data.companyAddress,
    };

    user.profileUpdatePending = true;

    return user.save();
  }

  async approveProfileUpdate(id: string) {
    const user = await this.userModel.findById(id);

    if (!user || !user.pendingProfileUpdate) {
      throw new NotFoundException('Nessuna modifica in attesa');
    }

    user.companyEmail = user.pendingProfileUpdate.companyEmail;
    user.companyPhone = user.pendingProfileUpdate.companyPhone;
    user.companyAddress = user.pendingProfileUpdate.companyAddress;

    user.profileUpdatePending = false;

    return user.save();
  }

  async rejectProfileUpdate(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    user.pendingProfileUpdate = undefined;
    user.profileUpdatePending = false;

    return user.save();
  }
}
