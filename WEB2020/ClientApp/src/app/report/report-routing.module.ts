import { TaoMauBaoCaoComponent } from "./tao-mau-bao-cao/tao-mau-bao-cao.component";
import { BaoCaoComponent } from "./bao-cao/bao-cao.component";

import { ReportComponent } from "./report.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: ReportComponent,
    children: [
      {
        path: "bao-cao",
        canActivate: [AuthGuard],
        component: BaoCaoComponent,
      },
      {
        path: "tao-mau-bao-cao",
        canActivate: [AuthGuard],
        component: TaoMauBaoCaoComponent,
      },
      {
        path: "",
        redirectTo: "tao-mau-bao-cao",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
