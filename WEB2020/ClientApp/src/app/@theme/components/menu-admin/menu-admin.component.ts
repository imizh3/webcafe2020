import { Component, OnInit, OnDestroy } from "@angular/core";
import { NbMenuItem, NbMenuService } from "@nebular/theme";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "ngx-menu-admin",
  templateUrl: "./menu-admin.component.html",
  styleUrls: ["./menu-admin.component.scss"],
})
export class MenuAdminComponent implements OnInit, OnDestroy {
  menuItems: NbMenuItem[] = [
    {
      title: "Home",
      icon: "home-outline",
      link: "/ban-hang",
      home: true,
    },
    {
      title: "CT Khuyến mại",
      icon: "gift-outline",
      link: "/Khuyen-mai",
    },
    {
      title: "Đơn hàng",
      icon: "file-text-outline",
      link: "/Don-hang",
    },
    {
      title: "Mặt hàng",
      icon: "cube-outline",
      link: "/admin/danh-sach-mat-hang",
    },
  ];

  private destroy$ = new Subject<void>();

  public constructor(private menuService: NbMenuService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.menuItems = [];
    this.destroy$.next();
    this.destroy$.complete();
  }
}
