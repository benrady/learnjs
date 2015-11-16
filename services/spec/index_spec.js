describe('lambda function', function() {
  var index = require('index');
  var context;

  beforeEach(function() {
    context = jasmine.createSpyObj('context', ['done', 'fail']);
  });

  describe('fetchPopularAnswers', function() {
    it('returns a result', function() {
      index.fetchPopularAnswers({}, context);
      expect(context.done).toHaveBeenCalled();
    });
  });
});
