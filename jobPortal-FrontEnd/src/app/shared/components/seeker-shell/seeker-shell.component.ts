import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seeker-shell',
  templateUrl: './seeker-shell.component.html',
  styleUrls: ['./seeker-shell.component.css']
})
export class SeekerShellComponent {
  @Input() avatar = '';
  @Input() showLogout = true;

  @Output() readonly logoutRequest = new EventEmitter<void>();

  onLogout(): void {
    this.logoutRequest.emit();
  }
}
