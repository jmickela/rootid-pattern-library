(function(window, document, $) {
'use strict';
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
// function headerScroll() {
//   let scrollHeight = $(window).scrollTop();
//   let scrollCutoff = 10;
//   let headerLogo = $('.inm-header .headerlogo')[0];
//
//   if(scrollHeight > scrollCutoff) {
//     headerLogo.classList.add('scrolled');
//   }
//
//   if(scrollHeight < scrollCutoff) {
//     headerLogo.classList.remove('scrolled');
//   }
// }
//
// $(document).ready(headerScroll);
// $(window).scroll(headerScroll);


// if(window.location.href.indexOf("localhost:8080") > -1) {
//   console.log("You're using pattern lab!");
//   var logoSource = '/images/INM-color-logo.png';
//   var iconSource = '/images/INM-white-icon.png';
// }
// else {
//   console.log("You're using WordPress!");
//   var logoSource = '/wp-content/uploads/2018/09/INM-color-logo.png';
//   var iconSource = '/wp-content/uploads/2018/09/INM-white-icon.png';
// }

// console.log('logoSource: ');
// console.log(logoSource);
// console.log(typeof(logoSource));

// console.log('iconSource: ');
// console.log(iconSource);

// $(window).scroll(function(iconSource, logoSource) {
//   let scrollHeight = $(window).scrollTop();
//   let scrollCutoff = 10;
//   let headerLogo = $('.inm-header .headerlogo')[0];
// //   let logo = logoSource;
// //   let icon = iconSource
  
// //   console.log('logo: ');
// // console.log(logo);
// // console.log(typeof(logo));

//   if(scrollHeight > scrollCutoff) {
//     headerLogo.classList.add('scrolled');
//     // setTimeout(function(){
//     //   headerLogo.src = icon;
//     // }, 500);
//   }

//   if(scrollHeight < scrollCutoff) {
//     // headerLogo.src = logo;
//     headerLogo.classList.remove('scrolled');
//   }
// });



$('.card1--person').on('click', function() {
  let $wrapper = $(".person-popup__wrapper", this);
  let $content = $(".person-popup", $wrapper);

  if(!$wrapper.hasClass('open')) {
    $wrapper.addClass('open');
  }

  return false;
});

$(".person-popup__wrapper").on('click', function (){
  closePersonPopup();
  return false;
});

$(".person-popup__close").on('click', function () {
  closePersonPopup();
  return false;
});

$(document).keyup(function(e) {
  if (e.keyCode === 27) closePersonPopup();   // esc
});

function closePersonPopup($element) {
  $(".person-popup__wrapper.open").removeClass('open');
}

$('.person-popup').on('click', function(e) {
  e.stopImmediatePropagation();
});
function initializeVideos() {
  let allVideos = $("iframe[src*='//player.vimeo.com'], iframe[src*='youtube.com'], iframe[src*='youtu.be'], iframe[src*='youtube-nocookie.com'], object, embed");

  allVideos.each(function() {

    $(this)
      .attr('data-aspectRatio', this.height / this.width)
      .removeAttr('height')
      .removeAttr('width');
  });
} 

function resizeVideos() {
  let allVideos = $("iframe[src*='//player.vimeo.com'], iframe[src*='youtube.com'], iframe[src*='youtu.be'], iframe[src*='youtube-nocookie.com'], object, embed");
  
  allVideos.each(function() {

    $(this)
      .attr('parentWidth', $(this).parent().width())
      .width($(this).attr('parentWidth'))
      .height($(this).attr('parentWidth') * $(this).attr('data-aspectRatio'));

  });
}

$(document).ready(function () {
  initializeVideos();
  resizeVideos();
  $(window).resize(function() {
    resizeVideos();
  });
});

/*
Ok. This script does a lot of stuff.

* It checks each input to see whether its label is before or after the input and attaches a class of "label-before" or "label-after" to the label so it can be appropriately styled. (Note: labels that wrap around an input are rendered as before, at least in Chrome...)

* It checks the width of all inputs and checks to see whether their width is 100% of the containing element. If so, it attaches a class of "full-width" to both the input and its label.

* It finds each input of type text, email, or password and each textarea and adds a "placeholder" class to input and the matching label. ("Matching" labels can either use the "for" attribute or can wrap around the input.)

* It finds each textarea and adds a "textarea-label" class to its matching label.

* Each time focus is on one of the placeholder inputs a "busy" class is added.

* Each time focus moves away from one of the placeholder inputs, the "busy" class is removed. Meanwhile, if there is text in the input, a "filled" class is added. If there is no content, the "filled" class is removed.
*/



$(document).ready(function() {
  // Find the inputs that need placeholder labels
  let $placeholderInputs = $(
    "form input[type='text'], form input[type='email'], form input[type='password'], form textarea"
  );

  // Add a "placeholder" class to each of those labels
  Array.prototype.forEach.call($placeholderInputs, input => {
    addPlaceholder(input);
  });

  // Find all the textareas
  let $textareas = $("form textarea");

  // Add a "textarea-label" class to each of those labels
  Array.prototype.forEach.call($textareas, textarea => {
    addTextarea(textarea);
  });

  // For each input...
  let $allInputs = $("form input, form textarea");
  Array.prototype.forEach.call($allInputs, input => {
    // check if the label is before or after the input, and add a class to the
    checkIfLabelFirst(input);
    tagFullWidth(input);
  });


  $placeholderInputs
    .on("focus", addBusy)
    .on("blur", removeBusy)
    .on("blur", toggleFilled);
});

$(".webform-submission-form input:not([type=checkbox]), .webform-submission-form textarea")
  .on("focus", addBusy)
  .on("blur", removeBusy)
  .on("blur", toggleFilled);



function addPlaceholder(target) {
  let $label = getLabel(target);
  if ($label !== undefined) {
    $(target).addClass("placeholder");
    $($label).addClass("placeholder");
  }
}

function addTextarea(target) {
  let $label = getLabel(target);
  if ($label !== undefined) {
    $($label).addClass("textarea-label");
  }
}


function toggleFilled(event) {
  let $label = getLabel(event.target);
  if ($label !== undefined) {
    if (event.target.value) {
      $($label).addClass("filled");
    } else {
      $($label).removeClass("filled");
    }
  }
}

function addBusy(event) {
  let $label = getLabel(event.target);
  if ($label !== undefined) {
    $($label).addClass("busy");
  }
}

function removeBusy(event) {
  let $label = getLabel(event.target);
  if ($label !== undefined) {
    $($label).removeClass("busy");
  }
}

function getLabel(target) {
  var $id = target.id;
  if ($id !== undefined && $id !== "") {
    var $label = $("label[for=" + $id + "]");
  }
  if ($label == undefined || $label.length <= 0) {
    var parentElem = $(target).parent(),
      parentTagName = parentElem.get(0).tagName.toLowerCase();

    if (parentTagName == "label") {
      $label = parentElem;
    }
  }
  return $label;
}

function checkIfLabelFirst(target) {
  let $label = getLabel(target);
  if ($label !== undefined) {
    if (typeof $label === 'object' ) {
      $label = $label[0];
    }
    if (compareDocumentPosition(target, $label) == 2) {
      $(target).addClass("label-before");
      $($label).addClass("label-before");
    } else if (compareDocumentPosition(target, $label) == 4) {
      $(target).addClass("label-after");
      $($label).addClass("label-after");
    }
  }
}

function checkIfWidth100(target) {
  let parent = $(target).parent()[0];
  let padding =
    parseInt($(parent).css("padding-left")) +
    parseInt($(parent).css("padding-right"));
  let percent = (
    (target.offsetWidth / (parent.offsetWidth - padding)) *
    100
  ).toFixed(0);

  if (percent == 100) {
    return true;
  } else {
    return false;
  }
}

function tagFullWidth(target) {
  if (checkIfWidth100(target)) {
    $(target).addClass("full-width");
    let $label = getLabel(target);
    if ($label !== undefined) {
      $($label).addClass("full-width");
    }
  }
}

// I got this code from stackoverflow so I could detect whether the label was before or after the input in the DOM. That way I can assign a class for targeted styling.

// https://stackoverflow.com/a/22174695/6412747

// function recursivelyWalk(nodes, cb) {
//   for (var i = 0, len = nodes.length; i < len; i++) {
//     var node = nodes[i];
//     var ret = cb(node);
//     if (ret) {
//       return ret;
//     }
//     if (node.childNodes && node.childNodes.length) {
//       var ret = recursivelyWalk(node.childNodes, cb);
//       if (ret) {
//         return ret;
//       }
//     }
//   }
// }

// function testNodeForComparePosition(node, other) {
//   if (node === other) {
//     return true;
//   }
// }

// var DOCUMENT_POSITION_DISCONNECTED = 1;
// var DOCUMENT_POSITION_PRECEDING = 2;
// var DOCUMENT_POSITION_FOLLOWING = 4;
// var DOCUMENT_POSITION_CONTAINS = 8;
// var DOCUMENT_POSITION_CONTAINED_BY = 16;

// // function compareDocumentPosition(thisNode, other) {
// //     function identifyWhichIsFirst(node) {
// //         if (node === other) {
// //             return "other";
// //         } else if (node === reference) {
// //             return "reference";
// //         }
// //     }

// function compareDocumentPosition(thisNode, other) {
//   function identifyWhichIsFirst(thisNode) {
//     if (thisNode === other) {
//       return "other";
//     } else if (thisNode === reference) {
//       return "reference";
//     }
//   }

//   var reference = thisNode,
//       referenceTop = thisNode,
//       otherTop = other;

//   if (this === other) {
//     console.log("They're the same!");
//     return 0;
//   }
//   while (referenceTop.parentNode) {
//     referenceTop = referenceTop.parentNode;
//   }
//   while (otherTop.parentNode) {
//     otherTop = otherTop.parentNode;
//   }

//   if (referenceTop !== otherTop) {
//     return DOCUMENT_POSITION_DISCONNECTED;
//   }

//   var children = reference.childNodes;
//   var ret = recursivelyWalk(
//     children,
//     function(p) {
//       (function() {
//         var localOther = other;
//         return testNodeForComparePosition(localOther, p);
//       })();
//     }
//   );
//   if (ret) {
//     return DOCUMENT_POSITION_CONTAINED_BY + DOCUMENT_POSITION_FOLLOWING;
//   }

//   var children = other.childNodes;
//   var ret = recursivelyWalk(
//     children,
//     function(p) {
//       (function() {
//         var localOther = reference;
//         return testNodeForComparePosition(localOther, p);
//       })();
//     }
//   );
//   if (ret) {
//     return DOCUMENT_POSITION_CONTAINS + DOCUMENT_POSITION_PRECEDING;
//   }

//   var ret = recursivelyWalk(
//     [referenceTop],
//     identifyWhichIsFirst
//   );
//   if (ret === "other") {
//     return DOCUMENT_POSITION_PRECEDING;
//   } else {
//     return DOCUMENT_POSITION_FOLLOWING;
//   }
// }



function recursivelyWalk(nodes, cb) {
  for (var i = 0, len = nodes.length; i < len; i++) {
    var node = nodes[i];
    var ret = cb(node);
    if (ret) {
      return ret;
    }
    if (node.childNodes && node.childNodes.length) {
      var ret = recursivelyWalk(node.childNodes, cb);
      if (ret) {
        return ret;
      }
    }
  }
}

function testNodeForComparePosition(node, other) {
  if (node === other) {
    return true;
  }
}

var DOCUMENT_POSITION_DISCONNECTED = 1;
var DOCUMENT_POSITION_PRECEDING = 2;
var DOCUMENT_POSITION_FOLLOWING = 4;
var DOCUMENT_POSITION_CONTAINS = 8;
var DOCUMENT_POSITION_CONTAINED_BY = 16;

function compareDocumentPosition(thisNode, other) {
  function identifyWhichIsFirst(node) {
    if (node === other) {
      return "other";
    } else if (node === reference) {
      return "reference";
    }
  }

  var reference = thisNode,
    referenceTop = thisNode,
    otherTop = other;

  if (this === other) {
    return 0;
  }
  while (referenceTop.parentNode) {
    referenceTop = referenceTop.parentNode;
  }
  while (otherTop.parentNode) {
    otherTop = otherTop.parentNode;
  }

  if (referenceTop !== otherTop) {
    return DOCUMENT_POSITION_DISCONNECTED;
  }

  var children = reference.childNodes;
  var ret = recursivelyWalk(children, function(p) {
    (function() {
      var localOther = other;
      return testNodeForComparePosition(localOther, p);
    })();
  });
  if (ret) {
    return DOCUMENT_POSITION_CONTAINED_BY + DOCUMENT_POSITION_FOLLOWING;
  }

  var children = other.childNodes;
  var ret = recursivelyWalk(children, function(p) {
    (function() {
      var localOther = reference;
      return testNodeForComparePosition(localOther, p);
    })();
  });
  if (ret) {
    return DOCUMENT_POSITION_CONTAINS + DOCUMENT_POSITION_PRECEDING;
  }

  var ret = recursivelyWalk([referenceTop], identifyWhichIsFirst);
  if (ret === "other") {
    return DOCUMENT_POSITION_PRECEDING;
  } else {
    return DOCUMENT_POSITION_FOLLOWING;
  }
}

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
$('.expandingsearch__button').on('click', function () {
  var $parent = $(this).parent();

  if ($parent.hasClass('expandingsearch--open') && $('.expandingsearch__input', $parent).val() == '') {
    $parent.removeClass('expandingsearch--open');
    $('.expandingsearch__input', $parent).off( "focus" );
    return false;
  } else if($parent.hasClass('expandingsearch--open')) {
    return true;
  }

  $(this).parent().toggleClass('expandingsearch--open');
  $('.expandingsearch__input', $parent).focus();

  return false;
});
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
$('.dropdownsearch__toggle').on('click', function () {
  var $parent = $(this).parent();

  if(!$parent.hasClass('dropdownsearch--open')) {
    $parent.addClass('dropdownsearch--open');
  } else {
    $parent.removeClass('dropdownsearch--open');
  }

  return false;
});
$(".fliphovercard").hover(function() {
  $(this).addClass('fliphovercard--hover');
},
function() {
  $(this).removeClass('fliphovercard--hover');
});

// $(document).ready(function() {
//   var slider = tns({
//     container: '.cardslider__cards',
//     items: 4,
//     slideBy: 1,
//     autoplay: false,
//     nav: false,
//   });
// });

// $('.cardslider__cards').slick({
//   infinite: true,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   nextArrow: "<a class='slick-next slick-arrow' href='#'><i class='far fa-chevron-right' title='Next'></i></a>",
//   prevArrow: "<a class='slick-prev slick-arrow' href='#'><i class='far fa-chevron-left' title='Previous'></i></a>",
//   responsive: [
//     {
//       breakpoint: 982,
//       settings: {
//         slidesToShow: 2
//       }
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 1
//       }
//     }
//   ]
// });
$('.wp-block-gallery.slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: "<a class='slick-next slick-arrow' href='#'><i class='icon icon-right-open' title='Next'></i></a>",
  prevArrow: "<a class='slick-prev slick-arrow' href='#'><i class='icon icon-left-open' title='Previous'></i></a>",
});
if($('.instagram-feed').length !== 0) {
  $('.instagram-feed').each(function ($index) {
    let username = $(this).attr('data-instagram-username');
    let $that = $(this);

    if(username !== undefined && username !== "") {
      $.get('https://www.instagram.com/' + username, null, function (data) {
        let temp = data.split("window._sharedData = ");
        temp = temp[1].split(";<\/script>");
        const results = JSON.parse(temp[0]);

        for (let i = 0; i < 9; i++) {
          let item = results['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']['edges'][i]['node'];
          let url = item['thumbnail_resources'][0]['src'];
          $that.append("<a class='instagram-feed__item' target='_blank' href='https://www.instagram.com/p/" + item.shortcode + "'><img src='" + url + "' /></a>");
        }
      });
    }
  });
}


// $('.strategicpartnerships__partners').slick({
//   infinite: true,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   nextArrow: "<a class='slick-next slick-arrow' href='#'><i class='far fa-chevron-right' title='Next'></i></a>",
//   prevArrow: "<a class='slick-prev slick-arrow' href='#'><i class='far fa-chevron-left' title='Previous'></i></a>",
//   responsive: [
//     {
//       breakpoint: 1200,
//       settings: {
//         slidesToShow: 4
//       }
//     },
//     {
//       breakpoint: 982,
//       settings: {
//         slidesToShow: 3
//       }
//     },
//     {
//       breakpoint: 850,
//       settings: {
//         slidesToShow: 2
//       }
//     },
//     {
//       breakpoint: 580,
//       settings: {
//         slidesToShow: 1
//       }
//     }
//   ]
// });
})(window, document, jQuery);
