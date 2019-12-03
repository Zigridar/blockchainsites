'use strict'

const $ = require('jquery');

$('#toggle-tools').change(() => {

  //toggle toolsTab
  if($('#toggle-tools').is(':checked')) {
    $('#toolsTab').css('display', 'inline');
    $('#itemTools').css('display', 'inline');
    $('#toolsLink')[0].click();
  }
  else {
    $('#toolsTab').css('display', 'none');
    $('#itemTools').css('display', 'none');
    $('#browserLink')[0].click();
  }


});
