import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

import 'rxjs/add/operator/combineLatest';

import { Rides } from '../../../../both/collections/rides.collection';
import { Ride } from '../../../../both/models/ride.model';

import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';

import template from './rides-list.component.html';
import style from './rides-list.component.scss';

interface Pagination {
  limit: number;
  skip: number;
}

interface Options extends Pagination {
  [key: string]: any
}

@Component({
  selector: 'rides-list',
  template,
  styles: [ style ]
})
export class RidesListComponent implements OnInit, OnDestroy {
  rides: Observable<Ride[]>;
  ridesSub: Subscription;
  pageSize: Subject<number> = new Subject<number>();
  curPage: Subject<number> = new Subject<number>();
  nameOrder: Subject<number> = new Subject<number>();
  optionsSub: Subscription;
  ridesSize: number = 0;
  autorunSub: Subscription;
  from_location: Subject<string> = new Subject<string>();
  user:User;

  constructor(
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.optionsSub = Observable.combineLatest(
      this.pageSize,
      this.curPage,
      this.nameOrder,
      this.from_location
    ).subscribe(([pageSize, curPage, nameOrder, from_location]) => {
      const options: Options = {
        limit: pageSize as number,
        skip: ((curPage as number) - 1) * (pageSize as number),
        sort: { name: nameOrder as number }
      };

      this.paginationService.setCurrentPage(this.paginationService.defaultId, curPage as number);

      if (this.ridesSub) {
        this.ridesSub.unsubscribe();
      }
      
      this.ridesSub = MeteorObservable.subscribe('rides', options, from_location).subscribe(() => {
        this.rides = Rides.find({}, {
          sort: {
            from_location: nameOrder
          }
        }).zone();
      });

      MeteorObservable.subscribe('user').subscribe(() => {
           this.user = Meteor.user();
           console.log(JSON.stringify(this.user))
        });
    });

    this.paginationService.register({
      id: this.paginationService.defaultId,
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.ridesSize
    });

    this.pageSize.next(5);
    this.curPage.next(1);
    this.nameOrder.next(1);
    this.from_location.next('');

    this.autorunSub = MeteorObservable.autorun().subscribe(() => {
      this.ridesSize = Counts.get('numberOfRides');
      this.paginationService.setTotalItems(this.paginationService.defaultId, this.ridesSize);
    });
  }

  removeRide(ride: Ride): void {
    Rides.remove(ride._id);
  }

  search(value: string): void {
    this.curPage.next(1);
    this.from_location.next(value);
  }

  onPageChanged(page: number): void {
    this.curPage.next(page);
  }

  changeSortOrder(nameOrder: string): void {
    this.nameOrder.next(parseInt(nameOrder));
  }

  isOwner(ride: Ride): boolean {
    return this.user && this.user._id === ride.owner;
  }

  ngOnDestroy() {
    this.ridesSub.unsubscribe();
    this.optionsSub.unsubscribe();
    this.autorunSub.unsubscribe();
  }
}
