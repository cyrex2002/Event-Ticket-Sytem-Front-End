import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemConfigCardComponent } from './system-config-card.component';

describe('SystemConfigCardComponent', () => {
  let component: SystemConfigCardComponent;
  let fixture: ComponentFixture<SystemConfigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemConfigCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemConfigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
