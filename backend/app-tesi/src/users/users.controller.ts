import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Query } from '@nestjs/common';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/approve-profile')
  approveProfile(@Param('id') id: string) {
    return this.usersService.approveProfileUpdate(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/reject-profile')
  rejectProfile(@Param('id') id: string) {
    return this.usersService.rejectProfileUpdate(id);
  }
}
