import { Router } from "@angular/router";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { DataService } from "./../../@core/mock/data.service";
import { getCartCt } from "./../../@store/selectors/cart-selectors";
import { Giaodichct } from "./../../@core/data/giaodichct";
import { CartService } from "./../../@core/mock/cart.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../@store/app-state";
import { CartActions } from "../../@store/actions/cart-actions";
import { giaodichFields } from "../../@core/data/giaodich";
import { getCart } from "../../@store/selectors/cart-selectors";
import { Observable, of } from "rxjs";
import { Khachhang } from "../../@core/data/khachhang";

@Component({
  selector: "ngx-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  hadData: boolean;
  product$: Observable<Giaodichct[]>;
  tongSoLuong: number;
  tongTienHang: number;
  tongDon: number;
  chietKhau: number;
  tienChietKhau: number;
  txtChotDon: string;
  sdt: number;
  khachHangs: Khachhang[];
  giaodichcts: Giaodichct[];
  constructor(
    private store: Store<AppState>,
    private action: CartActions,
    private cartService: CartService,
    private dataService: DataService,
    private toastService: NbToastrService,
    private route: Router
  ) {}

  ngOnInit() {
    this.hadData = this.isHadData();
    this.dataService.LoadKhachhang().subscribe((d) => (this.khachHangs = d));
    this.product$ = this.store.select(getCartCt);
    this.product$.subscribe((d) => {
      this.tongSoLuong = 0;
      this.chietKhau = 0;
      this.tongTienHang = 0;
      this.tienChietKhau = 0;
      this.giaodichcts = d;

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

  isHadData(): boolean {
    const order = JSON.parse(localStorage.getItem("order"));
    if (
      order === null ||
      order === undefined ||
      order.giaodichct === undefined ||
      order.giaodichct.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  }
  updateCk(ck: number) {
    // this.chietKhau = ck;
    // this.tongDon =
    //   ((this.tongTienHang - this.tienChietKhau) * this.chietKhau) / 100;
  }

  btnThanhToanClicked() {
    if (this.isHadData()) {
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
          this.toastService.show("Thanh toán thành công !", "Success", {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: "success",
          });
          this.store.dispatch(this.action.createOrderSuccess());
          localStorage.removeItem("order");

          this.route.navigate(["/list-ban"]);
        }
      });
    } else {
      this.toastService.show("Vui lòng chọn món ! ", "Warning", {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        status: "warning",
      });
    }
  }
}
