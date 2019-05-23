import { Component, OnInit } from '@angular/core';
import { UserService } from "@entities/user/user.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "@entities/user/user-model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.scss' ]
})
export class ItemComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(res => {
      this.user = res.data;
    });
  }
}
