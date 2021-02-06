import { DirectivesModule } from "./../@core/directives/directives.module";
import { PipeModule } from "./../@core/pipes/pipes.module";
import { ControllModule } from "./../@component/controll.module";
import { NgModule } from "@angular/core";
import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";
import {
  NbMenuModule,
  NbCardModule,
  NbListModule,
  NbUserModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbFormFieldModule,
  NbDatepickerModule,
  NbSelectModule,
  NbSpinnerModule,
  NbPopoverModule,
  NbActionsModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { ProductsResolver } from "./home/guards/products-resolver";
import { KhuyenMaiComponent } from "./khuyen-mai/khuyen-mai.component";
import { KhuyenMaiCtComponent } from "./khuyen-mai/khuyen-mai-ct/khuyen-mai-ct.component";
import { DonHangComponent } from "./don-hang/don-hang.component";
import { NbMomentDateModule } from "@nebular/moment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DonHangCtComponent } from "./don-hang/don-hang-ct/don-hang-ct.component";
import { ThemDonHangCtComponent } from "./don-hang/them-don-hang-ct/them-don-hang-ct.component";
import { ListBanComponent } from "./list-ban/list-ban.component";
import { ChiTietBanComponent } from "./list-ban/chi-tiet-ban/chi-tiet-ban.component";
import { BanHangComponent } from "./ban-hang/ban-hang.component";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    NbDatepickerModule,
    NbSelectModule,
    NbPopoverModule,
    NbMomentDateModule,
    NbSpinnerModule,
    ControllModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    DirectivesModule,
  ],
  declarations: [
    PagesComponent,
    KhuyenMaiComponent,
    KhuyenMaiCtComponent,
    DonHangComponent,
    DonHangCtComponent,
    ThemDonHangCtComponent,
    ListBanComponent,
    ChiTietBanComponent,
    BanHangComponent,
  ],
  providers: [ProductsResolver],
})
export class PagesModule {}
