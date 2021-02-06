import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth/auth-guard.service";

export const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "Checkout",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./checkout/checkout.module").then((m) => m.CheckoutModule),
  },
  {
    path: "Report",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./report/report.module").then((m) => m.ReportModule),
  },
  {
    path: "cashier",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./cashier/cashier.module").then((m) => m.CashierModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.NgxAuthModule),
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./admin-page/admin-page.module").then((m) => m.AdminPageModule),
  },
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "**", redirectTo: "" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
