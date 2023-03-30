// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import fs from 'node:fs';
import {remark} from 'remark';
import remarkRemoveGreenkeeperBadge from './lib/index.js';

// remark-usage-ignore-next
stubbedFs();

// #### Execute

remark()
  .use(remarkRemoveGreenkeeperBadge)
  .process(
    `# project-name

[![Greenkeeper badge](https://badges.greenkeeper.io/your-account/project-name.svg)](https://greenkeeper.io/)
`,
    (err, file) => {
      fs.writeFileSync(`${process.cwd()}/README.md`, `${file}`);
    }
  );

// remark-usage-ignore-next
stubbedFs.restore();
