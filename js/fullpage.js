'use strict'

const slideMove = function(anchorLink, index, slideAnchor, slideIndex) {
  $('.nav-item').removeClass('active');
  switch (slideIndex) {
    case 0:
      $('#itemInfo').addClass('active');
      break;
    case 1:
      $('#itemConstructor').addClass('active');
      break;
    case 2:
      $('#itemSearch').addClass('active');
      break;
    case 3:
      $('#itemTools').addClass('active');
      break;
  }
}

$(document).ready(function() {
  $('#fullpage').fullpage({
    scrollingSpeed: 700,
    anchors: ["first", "second", "third"],
    verticalCentered: false,
    scrollOverflow: true,
    scrollOverflowOptions: {preventDefault:false},
    afterSlideLoad: slideMove
  });

  $('#createBtn').click(() => {
    $.fn.fullpage.reBuild();
  });

  $('#formRPC').submit(() => {
    setTimeout(() => {
      $.fn.fullpage.reBuild();
    }, 500);
  });
});
