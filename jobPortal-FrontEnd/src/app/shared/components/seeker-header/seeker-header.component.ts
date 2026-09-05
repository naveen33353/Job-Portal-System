import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seeker-header',
  templateUrl: './seeker-header.component.html',
  styleUrls: ['./seeker-header.component.css']
})
export class SeekerHeaderComponent {
  @Input() avatar = '';
  @Input() showLogout = true;

  @Output() readonly logoutRequest = new EventEmitter<void>();

  onLogout(): void {
    this.logoutRequest.emit();
  }
}
