import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "@entities/user/user.service";
import { map } from "rxjs/operators";
import { User } from "@entities/user/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    protected router: Router ) {
  }

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    const id = route.paramMap.get('id') as any;
    return this.userService.getById(id)
      .pipe(map(res => {
        if (res) {
          return res;
        }
        this.router.navigate([ '/404' ]);
        return null;
      }));
  }
}
