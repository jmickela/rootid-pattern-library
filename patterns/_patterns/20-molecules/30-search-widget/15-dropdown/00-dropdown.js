$('.dropdownsearch__toggle').on('click', function () {
  var $parent = $(this).parent();

  if(!$parent.hasClass('dropdownsearch--open')) {
    $parent.addClass('dropdownsearch--open');
  } else {
    $parent.removeClass('dropdownsearch--open');
  }

  return false;
});