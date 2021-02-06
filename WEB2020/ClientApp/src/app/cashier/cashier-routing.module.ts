import { InHoaDonComponent } from "./in-hoa-don/in-hoa-don.component";
import { MainCashierComponent } from "./main-cashier/main-cashier.component";
import { CashierComponent } from "./cashier.component";
import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard.service";
const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: CashierComponent,
    children: [
      {
        path: "main-cashier",
        canActivate: [AuthGuard],
        component: MainCashierComponent,
      },
      {
        path: "in-hoa-don",
        canActivate: [AuthGuard],
        component: InHoaDonComponent,
      },
      {
        path: "",
        redirectTo: "main-cashier",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashierRoutingModule {}
