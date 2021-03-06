import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TopPageModule } from 'src/top-page/top-page.module';
import { HhService } from './hh.service';

@Module({
  providers: [HhService],
  imports: [TopPageModule, ConfigModule, HttpModule]
})
export class HhModule { }
