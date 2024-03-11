import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketOrderBuyListComponent } from './ticket-order-buy-list.component';

describe('TicketOrderBuyListComponent', () => {
  let component: TicketOrderBuyListComponent;
  let fixture: ComponentFixture<TicketOrderBuyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketOrderBuyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketOrderBuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
