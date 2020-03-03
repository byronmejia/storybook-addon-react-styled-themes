const { execFileSync } = require('child_process');
execFileSync('yarn', ['precommit'], { stdio: 'inherit' });
