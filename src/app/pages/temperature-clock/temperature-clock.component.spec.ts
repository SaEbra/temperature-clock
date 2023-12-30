import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureClockComponent } from './temperature-clock.component';

describe('TemperatureClockComponent', () => {
  let component: TemperatureClockComponent;
  let fixture: ComponentFixture<TemperatureClockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemperatureClockComponent]
    });
    fixture = TestBed.createComponent(TemperatureClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
