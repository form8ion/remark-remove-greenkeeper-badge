import {When} from 'cucumber';
import remark from 'remark';
import remarkRemoveGreenkeeperBadge from '../../../../lib/index.cjs';

When('a node is processed', async function () {
  const existingContent = `# some-project

${this.badgeGroup.join('\n')}

${this.normalLink}
`;

  remark()
    .use(remarkRemoveGreenkeeperBadge)
    .process(existingContent, (err, file) => {
      if (err) throw err;

      this.resultingContent = file.contents;
    });
});
