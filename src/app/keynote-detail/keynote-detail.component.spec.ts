import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeynoteDetailComponent } from './keynote-detail.component';

describe('KeynoteDetailComponent', () => {
  let component: KeynoteDetailComponent;
  let fixture: ComponentFixture<KeynoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeynoteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeynoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
