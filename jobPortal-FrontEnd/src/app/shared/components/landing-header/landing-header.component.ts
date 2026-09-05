import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.css']
})
export class LandingHeaderComponent {
  @Input() initials = '';
  @Input() isLoggedIn = false;
  @Input() profileRoute = '/';

  @Output() readonly logoutRequest = new EventEmitter<void>();

  onLogout(): void {
    this.logoutRequest.emit();
  }
}