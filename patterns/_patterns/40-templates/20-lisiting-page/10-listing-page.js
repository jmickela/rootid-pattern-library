$('.card1--person').on('click', function() {
  let $wrapper = $(".person-popup__wrapper", this);
  let $content = $(".person-popup", $wrapper);

  if(!$wrapper.hasClass('open')) {
    $wrapper.addClass('open');
  }

  return false;
});

$(".person-popup__wrapper").on('click', function (){
  closePersonPopup();
  return false;
});

$(".person-popup__close").on('click', function () {
  closePersonPopup();
  return false;
});

$(document).keyup(function(e) {
  if (e.keyCode === 27) closePersonPopup();   // esc
});

function closePersonPopup($element) {
  $(".person-popup__wrapper.open").removeClass('open');
}

$('.person-popup').on('click', function(e) {
  e.stopImmediatePropagation();
});