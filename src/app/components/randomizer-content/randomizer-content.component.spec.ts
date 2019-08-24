import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizerContentComponent } from './randomizer-content.component';

describe('RandomizerContentComponent', () => {
  let component: RandomizerContentComponent;
  let fixture: ComponentFixture<RandomizerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomizerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
