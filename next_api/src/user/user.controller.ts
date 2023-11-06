import { Controller, Get, Post, Body, Req, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
    return {
      captcha,
    };
  }

  @Post('create')
  createUser(@Body() body, @Session() session) {
    console.log(`output->`, body, session);
    if (
      session?.code?.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return {
        code: 200,
        msg: '验证码正确',
      };
    } else {
      return {
        code: 500,
        msg: '验证码错误',
      };
    }
  }
}
