import { ChiTietMatHangComponent } from "./chi-tiet-mat-hang/chi-tiet-mat-hang.component";
import { DanhSachMatHangComponent } from "./danh-sach-mat-hang/danh-sach-mat-hang.component";
import { AdminPageComponent } from "./admin-page.component";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard.service";
const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: AdminPageComponent,
    children: [
      {
        path: "danh-sach-mat-hang",
        canActivate: [AuthGuard],
        component: DanhSachMatHangComponent,
      },
      {
        path: "chi-tiet-mat-hang",
        canActivate: [AuthGuard],
        component: ChiTietMatHangComponent,
      },
      {
        path: "",
        redirectTo: "danh-sach-mat-hang",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
