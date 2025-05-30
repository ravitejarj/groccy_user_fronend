const fs = require('fs');
const path = require('path');

function printTree(dirPath, prefix = '') {
  const items = fs.readdirSync(dirPath).filter(item => item !== 'node_modules');
  const lastIndex = items.length - 1;

  items.forEach((item, index) => {
    const fullPath = path.join(dirPath, item);
    const isLast = index === lastIndex;
    const pointer = isLast ? '└── ' : '├── ';
    const newPrefix = prefix + (isLast ? '    ' : '│   ');

    if (fs.statSync(fullPath).isDirectory()) {
      console.log(prefix + pointer + '📁 ' + item);
      printTree(fullPath, newPrefix);
    } else {
      console.log(prefix + pointer + '📄 ' + item);
    }
  });
}

// Change path as needed (current directory: '.')
const rootDir = '.';
console.log('📦 Project Structure');
printTree(rootDir);
