import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import * as remove from '../thirdparty-wrappers/unist-util-remove';
import plugin from './plugin';

suite('plugin', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(remove, 'default');
  });

  teardown(() => sandbox.restore());

  test('that an inline greenkeeper badge is removed', () => {
    const node = any.simpleObject();

    plugin()(node);

    assert.calledWith(remove.default, node, {type: 'link', url: 'https://greenkeeper.io/'});
  });
});
