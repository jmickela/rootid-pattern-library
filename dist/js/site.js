(function(window, document, $) {
'use strict';
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

})(window, document, jQuery);
