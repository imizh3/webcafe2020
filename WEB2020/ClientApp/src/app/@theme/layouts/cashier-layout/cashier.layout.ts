import { async } from "@angular/core/testing";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-cashier-layout",
  styleUrls: ["./cashier.layout.scss"],
  template: `
    <nb-layout windowMode="false">
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar
        ngxClickOutsideSidebar
        class="menu-sidebar"
        tag="menu-sidebar"
        responsive
        start
        state="collapse"
      >
        <ngx-menu-cart></ngx-menu-cart>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class CashierLayoutComponent {}
