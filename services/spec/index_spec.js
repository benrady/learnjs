describe('lambda function', function() {
  var index = require('index');
  var context;

  beforeEach(function() {
    context = jasmine.createSpyObj('context', ['succeed']);
  });

  describe('fetchPopularAnswers', function() {
    it('returns a result', function() {
      index.fetchPopularAnswers({}, context);
      expected = ["Hello from the cloud! You sent {}"];
      expect(context.succeed).toHaveBeenCalledWith(expected);
    });
  });
});
