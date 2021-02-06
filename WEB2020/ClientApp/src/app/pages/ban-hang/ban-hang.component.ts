import { ProductActions } from "./../../@store/actions/product-actions";
import { getMenu } from "./../../@store/selectors/product-selectors";
import { CategoryService } from "./../../@core/mock/category.service";
import { DataService } from "./../../@core/mock/data.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Ban } from "../../@core/data/ban";
import { Giaodichct } from "../../@core/data/giaodichct";
import { Khachhang } from "../../@core/data/khachhang";
import { CartService } from "../../@core/mock/cart.service";
import { CartActions } from "../../@store/actions/cart-actions";
import { AppState } from "../../@store/app-state";
import { getCartCt } from "../../@store/selectors/cart-selectors";
import { Nganhnhom } from "../../@core/data/nganhnhom";
@Component({
  selector: "ngx-ban-hang",
  templateUrl: "./ban-hang.component.html",
  styleUrls: ["./ban-hang.component.scss"],
})
export class BanHangComponent implements OnInit, OnDestroy {
  bans: Ban[];
  action: any;
  showThucdon = false;
  showListBan = true;
  giaodichct$: Observable<Giaodichct[]>;
  menus$: Observable<Nganhnhom[]>;
  menus: Nganhnhom[];
  listNhom: any[];
  listNganh: any[];
  tongSoLuong: number;
  tongTienHang: number;
  tongDon: number;
  chietKhau: number;
  tienChietKhau: number;
  soBan: string;
  categories: Nganhnhom[];

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private store: Store<AppState>,
    private cartActions: CartActions,
    private cartService: CartService,
    private dataService: DataService,
    private categoryService: CategoryService,
    private actions: ProductActions
  ) {}
  ngOnDestroy(): void {
    for (var i = 0; i < 12; i++) {
      localStorage.removeItem("order" + i);
    }
  }

  ngOnInit(): void {
    this.bans = this.dataService.dmBan;
    // this.menus$ = this.store.select(getMenu);
    // this.menus$.subscribe((d) => (this.menus = d));
    this.categoryService.loadCategory().subscribe((d) => {
      this.categories = d;
      this.listNhom = this.categories.filter((d) => d.macha != null);
      this.listNganh = this.categories.filter((d) => d.macha == null);
    });

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
    this.soBan = localStorage.getItem("maBan");
    this.bans.forEach((ban) => {
      var order = JSON.parse(localStorage.getItem("order" + ban.ma));
      if (
        order === null ||
        order === undefined ||
        order.giaodichct === undefined ||
        order.giaodichct.length === 0
      ) {
        ban.trangThai = "grey";
      } else {
        ban.trangThai = "red";
      }
    });
  }
  getNhom(manganh: any) {
    return this.listNhom.filter((d) => d.macha === manganh);
  }
  onClickBan(ma: string) {
    this.soBan = ma;
    localStorage.setItem("maBan", ma);
    var order = JSON.parse(localStorage.getItem("order" + ma));

    if (
      order === null ||
      order === undefined ||
      order.giaodichct === undefined ||
      order.giaodichct.length === 0
    ) {
      this.store.dispatch(this.cartActions.addItemSuccess({ order: {} }));
      this.showThucdon = true;
    } else {
      this.store.dispatch(this.cartActions.addItemSuccess({ order: order }));
    }
    this.showListBan = false;
  }
  onClickAction(event) {
    this.action = event;
    if (event === "BAN") {
      this.showListBan = !this.showListBan;
      this.showThucdon = false;
      //thay doi trang thai ban: grey la free, red la used
      this.bans.forEach((ban) => {
        var order = JSON.parse(localStorage.getItem("order" + ban.ma));
        if (
          order === null ||
          order === undefined ||
          order.giaodichct === undefined ||
          order.giaodichct.length === 0
        ) {
          ban.trangThai = "grey";
        } else {
          ban.trangThai = "red";
        }
      });
    } else {
      this.showListBan = false;
      this.showThucdon = !this.showThucdon;
    }
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
        this.cartActions.addItemSuccess({
          order: this.cartService.updateCart("none", khachhangNull),
        })
      );
      this.cartService.createOrder().subscribe((result: any) => {
        // tslint:disable-next-line: no-console
        if (result.iSsuccess) {
          this.toastrService.show("Success", "Gửi đơn thành công !", {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: "success",
          });
          this.store.dispatch(this.cartActions.createOrderSuccess());
          localStorage.removeItem("order" + this.soBan);
          localStorage.removeItem("maBan");
          this.bans[this.soBan].trangThai = "grey";
        }
      });
    }
    this.showListBan = true;
  }
  onClickDaDat() {
    this.router.navigate(["/Checkout/Cart"]);
  }

  onChonNhom(maNganh: string, maNhom: string) {
    this.store.dispatch(
      this.actions.getAllProducts({ nganhhang: maNganh, nhomhang: maNhom })
    );
  }
  onInputChange(value) {
    this.store.dispatch(this.actions.getProductsByQuery({ query: value }));
  }

  onTatCa() {
    this.store.dispatch(
      this.actions.getAllProducts({ nganhhang: null, nhomhang: null })
    );
  }
}
