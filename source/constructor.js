'use strict';

const editor = CodeMirror(document.getElementById("codeeditor"), {
  mode: "text/html",
  lineNumbers: true,
  matchBrackets: true,
  theme: "eclipse",
  extraKeys: {"Ctrl-Space": "autocomplete"},
  autocorrect: true,
  spellcheck: true
});
