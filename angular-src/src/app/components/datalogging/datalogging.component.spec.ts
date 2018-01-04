import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataloggingComponent } from './datalogging.component';

describe('DataloggingComponent', () => {
  let component: DataloggingComponent;
  let fixture: ComponentFixture<DataloggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataloggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataloggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
