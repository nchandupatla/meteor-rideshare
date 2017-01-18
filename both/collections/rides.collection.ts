import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Ride } from '../models/ride.model';

export const Rides = new MongoObservable.Collection<Ride>('rides');

function loggedIn() {
  return !!Meteor.user();
}

Rides.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
