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
      .find({
        status: 'APPROVED',
        expiresAt: { $gt: new Date() },
      })
      .populate('companyId', 'companyName companyEmail companyPhone')
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

    if (userRole !== 'ADMIN') {
      if (job.companyId.toString() !== userId) {
        throw new ForbiddenException('Non autorizzato');
      }
    }

    await this.jobModel.findByIdAndDelete(jobId);

    return { message: 'Job eliminato con successo' };
  }

  async findOne(id: string) {
    const job = await this.jobModel
      .findById(id)
      .populate('companyId', 'companyName companyEmail companyPhone')
      .exec();

    if (!job) {
      throw new NotFoundException('Annuncio non trovato');
    }

    if (job.expiresAt < new Date()) {
      throw new NotFoundException('Annuncio scaduto');
    }

    return job;
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

  async renewJob(id: string, companyId: string) {
    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException('Annuncio non trovato');
    }

    if (job.companyId.toString() !== companyId) {
      throw new ForbiddenException('Non autorizzato');
    }

    const newExpiration = new Date(job.expiresAt);
    newExpiration.setDate(newExpiration.getDate() + 30);

    job.expiresAt = newExpiration;

    return job.save();
  }
}
