import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menuVisible = false; 

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuVisible = false; // close menu on route change
      }
    });
  }

  toggleMenu() {
    console.log('[Header] toggleMenu called. Current state:', this.menuVisible);
    this.menuVisible = !this.menuVisible;
    console.log('[Header] New menuVisible:', this.menuVisible);
  }

  goTo(route: string) {
    this.router.navigate(['/' + route]);
  }

}
