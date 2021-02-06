import { ProductService } from "./../../../@core/mock/product.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Giaodichct } from "../../../@core/data/giaodichct";
import { Store } from "@ngrx/store";
import { AppState } from "../../../@store/app-state";
import { getCartCt } from "../../../@store/selectors/cart-selectors";
import { CartActions } from "../../../@store/actions/cart-actions";
import { LIB } from "../../../@core/utils";
import { DataService } from "../../../@core/mock/data.service";

@Component({
  selector: "ngx-cart-info",
  templateUrl: "./cart-info.component.html",
  styleUrls: ["./cart-info.component.scss"],
})
export class CartInfoComponent implements OnInit {
  product$: Observable<Giaodichct>;
  giaodichcts: Giaodichct;
  imageUrls: any[];
  baseUrl: string;

  constructor(
    private store: Store<AppState>,
    private action: CartActions,
    private lib: LIB,
    private dataService: DataService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product$ = this.store.select(getCartCt);
    this.product$.subscribe((d) => {
      this.giaodichcts = d;
    });
    this.baseUrl = this.lib.baseUrl + "images";
  }

  onEditConfirm(data: any, soluong: any): void {
    this.store.dispatch(
      this.action.updateItem(data, "soluong", soluong.target.value)
    );
  }
  getProductName(masieuthi) {
    var tendaydu = this.productService.products.find(
      (d) => d.masieuthi == masieuthi
    ).tendaydu;
    return tendaydu;
  }
  onEditTyleck(data: any, field: string, ck: any): void {
    this.store.dispatch(this.action.updateItem(data, field, ck.target.value));
  }

  onDeleteConfirm(gdChiTiet: any): void {
    this.store.dispatch(this.action.removeItem(gdChiTiet));
  }

  onEditThungLe(giaodichct, value) {
    this.store.dispatch(this.action.updateItem(giaodichct, "sothung", value));
  }
  onUpdateSL(giaodichct, value) {
    this.store.dispatch(this.action.updateItem(giaodichct, "soluong", value));
  }
  getImage(fileName: string) {
    this.imageUrls = this.dataService.imageUrls;
    return this.imageUrls.find((d) => d.search(fileName) >= 0);
  }
}
