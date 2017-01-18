import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function() {
    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        profile: 1,
        services:1
      }
    });
  });

Meteor.publish('user', function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'services': 1, 'emails':1}});
});