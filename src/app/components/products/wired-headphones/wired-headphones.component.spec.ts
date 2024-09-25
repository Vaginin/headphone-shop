import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiredHeadphonesComponent } from './wired-headphones.component';

describe('WiredHeadphonesComponent', () => {
  let component: WiredHeadphonesComponent;
  let fixture: ComponentFixture<WiredHeadphonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WiredHeadphonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiredHeadphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
