import {Given, Then} from 'cucumber';
import {assert} from 'chai';
import any from '@travi/any';

const normalLink = `[${any.word()}](${any.url()})`;

Given('an inline greenkeeper badge exists', async function () {
  this.existingContent = `# some-project

[![Greenkeeper badge](https://badges.greenkeeper.io/${any.word()}/${any.word()}.svg)](https://greenkeeper.io/)

${normalLink}
`;
});

Given('a greenkeeper badge exists with referenced definitions', async function () {
  this.existingContent = `# some-project

[![Greenkeeper][greenkeeper-badge]][greenkeeper-link]

${normalLink}

[greenkeeper-link]: https://greenkeeper.io/
[greenkeeper-badge]: https://badges.greenkeeper.io/${any.word()}/${any.word()}.svg
`;
});

Then('the greenkeeper badge is removed from the README', async function () {
  assert.equal(
    this.resultingContent,
    `# some-project

${normalLink}
`
  );
});
