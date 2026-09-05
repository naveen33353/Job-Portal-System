import { Component } from '@angular/core';

interface AdminProfile {
  name: string;
  email: string;
  role: string;
  timezone: string;
}

interface NotificationPref {
  label: string;
  key: string;
  enabled: boolean;
}

interface TeamMember {
  name: string;
  role: string;
  lastActive: string;
}

interface ActivityEntry {
  when: string;
  text: string;
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {

  private readonly adminEmail = localStorage.getItem('adminUsername') || 'admin@hirehub.io';

  profile: AdminProfile = {
    name: this.adminEmail.split('@')[0],
    email: this.adminEmail,
    role: 'SUPER ADMIN',
    timezone: 'Asia/Kolkata (UTC+5:30)'
  };

  notifications: NotificationPref[] = [
    { key: 'companies', label: 'New company signups',  enabled: true  },
    { key: 'flagged',   label: 'Flagged job posts',    enabled: true  },
    { key: 'reports',   label: 'User reports',         enabled: true  },
    { key: 'digest',    label: 'Daily activity digest',enabled: false },
    { key: 'weekly',    label: 'Weekly platform report', enabled: true  }
  ];

  permissions: string[] = [
    'View all users', 'Approve companies', 'Moderate jobs',
    'Manage payouts', 'Manage roles', 'Access audit log'
  ];

  team: TeamMember[] = [
    { name: 'Anjali Pillai', role: 'Admin',     lastActive: 'last active 2h' },
    { name: 'Vikram Rao',    role: 'Moderator', lastActive: 'last active 1d' },
    { name: 'Karthik Bhat',  role: 'Support',   lastActive: 'last active 3h' }
  ];

  activity: ActivityEntry[] = [
    { when: 'Today · 9:14 AM', text: 'Approved company **Solstice Retail**' },
    { when: 'Today · 8:02 AM', text: 'Closed job **QA Engineer · Fernwood Labs**' },
    { when: 'Yesterday',       text: 'Suspended seeker **Priya Das**' },
    { when: '2 days ago',      text: 'Updated notification preferences' }
  ];

  saveProfile(): void {
    alert('Profile changes saved.');
  }

  changePassword(): void {
    alert('Password update requested. Check your email for confirmation.');
  }

  toggleNotification(pref: NotificationPref): void {
    pref.enabled = !pref.enabled;
  }
}
