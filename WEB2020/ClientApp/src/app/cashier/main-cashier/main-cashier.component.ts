import { getCart } from "./../../@store/selectors/cart-selectors";
import { DatePipe } from "@angular/common";
import { GiaoDichRequest } from "./../../@core/data/giaodichRequest";
import { OrderService } from "./../../@core/mock/order.service";
import { CategoryService } from "./../../@core/mock/category.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Ban } from "../../@core/data/ban";
import { Giaodichct } from "../../@core/data/giaodichct";
import { Nganhnhom } from "../../@core/data/nganhnhom";
import { CartService } from "../../@core/mock/cart.service";
import { DataService } from "../../@core/mock/data.service";
import { CartActions } from "../../@store/actions/cart-actions";
import { ProductActions } from "../../@store/actions/product-actions";
import { AppState } from "../../@store/app-state";
import { getCartCt } from "../../@store/selectors/cart-selectors";
import { getMenu } from "../../@store/selectors/product-selectors";
import { Giaodich } from "../../@core/data/giaodich";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-main-cashier",
  templateUrl: "./main-cashier.component.html",
  styleUrls: ["./main-cashier.component.scss"],
})
export class MainCashierComponent implements OnInit, OnDestroy {
  bans: Ban[];
  action: any;
  showThucdon = false;
  showListBan = true;
  showListOrders = false;
  giaodichcts: Giaodichct[];
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
  orders$: any;
  orders: Giaodich[];
  ordersByMaBan: Giaodich[];
  ngay: string;
  magiaodichpk: string;
  constructor(
    private store: Store<AppState>,
    private cartActions: CartActions,
    private orderService: OrderService,
    private dataService: DataService,
    private actions: ProductActions,
    private categoryService: CategoryService,
    private datePipe: DatePipe,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngay = this.datePipe.transform(new Date(Date.now()), "dd-MM-yyyy");
    this.bans = this.dataService.dmBan;
    this.menus$ = this.store.select(getMenu);
    this.menus$.subscribe((d) => (this.menus = d));
    this.categoryService.loadCategory().subscribe((d) => {
      this.categories = d;
      this.listNhom = this.categories.filter((d) => d.macha != null);
      this.listNganh = this.categories.filter((d) => d.macha == null);
    });

    this.store.dispatch(
      this.actions.getAllProducts({ nganhhang: null, nhomhang: null })
    );
    //this.soBan = localStorage.getItem("maBan");

    this.loadOrders();
    this.store.select(getCartCt).subscribe((d) => {
      this.loadCacLoaiThongTin(d);
    });
  }
  ngOnDestroy(): void {
    for (var i = 0; i < 12; i++) {
      localStorage.removeItem("order" + i);
    }
  }

  loadOrders() {
    var giaoDichRequest = new GiaoDichRequest();
    giaoDichRequest.trangThai = "1";
    giaoDichRequest.tuNgay = this.datePipe.transform(
      new Date(Date.now()),
      "yyyy-MM-dd"
    );

    giaoDichRequest.denNgay = this.datePipe.transform(
      new Date(Date.now()),
      "yyyy-MM-dd"
    );
    this.orders$ = this.orderService.getOrders(giaoDichRequest);
    this.orders$.subscribe((d) => {
      this.orders = d;
      this.orders.forEach((order) => {
        this.bans
          .filter((d) => {
            return d.trangThai == "grey";
          })
          .forEach((ban) => {
            if (order.maquay === ban.ma.toString()) {
              ban.trangThai = "red";
            } else {
              ban.trangThai = "grey";
            }
          });
      });
    });
  }

  getNhom(manganh: any) {
    return this.listNhom.filter((d) => d.macha === manganh);
  }
  onClickBan(ma: string) {
    this.soBan = ma;
    localStorage.setItem("maBan", ma);
    this.ordersByMaBan = this.orders.filter((d) => d.maquay == ma);

    if (this.ordersByMaBan.length > 1) {
      this.showListOrders = true;
    } else if (this.ordersByMaBan.length === 0) {
      this.showListOrders = false;
      this.store.dispatch(this.cartActions.addItemSuccess({ order: {} }));
      this.showThucdon = true;
    } else if (this.ordersByMaBan.length === 1) {
      this.showListOrders = false;
      this.magiaodichpk = this.ordersByMaBan[0].magiaodichpk;
      var gdRequest = new GiaoDichRequest();
      gdRequest.magiaodichpk = this.ordersByMaBan[0].magiaodichpk;
      this.orderService
        .getOrderDetails(gdRequest)
        .subscribe((d: Giaodichct[]) => {
          var newOrder = {
            ...this.ordersByMaBan[0],
            giaodichct: d,
          };
          this.store.dispatch(
            this.cartActions.addItemSuccess({ order: newOrder })
          );
          localStorage.setItem("order" + ma, JSON.stringify(newOrder));
          this.loadCacLoaiThongTin(d);
        });
    }
    this.showListBan = false;
  }
  onClickOrder(magiaodichpk: string) {
    this.magiaodichpk = magiaodichpk;
    const order = this.orders.find((d) => d.magiaodichpk == magiaodichpk);
    var gdRequest = new GiaoDichRequest();
    gdRequest.magiaodichpk = magiaodichpk;
    this.orderService
      .getOrderDetails(gdRequest)
      .subscribe((d: Giaodichct[]) => {
        const newOrder = {
          ...order,
          giaodichct: d,
        };
        this.store.dispatch(
          this.cartActions.addItemSuccess({ order: newOrder })
        );
        localStorage.removeItem("order" + this.soBan);
        localStorage.setItem("order" + this.soBan, JSON.stringify(newOrder));
        this.loadCacLoaiThongTin(d);
      });
  }

  onClickAction(event) {
    this.showListOrders = false;
    this.action = event;
    if (event === "BAN") {
      this.showListBan = !this.showListBan;
      this.showThucdon = false;
      //thay doi trang thai ban: grey la free, red la used

      this.orders.forEach((order) => {
        this.bans
          .filter((d) => {
            return d.trangThai == "grey";
          })
          .forEach((ban) => {
            if (order.maquay === ban.ma.toString()) {
              ban.trangThai = "red";
            } else {
              ban.trangThai = "grey";
            }
          });
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
      const order$ = this.store.select(getCart);
      order$.subscribe((order) => {
        //order.trangthai = "10";
        this.orderService.updateOrder(order).subscribe(
          (data) => {
            if (data.status === 200) {
              this.toastrService.show("Thành công!", "Thanh toán", {
                position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
                status: "success",
              });
            } else {
              this.toastrService.show("Thất bại!", "Thanh toán", {
                position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
                status: "danger",
              });
            }
          },
          // tslint:disable-next-line: no-console
          (error) => console.log(error)
        );
      });
    }
  }

  onChonNhom(maNganh: string, maNhom: string) {
    this.store.dispatch(
      this.actions.getAllProducts({ nganhhang: maNganh, nhomhang: maNhom })
    );
  }
  onChonNganh() {}
  onInputChange(value) {
    this.store.dispatch(this.actions.getProductsByQuery({ query: value }));
  }
  onTatCa() {
    this.store.dispatch(
      this.actions.getAllProducts({ nganhhang: null, nhomhang: null })
    );
  }
  onClickIn() {
    this.router.navigate(["/cashier/in-hoa-don"]);
  }
  loadCacLoaiThongTin(d) {
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
  }
}
