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
