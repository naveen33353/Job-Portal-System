import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css']
})
export class CompanyHeaderComponent {
  @Input() avatar = '';
  @Input() showLogout = true;

  @Output() readonly logoutRequest = new EventEmitter<void>();

  onLogout(): void {
    this.logoutRequest.emit();
  }
}
