import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInputAreaComponent } from './video-input-area.component';

describe('VideoInputAreaComponent', () => {
  let component: VideoInputAreaComponent;
  let fixture: ComponentFixture<VideoInputAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoInputAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoInputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
