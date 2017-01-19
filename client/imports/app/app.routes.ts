import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { RidesListComponent } from './rides/rides-list.component';
import { RideDetailsComponent } from './rides/ride-details.component';

export const routes: Route[] = [
  { path: '', component: RidesListComponent },
  { path: 'ride/:rideId', component: RideDetailsComponent }
  // { path: 'ride/:rideId', component: RideDetailsComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
