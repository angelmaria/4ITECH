import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeynoteListComponent } from './keynote-list.component';

describe('KeynoteListComponent', () => {
  let component: KeynoteListComponent;
  let fixture: ComponentFixture<KeynoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeynoteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeynoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
