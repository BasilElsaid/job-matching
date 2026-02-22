import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';

import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateJobDto } from './create-job.dto';
import { Delete, Param } from '@nestjs/common';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // 🔓 Pubblico
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  // 🔐 Solo aziende possono creare annunci
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY')
  @Post()
  create(@Body() createJobDto: CreateJobDto, @Req() req) {
    return this.jobsService.create(createJobDto, req.user.userId);
  }

  // 🔐 Azienda vede solo i suoi annunci
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY')
  @Get('mine')
  findMine(@Req() req) {
    return this.jobsService.findByCompany(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteJob(@Param('id') id: string, @Req() req) {
    return this.jobsService.delete(id, req.user.userId, req.user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }
}
