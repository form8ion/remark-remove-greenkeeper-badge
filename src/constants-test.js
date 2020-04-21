import {assert} from 'chai';
import {GREENKEEPER_URL} from './constants';

suite('constants', () => {
  test('that the greenkeeper url is defined to match what is found in the real badges', () => {
    assert.equal(GREENKEEPER_URL, 'https://greenkeeper.io/');
  });
});
