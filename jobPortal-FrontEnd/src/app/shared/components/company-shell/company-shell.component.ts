import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-company-shell',
  templateUrl: './company-shell.component.html',
  styleUrls: ['./company-shell.component.css']
})
export class CompanyShellComponent {
  @Input() avatar = '';
  @Input() showLogout = true;

  @Output() readonly logoutRequest = new EventEmitter<void>();

  onLogout(): void {
    this.logoutRequest.emit();
  }
}
