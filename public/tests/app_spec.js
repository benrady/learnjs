describe('LearnJS', function() {
  it('can show a problem view', function() {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });
  it('shows the landing page view when there is no hash', function() {
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });
  it('passes the hash view parameter to the view function', () => {
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });
  describe('problem view', () => {
    it('has a title that includes the problem number', () => {
      let view = learnjs.problemView('1');
      expect(view.find('.title').text().trim()).toEqual('Problem #1');
    });
    it('show the description that binds data', () => {
      let view = learnjs.problemView('1');
      expect(view.find('[data-name="description"]').text().trim()).
          toEqual(learnjs.problems[0].description);
    });
    it('show the problem code that binds data', () => {
      let view = learnjs.problemView('1');
      expect(view.find('[data-name="code"]').text().trim()).
          toEqual(learnjs.problems[0].code);
    });
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
  describe('answer section', () => {
    let view = undefined;
    beforeEach(() => {
      view = learnjs.problemView('1');
    });
    it('can check a correct answer by hitting a button', () => {
      view.find('.answer').val('true');
      view.find('.check-btn').click();
      expect(view.find('.result').text()).toEqual('Correct!');
    });
    it('rejects an incorrect answer', () => {
      view.find('.answer').val('false');
      view.find('.check-btn').click();
      expect(view.find('.result').text()).toEqual('Incorrect!');
    });
  });
});

