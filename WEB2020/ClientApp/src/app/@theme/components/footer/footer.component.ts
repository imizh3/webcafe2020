import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by"
      >Copyright © 2020 by
      <b><a href="http://dataviet.vn" target="_blank">Dataviet</a></b>
    </span>
    <div class="socials">
      <a
        href="http://dataviet.vn"
        target="_blank"
        class="ion ion-social-github"
      ></a>
      <a
        href="http://dataviet.vn"
        target="_blank"
        class="ion ion-social-facebook"
      ></a>
      <a
        href="http://dataviet.vn"
        target="_blank"
        class="ion ion-social-twitter"
      ></a>
      <a
        href="http://dataviet.vn"
        target="_blank"
        class="ion ion-social-linkedin"
      ></a>
    </div>
  `,
})
export class FooterComponent {}
