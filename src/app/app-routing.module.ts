import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommodityComponent } from './commodity/commodity.component';
import { PayComponent } from './pay/pay.component';
import { IntroComponent } from './intro/intro.component';
import { EcpayviewComponent } from './ecpayview/ecpayview.component';

const routes: Routes = [
  {path:'', component:IntroComponent},
  { path: 'commodity/:id', component: CommodityComponent },
  { path: 'Commodity', component: CommodityComponent },
  {path: 'pay/:id', component: PayComponent},
  {path: 'ecpayview', component: EcpayviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
