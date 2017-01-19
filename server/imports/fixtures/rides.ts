import { Rides } from '../../../both/collections/rides.collection';
import { Ride } from '../../../both/models/ride.model';

export function loadRides() {
  if (Rides.find().cursor.count() === 0) {

    for (var i = 0; i < 27; i++) {
  Rides.insert({
    name: Fake.sentence(10),
    location: {
        name: 'Palo Alto'
      },
    description: Fake.sentence(10),
    public: true
  });
}

    // const rides: Ride[] = [{
    //   name: 'Dubstep-Free Zone',
    //   description: 'Can we please just for an evening not listen to dubstep.',
    //   location: 'Palo Alto',
    //   public: true
    // }, {
    //   name: 'All dubstep all the time',
    //   description: 'Get it on!',
    //   location: 'Palo Alto',
    //   public: true
    // }, {
    //   name: 'Savage lounging',
    //   description: 'Leisure suit required. And only fiercest manners.',
    //   location: 'San Francisco',
    //   public: false
    // }];

    // rides.forEach((ride: Ride) => Rides.insert(ride));
  }

  
}