import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { RouterModule } from "@angular/router";
import { WrapperComponent } from "./core/components/wrapper/wrapper.component";
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path : '',
        component: WrapperComponent,
        children: [
          {
            path: '',
            redirectTo: 'users',
            pathMatch: 'full'
          },
          {
            path: 'users',
            loadChildren: './pages/users/users.module#UsersModule'
          },
          {
            path: '404',
            component: NotFoundComponent
          }
        ]
      },
      {
        path : '**',
        redirectTo : '/404'
      }
    ]),
    CoreModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
