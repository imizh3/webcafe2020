import { ProductService } from "./../../@core/mock/product.service";
import { Product } from "./../../@core/data/product";
import { Observable } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { LIB } from "../../@core/utils";
import { DataService } from "../../@core/mock/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-danh-sach-mat-hang",
  templateUrl: "./danh-sach-mat-hang.component.html",
  styleUrls: ["./danh-sach-mat-hang.component.scss"],
})
export class DanhSachMatHangComponent implements OnInit, OnDestroy {
  baseUrl: string;
  imageUrls: any[];
  constructor(
    private productService: ProductService,
    private lib: LIB,
    private dataService: DataService,
    private router: Router
  ) {}
  products: Product[];
  ngOnInit(): void {
    this.products = this.productService.products;
    this.baseUrl = this.lib.baseUrl + "images";
    console.log("OnInit");
  }
  ngOnDestroy(): void {
    console.log("OnDestroy");
    this.products = [];
  }
  btnChiTietMatHang(ma: string) {
    if (ma) {
      this.router.navigate(["/admin/chi-tiet-mat-hang"], {
        queryParams: { query: ma },
      });
    }
  }
  getImage(fileName: string) {
    this.imageUrls = this.dataService.imageUrls;
    var imageUrl = this.imageUrls.find((d) => d.search(fileName) >= 0);
    var urlNoCache = imageUrl + "#" + new Date().getTime();
    return imageUrl;
  }
}
