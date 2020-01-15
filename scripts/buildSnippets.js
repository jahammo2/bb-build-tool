const indentString = require('indent-string');
const fs = require('fs');
const path = require('path');
const stripIndent = require('strip-indent');

const ticketName = process.env.TICKET_NAME;

const snippetName = `${ticketName}-${process.env.SNIPPET_NAME}`;

const baseDevPath = path.join(__dirname, '../', ticketName);
const baseProjectsPath = path.join(__dirname, '../../projects', snippetName);

const compiledSnippetFilePath = path.join(baseProjectsPath, 'snippet_compiled.html');
const distMainJsFilePath = path.join(__dirname, '../dist/main.js');
const indexJsFilePath = path.join(baseDevPath, 'index.js');
const snippetFilePath = path.join(baseProjectsPath, 'snippet.html');
const stylesJsFilePath = path.join(baseDevPath, 'styles.js');

let formattedStylesJs;

function getContent(filePath) {
  return new Promise((resolve, reject) => fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  }));
}

async function setFormattedStylesJs() {
  const stylesJs = await getContent(stylesJsFilePath);
  const split = stylesJs.split('const styles = `\n')[1].split('\n`;')[0];
  formattedStylesJs = stripIndent(split, 2);
}

function writeFile(indexJs, filePath) {
  const formattedIndexJs = indentString(indexJs, 2);

  let snippetFileContent = '<script>\n';
  snippetFileContent += formattedIndexJs;
  snippetFileContent += '\n</script>\n';
  snippetFileContent += formattedStylesJs;

  return fs.writeFile(filePath, snippetFileContent, 'utf8', (err) => {
    if (err) throw err;
  });
}

async function buildSnippet() {
  const indexJs = await getContent(indexJsFilePath);
  return writeFile(indexJs, snippetFilePath);
}

// TODO: update script and stuff to not need index.js filled out
async function buildCompiledSnippet() {
  const indexJs = await getContent(distMainJsFilePath);

  const split = indexJs.split('(function(module, exports) {\n\n')[1].split('\n/***/ })')[0];

  return writeFile(split, compiledSnippetFilePath);
}

async function buildAll() {
  await setFormattedStylesJs();
  await buildSnippet();
  return buildCompiledSnippet();
}

buildAll();
