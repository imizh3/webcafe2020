import { Router } from "@angular/router";
import { DataService } from "./../../@core/mock/data.service";
import { Khachhang } from "./../../@core/data/khachhang";
import { Component, OnInit } from "@angular/core";
import { Ban } from "../../@core/data/ban";

@Component({
  selector: "ngx-list-ban",
  templateUrl: "./list-ban.component.html",
  styleUrls: ["./list-ban.component.scss"],
})
export class ListBanComponent implements OnInit {
  khachHangs: Khachhang[];
  bans: Ban[];
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    //this.khachHangs = this.dataService.dmKhachhang;
    const ban_json =
      '{"bans":[' +
      '{"maban":"ban1"},' +
      '{"maban":"ban2"},' +
      '{"maban":"ban3"},' +
      '{"maban":"ban4"}]}';
    this.bans = JSON.parse(ban_json).bans;
  }

  onClickBan(i: number) {
    this.router.navigate(["/chi-tiet-ban/" + i]);
  }
}
