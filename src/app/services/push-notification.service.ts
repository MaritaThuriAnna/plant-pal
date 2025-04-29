import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private messaging = inject(Messaging);

  constructor() {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.getDeviceToken();
      } else {
        console.error('Notification permission not granted.');
      }
    });
  }

  getDeviceToken() {
    getToken(this.messaging, {
      vapidKey: environment.vapidKey
    }).then(token => {
      if (token) {
        console.log('🎯 Device token:', token); // <--- THIS is your FCM token
      } else {
        console.warn('⚠️ No registration token available.');
      }
    }).catch(err => {
      console.error('🚨 Token error:', err);
    });
  }
  
  listen() {
    onMessage(this.messaging, payload => {
      console.log('Message received. ', payload);
      alert(`New notification: ${payload.notification?.title}`);
    });
  }
}
