import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatComponent } from './concat.component';

describe('ConcatComponent', () => {
  let component: ConcatComponent;
  let fixture: ComponentFixture<ConcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
