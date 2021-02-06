import { MainCashierComponent } from "./main-cashier/main-cashier.component";
import { CashierComponent } from "./cashier.component";
import { NgModule } from "@angular/core";
import { CashierRoutingModule } from "./cashier-routing.module";
import { ThemeModule } from "../@theme/theme.module";
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
  NbTabsetModule,
  NbActionsModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbMomentDateModule } from "@nebular/moment";
import { ControllModule } from "../@component/controll.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipeModule } from "../@core/pipes/pipes.module";
import { DirectivesModule } from "../@core/directives/directives.module";
import { InHoaDonComponent } from "./in-hoa-don/in-hoa-don.component";
import {
  DxReportViewerModule,
  DxReportDesignerModule,
} from "devexpress-reporting-angular";

@NgModule({
  declarations: [CashierComponent, MainCashierComponent, InHoaDonComponent],
  imports: [
    CashierRoutingModule,
    ThemeModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbIconModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    NbDatepickerModule,
    NbSelectModule,
    NbPopoverModule,
    NbMomentDateModule,
    NbSpinnerModule,
    NbTabsetModule,
    ControllModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    DirectivesModule,
    DxReportViewerModule,
    DxReportDesignerModule,
  ],
})
export class CashierModule {}
