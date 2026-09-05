import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminJobseekerComponent } from './admin-jobseeker.component';

describe('AdminJobseekerComponent', () => {
  let component: AdminJobseekerComponent;
  let fixture: ComponentFixture<AdminJobseekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminJobseekerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminJobseekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
