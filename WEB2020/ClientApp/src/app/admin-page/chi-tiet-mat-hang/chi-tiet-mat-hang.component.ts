import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { DataService } from "./../../@core/mock/data.service";
import { LIB } from "./../../@core/utils/LIB";
import { ProductService } from "./../../@core/mock/product.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { filter } from "rxjs/operators";
import { Product } from "../../@core/data/product";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "ngx-chi-tiet-mat-hang",
  templateUrl: "./chi-tiet-mat-hang.component.html",
  styleUrls: ["./chi-tiet-mat-hang.component.scss"],
})
export class ChiTietMatHangComponent implements OnInit {
  masieuthi: string;
  product: Product;
  baseUrl: string;
  imageUrls: any[];
  imageUrl: string;
  fileUpload: File = null;
  progress: any;
  message: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private lib: LIB,
    private dataService: DataService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(filter((params) => params.query))
      .subscribe((params) => {
        if (params.query) {
          this.masieuthi = params.query;
        }
      });
    this.product = this.productService.products.find(
      (d) => d.masieuthi == this.masieuthi
    );
    this.baseUrl = this.lib.baseUrl + "images";

    this.imageUrls = this.imageUrls = this.dataService.imageUrls;

    this.imageUrl =
      this.baseUrl +
      "/" +
      this.imageUrls.find((d) => d.search(this.masieuthi) >= 0);
  }
  handleFileInput(files: FileList) {
    if (files.length === 0) {
      return;
    } else if (files.length > 1) {
      alert("Chỉ được chọn 1 ảnh !");
      return;
    }
    this.fileUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileUpload);
  }

  btnUploadClick() {
    if (this.fileUpload === undefined || this.fileUpload === null) {
      this.toastrService.show("Không có thay đổi gì", "Thông báo", {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        status: "info",
      });
    } else {
      const formData = new FormData();
      formData.append("file", this.fileUpload, this.fileUpload.name);
      formData.append("masieuthi", this.product.masieuthi);
      this.productService.uploadImage(formData).subscribe(
        (data) => {
          if (data.status === 200) {
            this.toastrService.show("Thành công!", "Lưu dữ liệu!", {
              position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              status: "success",
            });
          } else {
            this.toastrService.show("Thất bại!", "Lưu dữ liệu!", {
              position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              status: "danger",
            });
          }
        },
        // tslint:disable-next-line: no-console
        (error) => console.log(error)
      );
    }
  }
}
