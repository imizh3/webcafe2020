import { HomeComponent } from "./../pages/home/home.component";
import { QuantityComponent } from "./../checkout/cart/quantity/quantity.component";
import { CartInfoComponent } from "./../checkout/cart/cart-info/cart-info.component";
import { ThungLeComponent } from "./thung-le/thung-le.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AutoKhachhangComponent } from "./auto-khachhang/auto-khachhang.component";
import {
  NbActionsModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbStepperModule,
  NbUserModule,
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoSanphamComponent } from "./auto-sanpham/auto-sanpham.component";
import { PipeModule } from "../@core/pipes/pipes.module";
import { ChartBarComponent } from "./chart-bar/chart-bar.component";
import { ChartModule } from "angular2-chartjs";
import { TotalBarComponent } from "./total-bar/total-bar.component";
import { ChartPieComponent } from "./chart-pie/chart-pie.component";
import { NgxEchartsModule } from "ngx-echarts";
import { ThemeModule } from "../@theme/theme.module";
import { ProductsListComponent } from "../pages/home/products-list/products-list.component";
import { ProductsItemComponent } from "../pages/home/products-item/products-item.component";

@NgModule({
  imports: [
    CommonModule,
    NbInputModule,
    NbAutocompleteModule,
    FormsModule,
    PipeModule,
    ChartModule,
    NgxEchartsModule,
    CommonModule,
    ThemeModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbUserModule,
    NbListModule,
    NbActionsModule,
    NbStepperModule,
    NbFormFieldModule,
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AutoKhachhangComponent,
    AutoSanphamComponent,
    ThungLeComponent,
    ChartBarComponent,
    TotalBarComponent,
    ChartPieComponent,
    CartInfoComponent,
    QuantityComponent,
    ProductsListComponent,
    ProductsItemComponent,
    HomeComponent,
  ],
  exports: [
    AutoKhachhangComponent,
    AutoSanphamComponent,
    ThungLeComponent,
    ChartBarComponent,
    TotalBarComponent,
    ChartPieComponent,
    CartInfoComponent,
    QuantityComponent,
    ProductsListComponent,
    ProductsItemComponent,
    HomeComponent,
  ],
})
export class ControllModule {}
