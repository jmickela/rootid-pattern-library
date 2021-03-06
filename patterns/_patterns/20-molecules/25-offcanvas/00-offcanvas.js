(function() {
  let offCanvasButtons = document.querySelectorAll('[data-offcanvas]');
  if(offCanvasButtons.length === 0)
    return;

  let offCanvasClassName = offCanvasButtons[0].getAttribute('data-offcanvas');
  let offCanvasCloseButton = document.querySelector('.offcanvas__header .offcanvas__close');

  offCanvasCloseButton.addEventListener('click', function() {
    let offCanvas = document.getElementsByClassName(offCanvasClassName)[0];
    closeOffCanvas(offCanvas);
  });

  for(var i = 0; i < offCanvasButtons.length; i++) {
    offCanvasButtons[i].addEventListener('click', offCanvasButtonClicked);
  }

  function getOffCanvas() {
    return document.getElementsByClassName(offCanvasClassName)[0];
  }

  function openOffCanvas(element) {
    element.classList.add('open');
    document.getElementsByTagName('body')[0].classList.add('offcanvas-open');

    setTimeout(function() {
      document.addEventListener('click', handleNonCanvasClicked);
    }, 100);
  }

  function closeOffCanvas(element) {
    element.classList.remove('open');
    document.getElementsByTagName('body')[0].classList.remove('offcanvas-open');

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
    if(e.path.indexOf(getOffCanvas()) !== -1)
      return;

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