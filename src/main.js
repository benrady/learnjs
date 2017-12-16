import riot from 'riot'
import route from 'riot-route'

import './presentation/header/app-header.tag'
import './presentation/whatsnew/whats-news.tag'
import './presentation/beerpubs/beer-pubs.tag'
import './presentation/beerpub/beer-pub.tag'

riot.mount('app-header')

route('/', () => {
  riot.mount('content', 'whats-news')
});
route('/beerpubs', () => {
  riot.mount('content', 'beer-pubs');
});
route('/beerpubs/*', (beerpubId) => {
  riot.mount('content', 'beer-pub', {beerpubId:beerpubId})
})

route.start(true)

