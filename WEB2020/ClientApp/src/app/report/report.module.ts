import {
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
import { ControllModule } from "./../@component/controll.module";
import { ThemeModule } from "./../@theme/theme.module";
import { ReportComponent } from "./report.component";
import { NgModule } from "@angular/core";
import { ReportRoutingModule } from "./report-routing.module";
import { BaoCaoComponent } from "./bao-cao/bao-cao.component";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbMomentDateModule } from "@nebular/moment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaoMauBaoCaoComponent } from "./tao-mau-bao-cao/tao-mau-bao-cao.component";
import {
  DxReportDesignerModule,
  DxReportViewerModule,
} from "devexpress-reporting-angular";

@NgModule({
  imports: [
    ThemeModule,
    ReportRoutingModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
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
    DxReportViewerModule,
    DxReportDesignerModule,
  ],
  declarations: [ReportComponent, BaoCaoComponent, TaoMauBaoCaoComponent],
})
export class ReportModule {}
