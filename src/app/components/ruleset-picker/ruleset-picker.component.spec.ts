import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetPickerComponent } from './ruleset-picker.component';

describe('RulesetPickerComponent', () => {
  let component: RulesetPickerComponent;
  let fixture: ComponentFixture<RulesetPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesetPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
