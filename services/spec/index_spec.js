describe('lambda function', function() {
  var index = require('index');
  var context;

  beforeEach(function() {
    context = jasmine.createSpyObj('context', ['succeed']);
  });

  describe('echo', function() {
    it('returns a result', function() {
      index.echo({}, context);
      expected = ["Hello from the cloud! You sent {}"];
      expect(context.succeed).toHaveBeenCalledWith(expected);
    });
  });
});
