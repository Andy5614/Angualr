import { keyframes } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, NgModule } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';




@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})


export class IntroComponent {
  //輸入計時器的變數
  @Input() countdownTime: number = 0;
  remainingTime: number = 50000;

  //抓最大值用相關變數
  hotID : number = 0 ;
  hotGoal : number = 0 ;
  hotImageData : string ="";
  hotDescription: string = "";
  hotName: string ="";
  hotMoney: number = 0;
  hotimage:string ="";
  hotEnddate: number = 1;
  hotcurrent: number = 0;

  //回傳專案資料相關變數
  isIntroHidden: boolean = false;
  fundrasings: any[] =[];
  items :any[] = [];
  pagesArray: number[] = [];

  //頁數相關變數
  totalPages = 0;
  pagesize = 6;
  currentpage = 1;
  constructor(private cilent: HttpClient,private sanitizer: DomSanitizer,private router: Router) {}

    ngOnInit(): void {

      this.cilent.get<any[]>('https://localhost:7116/Seller/TFundrasings/GetFundrasings').subscribe(data=>
      {
        this.fundrasings = data.map(item=>{

          //將base64轉為二進位
          const imjur = atob(item.imageData);
          const arrayBuffer = new ArrayBuffer(imjur.length);
          const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < imjur.length; i++) {
          uint8Array[i] = imjur.charCodeAt(i);
        }
          const blob = new Blob([uint8Array], {type:'image/jpeg'});
          const blobUrl = URL.createObjectURL(blob);
          return { ...item, imageBlob: blobUrl};
        })

        this.items = this.paginateItems(this.fundrasings, this.currentpage, this.pagesize);
        this.totalPages = Math.ceil(this.fundrasings.length / this.pagesize);
        this.pagesArray = Array(this.totalPages).fill(0).map((x,i)=>i+1);
        console.log(this.fundrasings);

        // 找最大金額的資料<H是物件>
        const H = this.fundrasings.reduce((max, current) => {
          return (current.fCurrentAmount > max.fCurrentAmount) ? current : max;
        }, this.fundrasings[0]);
        this.hotID = H.fFundrasingId;
        this.hotcurrent = H.fCurrentAmount;
        this.hotMoney = H.fCurrentAmount;
        this.hotName = H.fEventName;
        this.hotDescription = H.fFundraisingDescription;
        this.hotimage = H.imageBlob;
        this.hotGoal = H.fFundrasingGoal;
        this.hotImageData = H.imageData;
        console.log(H.fEnddate);
        this.hotEnddate = new Date(H.fEnddate).getTime() - new Date().getTime();
        console.log(this.hotEnddate);
      });

    }



    //回傳每頁的資料筆數
  paginateItems(fundrasings: any[], currentpage: number, pagesize: number): any[] {
    const startIndex = (currentpage-1)*pagesize;
    const endIndex = startIndex + pagesize;
    return  fundrasings.slice(startIndex, endIndex);
  }
  //換頁
  onPageChange(pageNumber:number):void{
    this.currentpage = pageNumber;
    this.items = this.paginateItems(this.fundrasings, this.currentpage, this.pagesize);
  }

  //資金進度
  getProgress(Current:number, Goal:number){
    return +(Current / Goal * 100).toFixed(2);
  }

  //商品點擊
  handleClick(event: Event, ID:number, name:string, content:string, goal:number, base:string, current:number) {
    console.log('blob:', base)
    event.preventDefault();
    this.router.navigate(['/commodity', ID],{
      queryParams:{
        name: name,
        content: content,
        goal: goal,
        image: base,
        current: current
      }
    });
  }
}
