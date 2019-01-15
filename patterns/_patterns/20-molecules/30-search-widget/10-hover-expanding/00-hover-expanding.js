// $('.hoverexpandingsearch__button').on('click', function () {
//   var $parent = $(this).parent();
//
//   if ($parent.hasClass('hoverexpandingsearch--open') && $('.hoverexpandingsearch__input', $parent).val() === '') {
//     $parent.removeClass('hoverexpandingsearch--open');
//     $('.hoverexpandingsearch__input', $parent).off( "focus" );
//     return false;
//   } else if($parent.hasClass('hoverexpandingsearch--open')) {
//     return true;
//   }
//
//   $(this).parent().toggleClass('hoverexpandingsearch--open');
//   $('.expandingsearch__input', $parent).focus();
//
//   return false;
// });