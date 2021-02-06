import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "ngx-tao-mau-bao-cao",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./tao-mau-bao-cao.component.html",
  styleUrls: [
    "../../../../node_modules/jquery-ui/themes/base/all.css",
    "../../../../node_modules/devextreme/dist/css/dx.common.css",
    "../../../../node_modules/devextreme/dist/css/dx.light.css",
    "../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css",
    "../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.light.css",
    "../../../../node_modules/@devexpress/analytics-core/dist/css/dx-querybuilder.css",
    "../../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css",
    "../../../../node_modules/devexpress-reporting/dist/css/dx-reportdesigner.css",
  ],
})
export class TaoMauBaoCaoComponent implements OnInit {
  getDesignerModelAction = "api/ReportDesigner/GetReportDesignerModel";
  reportUrl = "BlankReport";

  constructor(@Inject("BASE_URL") public hostUrl: string) {}

  ngOnInit(): void {}
}
