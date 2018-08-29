'use strict'
var learnjs = {
  poolId: 'us-east-1:28809263-2513-47ac-a7ac-cc5bc74fc4af'
}

learnjs.identity = new $.Deferred()

// app started
learnjs.problems = [
  {
    description: 'What is truth?',
    code: 'function problem() {return __;}'
  },
  {
    description: 'Simple Math',
    code: 'function problem() {return 42 === 6 * __;}'
  }
]

learnjs.flashElement = function(elem, content) {
  elem.fadeOut('fast', function() {
    elem.html(content)
    elem.fadeIn()
  })
}

learnjs.triggerEvent = function(name, args) {
  $('.view-container>*').trigger(name, args)
}

learnjs.applyObject = function(obj, elem) {
  for (var key in obj) {
    elem.find('[data-name="' + key + '"]').text(obj[key])
  }
}

learnjs.appOnReady = function() {
  window.onhashchange = function() {
    learnjs.showView(window.location.hash)
  }
  learnjs.showView(window.location.hash)
  learnjs.identity.done(learnjs.addProfileLink)
}

learnjs.addProfileLink = function(profile) {
  var link = learnjs.template('.profile-link')
  link.find('a').text(profile.email)
  $('.signin-bar').prepend(link)
}

learnjs.template = function(name) {
  return $('.templates ' + name).clone()
}

learnjs.profileView = function() {
  var view = learnjs.template('.profile-view')
  learnjs.identity.done(function(identity) {
    view.find('.email').text(identity.email)
  })
  return view
}

learnjs.problemView = function(problemNumber) {
  // copy template
  var parsedNumber = parseInt(problemNumber, 10)
  var problemData = learnjs.problems[parsedNumber - 1]
  var view = learnjs.template('.problem-view')
  var answer = view.find('.answer')

  // set menu
  if (parsedNumber < learnjs.problems.length) {
    var buttonItem = learnjs.template('.skip-btn')
    buttonItem.find('a').attr('href', '#problem-' + (1 * problemNumber + 1))
    $('.nav-list').append(buttonItem)
    view.bind('removingView', function() {
      buttonItem.remove()
    })
  }

  // create result area
  var resultFlash = view.find('.result')

  function checkAnswer() {
    var deferred = $.Deferred()
    //cause side affect to learnjs
    var test = problemData.code.replace('__', answer.val()) + '; problem()'
    var worker = new Worker('/worker.js')
    worker.onmessage = function(e) {
      if (e.data) {
        deferred.resolve(e.data)
      } else {
        deferred.reject()
      }
    }
    worker.postMessage(test)
    return deferred
  }

  var buildCorrectFlash = function(problemNumber) {
    var correctFlash = learnjs.template('.correct-flash')
    var link = correctFlash.find('a')
    if (problemNumber < learnjs.problems.length) {
      link.attr('href', '#problem-' + (1 * problemNumber + 1))
    } else {
      link.attr('href', '') //all problems solved
      link.text("You're finished")
    }
    return correctFlash
  }

  var checkAnswerClick = function() {
    checkAnswer()
      .done(function() {
        var correctFlash = buildCorrectFlash(problemNumber)
        learnjs.flashElement(resultFlash, correctFlash)
        // try put in db
        learnjs.saveAnswer(problemNumber * 1, answer.val())
      })
      .fail(function() {
        learnjs.flashElement(resultFlash, 'Incorrect!')
      })
    return false //prevent rerendering
  }

  // show Q
  view.find('.check-btn').click(checkAnswerClick)
  view.find('.title').text('Problem #' + parsedNumber)
  learnjs.applyObject(problemData, view)

  //show answer count
  learnjs.countAnswer(parsedNumber).then(function(data) {
    if (data.Count) {
      view.find('.answer-count').text(data.Count)
    }
  })

  // show answer if exists
  learnjs.fetchAnswer(parsedNumber).then(function(data) {
    if (data.Item) {
      answer.val(data.Item.answer)
    }
  })

  return view
}

learnjs.landingView = function() {
  return learnjs.template('.landing-view')
}

learnjs.showView = function(hash) {
  var routes = {
    '#profile': learnjs.profileView,
    '#problem': learnjs.problemView,
    '#popular': learnjs.popularView,
    '#': learnjs.landingView,
    '': learnjs.landingView
  }
  var hashParts = hash.split('-')
  var viewFn = routes[hashParts[0]]

  if (viewFn) {
    learnjs.triggerEvent('removingView')
    $('.view-container')
      .empty()
      .append(viewFn(hashParts[1]))
  }
}

learnjs.awsRefresh = function() {
  var deferred = new $.Deferred()
  AWS.config.credentials.refresh(function(err) {
    if (err) {
      deferred.reject(err)
    } else {
      deferred.resolve(AWS.config.credentials.identityId)
    }
  })

  return deferred.promise()
}

function googleSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: learnjs.poolId,
      Logins: {
        'accounts.google.com': id_token
      }
    })
  })

  function refresh() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        prompt: 'login'
      })
      .then(function(userUpdate) {
        var creds = AWS.config.credentials
        var newToken = userUpdate.getAuthResponse().id_token
        creds.params.Logins['accounts.google.com'] = newToken
        return learnjs.awsRefresh()
      })
  }
  learnjs.awsRefresh().then(function(id) {
    learnjs.identity.resolve({
      id: id,
      email: googleUser.getBasicProfile().getEmail(),
      refresh: refresh
    })
  })
}

// data
learnjs.sendAwsRequest = function(req, retry) {
  var promise = new $.Deferred() //what to return *1
  req.on('error', function(error) {
    //error handle;
    if (error.code === 'CredencialsError') {
      learnjs.identity.then(function(identity) {
        return identity.refresh().then(
          function() {
            return retry() // when refreshed identity,retry
          },
          function() {
            promise.reject(resp) //failed case
          }
        )
      })
    } else {
      promise.reject(error) // failed case
    }
  })
  req.on('success', function(resp) {
    promise.resolve(resp.data)
  })
  req.send()
  return promise // *1
}

learnjs.fetchAnswer = function(problemId) {
  return learnjs.identity.then(function(identity) {
    var db = new AWS.DynamoDB.DocumentClient()
    var item = {
      TableName: 'learnjs',
      Key: {
        userId: identity.id,
        problemId: problemId
      }
    }
    return learnjs.sendAwsRequest(db.get(item), function() {
      return learnjs.fetchAnswer(problemId)
    })
  })
}
learnjs.saveAnswer = function(problemId, answer) {
  return learnjs.identity.then(function(identity) {
    var db = new AWS.DynamoDB.DocumentClient()
    var item = {
      TableName: 'learnjs',
      Item: {
        userId: identity.id,
        problemId: problemId,
        answer: answer
      }
    }
    return learnjs.sendAwsRequest(db.put(item), function() {
      return learnjs.saveAnswer(problemId, answer)
    })
  })
}

learnjs.countAnswer = function(problemId) {
  return learnjs.identity.then(function(identity) {
    var db = new AWS.DynamoDB.DocumentClient()
    var params = {
      TableName: 'learnjs',
      Select: 'COUNT',
      FilterExpression: 'problemId = :problemId',
      ExpressionAttributeValues: { ':problemId': problemId }
    }
    return learnjs.sendAwsRequest(db.scan(params), function() {
      learnjs.countAnswer(problemId)
    })
  })
}
learnjs.popularAnswers = function(problemId) {
  return learnjs.identity.then(function(identity) {
    var lambda = new AWS.Lambda()
    var params = {
      FunctionName: 'popularAnswers',
      Payload: JSON.stringify({ problemNumber: problemId })
    }
    return learnjs.sendAwsRequest(lambda.invoke(params), function() {
      return learnjs.popularAnswers(problemId)
    })
  })
}

learnjs.popularView = function(problemNumber) {
  var parsedNumber = parseInt(problemNumber, 10)
  var view = learnjs.template('.popular-view')
  var answers = view.find('.answers')

  //XXX do i need to
  learnjs.popularAnswers(parsedNumber).then(function(data) {
    console.log(data)
    answers.text(JSON.stringify(data.Payload))
  })
  return view
}
