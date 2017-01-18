import { Meteor } from 'meteor/meteor';

import { loadRides } from './imports/fixtures/rides';

import './imports/publications/rides'; 
import './imports/publications/users';

Meteor.startup(() => {
  loadRides();
});
