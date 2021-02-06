import { AdminPageRoutingModule } from "./admin-page-routing.module";
import { AdminPageComponent } from "./admin-page.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DanhSachMatHangComponent } from "./danh-sach-mat-hang/danh-sach-mat-hang.component";
import { ThemeModule } from "../@theme/theme.module";
import { DashboardModule } from "../pages/dashboard/dashboard.module";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule,
} from "@nebular/theme";
import { NbMomentDateModule } from "@nebular/moment";
import { ControllModule } from "../@component/controll.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipeModule } from "../@core/pipes/pipes.module";
import { DirectivesModule } from "../@core/directives/directives.module";
import { ChiTietMatHangComponent } from './chi-tiet-mat-hang/chi-tiet-mat-hang.component';

@NgModule({
  declarations: [AdminPageComponent, DanhSachMatHangComponent, ChiTietMatHangComponent],
  imports: [
    AdminPageRoutingModule,
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
    NbActionsModule,
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
})
export class AdminPageModule {}
