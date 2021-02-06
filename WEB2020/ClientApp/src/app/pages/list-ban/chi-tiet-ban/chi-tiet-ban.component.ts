import { Khachhang } from "./../../../@core/data/khachhang";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Giaodichct } from "../../../@core/data/giaodichct";
import { Store } from "@ngrx/store";
import { AppState } from "../../../@store/app-state";
import { getCartCt } from "../../../@store/selectors/cart-selectors";
import { CartActions } from "../../../@store/actions/cart-actions";
import { CartService } from "../../../@core/mock/cart.service";
import { giaodichFields } from "../../../@core/data/giaodich";
import { map } from "rxjs/operators";

@Component({
  selector: "ngx-chi-tiet-ban",
  templateUrl: "./chi-tiet-ban.component.html",
  styleUrls: ["./chi-tiet-ban.component.scss"],
})
export class ChiTietBanComponent implements OnInit {
  giaodichct$: Observable<Giaodichct[]>;
  tongSoLuong: number;
  tongTienHang: number;
  tongDon: number;
  chietKhau: number;
  tienChietKhau: number;
  soBan: number;
  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private store: Store<AppState>,
    private action: CartActions,
    private cartService: CartService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.params
      .pipe(map((p) => p.i))
      .subscribe((d) => (this.soBan = d));
    this.giaodichct$ = this.store.select(getCartCt);
    this.giaodichct$.subscribe((d) => {
      this.tongSoLuong = 0;
      this.chietKhau = 0;
      this.tongTienHang = 0;
      this.tienChietKhau = 0;
      if (d) {
        for (let i = 0; i < d.length; i++) {
          this.tienChietKhau = this.tienChietKhau + d[i].tienck;
          this.tongSoLuong = this.tongSoLuong + d[i].soluong;
          this.tongTienHang = this.tongTienHang + d[i].tienhang;
        }
      }
      if (this.chietKhau === 0) {
        this.tongDon = this.tongTienHang - this.tienChietKhau;
      } else {
        this.tongDon =
          ((this.tongTienHang - this.tienChietKhau) * this.chietKhau) / 100;
      }
    });
  }

  onClickDaDat() {
    this.router.navigate(["/Checkout/Cart"]);
  }
  onClickThanhToan() {
    if (this.tongDon <= 0 || this.tongDon === undefined) {
      this.toastrService.show("Warning", "Vui lòng chọn món !", {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        status: "warning",
      });
    } else {
      let khachhangNull = new Khachhang();
      khachhangNull.makhachhang = "";
      khachhangNull.tenkhachhang = "";
      khachhangNull.diachi = "";
      khachhangNull.diachigiaohang = "";
      khachhangNull.dienthoai = "";
      this.store.dispatch(
        this.action.addItemSuccess({
          order: this.cartService.updateCart("none", khachhangNull),
        })
      );
      this.cartService.createOrder().subscribe((result: any) => {
        // tslint:disable-next-line: no-console
        console.log(result);
        if (result.iSsuccess) {
          this.toastrService.show("Success", "Thanh toán thành công !", {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: "success",
          });
          this.store.dispatch(this.action.createOrderSuccess());
          localStorage.removeItem("order");
          this.router.navigate(["/list-ban"]);
        }
      });
    }
  }
}
