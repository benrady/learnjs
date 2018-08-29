describe('lambda function', function() {
  var index = require('index')
  var context

  beforeEach(function() {
    context = jasmine.createSpyObj('context', ['succeed'])
    index.dynamodb = jasmine.createSpyObj('dynamodb', ['scan'])
  })

  describe('echo', function() {
    it('returns a result', function() {
      index.echo({}, context)
      expected = ['Hello from the cloud! You sent {}']
      expect(context.succeed).toHaveBeenCalledWith(expected)
    })
  })

  describe('popularAnswers', function() {
    it('requests problems with the given problem number', function() {
      index.popularAnswers({ problemNumber: 42 }, context)
      expect(index.dynamodb.scan).toHaveBeenCalledWith(
        {
          FilterExpression: 'problemId = :problemId',
          ExpressionAttributeValues: { ':problemId': 42 },
          TableName: 'learnjs'
        },
        jasmine.any(Function)
      )
    })

    it('groups answer by minified code', function() {
      index.popularAnswers({ problemNumber: 1 }, context)
      //------------------------first() depends on result
      index.dynamodb.scan.calls.first().args[1](undefined, {
        Items: [
          { answer: 'true' },
          { answer: 'true' },
          { answer: 'true' },
          { answer: '!false' },
          { answer: '!false' }
        ]
      })
      expect(context.succeed).toHaveBeenCalledWith({ true: 3, '!false': 2 })
    })
  })
})
