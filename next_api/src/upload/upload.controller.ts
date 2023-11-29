import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express';
import { zip } from 'compressing';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(`output->file`, file);
    return '上传成功';
  }

  @Get('export')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, `../images/1699610255374.png`);
    res.download(url);
  }
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, `../images/1699610255374.png`);
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="filename.jpg"');
    tarStream.pipe(res);
  }
}
