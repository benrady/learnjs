var body;

function loadFixture(path) {  
  var html;
  jQuery.ajax({
    url: '/index.html',
    success: function(result) {
      html = result;
    },
    async: false
  });          
  return $.parseHTML(html);
}

function resetBody() {
  if (!body) {
    fixture = $('<div>').append(loadFixture('/index.html'));
    body = $('<div class="fixtureBody" style="display: none">').append(fixture.find('div#markup'));
    $('body').append(body.clone());
  } else {
    $('.fixtureBody').replaceWith(body.clone());
  }
}

beforeEach(function () {
  resetBody();
});
