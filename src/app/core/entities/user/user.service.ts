import { Injectable } from '@angular/core';
import users from "./users.list";
import { Observable, of } from "rxjs";
import { User } from "@entities/user/user-model";
import { modelId } from "@entities/base/base-model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAll(): Observable<User[]> {
    /**
     * Тут может быть запрос на сервер
     */
    return of(users);
  }

  getById( id: modelId ): Observable<User> {
    /**
     * Тут может быть запрос на сервер
     */
    return of(users)
      .pipe(map(res => {
        /**
         * Сравнение без приведения типов потому что там может быть как число так и строка
         */
        const user = res.filter(item => item.id == id);
        if (user.length) {
          return user[ 0 ];
        } else {
          return null;
        }
      }));
  }
}
