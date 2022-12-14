import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { OnEvent } from '@nestjs/event-emitter'
import { PromService } from '@digikare/nestjs-prom'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly promService: PromService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('hello')
  getHello() {
    return this.userService.getHello()
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }

  @OnEvent('**')
  handleTimeout() {
    this.promService.getCounter({ name: 'node_connections_timeout', help: 'Timeout connections metric' }).inc(1)
  }
}
