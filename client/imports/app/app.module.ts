import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { RIDES_DECLARATIONS } from './rides';
import { SHARED_DECLARATIONS } from './shared';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    Ng2PaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCeG5PCsYSa62_xr0ppy5sC97QfX00UPHo'
    })
  ],
  declarations: [
    AppComponent,
    ...RIDES_DECLARATIONS,
    ...SHARED_DECLARATIONS
  ],
  providers: [
    ...ROUTES_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}