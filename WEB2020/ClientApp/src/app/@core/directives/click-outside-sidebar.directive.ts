import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { LayoutService } from "../utils";
import { of } from "rxjs";

@Directive({
  selector: "[ngxClickOutsideSidebar]",
})
export class ClickOutsideSidebarDirective {
  constructor(
    private el: ElementRef,
    private sidebarService: NbSidebarService
  ) {}
  @HostListener("document:click", ["$event"])
  onClick(event) {
    if (window.innerWidth < 700) {
      let check1 = !event.target.contains(
        document
          .getElementById("btn-sidebar")
          .getElementsByTagName("rect")
          .item(0)
      );
      let check2 = !this.el.nativeElement.contains(event.target);

      if (check1 && check2) {
        // clicked outside => close menu-sidebar
        this.sidebarService.collapse("menu-sidebar");
      }
    }
  }
}
