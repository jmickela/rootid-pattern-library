$(".navmenu-offcanvas .menu-item .dropdown-toggle").on('click', function () {

  $(this).closest('.navmenu-offcanvas .menu-item').toggleClass('open');
});