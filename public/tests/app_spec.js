describe('LearnJS', function(){
  it('can show a problem view', () => {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });

  it('shows the landing page view when there is no hash', () => {
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });

  it('passes the hash view parameter to the view function', () => {
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });

  it('invokes the router when loaded', () => {
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  it('subscribes to the hash change event', () => {
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });
})

describe('problem view', function(){
  it('has a title that includes the problem number', () => {
    learnjs.showView('#problem-1');
    var view = learnjs.problemView(1);
    expect(view.find('.title').text()).toEqual('Problem #1');
  });

  it('shows the description', () => {
    learnjs.showView('#problem-1');
    var view = learnjs.problemView(1);
    expect(view.find('[data-name="description"]').text()).toEqual('What is truth?');
  });

  it('shows the problem code', () => {
    learnjs.showView('#problem-1');
    var view = learnjs.problemView(1);
    expect(view.find('[data-name="code"]').text()).toEqual('function problem() {return __;}');
  });
})

describe('answer section', function(){
  it('can check a correct answer by hitting a button', () => {
    learnjs.showView('#problem-1');
    var view = learnjs.problemView(1);

    view.find('.answer').val('true');
    view.find('.check-btn').click();
    expect(view.find('.result').text()).toEqual('Correct!');
  });

  it('reject an incorrect answer', () => {
    learnjs.showView('#problem-1');
    var view = learnjs.problemView(1);

    view.find('.answer').val('false');
    view.find('.check-btn').click();
    expect(view.find('.result').text()).toEqual('Incorrect!');
  });
})