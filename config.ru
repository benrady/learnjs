require 'rack'
require 'rack-rewrite'
require 'rack-livereload'

use Rack::Rewrite do
  rewrite('/', '/index.html')
end
use Rack::LiveReload
run Rack::Directory.new(Dir.pwd + "/public")
