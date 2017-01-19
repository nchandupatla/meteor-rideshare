import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { MouseEvent } from "angular2-google-maps/core";

import 'rxjs/add/operator/map';

import { Rides } from '../../../../both/collections/rides.collection';
import { Ride } from '../../../../both/models/ride.model';

import template from './ride-details.component.html';
import style from './ride-details.component.scss';

@Component({
  selector: 'ride-details',
  template,
  styles: [ style ]
})
export class RideDetailsComponent implements OnInit, OnDestroy {
  rideId: string;
  paramsSub: Subscription;
  ride: Ride;
  rideSub: Subscription;
   // Default center Palo Alto coordinates.
  centerLat: number = 37.4292;
  centerLng: number = -122.1381;

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
        description: this.ride.description,
        location: this.ride.location
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.rideSub.unsubscribe();
  }

   get lat(): number {
    return this.ride && this.ride.location.lat;
  }
 
  get lng(): number {
    return this.ride && this.ride.location.lng;
  }
 
  mapClicked($event: MouseEvent) {
    this.ride.location.lat = $event.coords.lat;
    this.ride.location.lng = $event.coords.lng;
  }
}
