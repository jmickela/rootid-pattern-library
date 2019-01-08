$(document).ready(function () {
  
  $('.expandingsearch__button').on('click', function () {
    var $parent = $(this).parent();

    if ($parent.hasClass('expandingsearch--open') &&
        $('.expandingsearch__input', $parent).val() == '') {
      $parent.removeClass('expandingsearch--open');
      return false;
    } else if($parent.hasClass('expandingsearch--open')) {
      return true;
    }

    $(this).parent().toggleClass('expandingsearch--open');
    return false;
  });

});
