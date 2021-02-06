import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { Store } from "@ngrx/store";
import { AppState } from "../../../@store/app-state";
import { CartActions } from "../../../@store/actions/cart-actions";
import { Product } from "../../../@core/data/product";
import { Observable } from "rxjs";
import { Giaodichct } from "../../../@core/data/giaodichct";
import { getCartCt } from "../../../@store/selectors/cart-selectors";
import { LIB } from "../../../@core/utils";
import { DataService } from "../../../@core/mock/data.service";

@Component({
  selector: "ngx-products-item",
  templateUrl: "./products-item.component.html",
  styleUrls: ["./products-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsItemComponent implements OnInit {
  @Input() product: Product;
  @Input() dienGiaiKhuyenMai: string;
  soluong: number;
  baseUrl: string;
  giaodichcts$: Observable<Giaodichct[]>;
  giaodichcts: Giaodichct[];
  newgiaodichct: any;
  imageUrls: any[];
  constructor(
    private store: Store<AppState>,
    private actions: CartActions,
    private toastrService: NbToastrService,
    private lib: LIB,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.baseUrl = this.lib.baseUrl + "images";
    this.soluong = 1;
    this.giaodichcts$ = this.store.select(getCartCt);
    this.giaodichcts$.subscribe((d: Giaodichct[]) => (this.giaodichcts = d));
  }

  AddToCart() {
    let maBan = localStorage.getItem("maBan");
    if (maBan === undefined || maBan === null) {
      this.toastrService.show(
        "Vui lòng chọn bàn",
        "Không thêm được sản phẩm!",
        {
          limit: 2,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: "warning",
        }
      );
      return;
    }
    if (this.soluong <= 0) {
      // alert('số lượng đặt hàng không hợp lệ!');
      this.toastrService.show(
        "số lượng đặt hàng không hợp lệ!",
        "Không thêm được sản phẩm!",
        {
          limit: 2,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: "warning",
        }
      );
      return;
    } else {
      if (this.giaodichcts === undefined || this.giaodichcts.length === 0) {
        this.newgiaodichct = {
          ...this.product,
          soluong: this.soluong,
        };
      } else {
        this.newgiaodichct = {
          ...this.product,
          soluong: this.soluong,
        };
        // tăng số lượng sản phẩm trong giỏ hàng khi chọn sản phẩm cùng mã
        for (let giaodichct of this.giaodichcts) {
          if (giaodichct.masieuthi === this.product.masieuthi) {
            this.newgiaodichct = {
              ...this.product,
              soluong: giaodichct.soluong + this.soluong,
            };
          }
        }
      }
      this.store.dispatch(this.actions.addItem(this.newgiaodichct));
    }
  }

  updateSL(value) {
    this.soluong = parseInt(value);
  }

  getImage(fileName: string) {
    this.imageUrls = this.dataService.imageUrls;
    return this.imageUrls.find((d) => d.search(fileName) >= 0);
  }
}
