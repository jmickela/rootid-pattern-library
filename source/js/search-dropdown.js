$(document).ready(function () {
  $('.dropdownsearch__toggle').on('click', function () {
    var $parent = $(this).parent();

    $parent.toggleClass('dropdownsearch--open');
  });  
});
