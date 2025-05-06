import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPlants } from './store/plants/plant.actions';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { PushNotificationService } from './services/push-notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'plant-pal';

  constructor(private store: Store, private pushService: PushNotificationService) {
    this.store.dispatch(loadPlants());
    // this.pushService.requestPermission();
    // this.pushService.listen();
  }
  sendTestPush() {
    if (this.pushService.deviceToken) {
      this.pushService.sendPushNotification(
        this.pushService.deviceToken,
        '💧 Water Reminder',
        'Your Aloe Vera needs watering!'
      );
    } else {
      console.warn('⚠️ No device token yet.');
    }
  }
  
}
