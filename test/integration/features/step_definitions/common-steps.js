import {When} from '@cucumber/cucumber';
import remark from 'remark';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import remarkRemoveGreenkeeperBadge from 'remark-remove-greenkeeper-badge';

When('a node is processed', async function () {
  const existingContent = `# some-project

${this.badgeGroup.join('\n')}

${this.normalLink}${this.badgeDefinitions.length ? `

${this.badgeDefinitions.join('\n\n')}` : ''}
`;

  remark()
    .use(remarkRemoveGreenkeeperBadge)
    .process(existingContent, (err, file) => {
      if (err) throw err;

      this.resultingContent = file.contents;
    });
});
