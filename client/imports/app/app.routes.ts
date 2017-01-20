import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { RidesListComponent } from './rides/rides-list.component';
import { RideDetailsComponent } from './rides/ride-details.component';
import { RidesFormComponent } from './rides/rides-form.component';

export const routes: Route[] = [
  { path: '', component: RidesListComponent },
  { path: 'ride/:rideId', component: RideDetailsComponent },
  { path: 'post', component: RidesFormComponent, canActivate: ['canActivateForLoggedIn'] }
  // { path: 'ride/:rideId', component: RideDetailsComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
