import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Nganhnhom } from "../data/nganhnhom";
import { LIB } from "../utils";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  isLoading = false;
  categories: Nganhnhom[];
  constructor(private http: HttpClient, private lib: LIB) {
    this.Load();
  }

  Load() {
    this.http
      .get<Nganhnhom[]>(
        this.lib.baseUrl + "api/categorys",
        this.lib.httpOption()
      )
      .subscribe((d) => {
        this.categories = d;
      });
  }
  loadCategory() {
    return this.http
      .get<Nganhnhom[]>(
        this.lib.baseUrl + "api/categorys",
        this.lib.httpOption()
      )
      .pipe((d) => d);
  }
}
