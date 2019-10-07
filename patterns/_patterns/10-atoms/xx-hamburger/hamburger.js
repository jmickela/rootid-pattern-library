// Normally the hamburgers style themselves to match the state of the offcanvas. This script is only so that the hamburger styling can be toggled on the PatternLab demo pages. It shouldn't work when the hamburger is actually being used on a page.

(function() {
  let hamburgerToggles = document.querySelectorAll('.hamburger');

  for(var i = 0; i < hamburgerToggles.length; i++) {
    hamburgerToggles[i].addEventListener('click', handleHamburgerClicked);
  }

  function getCorrectTarget(e) {
    let targetElement = e.target;

    if(!targetElement.classList.contains('hamburger')) {
      targetElement = targetElement.parentNode;
    }

    return targetElement;
  }

  function handleHamburgerClicked(e) {
    let hamburgerElement = getCorrectTarget(e);    

    if(hamburgerElement.parentNode.classList.contains('sg-pattern-example')) {
      hamburgerElement.classList.toggle('open');
    } 
  }
  
})();