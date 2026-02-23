import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private jobModel: Model<JobDocument>,
  ) {}

  async create(createJobDto: any, companyId: string) {
    const job = new this.jobModel({
      ...createJobDto,
      companyId,
    });

    return job.save();
  }

  async findAll() {
    return this.jobModel
      .find({ status: 'APPROVED' })
      .populate('companyId', 'companyName email phone')
      .exec();
  }

  async findByCompany(companyId: string) {
    return this.jobModel.find({ companyId }).exec();
  }

  async delete(jobId: string, userId: string, userRole: string) {
    const job = await this.jobModel.findById(jobId);

    if (!job) {
      throw new NotFoundException('Job non trovato');
    }

    // 🔐 Se NON sei admin → devi essere proprietario
    if (userRole !== 'ADMIN') {
      if (job.companyId.toString() !== userId) {
        throw new ForbiddenException('Non autorizzato');
      }
    }

    await this.jobModel.findByIdAndDelete(jobId);

    return { message: 'Job eliminato con successo' };
  }

  async findOne(id: string) {
    return this.jobModel
      .findById(id)
      .populate('companyId', 'companyName companyEmail companyPhone')
      .exec();
  }

  approve(id: string) {
    return this.jobModel.findByIdAndUpdate(
      id,
      { status: 'APPROVED' },
      { new: true },
    );
  }

  async findAllForAdmin() {
    return this.jobModel
      .find()
      .populate('companyId', 'companyName companyEmail companyPhone')
      .exec();
  }
}
