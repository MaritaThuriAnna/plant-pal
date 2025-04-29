import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPlants } from '../../store/plants/plant.selectors';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-watering-schedule',
  imports: [NgFor, NgIf],
  templateUrl: './watering-schedule.component.html',
  styleUrl: './watering-schedule.component.css'
})
export class WateringScheduleComponent implements OnInit {
  private store = inject(Store);

  plantsByDate: { [date: string]: any[] } = {};
  calendarDays: { date: Date; day: number; plants: any[] }[] = [];

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth(); // 0 = Ianuarie


  ngOnInit(): void {
    this.store.select(selectAllPlants).subscribe(plants => {
      this.plantsByDate = {};

      plants.forEach(plant => {
        if (plant.nextWatering) {
          if (!this.plantsByDate[plant.nextWatering]) {
            this.plantsByDate[plant.nextWatering] = [];
          }
          this.plantsByDate[plant.nextWatering].push(plant);
        }
      });

      this.buildCalendar();
    });
  }

  buildCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
  
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
    const totalDays = lastDayOfMonth.getDate();
  
    this.calendarDays = [];
  
    for (let i = 0; i < (startDayOfWeek === 0 ? 6 : startDayOfWeek - 1); i++) {
      this.calendarDays.push({ date: null as any, day: 0, plants: [] });
    }
  
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
  
      this.calendarDays.push({
        date,
        day,
        plants: this.plantsByDate[dateString] || []
      });
    }
  }
  
  goToPrevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.buildCalendar();
  }
  
  goToNextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.buildCalendar();
  }
  

  isToday(date: Date): boolean {
    if (!date) return false;
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  }

  isPast(date: Date): boolean {
    if (!date) return false;
    const today = new Date();
    const compare = new Date(date);
    compare.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return compare < today;
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }
  
}
