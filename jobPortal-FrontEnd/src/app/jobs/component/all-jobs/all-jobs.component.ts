import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Job } from 'src/app/landing/models/job';
import { JobService } from 'src/app/service/job/job.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SharedModule]
})
export class AllJobsComponent implements OnInit {

  allJobs: Job[] = [];

  searchTerm = '';
  selectedLocation = 'Any location';
  selectedExperience = 'Any level';
  selectedSkills: Set<string> = new Set();

  constructor(private jobService: JobService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Prefill the keyword search when arriving from the landing-page search box.
    const q = this.route.snapshot.queryParamMap.get('q');
    if (q) {
      this.searchTerm = q;
    }
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.jobService.getAllJobs().subscribe(res => {
      this.allJobs = res || [];
    });
  }

  toggleSkill(skill: string): void {
    if (this.selectedSkills.has(skill)) {
      this.selectedSkills.delete(skill);
    } else {
      this.selectedSkills.add(skill);
    }
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedLocation = 'Any location';
    this.selectedExperience = 'Any level';
    this.selectedSkills.clear();
  }

  get locations(): string[] {
    const set = new Set(this.allJobs.map(j => j.location).filter(Boolean));
    return ['Any location', ...Array.from(set).sort()];
  }

  get experienceLevels(): string[] {
    const set = new Set(this.allJobs.map(j => j.experience).filter(Boolean));
    return ['Any level', ...Array.from(set).sort()];
  }

  get availableSkills(): string[] {
    const set = new Set<string>();
    this.allJobs.forEach(j => (j.skills || []).forEach(s => set.add(s)));
    return Array.from(set).sort();
  }

  get filteredJobs(): Job[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.allJobs.filter(job => {
      const matchesTerm = !term
        || (job.jobTitle || '').toLowerCase().includes(term)
        || (job.companyName || '').toLowerCase().includes(term)
        || (job.skills || []).some(s => s.toLowerCase().includes(term));

      const matchesLocation = this.selectedLocation === 'Any location' || job.location === this.selectedLocation;
      const matchesExperience = this.selectedExperience === 'Any level' || job.experience === this.selectedExperience;
      const matchesSkills = this.selectedSkills.size === 0
        || (job.skills || []).some(s => this.selectedSkills.has(s));

      return matchesTerm && matchesLocation && matchesExperience && matchesSkills;
    });
  }
}
