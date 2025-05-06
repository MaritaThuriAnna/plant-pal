import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  private messaging = inject(Messaging);
  deviceToken: string | null = null;

  constructor() {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        this.getDeviceToken();
      }
    });
  }

  getDeviceToken() {
    getToken(this.messaging, { vapidKey: environment.vapidKey }).then(token => {
      if (token) {
        this.deviceToken = token;
        console.log('Device Token:', token);
        // you can send it to backend here
      }
    });
  }

  listen() {
    onMessage(this.messaging, payload => {
      const title = payload.notification?.title || 'Notification';
      const body = payload.notification?.body || '';

      new Notification(title, {
        body,
        icon: 'icons/icon-192x192.png'
      });

    });


  }

  sendPushNotification(token: string, title: string, body: string) {
    fetch('http://localhost:3000/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, title, body })
    })
      .then(res => res.json())
      .then(data => console.log('✅ Push sent via backend:', data))
      .catch(err => console.error('❌ Backend push error:', err));
  }

}
