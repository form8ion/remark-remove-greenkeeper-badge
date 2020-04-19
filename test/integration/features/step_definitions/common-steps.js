import {When} from 'cucumber';
import remark from 'remark';
import remarkRemoveGreenkeeperBadge from '../../../../lib/index.cjs';

When('a node is processed', async function () {
  remark()
    .use(remarkRemoveGreenkeeperBadge)
    .process(this.existingContent, (err, file) => {
      if (err) throw err;

      this.resultingContent = file.contents;
    });
});
