import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketOrderBuyDetailComponent } from './ticket-order-buy-detail.component';

describe('TicketOrderBuyDetailComponent', () => {
  let component: TicketOrderBuyDetailComponent;
  let fixture: ComponentFixture<TicketOrderBuyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketOrderBuyDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketOrderBuyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
