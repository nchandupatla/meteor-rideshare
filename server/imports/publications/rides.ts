import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Rides } from '../../../both/collections/rides.collection';

interface Options {
  [key: string]: any;
}

Meteor.publish('rides', function(options: Options, from_location?: string) {
  const selector = buildQuery.call(this, null, from_location);

  Counts.publish(this, 'numberOfRides', Rides.collection.find(selector), { noReady: true });

  return Rides.find(selector, options);
});

Meteor.publish('ride', function(rideId: string) {
  return Rides.find(buildQuery.call(this, rideId));
});


function buildQuery(rideId?: string, from_location?: string): Object {
  const isAvailable = {
    $or: [{
      // ride is public
      public: true
    },
    // or
    { 
      // current user is the owner
      $and: [{
        owner: this.userId 
      }, {
        owner: {
          $exists: true
        }
      }]
    }]
  };

  if (rideId) {
    return {
      // only single ride
      $and: [{
          _id: rideId
        },
        isAvailable
      ]
    };
  }

  const searchRegEx = { '$regex': '.*' + (from_location || '') + '.*', '$options': 'i' };

  return {
    $and: [{
        'from_location.name': searchRegEx
      },
      isAvailable
    ]
  };
}