import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import * as definitions from '../thirdparty-wrappers/mdast-util-definitions';
import createReferencedBadgePredicate from './referenced-badge-predicate';
import {GREENKEEPER_URL} from './constants';

suite('badge with referenced definitions', () => {
  let sandbox;
  const tree = any.simpleObject();
  const nodeIdentifier = any.word();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(definitions, 'default');
  });

  teardown(() => sandbox.restore());

  test('that `false` is returned if the `type` is not `linkReference`', () => {
    assert.isFalse(createReferencedBadgePredicate(tree)(any.simpleObject()));
  });

  test('that `false` is returned if the `linkReference` is not the greenkeeper badge', () => {
    const getDefinitionByIdentifier = sinon.stub();
    definitions.default.withArgs(tree).returns(getDefinitionByIdentifier);
    getDefinitionByIdentifier.withArgs(nodeIdentifier).returns(any.simpleObject());

    assert.isFalse(
      createReferencedBadgePredicate(tree)({
        ...any.simpleObject(),
        type: 'linkReference',
        identifier: nodeIdentifier
      })
    );
  });

  test('that `true` is returned when the `linkReference` is the greenkeeper badge', () => {
    const getDefinitionByIdentifier = sinon.stub();
    definitions.default.withArgs(tree).returns(getDefinitionByIdentifier);
    getDefinitionByIdentifier.withArgs(nodeIdentifier).returns({...any.simpleObject(), url: GREENKEEPER_URL});

    assert.isTrue(
      createReferencedBadgePredicate(tree)({
        ...any.simpleObject(),
        type: 'linkReference',
        identifier: nodeIdentifier
      })
    );
  });
});
