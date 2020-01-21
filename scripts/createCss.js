const fs = require('fs');
const path = require('path');
const stripIndent = require('strip-indent');

const baseDevPath = path.join(__dirname, '../', process.env.TICKET_NAME);
const autoPrefixedCssPath = path.join(baseDevPath, 'autoprefixed.css');
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
  const split = stylesJs.split("<style type='text/css'>\n")[1].split('\n\n  </style>')[0];
  return stripIndent(split, 4);
}

async function writeFile(filePath) {
  const formattedStylesJs = await setFormattedStylesJs();
  return fs.writeFile(filePath, formattedStylesJs, 'utf8', (err) => {
    if (err) throw err;
  });
}

async function build() {
  return writeFile(autoPrefixedCssPath);
}

build();
