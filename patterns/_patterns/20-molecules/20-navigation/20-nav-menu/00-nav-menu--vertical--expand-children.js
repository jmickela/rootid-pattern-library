$(".navmenu--vertical .navmenu__menu-item--has-dropdown .dropdown-toggle").on('click', function () {
  $(this).toggleClass('icon-down-open');
  $(this).toggleClass('icon-up-open');
  $(this).closest('.navmenu--vertical .navmenu__menu-item--has-dropdown').toggleClass('open');
});