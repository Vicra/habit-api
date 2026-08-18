import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}
  async create(createHabitDto: CreateHabitDto) {
    await this.prisma.habit.create({
      data: {
        ...createHabitDto,
        startDate: new Date(createHabitDto.startDate),
      },
    });
  }

  findAll() {
    return this.prisma.habit.findMany({
      skip: 0,
      take: 10,
    });
  }

  findOne(_id: string) {
    return this.prisma.habit.findUnique({
      where: {
        id: _id,
      },
    });
  }

  async update(id: string, updateHabitDto: UpdateHabitDto) {
    const toUpdateHabit = await this.prisma.habit.findUnique({
      where: {
        id,
      },
    });

    return await this.prisma.habit.update({
      where: {
        id,
      },
      data: {
        ...toUpdateHabit,
        ...updateHabitDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.habit.delete({
      where: {
        id,
      },
    });
  }
}
