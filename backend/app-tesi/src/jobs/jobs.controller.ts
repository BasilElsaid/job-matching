import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateJobDto } from './create-job.dto';
import {
  Delete,
  Param,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // 🔓 Pubblico
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('all')
  findAllForAdmin() {
    return this.jobsService.findAllForAdmin();
  }

  // 🔐 Azienda vede solo i suoi annunci
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY')
  @Get('mine')
  findMine(@Req() req) {
    return this.jobsService.findByCompany(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  // 🔐 Solo aziende possono creare annunci
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY')
  @Post()
  create(@Body() createJobDto: CreateJobDto, @Req() req) {
    return this.jobsService.create(createJobDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteJob(@Param('id') id: string, @Req() req) {
    return this.jobsService.delete(id, req.user.userId, req.user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/approve')
  approveJob(@Param('id') id: string) {
    return this.jobsService.approve(id);
  }
}
