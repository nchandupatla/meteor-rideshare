import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Rides } from '../../../../both/collections/rides.collection';
import { Ride } from '../../../../both/models/ride.model';

import template from './ride-details.component.html';

@Component({
  selector: 'ride-details',
  template
})
export class RideDetailsComponent implements OnInit, OnDestroy {
  rideId: string;
  paramsSub: Subscription;
  ride: Ride;
  rideSub: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['rideId'])
      .subscribe(rideId => {
        this.rideId = rideId;
        
        if (this.rideSub) {
          this.rideSub.unsubscribe();
        }

        this.rideSub = MeteorObservable.subscribe('ride', this.rideId).subscribe(() => {
          this.ride = Rides.findOne(this.rideId);
        });
      });
  }

  saveRide() {
    if (!Meteor.userId()) {
      alert('Please log in to change this ride');
      return;
    }
    
    Rides.update(this.ride._id, {
      $set: {
        name: this.ride.name,
        description: this.ride.description,
        location: this.ride.location
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.rideSub.unsubscribe();
  }
}
