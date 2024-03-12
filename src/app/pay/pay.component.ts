import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {

  FormName :string| null = "";
  FormPhone:string| null = "";
  FormEmail:string| null ='';
  FormAddress :string| null ='';

  ItemName :string| null ='';
  content :string| null ='';
  image :string| null ='';
  amount :number| 0 =0;
  stock : number| 0 = 1;
  TotalAmount: number| 0 = 0;
  commodityId: number =0;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
    })

    this.route.queryParams.subscribe(params=>{
      this.ItemName = params['name'];
      this.content = params['content'];
      this.amount = Number(params['amount']);
      this.commodityId = Number( params['commodityId']);

      const imjur = atob(params['image']);
      const arrayBuffer = new ArrayBuffer(imjur.length);
       const uint8Array = new Uint8Array(arrayBuffer);
     for (let i = 0; i < imjur.length; i++) {
       uint8Array[i] = imjur.charCodeAt(i);
     }
       const blob = new Blob([uint8Array], {type:'image/jpeg'});
       const blobUrl = URL.createObjectURL(blob);
      this.image = blobUrl;
      this.TotalAmount = this.amount; //載入結帳畫面給的初始值
    })
  }
  add(){
    this.stock ++;
    this.TotalAmount = this.stock* this.amount;

  }
  reduce(){
    if(this.stock> 0)
    this.stock --;
    this.TotalAmount = this.stock* this.amount;
  }

  //結帳API
  checkoutAPI(){
    const dataTosend = {
      ItemName : this.ItemName,
      TotalAmount: this.TotalAmount.toString(),
    }
    let url = 'https://localhost:7116/Ecpay/Cash/Data'
    this.httpClient.post(url,dataTosend).subscribe((data)=>{
      const copiedData = {...data};
      this.AddOrder(copiedData);
      this.AddCruuent();
      this.createSubmitForm(copiedData);
    })
  }

  //增加訂單API
  AddOrder(data:any){
    const dataTosend = data;
    let url = 'https://localhost:7116/AddOrders'
    this.httpClient.post(url, dataTosend).subscribe((data)=>{
      console.log(data);
    })
  }

  //購買金額整合進目前的募資金額
  AddCruuent(){
    const dataTosend = {
      commodityId : this.commodityId.toString(),
      TotalAmount: this.TotalAmount.toString(),
    };
    let url = 'https://localhost:7116/AddCruuent'
    this.httpClient.post(url, dataTosend).subscribe((data)=>{
      console.log(data);
    })
  }


  //動態表單API
  createSubmitForm(data:any){
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5');
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', data[key]);
            form.appendChild(input);
        }
    }
    document.body.appendChild(form);
    form.submit();
  }

  demo(){
    this.FormAddress = "台北市大安區復興南路二段696號6樓";
    this.FormEmail="106@gmail.com";
    this.FormName="會員A";
    this.FormPhone="0988888168"
  }
}
