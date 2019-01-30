(function() {
  let hamburgerToggles = document.querySelectorAll('.hamburger-toggle');

  for(var i = 0; i < hamburgerToggles.length; i++) {
    hamburgerToggles[i].addEventListener('click', toggleHamburger);
  }

  function toggleHamburger(e) {
    console.log("i clicked!");
    console.log(e.target);

    if(e.target.classList.contains('hamburger-toggle')) {
      e.target.classList.toggle('open');
    } else {
      e.target.parentNode.classList.toggle('open');
    }
    
  }
})();