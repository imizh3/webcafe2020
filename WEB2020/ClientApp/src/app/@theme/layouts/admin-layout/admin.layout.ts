import { Component } from "@angular/core";

@Component({
  selector: "ngx-admin-layout",
  styleUrls: ["./admin.layout.scss"],
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
      >
        <ngx-menu-admin></ngx-menu-admin>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AdminLayoutComponent {}
