import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeynoteFormComponent } from './keynote-form.component';

describe('KeynoteFormComponent', () => {
  let component: KeynoteFormComponent;
  let fixture: ComponentFixture<KeynoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeynoteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeynoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
