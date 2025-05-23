import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private notificationsSubject = new BehaviorSubject<string[]>([]);
    notifications$ = this.notificationsSubject.asObservable();

    private notifications: string[] = [];

    askPermission() {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                console.log('Notification permission:', permission);
            });
        }
    }

    showNotification(message: string) {
        this.notifications.push(message);
        this.notificationsSubject.next([...this.notifications]);

        setTimeout(() => {
            this.notifications.shift();
            this.notificationsSubject.next([...this.notifications]);
        }, 5000);
    }

    private notifiedPlants = new Set<string>();

    clearNotificationForPlant(plantId: string) {
        this.notifiedPlants.delete(plantId);
    }

    markPlantAsNotified(plantId: string) {
        this.notifiedPlants.add(plantId);
    }

    isPlantNotified(plantId: string) {
        return this.notifiedPlants.has(plantId);
    }
}
