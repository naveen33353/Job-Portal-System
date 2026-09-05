import { Component, Input } from '@angular/core';

/**
 * Shared dashboard sidebar for the authenticated company and job-seeker areas.
 * Active link highlighting is done with routerLinkActive, so no page needs
 * to hardcode class="active" anymore.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() variant: 'company' | 'seeker' | 'admin' = 'company';
}
