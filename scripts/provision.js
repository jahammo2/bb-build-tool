const fs = require('fs');
const path = require('path');

const snippetContent = `<script>
</script>
<style type='text/css'>
</style>`;

const indexJsContent = `(function () {
  // GLOBAL VARIABLES AND CACHED ELEMENTS
  let jQuery;
  let $navList;

  // TOP LEVEL TESTING FNS
  const runPoll = (pollCondition, offer, maxAttempts = 50) => {
    if (!maxAttempts) {
      return;
    }

    if (!pollCondition()) {
      maxAttempts -= 1; // eslint-disable-line no-param-reassign
      return setTimeout(runPoll, 100, pollCondition, offer, maxAttempts); // eslint-disable-line consistent-return, max-len
    }

    offer();
  };

  const pollCondition = () => {
    jQuery = window.jQuery;

    if (jQuery) {
      $navList = jQuery('.nav-list.nav-list--categories');
      return Boolean($navList.length);
    }

    return false;
  };

  // /////////////////////////
  // TEST SPECIFIC JAVASCRIPT
  // /////////////////////////

  const offer = () => {
    jQuery(styles).appendTo('head');

    // TODO: add logic here
  };

  runPoll(pollCondition, offer, 50);
}());`;

const stylesJsContent = `const styles = \`
  <style type='text/css'>
    .GEAT-216-element {
    }

  </style>
\`;
`;

const ticketName = process.env.TICKET_NAME;

const snippetName = `${ticketName}-${process.env.SNIPPET_NAME}`;

const baseDevPath = path.join(__dirname, '../', ticketName);
const baseProjectsPath = path.join(__dirname, '../../projects', snippetName);

const compiledSnippetFilePath = path.join(baseProjectsPath, 'snippet_compiled.html');
const indexJsFilePath = path.join(baseDevPath, 'index.js');
const snippetFilePath = path.join(baseProjectsPath, 'snippet.html');
const stylesJsFilePath = path.join(baseDevPath, 'styles.js');

function writeFile(filePath, content) {
  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) throw err;
  });
}

async function provision() {
  if (!fs.existsSync(baseProjectsPath)) fs.mkdirSync(baseProjectsPath);

  fs.mkdirSync(baseDevPath);

  writeFile(compiledSnippetFilePath, snippetContent);
  writeFile(snippetFilePath, snippetContent);
  writeFile(indexJsFilePath, indexJsContent);
  writeFile(stylesJsFilePath, stylesJsContent);
}

provision();
