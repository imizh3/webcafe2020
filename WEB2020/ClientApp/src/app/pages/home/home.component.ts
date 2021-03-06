import { getProducts } from "./../../@store/selectors/product-selectors";
import { ProductService } from "./../../@core/mock/product.service";
import { filter } from "rxjs/operators";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../@store/app-state";
import { ProductActions } from "../../@store/actions/product-actions";
import { Product } from "../../@core/data/product";
@Component({
  selector: "ngx-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  query: string;
  nhomhang: string;
  nganhhang: string;
  data = {
    products: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };

  pageSize = 10;
  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private actions: ProductActions,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.data.loading = false;
      this.data.products = [];
      this.data.pageToLoadNext = 1;
      this.loadNext(this.data);
    });
    this.activeRoute.queryParams
      .pipe(filter((params) => params.query))
      .subscribe((params) => {
        this.query = params.query;
        this.searchProduct(this.query);
      });
    this.store.select(getProducts).subscribe((d) => {
      this.data.loading = false;
      this.data.products = [];
      this.data.pageToLoadNext = 1;
      this.loadNext(this.data);
    });
  }

  searchProduct(search: string) {
    this.store.dispatch(this.actions.getProductsByQuery({ query: search }));
    this.data.loading = false;
    this.data.products = [];
    this.data.pageToLoadNext = 1;
    this.loadNext(this.data);
  }

  loadNext(cardData) {
    if (cardData.loading) {
      return;
    }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.productService
      .load(cardData.pageToLoadNext, this.pageSize)
      .subscribe((d) => {
        cardData.products.push(...d);
        cardData.placeholders = [];
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }
}
