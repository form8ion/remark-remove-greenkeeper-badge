import {remark} from 'remark';

import {When} from '@cucumber/cucumber';

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import remarkRemoveGreenkeeperBadge from 'remark-remove-greenkeeper-badge';

When('a node is processed', async function () {
  const existingContent = `# some-project

${this.badgeGroup.join('\n')}

${this.normalLink}${this.badgeDefinitions.length ? `

${this.badgeDefinitions.join('\n\n')}` : ''}
`;

  this.resultingContent = await remark()
    .use(remarkRemoveGreenkeeperBadge)
    .process(existingContent);
});
