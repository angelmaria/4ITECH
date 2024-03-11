import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketOrderBuyFormComponent } from './ticket-order-buy-form.component';

describe('TicketOrderBuyFormComponent', () => {
  let component: TicketOrderBuyFormComponent;
  let fixture: ComponentFixture<TicketOrderBuyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketOrderBuyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketOrderBuyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
