import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });

      it('can delete owned task', () => {
        // find internal implementation of task method to test in isolation
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];

        // set up fake invocation like method expects
        const invocation = { userId };

        // run method with this set to fake invocation
        deleteTask.apply(invocation, [taskId]);

        // verify that method does what is expected
        assert.equal(Tasks.find().count(), 0);
      });
    });
  });
}
