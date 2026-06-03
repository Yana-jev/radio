import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusRoom } from './focus-room';

describe('FocusRoom', () => {
  let component: FocusRoom;
  let fixture: ComponentFixture<FocusRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocusRoom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
