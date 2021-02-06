import { BrowserModule } from "@angular/platform-browser";
import { ClickOutsideSidebarDirective } from "./click-outside-sidebar.directive";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ClickOutsideSidebarDirective], // <---
  imports: [CommonModule],
  exports: [ClickOutsideSidebarDirective], // <---
})
export class DirectivesModule {}
