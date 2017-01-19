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
      location: ['', Validators.required],
      public: [false]
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
        location: {
          name: this.addForm.value.location
        },
        public: this.addForm.value.public,
        owner: Meteor.userId(),
        date: new Date()
      });

      this.addForm.reset();
    }
  }
}
