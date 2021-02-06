import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "ngx-quantity",
  templateUrl: "./quantity.component.html",
  styleUrls: ["./quantity.component.scss"],
})
export class QuantityComponent implements OnInit {
  constructor() {}

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() sl: number;

  onModelChange(soluong) {
    this.save.emit(soluong);
  }
  ngOnInit(): void {}
  giamSoluong() {
    if (this.sl > 1) {
      this.sl--;
      this.save.emit(this.sl);
    }
  }
  tangSoluong() {
    this.sl++;
    this.save.emit(this.sl);
  }
}
