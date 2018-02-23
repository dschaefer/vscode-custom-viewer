const cp = require('child_process');
const yarn = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';

function yarnInstall(location) {
    const opts = {
        cwd: location,
        stdio: 'inherit'
    };

    const result = cp.spawnSync(yarn, ['install'], opts);

    if (result.error || result.status != 0) {
        process.exit(1);
    }
}

yarnInstall('./src/client');
require('./node_modules/vscode/bin/install');
