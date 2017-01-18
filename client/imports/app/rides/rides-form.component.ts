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
      name: ['', Validators.required],
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
      Rides.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));

      this.addForm.reset();
    }
  }
}
