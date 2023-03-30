import {describe, expect, it} from 'vitest';
import {GREENKEEPER_URL} from './constants';

describe('constants', () => {
  it('should define the greenkeeper url to match what is found in the real badges', () => {
    expect(GREENKEEPER_URL).toEqual('https://greenkeeper.io/');
  });
});
