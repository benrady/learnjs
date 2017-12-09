import riot from 'riot'
import route from 'riot-route'
// import './tags/app.tag'
// import './tags/md.tag'

import './tags/header.tag'
import './tags/whatsnew/whats-news.tag'
import './tags/beer-shops.tag'
import './tags/subpage.tag'

// riot.mount('app')
route.base('/')

riot.mount('header')



route('/beershops', () => {
  riot.mount('content', 'whats-news')
});
route('/', () => {
  riot.mount('content', 'beer-shops');
});
route('/page2/sub', () => {
  riot.mount('content', 'subpage');
});


route.start(true)

