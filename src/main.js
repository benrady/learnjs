import riot from 'riot'
import route from 'riot-route'

import './presentation/header/app-header.tag'
import './presentation/whatsnew/whats-news.tag'
import './presentation/beershops/beer-shops.tag'


riot.mount('app-header')

route('/', () => {
  riot.mount('content', 'whats-news')
});
route('/beershops', () => {
  riot.mount('content', 'beer-shops');
});


route.start(true)

