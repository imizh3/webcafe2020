import { Chuongtrinhkm } from "./../data/chuongtrinhkm";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { AppState } from "./../../@store/app-state";
import { Store } from "@ngrx/store";
import { TinhTien } from "./../utils/tinhTien";
import { ProductService } from "./product.service";
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Giaodich, giaodichFields } from "../data/giaodich";
import { Giaodichct, giaodichctFields } from "../data/giaodichct";
import { DataService } from "./data.service";
import { CartActions } from "./../../@store/actions/cart-actions";
import { Router } from "@angular/router";
import { Khuyenmaict } from "../data/khuyenmaict";
import { Product } from "../data/product";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { LIB } from "../utils";
import { Khachhang } from "../data/khachhang";
@Injectable({
  providedIn: "root",
})
export class CartService {
  orderR: any;
  user: any;
  ctKhuyenmai: Chuongtrinhkm;
  constructor(
    private http: HttpClient,
    private lib: LIB,
    private productService: ProductService,
    private dataService: DataService,
    private stord: Store<AppState>,
    private cartAction: CartActions,
    private authService: NbAuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {
    let order1 = JSON.parse(localStorage.getItem("order"));
    if (order1 === null) {
      this.stord.dispatch(
        this.cartAction.addItemSuccess({
          order: {},
        })
      );
    } else {
      this.stord.dispatch(
        this.cartAction.addItemSuccess({
          order: order1,
        })
      );
    }

    this.loadCtKhuyenMai();
  }

  loadCtKhuyenMai() {
    this.http
      .get<Chuongtrinhkm>(
        this.lib.baseUrl + "api/Order/khuyenmai",
        this.lib.httpOption()
      )
      .subscribe((d) => (this.ctKhuyenmai = d));
  }
  addItemToCart(_item: any) {
    // tslint:disable-next-line: no-console
    //console.log(this.ctKhuyenmai);
    let maBan = localStorage.getItem("maBan");
    let giaodich = new Giaodich();
    const giaodichct = new Giaodichct();
    this.loadThongTinHangHoa(giaodichct, _item, "masieuthi");
    this.LoadThongTinTaiKhoan(giaodichct);
    this.tinhToanTienHang(giaodichct, "soluong", giaodichct.soluong);
    giaodich = JSON.parse(localStorage.getItem("order" + maBan));

    if (giaodich == null) {
      giaodich = new Giaodich();
    }
    if (giaodich.giaodichct && giaodich.giaodichct.length > 0) {
      let isNew = true;
      // tslint:disable-next-line: comment-format
      //update so luong
      giaodich.giaodichct.forEach((element) => {
        if (
          element.masieuthi === giaodichct.masieuthi &&
          !element.iskhuyenmai
        ) {
          this.loadThongTinHangHoa(element, _item, "soluong");
          this.tinhToanTienHang(element, "soluong", _item.soluong);
          isNew = false;
        }
      });

      if (isNew) {
        giaodich.giaodichct.push(giaodichct);
      }
    } else {
      giaodich.giaodichct = [];
      giaodich.giaodichct.push(giaodichct);
    }

    // this.KMMOTSOSANPHAM(giaodich);

    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        giaodich.tendangnhap = this.user.unique_name;
        giaodich.tendangnhapsua = this.user.unique_name;
        giaodich.manhanviendathang = this.user.Manhanvien;
        giaodich.madonvi = this.user.Madonvi;
      } else {
        this.router.navigate(["/auth/login"]);
      }
    });
    giaodich.maquay = maBan;

    this.toastrService.show("Thành công!", "Thêm sản phẩm!", {
      limit: 2,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status: "success",
    });

    localStorage.setItem("order" + maBan, JSON.stringify(giaodich));

    return [giaodich];
  }

  duyetKM() {
    let maBan = localStorage.getItem("maBan");
    let giaodich = new Giaodich();
    giaodich = JSON.parse(localStorage.getItem("order" + maBan));
    if (giaodich == null) {
      giaodich = new Giaodich();
    }
    this.http
      .post(
        this.lib.baseUrl + "api/Order/Duyetkm",
        giaodich,
        this.lib.httpOption()
      )
      .subscribe((d: Giaodich) => {
        localStorage.setItem("order" + maBan, JSON.stringify(d));
        this.stord.dispatch(this.cartAction.addItemSuccess({ order: d }));
      });
  }

  updateItem(_item: Giaodichct, fields: string, value: any) {
    let maBan = localStorage.getItem("maBan");
    let giaodich = new Giaodich();
    giaodich = JSON.parse(localStorage.getItem("order" + maBan));
    if (giaodich == null) {
      giaodich = new Giaodich();
    }
    if (giaodich.giaodichct && giaodich.giaodichct.length > 0) {
      giaodich.giaodichct.forEach((element) => {
        if (
          element.masieuthi === _item.masieuthi &&
          element.iskhuyenmai === _item.iskhuyenmai
        ) {
          this.tinhToanTienHang(element, fields, value);
        }
      });
    } else {
      giaodich.giaodichct = [];
      giaodich.giaodichct.push(_item);
    }

    // this.KMMOTSOSANPHAM(giaodich);

    localStorage.setItem("order", JSON.stringify(giaodich));

    return [giaodich];
  }

  updateCart(fields: string, value: any) {
    let maBan = localStorage.getItem("maBan");
    let giaodich = new Giaodich();
    giaodich = JSON.parse(localStorage.getItem("order" + maBan));
    if (giaodich == null) {
      giaodich = new Giaodich();
    }

    if (fields === giaodichFields.khachhang) {
      giaodich.diachigiaohang = value.diachigiaohang;
      giaodich.makhachhang = value?.tenkhachhang.makhachhang;
      giaodich.khachhang = {
        ...value?.tenkhachhang,
        dienthoai: value.dienthoai.toString(),
      };
      giaodich.ghichu = value?.ghichu;
    } //giao dịch khi khách hàng null
    else {
      giaodich.diachigiaohang = value.diachigiaohang;
      giaodich.makhachhang = value.makhachhang;
      giaodich.khachhang = { ...value, dienthoai: value.dienthoai.toString() };
      giaodich.ghichu = "";
    }
    giaodich.trangthai = 1;
    giaodich.ngayhoadon = new Date(Date.now());
    giaodich.ngayphatsinh = new Date(Date.now());
    giaodich.ngaythanhtoan = new Date(Date.now());

    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        giaodich.tendangnhap = this.user.Tendangnhap;
        giaodich.tendangnhapsua = this.user.Tendangnhap;
        giaodich.manhanviendathang = this.user.Manhanvien;
        giaodich.madonvi = this.user.Madonvi;
      } else {
        this.router.navigate(["/auth/login"]);
      }
    });
    localStorage.setItem("order" + maBan, JSON.stringify(giaodich));
    return [giaodich];
  }

  getOrder() {
    let maBan = localStorage.getItem("maBan");
    this.orderR = [JSON.parse(localStorage.getItem("order" + maBan))];
    return this.orderR;
  }

  removeCartItem(gdChiTiet: Giaodichct) {
    let maBan = localStorage.getItem("maBan");
    let giaodich = new Giaodich();
    giaodich = JSON.parse(localStorage.getItem("order" + maBan));
    if (giaodich == null) {
      giaodich = new Giaodich();
    }
    if (giaodich.giaodichct && giaodich.giaodichct.length > 0) {
      giaodich.giaodichct = giaodich.giaodichct.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(gdChiTiet)
      );
    }
    // if (!gdChiTiet.iskhuyenmai)
    //   this.KMMOTSOSANPHAM(giaodich);
    localStorage.setItem("order" + maBan, JSON.stringify(giaodich));
    this.toastrService.show("Thành công!", "xoá sản phẩm!", {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status: "success",
    });
    return [giaodich];
  }

  createOrder() {
    let giaodich = new Giaodich();
    let maBan = localStorage.getItem("maBan");
    giaodich = JSON.parse(localStorage.getItem("order" + maBan));
    if (giaodich == null) {
      giaodich = new Giaodich();
    }
    return this.http.post(
      this.lib.baseUrl + "api/Order/Create",
      giaodich,
      this.lib.httpOption()
    );
  }

  loadThongTinHangHoa(gdChitiet: Giaodichct, item: any, fields: any) {
    if (fields === "masieuthi") {
      gdChitiet.masieuthi = item.masieuthi;
      gdChitiet.mahangcuancc = item.mahangcuancc;
      gdChitiet.soluong = item.soluong;
      gdChitiet.tendaydu = item.tendaydu;
      gdChitiet.tenviettat = item.tenviettat;
      gdChitiet.dongiacovat = item.giabanbuoncovat;
      gdChitiet.dongiachuavat = item.giabanbuonchuavat;
      gdChitiet.dongiachuavatnt = item.giabanbuonchuavat;
      gdChitiet.dongiacovatnt = item.giabanbuoncovat;
      gdChitiet.quycach = item.quycach;
      gdChitiet.mavat = item.mavatban;
      gdChitiet.manganh = item.manganh;
      gdChitiet.manhomhang = item.manhomhang;
      gdChitiet.tygia = 1;
      gdChitiet.mangoaite = "VND";
      // tslint:disable-next-line: radix
      gdChitiet.giathungchuavat =
        parseInt(item.quycach) * gdChitiet.dongiachuavat;
    } else if (fields === "soluong") {
      gdChitiet.soluong = item.soluong;
    }
  }

  tinhToanTienHang(gdChitiet: Giaodichct, fields: string, value: any) {
    if (fields === "soluong") {
      gdChitiet.soluong = parseFloat(value);
      gdChitiet.sothung = TinhTien.ConverThungByLe(
        gdChitiet.soluong,
        gdChitiet.quycach
      );
    }
    if (fields === "sothung") {
      gdChitiet.sothung = value;
      gdChitiet.soluong = TinhTien.ConverLeByThung(value, gdChitiet.quycach);
    }
    if (fields === "tyleck") {
      gdChitiet.tyleck = value ? parseFloat(value) : 0;
    }

    if (fields === "tienck") {
      gdChitiet.tienck = value ? parseFloat(value) : 0;
      gdChitiet.tienhang = TinhTien.TienHangByDonGia(
        gdChitiet.dongiachuavat,
        gdChitiet.soluong
      );
      gdChitiet.tyleck = (gdChitiet.tienck / gdChitiet.tienhang) * 100;
    }
    if (fields !== "tienck")
      gdChitiet.tienck = TinhTien.TienChietKhauByGiaKhongVat(
        gdChitiet.dongiachuavat,
        gdChitiet.tyleck,
        gdChitiet.soluong
      );

    gdChitiet.tienhang = TinhTien.TienHangByDonGia(
      gdChitiet.dongiachuavat,
      gdChitiet.soluong
    );
    // tslint:disable-next-line: max-line-length
    gdChitiet.tienvat = TinhTien.TienVatByCongThuc(
      gdChitiet.tienhang,
      gdChitiet.tienck,
      this.dataService.dmVat,
      gdChitiet.mavat,
      0
    );
    gdChitiet.doanhthu = TinhTien.DoanhThuByCongThuc(
      gdChitiet.tienhang,
      gdChitiet.tienck,
      gdChitiet.tienvat,
      gdChitiet.tiencktrendon,
      this.dataService.dmPtnx,
      this.dataService.thamsohethong.maptnx
    );
    // tslint:disable-next-line: max-line-length
    gdChitiet.thanhtien = TinhTien.ThanhTienByCongThuc(
      gdChitiet.tienhang,
      gdChitiet.tienck,
      gdChitiet.tienvat,
      gdChitiet.tiencktrendon,
      this.dataService.dmPtnx,
      this.dataService.thamsohethong.maptnx
    );
  }

  LoadThongTinTaiKhoan(gdChitiet: Giaodichct) {
    const rPtnx = this.dataService.dmPtnx.find(
      (d) => d.maptnx === this.dataService.thamsohethong.maptnx
    );
    if (rPtnx) {
      gdChitiet.matkco = rPtnx.matkcodf;
      gdChitiet.matkno = rPtnx.matknodf;
      gdChitiet.matkchietkhauco = rPtnx.matkchietkhaucodf;
      gdChitiet.matkchietkhauno = rPtnx.matkchietkhaunodf;
      gdChitiet.matkchiphikhacco = rPtnx.matkchiphikhaccodf;
      gdChitiet.matkchiphikhacno = rPtnx.matkchiphikhacnodf;
      gdChitiet.matkthuegtgtco = rPtnx.matkthuegtgtcodf;
      gdChitiet.matkthuegtgtno = rPtnx.matkthuegtgtnodf;
      gdChitiet.matkkhuyenmaico = rPtnx.matkkhuyenmaicodf;
      gdChitiet.matkkhuyenmaino = rPtnx.matkkhuyenmainodf;
      gdChitiet.matkgiavon = rPtnx.matkgiavondf;
      gdChitiet.matkvtu = rPtnx.matkvtudf;
    }
  }

  LoadThongtinTaikhoanKhuyenMai(gdChitiet: Giaodichct) {
    const rPtnx = this.dataService.dmPtnx.find(
      (d) => d.maptnx === this.dataService.thamsohethong.maptnx
    );
    if (rPtnx) {
      gdChitiet.matkco = rPtnx.matkcodf;
      gdChitiet.matkno = rPtnx.matknodf;
      gdChitiet.matkchietkhauco = rPtnx.matkchietkhaucodf;
      gdChitiet.matkchietkhauno = rPtnx.matkchietkhaunodf;
      gdChitiet.matkchiphikhacco = rPtnx.matkchiphikhaccodf;
      gdChitiet.matkchiphikhacno = rPtnx.matkchiphikhacnodf;
      gdChitiet.matkthuegtgtco = rPtnx.matkthuegtgtcodf;
      gdChitiet.matkthuegtgtno = rPtnx.matkthuegtgtnodf;
      gdChitiet.matkkhuyenmaico = rPtnx.matkkhuyenmaicodf;
      gdChitiet.matkkhuyenmaino = rPtnx.matkkhuyenmainodf;
      gdChitiet.matkgiavon = rPtnx.matkgiavondf;
      gdChitiet.matkvtu = rPtnx.matkvtudf;
    }
  }

  TinhtoanTienhangKhuyenmaiNhomMaxMin(
    datarview: Giaodichct,
    ColumnName: string,
    ValueColumn: any
  ) {
    if (ColumnName === giaodichctFields.dongiachuavat) {
      datarview.dongiachuavat = ValueColumn;
      datarview.giathungchuavat = datarview.dongiachuavat * datarview.quycach;
    } else if (ColumnName === giaodichctFields.giathungchuavat) {
      datarview.giathungchuavat = ValueColumn;
      datarview.dongiachuavat = datarview.giathungchuavat / datarview.quycach;
    } else if (ColumnName === giaodichctFields.tienhang) {
      if (datarview.soluong > 0) {
        datarview.dongiachuavat = datarview.tienhang / datarview.soluong;
        datarview.giathungchuavat = datarview.dongiachuavat * datarview.quycach;
      }
    } else if (ColumnName === giaodichctFields.tyleck) {
      datarview.tyleck = ValueColumn;
    } else if (ColumnName === giaodichctFields.tienck) {
      datarview.tyleck = (datarview.tienck / datarview.tienhang) * 100;
    }
    datarview.tienck = TinhTien.TienChietKhauByGiaKhongVat(
      datarview.dongiachuavat,
      datarview.tyleck,
      datarview.soluong
    );

    datarview.tienhang = TinhTien.TienHangByDonGia(
      datarview.dongiachuavat,
      datarview.soluong
    );
    datarview.tienvat = TinhTien.TienVatByCongThuc(
      datarview.tienhang,
      datarview.tienck,
      this.dataService.dmVat,
      datarview.mavat,
      0
    );
    // tslint:disable-next-line: max-line-length
    datarview.doanhthu = TinhTien.DoanhThuByCongThuc(
      datarview.tienhang,
      datarview.tienck,
      datarview.tienvat,
      0,
      this.dataService.dmPtnx,
      this.dataService.thamsohethong.maptnx
    );
    datarview.thanhtien = TinhTien.ThanhTienByCongThuc(
      datarview.tienhang,
      datarview.tienck,
      datarview.tienvat,
      0,
      this.dataService.dmPtnx,
      this.dataService.thamsohethong.maptnx
    );
  }

  KMMOTSOSANPHAM(giaodich: Giaodich) {
    try {
      const kmMotsosanpham = this.ctKhuyenmai.kmMotsosanpham;
      giaodich.giaodichct = giaodich.giaodichct.filter((ct) => !ct.iskhuyenmai);
      if (kmMotsosanpham != null && kmMotsosanpham.length > 0) {
        let mactkmdadung = "";
        kmMotsosanpham.forEach((item) => {
          const maSieuthiban = item.masieuthiban;
          let dtGiaodichkm: Giaodichct[] = [];
          try {
            dtGiaodichkm = giaodich.giaodichct.filter(
              (ct) => maSieuthiban.includes(ct.masieuthi) && !ct.iskhuyenmai
            );
          } catch {
            dtGiaodichkm = null;
          }
          if (dtGiaodichkm != null && dtGiaodichkm.length > 0) {
            // tslint:disable-next-line: max-line-length
            const listRowKhuyenmaidung: Khuyenmaict[] = kmMotsosanpham
              .filter((km) => {
                if (
                  km.masieuthiban === maSieuthiban &&
                  !mactkmdadung.includes(km.machuongtrinh)
                )
                  return km;
              })
              .sort((a, b) => {
                if (
                  b.giatrikmmin > a.giatrikmmin ||
                  b.soluongban > a.soluongban
                )
                  return 1;
                if (
                  b.giatrikmmin < a.giatrikmmin ||
                  b.soluongban < a.soluongban
                )
                  return -1;
                return 0;
              });
            if (
              listRowKhuyenmaidung != null &&
              listRowKhuyenmaidung.length > 0
            ) {
              let soluongbantoithieudau = 0,
                giatribantoithieudau = 0;
              listRowKhuyenmaidung.forEach((rowkm) => {
                const maSieuthibanhientai = rowkm.masieuthiban;
                const mactkm = rowkm.machuongtrinh;
                let tyleck = 0,
                  soluongkm = 0;
                tyleck = rowkm.tilechietkhau;
                soluongkm = rowkm.soluongkm;
                // Khuyến mại tiền
                if (tyleck !== 0) {
                  let soluongbantoithieu = 0,
                    giatribantoithieu = 0;
                  soluongbantoithieu = rowkm.soluongban;
                  giatribantoithieu = rowkm.giatrikmmin;
                  if (soluongbantoithieu !== 0) {
                    let soluongthucban = 0;
                    // tslint:disable-next-line: max-line-length
                    soluongthucban = dtGiaodichkm.reduce(
                      (sum, value, idex, arr) => {
                        sum.soluong = sum.soluong + value.soluong;
                        return sum;
                      }
                    ).soluong;
                    if (
                      soluongthucban >= soluongbantoithieu &&
                      soluongbantoithieu > soluongbantoithieudau
                    ) {
                      dtGiaodichkm.forEach((update) => {
                        giaodich.giaodichct.map((row) => {
                          if (row.masieuthi === update.masieuthi) {
                            const macthientai = row.machuongtrinhkm;
                            if (macthientai || macthientai.includes(mactkm)) {
                              row.tyleck = tyleck;
                              row.machuongtrinhkm = mactkm;
                              this.TinhtoanTienhangKhuyenmaiNhomMaxMin(
                                row,
                                giaodichctFields.tyleck,
                                row.tyleck
                              );
                            }
                          }
                          return row;
                        });
                      });
                      soluongbantoithieudau = soluongbantoithieu;
                    } else {
                      if (soluongbantoithieu > soluongbantoithieudau) {
                        dtGiaodichkm.forEach((update) => {
                          giaodich.giaodichct.map((row) => {
                            if (row.masieuthi === update.masieuthi) {
                              const macthientai = row.machuongtrinhkm;
                              if (!macthientai || macthientai === mactkm) {
                                row.tyleck = 0;
                                row.machuongtrinhkm = "";
                                this.TinhtoanTienhangKhuyenmaiNhomMaxMin(
                                  row,
                                  giaodichctFields.tyleck,
                                  0
                                );
                              }
                            }
                            return row;
                          });
                        });
                      }
                    }
                  } else if (giatribantoithieu !== 0) {
                    let tongTienthucban = 0;
                    // tslint:disable-next-line: max-line-length
                    tongTienthucban = dtGiaodichkm.reduce(
                      (sum, value, index, arr) => {
                        sum.tienhang = sum.tienhang + value.tienhang;
                        return sum;
                      }
                    ).soluong;
                    if (
                      tongTienthucban >= giatribantoithieu &&
                      giatribantoithieu > giatribantoithieudau
                    ) {
                      dtGiaodichkm.forEach((update) => {
                        giaodich.giaodichct.map((row) => {
                          if (row.masieuthi === update.masieuthi) {
                            const macthientai = row.machuongtrinhkm;
                            if (!macthientai || macthientai !== mactkm) {
                              row.tyleck = tyleck;
                              row.machuongtrinhkm = mactkm;
                              this.TinhtoanTienhangKhuyenmaiNhomMaxMin(
                                row,
                                giaodichctFields.tyleck,
                                tyleck
                              );
                            }
                          }
                        });
                      });
                      giatribantoithieudau = giatribantoithieu;
                    } else {
                      if (giatribantoithieu > giatribantoithieudau) {
                        dtGiaodichkm.forEach((update) => {
                          giaodich.giaodichct.map((row) => {
                            if (row.masieuthi === update.masieuthi) {
                              const macthientai = row.machuongtrinhkm;
                              if (!macthientai || macthientai === mactkm) {
                                row.tyleck = 0;
                                row.machuongtrinhkm = "";
                                this.TinhtoanTienhangKhuyenmaiNhomMaxMin(
                                  row,
                                  giaodichctFields.tyleck,
                                  0
                                );
                              }
                            }
                          });
                        });
                      }
                    }
                  }
                  // tslint:disable-next-line: comment-format
                  //Khuyến mại tặng hàng
                } else if (soluongkm !== 0) {
                  let soluongbantoithieu = 0,
                    giatribantoithieu = 0;
                  soluongbantoithieu = rowkm.soluongban;
                  giatribantoithieu = rowkm.giatrikmmin;
                  const masieuthikm = rowkm.masieuthikm;
                  const makhokm = rowkm.makhohangkm;
                  if (soluongbantoithieu !== 0) {
                    let soluongthucban = 0;
                    // tslint:disable-next-line: max-line-length
                    soluongthucban = dtGiaodichkm.reduce(
                      (sum, value, index, arr) => {
                        sum.soluong = sum.soluong + value.soluong;
                        return sum;
                      }
                    ).soluong;
                    if (soluongthucban >= soluongbantoithieu) {
                      const rowCheck = giaodich.giaodichct.filter((d) => {
                        return (
                          d.masieuthi === masieuthikm &&
                          d.makhohang === makhokm &&
                          d.iskhuyenmai === 1
                        );
                      });
                      if (rowCheck == null || rowCheck.length === 0) {
                        const solan = soluongthucban / soluongbantoithieu;
                        soluongkm = soluongkm * solan;
                        if (soluongkm === 0) return;
                        const rowadd = new Giaodichct();
                        this.LoadThongtinHanghoaKhuyenMai(
                          rowadd,
                          giaodichctFields.masieuthi,
                          masieuthikm,
                          makhokm
                        );
                        this.TinhtoanTienhangKhuyenMai(
                          rowadd,
                          giaodichctFields.soluong,
                          soluongkm
                        );
                        this.TinhtoanTienhangKhuyenMai(
                          rowadd,
                          giaodichctFields.dongiachuavat,
                          0
                        );
                        this.LoadThongtinTaikhoanKhuyenMai(rowadd);
                        rowadd.machuongtrinhkm = rowkm.machuongtrinh;
                        rowadd.iskhuyenmai = 1;
                        giaodich.giaodichct.push(rowadd);
                      } else {
                        rowCheck.forEach((rowcheckkm) => {
                          const mact = rowcheckkm.machuongtrinhkm;
                          let soluongkmcu = 0;
                          soluongkmcu = rowcheckkm.soluong;
                          const rowkmcu = kmMotsosanpham.find(
                            (d) => d.machuongtrinh === mact
                          );
                          if (rowkmcu != null) {
                            const masieuthibankmcu = rowkmcu.masieuthiban;
                            if (masieuthibankmcu === maSieuthibanhientai) {
                              let slbantoithieuctcu = 0;
                              slbantoithieuctcu = rowkmcu.soluongban;
                              const slbandu =
                                soluongthucban % slbantoithieuctcu;
                              const mactmoi = rowkm.machuongtrinh;
                              if (slbandu > 0) {
                                if (slbandu >= soluongbantoithieu) {
                                  // tslint:disable-next-line: radix
                                  const solan = parseInt(
                                    (slbandu / soluongbantoithieu).toString()
                                  );
                                  soluongkm = soluongkm * solan;
                                  if (soluongkm === 0) return;
                                  if (mact === mactmoi) {
                                    soluongkm = soluongkm + soluongkmcu;
                                    this.TinhtoanTienhangKhuyenMai(
                                      rowcheckkm,
                                      giaodichctFields.soluong,
                                      soluongkm
                                    );
                                  } else {
                                    const rowadd = new Giaodichct();
                                    this.LoadThongtinHanghoaKhuyenMai(
                                      rowadd,
                                      giaodichctFields.masieuthi,
                                      masieuthikm,
                                      makhokm
                                    );
                                    this.TinhtoanTienhangKhuyenMai(
                                      rowadd,
                                      giaodichctFields.soluong,
                                      soluongkm
                                    );
                                    this.TinhtoanTienhangKhuyenMai(
                                      rowadd,
                                      giaodichctFields.dongiachuavat,
                                      0
                                    );
                                    this.LoadThongtinTaikhoanKhuyenMai(rowadd);
                                    // tslint:disable-next-line: comment-format
                                    //Gán cột machuongtrinhkm = mã hàng bán để kiểm tra xem mã hàng km này là của mã hàng bán nào.
                                    // tslint:disable-next-line: comment-format
                                    //Trong trường hợp mã hàng km tặng kèm cho nhiều mã hàng bán
                                    rowadd.machuongtrinhkm =
                                      rowkm.machuongtrinh;
                                    rowadd.iskhuyenmai = 1;
                                    giaodich.giaodichct.push(rowadd);
                                  }
                                }
                              }
                            } else {
                              // tslint:disable-next-line: radix
                              const solan = parseInt(
                                (soluongthucban / soluongbantoithieu).toString()
                              );
                              soluongkm = soluongkm * solan;
                              if (soluongkm === 0) return;
                              const rowadd = new Giaodichct();

                              this.LoadThongtinHanghoaKhuyenMai(
                                rowadd,
                                giaodichctFields.masieuthi,
                                masieuthikm,
                                makhokm
                              );
                              this.TinhtoanTienhangKhuyenMai(
                                rowadd,
                                giaodichctFields.soluong,
                                soluongkm
                              );
                              this.TinhtoanTienhangKhuyenMai(
                                rowadd,
                                giaodichctFields.dongiachuavat,
                                0
                              );
                              this.LoadThongtinTaikhoanKhuyenMai(rowadd);
                              // tslint:disable-next-line: comment-format
                              //Gán cột machuongtrinhkm = mã hàng bán để kiểm tra xem mã hàng km này là của mã hàng bán nào.
                              // tslint:disable-next-line: comment-format
                              //Trong trường hợp mã hàng km tặng kèm cho nhiều mã hàng bán
                              rowadd.machuongtrinhkm = rowkm.machuongtrinh;
                              rowadd.iskhuyenmai = 1;
                              giaodich.giaodichct.push(rowadd);
                            }
                          }
                        });
                      }
                    } else {
                      // tslint:disable-next-line: max-line-length
                      const rowCheck = giaodich.giaodichct.filter(
                        (d) =>
                          d.masieuthi === masieuthikm &&
                          d.makhohang === makhokm &&
                          d.iskhuyenmai === 1
                      );

                      if (rowCheck != null) {
                        rowCheck.forEach((rowcheckkm) => {
                          const mact = rowcheckkm.machuongtrinhkm;
                          const rowkmcu = kmMotsosanpham.find(
                            (d) => d.machuongtrinh === mact
                          );
                          if (rowkmcu != null) {
                            const masieuthibankmcu = rowkmcu.masieuthiban;
                            if (masieuthibankmcu === maSieuthibanhientai) {
                              giaodich.giaodichct = giaodich.giaodichct.slice(
                                giaodich.giaodichct.indexOf(rowcheckkm),
                                1
                              );
                            }
                          }
                        });
                      }
                    }
                  } else if (giatribantoithieu !== 0) {
                    let tongTienthucban = 0;
                    tongTienthucban = dtGiaodichkm.reduce(
                      (sum, value, index, arr) => {
                        sum.soluong = sum.soluong + value.soluong;
                        return sum;
                      }
                    ).soluong;
                    if (tongTienthucban >= giatribantoithieu) {
                      // tslint:disable-next-line: max-line-length
                      const rowCheck = giaodich.giaodichct.filter(
                        (d) =>
                          d.masieuthi === masieuthikm &&
                          d.makhohang === makhokm &&
                          d.iskhuyenmai === 1
                      );
                      if (rowCheck == null || rowCheck.length === 0) {
                        if (soluongkm === 0) return;
                        const rowadd = new Giaodichct();
                        this.LoadThongtinHanghoaKhuyenMai(
                          rowadd,
                          giaodichctFields.masieuthi,
                          masieuthikm,
                          makhokm
                        );
                        this.TinhtoanTienhangKhuyenMai(
                          rowadd,
                          giaodichctFields.soluong,
                          soluongkm
                        );
                        this.TinhtoanTienhangKhuyenMai(
                          rowadd,
                          giaodichctFields.dongiachuavat,
                          0
                        );
                        this.LoadThongtinTaikhoanKhuyenMai(rowadd);
                        // tslint:disable-next-line: comment-format
                        //Gán cột machuongtrinhkm = mã hàng bán để kiểm tra xem mã hàng km này là của mã hàng bán nào.
                        // tslint:disable-next-line: comment-format
                        //Trong trường hợp mã hàng km tặng kèm cho nhiều mã hàng bán
                        rowadd.machuongtrinhkm = rowkm.machuongtrinh;
                        rowadd.iskhuyenmai = 1;
                        giaodich.giaodichct.push(rowadd);
                      } else {
                        rowCheck.forEach((rowcheckkm) => {
                          const mact = rowcheckkm.machuongtrinhkm;
                          const rowkmcu = kmMotsosanpham.find(
                            (d) => d.machuongtrinh === mact
                          );
                          if (rowkmcu != null) {
                            const masieuthibankmcu = rowkmcu.masieuthiban;
                            if (masieuthibankmcu !== maSieuthibanhientai) {
                              if (soluongkm === 0) return;
                              const rowadd = new Giaodichct();
                              this.LoadThongtinHanghoaKhuyenMai(
                                rowadd,
                                giaodichctFields.masieuthi,
                                masieuthikm,
                                makhokm
                              );
                              this.TinhtoanTienhangKhuyenMai(
                                rowadd,
                                giaodichctFields.soluong,
                                soluongkm
                              );
                              this.TinhtoanTienhangKhuyenMai(
                                rowadd,
                                giaodichctFields.dongiachuavat,
                                0
                              );
                              this.LoadThongtinTaikhoanKhuyenMai(rowadd);
                              // tslint:disable-next-line: comment-format
                              //Gán cột machuongtrinhkm = mã hàng bán để kiểm tra xem mã hàng km này là của mã hàng bán nào.
                              // tslint:disable-next-line: comment-format
                              //Trong trường hợp mã hàng km tặng kèm cho nhiều mã hàng bán
                              rowadd.machuongtrinhkm = rowkm.machuongtrinh;
                              rowadd.iskhuyenmai = 1;
                              giaodich.giaodichct.push(rowadd);
                            }
                          }
                        });
                      }
                    } else {
                      // tslint:disable-next-line: max-line-length
                      const rowCheck = giaodich.giaodichct.filter(
                        (d) =>
                          d.masieuthi === masieuthikm &&
                          d.makhohang === makhokm &&
                          d.iskhuyenmai === 1
                      );
                      if (rowCheck != null) {
                        rowCheck.forEach((rowcheckkm) => {
                          const mact = rowcheckkm.machuongtrinhkm;
                          const rowkmcu = kmMotsosanpham.find(
                            (d) => d.machuongtrinh === mact
                          );
                          if (rowkmcu != null) {
                            const masieuthibankmcu = rowkmcu.masieuthiban;
                            if (masieuthibankmcu === maSieuthibanhientai) {
                              giaodich.giaodichct = giaodich.giaodichct.slice(
                                giaodich.giaodichct.indexOf(rowcheckkm),
                                1
                              );
                            }
                          }
                        });
                      }
                    }
                  }
                }
                if (!mactkmdadung || mactkmdadung.length === 0) {
                  mactkmdadung = rowkm.machuongtrinh;
                } else {
                  mactkmdadung = mactkmdadung + "," + rowkm.machuongtrinh;
                }
              });
            }
          }
        });
      }
    } catch {}
  }

  TinhtoanTienhangKhuyenMai(
    datarview: Giaodichct,
    ColumnName: string,
    ValueColumn: any
  ) {
    // tslint:disable-next-line: max-line-length
    let Soluong = 0,
      Quycach = 1,
      Dongiachuavat = 0,
      Dongiacovat = 0,
      Giathungchuavat = 0,
      Tyleck = 0,
      Tienck = 0,
      Tienvat = 0,
      Tienhang = 0,
      Thanhtien = 0,
      Doanhthu = 0;
    Soluong = datarview.soluong;
    Quycach = datarview.quycach;
    Dongiachuavat = datarview.dongiachuavat;
    Tyleck = datarview.tyleck;
    Tienck = datarview.tienck;
    Tienvat = datarview.tienvat;
    Tienhang = datarview.tienhang;
    Thanhtien = datarview.thanhtien;
    Giathungchuavat = datarview.giathungchuavat;

    if (ColumnName === giaodichctFields.soluong) {
      const rHanghoa = this.productService.products.find(
        (p) => p.masieuthi === datarview.masieuthi
      );
      if (rHanghoa) {
        Soluong = ValueColumn;
        Quycach = datarview.quycach;
        datarview.sothung = TinhTien.ConverThungByLe(Soluong, Quycach);
        datarview.soluong = Soluong;
      }
    } else if (ColumnName === giaodichctFields.dongiachuavat) {
      Dongiachuavat = ValueColumn;
      Giathungchuavat = Dongiachuavat * Quycach;
      datarview.giathungchuavat = Giathungchuavat;
      datarview.dongiachuavat = Dongiachuavat;
      datarview.dongiacovat = Dongiachuavat;
    }
    Tienhang = TinhTien.TienHangByDonGia(Dongiachuavat, Soluong);
    Tienvat = TinhTien.TienVatByCongThuc(
      Tienhang,
      Tienck,
      this.dataService.dmVat,
      datarview.mavat,
      0
    );
    Doanhthu = TinhTien.DoanhThuByCongThuc(
      Tienhang,
      Tienck,
      Tienvat,
      0,
      this.dataService.dmPtnx,
      this.dataService.thamsohethong.maptnx
    );
    Thanhtien = TinhTien.ThanhTienByCongThuc(
      Tienhang,
      Tienck,
      Tienvat,
      0,
      this.dataService.dmPtnx,
      this.dataService.thamsohethong.maptnx
    );
    datarview.tienhang = Tienhang;
    datarview.tienck = Tienck;
    datarview.tienvat = Tienvat;
    datarview.doanhthu = Doanhthu;
    datarview.thanhtien = Thanhtien;
  }

  LoadThongtinHanghoaKhuyenMai(
    datarview: Giaodichct,
    ColumnName: string,
    ValueColumn: any,
    makho: string
  ) {
    let rHanghoa: Product;
    let giabanbuonchuavat = 0,
      Quycach = 1;
    let tileck = 0;
    if (ColumnName === giaodichctFields.masieuthi) {
      rHanghoa = this.productService.products.find(
        (p) => p.masieuthi === ValueColumn
      );
      if (rHanghoa) {
        giabanbuonchuavat = rHanghoa.giabanbuonchuavat;
        datarview.masieuthi = ValueColumn;
        datarview.mahangcuancc = rHanghoa.mahangcuancc;
        datarview.manganh = rHanghoa.manganh;
        datarview.manhomhang = rHanghoa.manhomhang;
        datarview.tendaydu = rHanghoa.tendaydu;
        datarview.dongiachuavat = giabanbuonchuavat;
        datarview.dongiacovat = giabanbuonchuavat;
        datarview.quycach = rHanghoa.quycach;
        datarview.mavat = rHanghoa.mavatmua;
        datarview.makhohang = makho;
        datarview.soluong = 0;
        datarview.tylecktrendon = 0;
        datarview.tiencktrendon = 0;
        datarview.tyleck = tileck;
        datarview.mabohang = "-";
      }
    }
    if (rHanghoa) {
      Quycach = rHanghoa.quycach;
      datarview.giathungchuavat = giabanbuonchuavat * Quycach;
      // decimal giavon = 0;
      // decimal toncuoiky = 0;
      // try {
      // tslint:disable-next-line: max-line-length
      //   DataRow rowGiavon = DB.XNT_Gettonkhomathang(PublicValue.DataBaseXnt, PublicValue.XNT_TABLENAME(PublicValue.ngayPhatSinh), makho, PublicValue.maDonVi, rHanghoa[MathangFields.Masieuthi).Rows[0];
      //   if (rowGiavon != null) {
      //     decimal.TryParse(rowGiavon[PublicValue.Giavon].ToString(), out giavon);
      //     decimal.TryParse(rowGiavon[PublicValue.Toncuoikysl].ToString(), out toncuoiky);
      //   }
      // }
      // catch { }
      // datarview.giavon = rHanghoa.;
    }
  }
}
