import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ecpayview',
  templateUrl: './ecpayview.component.html',
  styleUrls: ['./ecpayview.component.css']
})
export class EcpayviewComponent {
  ItemName :string| null ='';
  TotalAmount: number| 0 = 0;
  TradeNo: number| 0 = 0;
  PaymentDate: Date | null = null;
  PaymentType :string| null ='';
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      console.log(params['data']);
      const data = JSON.parse(params['data']);
      this.ItemName = data.CustomField1;
      this.TotalAmount = data.CustomField2;
      this.TradeNo = data.MerchantTradeNo;
      this.PaymentDate = data.PaymentDate;
      this.PaymentType = data.PaymentType;
    })
  }
}
