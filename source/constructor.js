'use strict';

$(document).ready(function() {

  $('#codeeditor').summernote({
    toolbar: [
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontname', 'fontsize']],
      ['color', ['color', 'bac']],
      ['para', ['ul', 'ol', 'style', 'paragraph']],
      ['height', ['height']],
      ['insert', ['picture', 'link', 'table', 'hr']],
      ['view', ['fullscreen', 'codeview']]
    ],
    fontNames: [
      'Arial',
      'Courier New',
    ],
    minHeight: 150,
    height: 200,
    focus: true,
    codemirror: {
      mode: "text/html",
      lineNumbers: true,
      matchBrackets: true,
      theme: "eclipse",
      extraKeys: {"Ctrl-Space": "autocomplete"},
      autocorrect: true,
      spellcheck: true
  }
  });
});
