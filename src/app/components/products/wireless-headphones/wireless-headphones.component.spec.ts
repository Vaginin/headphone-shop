import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirelessHeadphonesComponent } from './wireless-headphones.component';

describe('WirelessHeadphonesComponent', () => {
  let component: WirelessHeadphonesComponent;
  let fixture: ComponentFixture<WirelessHeadphonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WirelessHeadphonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WirelessHeadphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
