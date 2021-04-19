const { spawn } = require('child_process');
const path = require('path');
const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

switch (process.argv[2]) {
  case '-s':
    spawn(cmd, ['run', 'start'], { cwd: path.resolve('./server'), stdio: 'inherit' });
    spawn(cmd, ['run', 'start'], { cwd: path.resolve('./ui'), stdio: 'inherit' });
    break;
  case '-i':
    spawn(cmd, ['install'], { cwd: path.resolve('./ui'), stdio: 'inherit' });
    spawn(cmd, ['install'], { cwd: path.resolve('./server'), stdio: 'inherit' });
    break;
}
