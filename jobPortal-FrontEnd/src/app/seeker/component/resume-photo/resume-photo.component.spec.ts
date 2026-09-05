import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePhotoComponent } from './resume-photo.component';

describe('ResumePhotoComponent', () => {
  let component: ResumePhotoComponent;
  let fixture: ComponentFixture<ResumePhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumePhotoComponent]
    });
    fixture = TestBed.createComponent(ResumePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
