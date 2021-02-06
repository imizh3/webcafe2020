import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "ngx-in-hoa-don",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./in-hoa-don.component.html",
  styleUrls: [
    "./in-hoa-don.component.scss",
    "../../../../node_modules/jquery-ui/themes/base/all.css",
    "../../../../node_modules/devextreme/dist/css/dx.common.css",
    "../../../../node_modules/devextreme/dist/css/dx.light.css",
    "../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css",
    "../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.light.css",
    "../../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css",
  ],
})
export class InHoaDonComponent implements OnInit {
  reportUrl: string = "BlankReport";
  invokeAction: string = "/DXXRDV";

  constructor(@Inject("BASE_URL") public hostUrl: string) {}

  ngOnInit(): void {}
}
