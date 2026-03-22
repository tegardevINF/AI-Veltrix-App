const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\\$\{/g, '${');
fs.writeFileSync(file, content);

const artifact = '../claude_ui_clone.tsx';
let artContent = fs.readFileSync(artifact, 'utf8');
artContent = artContent.replace(/\\\$\{/g, '${');
fs.writeFileSync(artifact, artContent);
console.log('Fixed Escape Sequences');
