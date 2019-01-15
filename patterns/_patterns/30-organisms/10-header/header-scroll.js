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

