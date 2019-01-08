(function(window, document, $) {
'use strict';
$(".navmenu-offcanvas .menu-item .dropdown-toggle").on('click', function () {

  $(this).closest('.navmenu-offcanvas .menu-item').toggleClass('open');
});
$(document).ready(function () {
  
  $('.expandingsearch__button').on('click', function () {
    var $parent = $(this).parent();

    if ($parent.hasClass('expandingsearch--open') &&
        $('.expandingsearch__input', $parent).val() == '') {
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

});


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
function headerScroll() {
  let scrollHeight = $(window).scrollTop();
  let scrollCutoff = 10;
  let headerLogo = $('.inm-header .headerlogo')[0];

  if(scrollHeight > scrollCutoff) {
    headerLogo.classList.add('scrolled');
  }

  if(scrollHeight < scrollCutoff) {
    headerLogo.classList.remove('scrolled'); 
  }
}

$(document).ready(headerScroll);
$(window).scroll(headerScroll);


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


// $(document).ready(function() {
//   var slider = tns({
//     container: '.cardslider__cards',
//     items: 4,
//     slideBy: 1,
//     autoplay: false,
//     nav: false,
//   });
// });

$('.cardslider__cards').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: "<a class='slick-next slick-arrow' href='#'><i class='far fa-chevron-right' title='Next'></i></a>",
  prevArrow: "<a class='slick-prev slick-arrow' href='#'><i class='far fa-chevron-left' title='Previous'></i></a>",
  responsive: [
    {
      breakpoint: 982,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
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


$('.strategicpartnerships__partners').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: "<a class='slick-next slick-arrow' href='#'><i class='far fa-chevron-right' title='Next'></i></a>",
  prevArrow: "<a class='slick-prev slick-arrow' href='#'><i class='far fa-chevron-left' title='Previous'></i></a>",
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 982,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});
})(window, document, jQuery);