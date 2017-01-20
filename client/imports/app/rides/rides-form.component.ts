import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Rides } from '../../../../both/collections/rides.collection';

import template from './rides-form.component.html';

@Component({
  selector: 'rides-form',
  template
})
export class RidesFormComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      description: [],
      from_location: ['', Validators.required],
      to_location: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      public: [false],
      smoking: [false],
      music: [false],
      foodDrinks: [false]
    });
  }

  addRide(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a ride');
      return;
    }

    if (this.addForm.valid) {

      Rides.insert({
        description: this.addForm.value.description,
        from_location: {
          name: this.addForm.value.from_location
        },
        to_location: {
          name: this.addForm.value.to_location
        },
        price:this.addForm.value.price,
        date:this.addForm.value.date,
        car_rules: {
          smoking: this.addForm.value.smoking,
          music: this.addForm.value.music,
          foodDrinks: this.addForm.value.foodDrinks
        },
        public: true,
        owner: Meteor.userId(),
       // date: new Date()
      });

      this.addForm.reset();
    }
  }
}
