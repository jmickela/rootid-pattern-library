// $(".navmenu--expanding .navmenu__menu-item--has-dropdown .dropdown-toggle").on('click', function () {
//   console.log("I clicked!");
//   $(this).toggleClass('icon-down-open');
//   $(this).toggleClass('icon-up-open');
//   $(this).closest('.navmenu--vertical .navmenu__menu-item--has-dropdown').toggleClass('open');
// });


(function() {
  let menuDropdownToggles = document.querySelectorAll('.navmenu--expanding .navmenu__menu-item--has-dropdown .dropdown-toggle');

  for(var i = 0; i < menuDropdownToggles.length; i++) {
    menuDropdownToggles[i].addEventListener('click', toggleMenuDropdown);
  }

  function toggleMenuDropdown(e) {
    e.target.classList.toggle('icon-down-open');
    e.target.classList.toggle('icon-up-open');
    e.target.parentElement.classList.toggle('open');
  }
})();