import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

const habits: any = [
  {
    id: 1,
    name: 'Sleep 8 hours',
    description: 'Maintain consistent sleep schedule for overall health.',
    userId: 1,
    category: 'Wellness',
    frequency: 'Daily',
    progress: 80,
    streak: 14,
    target: '8 hours',
    priority: 'High',
    startedAt: new Date('2023-05-01'),
    lastUpdatedAt: new Date('2023-06-01'),
    completed: false,
    notes: 'Avoid screens before bedtime.',
  },
  {
    id: 2,
    name: 'Exercise 30 minutes',
    description: 'Cardio or strength training to stay active.',
    userId: 1,
    category: 'Fitness',
    frequency: 'Daily',
    progress: 60,
    streak: 7,
    target: '30 minutes',
    priority: 'Medium',
    startedAt: new Date('2023-05-10'),
    lastUpdatedAt: new Date('2023-06-02'),
    completed: false,
    notes: 'Alternate between running and yoga.',
  },
  {
    id: 3,
    name: 'Drink 2 liters of water',
    description: 'Hydrate throughout the day.',
    userId: 1,
    category: 'Health',
    frequency: 'Daily',
    progress: 40,
    streak: 5,
    target: '2L',
    priority: 'Low',
    startedAt: new Date('2023-05-12'),
    lastUpdatedAt: new Date('2023-06-03'),
    completed: false,
    notes: 'Use a reusable bottle and set reminders.',
  },
];

@Injectable()
export class HabitsService {
  create(createHabitDto: CreateHabitDto) {
    return habits.push({
      id: habits.length + 1,
      ...createHabitDto, // destructuring the properties from createHabitDto test
      startedAt: new Date(),
      lastUpdatedAt: new Date(),
    });
  }

  findAll() {
    return habits;
  }

  findOne(id: number) {
    return habits.find((habit) => habit.id === id);
  }

  update(id: number, updateHabitDto: UpdateHabitDto) {
    let toUpdateHabit = habits.find((habit) => habit.id === id);

    toUpdateHabit = {
      ...toUpdateHabit,
      ...updateHabitDto,
      lastUpdatedAt: new Date(),
    };

    habits[habits.findIndex((habit) => habit.id === id)] = toUpdateHabit;
  }

  remove(id: number) {
    return habits.splice(
      habits.findIndex((habit) => habit.id === id),
      1,
    );
  }
}
