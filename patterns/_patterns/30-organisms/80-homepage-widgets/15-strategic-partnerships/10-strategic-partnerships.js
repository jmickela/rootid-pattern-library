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