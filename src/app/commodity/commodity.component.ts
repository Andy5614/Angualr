import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCubes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.css']
})
export class CommodityComponent {
  progress :number| 0 =0; //載入進度(進度)
  value:number| 0 =0; //進度

  faCubes = faCubes;
  commodityId: number =0;
  database :any = [];
  fundrasingsplan: any[] =[];
  name :string| null ='';
  content :string| null ='';
  image :string| null ='';
  goal :number| 0 =0;
  current:number| 0 =0;
  imgdata : string| null='';  // 用來接傳到結帳畫面的64 Base

  constructor(private route: ActivatedRoute,private cilent: HttpClient ,private router: Router) {}

    ngOnInit(): void {
    console.log('CommodityComponent 被加載了！');
    //從後端拿Plan的資料
    this.cilent.get<any[]>('https://localhost:7116/Seller/TFundrasings/GetFundrasingsPlan').subscribe(data=>{
    this.database = data;
    console.log(this.database);

    //接收路由傳進來的ID資料(處理Fundrasing配對FundrasingPlan)
    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
      if (id !== null) {
        this.commodityId = +id;
        if (this.database.length > 0) {
          this.fundrasingsplan = this.database.filter((item: any) => item.fFundrasingId === this.commodityId);
          console.log('Filtered data:', this.fundrasingsplan); // 在篩選後輸出
        } else {
          console.log('Data not yet received.');
        }
      } else {
        console.log('No ID parameter provided.');
      }
    })
    })

    //接收路由傳進來的參數資料
    this.route.queryParams.subscribe(params=>{
      this.name = params['name'];
      this.content = params['content'];
      this.goal = Number(params['goal']);
      this.current = Number(params['current']);
      this.value = Math.floor((this.current / this.goal) * 100);

       //將base64轉為二進位
       const imjur = atob(params['image']);
       this.imgdata = params['image'];
       const arrayBuffer = new ArrayBuffer(imjur.length);
       const uint8Array = new Uint8Array(arrayBuffer);
     for (let i = 0; i < imjur.length; i++) {
       uint8Array[i] = imjur.charCodeAt(i);
     }
       const blob = new Blob([uint8Array], {type:'image/jpeg'});
       const blobUrl = URL.createObjectURL(blob);
      this.image = blobUrl;
      // console.log('data:', this.image);
    })


    //載入進度延遲
  }

  handleClick(event: Event, ID:number, name:string, amount:number, content:string) {
    event.preventDefault();
    this.router.navigate(['/pay', ID],{
      queryParams:{
        name: name,
        amount: amount,
        content: content,
        commodityId: this.commodityId,
        image : this.imgdata,
      }
    });
  }




}
