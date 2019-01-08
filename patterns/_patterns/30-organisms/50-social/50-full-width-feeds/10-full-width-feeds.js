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

