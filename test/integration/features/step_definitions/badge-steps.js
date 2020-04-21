import {Before, Given, Then} from 'cucumber';
import {assert} from 'chai';
import any from '@travi/any';

let otherBadges, otherDefinitions;

const normalLink = `[${any.word()}](${any.url()})`;
const imageReference = any.word();
const linkReference = any.word();
const inlineGreenkeeperBadge = `[![Greenkeeper badge](https://badges.greenkeeper.io/${
  any.word()
}/${
  any.word()
}.svg)](https://greenkeeper.io/)`;
const greenkeeperBadgeWithReferencedDefinitions = '[![Greenkeeper][greenkeeper-badge]][greenkeeper-link]';
const otherInlineBadge = `[![${any.word()}](${any.url()})](${any.url()})`;
const otherBadgeWithReferencedDefinitions = `[![${any.word()}][${imageReference}]][${linkReference}]`;
const otherBadgeDefinitions = `[${imageReference}]: ${any.url()}

[${linkReference}]: ${any.url()}`;

Before(function () {
  this.badgeGroup = [];
  this.badgeDefinitions = [];
  this.normalLink = normalLink;

  otherBadges = [];
  otherDefinitions = [];
});

Given('an inline greenkeeper badge exists', async function () {
  this.badgeGroup.push(inlineGreenkeeperBadge);
});

Given('a greenkeeper badge exists with referenced definitions', async function () {
  this.badgeGroup.push(greenkeeperBadgeWithReferencedDefinitions);

  this.badgeDefinitions.push(
    '[greenkeeper-link]: https://greenkeeper.io/',
    `[greenkeeper-badge]: https://badges.greenkeeper.io/${any.word()}/${any.word()}.svg`
  );
});

Given('other inline badges exist', async function () {
  this.badgeGroup.push(otherInlineBadge);
  otherBadges.push(otherInlineBadge);
});

Given('other badges exist with referenced definitions', async function () {
  this.badgeGroup.push(otherBadgeWithReferencedDefinitions);
  otherBadges.push(otherBadgeWithReferencedDefinitions);

  this.badgeDefinitions.push(otherBadgeDefinitions);
  otherDefinitions.push(otherBadgeDefinitions);
});

Then('the greenkeeper badge is removed from the README', async function () {
  assert.equal(
    this.resultingContent,
    `# some-project
${otherBadges.length ? `

${otherBadges.join('\n')}
` : ''}
${normalLink}${otherDefinitions.length ? `

${otherDefinitions.join('\n\n')}` : ''}
`
  );
});
