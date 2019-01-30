(function() {
  let offCanvasButtons = document.querySelectorAll('[data-offcanvas]');

  for(var i = 0; i < offCanvasButtons.length; i++) {
    offCanvasButtons[i].addEventListener('click', offCanvasButtonClicked);
  }

  function getOffCanvas() {
    let offCanvas = document.getElementsByClassName('offcanvas')[0];
    return offCanvas;
  }

  function openOffCanvas(element) {
    element.classList.add('open');
    setTimeout(function() {
      document.addEventListener('click', handleNonCanvasClicked);
    }, 100);
    //document.addEventListener('click', handleNonCanvasClicked);

  }

  function closeOffCanvas(element) {
    element.classList.remove('open');

    setTimeout(function() {
      document.removeEventListener('click', handleNonCanvasClicked);
    }, 100);

  }

  function toggleOffCanvas(element) {
    if(element.classList.contains('open'))
      closeOffCanvas(element);
    else
      openOffCanvas(element);
  }

  function offCanvasButtonClicked(e) {
    let offCanvasClassName = this.getAttribute('data-offcanvas');
    let offCanvas = document.getElementsByClassName(offCanvasClassName)[0];

    toggleOffCanvas(offCanvas);
  }

  function handleNonCanvasClicked(e) {
    const offCanvasElement = getOffCanvas();
    let targetElement = e.target;

    do {
      if(targetElement === offCanvasElement) {
        return;
      }
      targetElement = targetElement.parentNode;
    } while(targetElement);

    closeOffCanvas(offCanvasElement);
  }
})();