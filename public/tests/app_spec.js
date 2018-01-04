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
      expect(view.find('.result').text().trim()).
          toEqual('Correct! Next Problem');
    });
    it('rejects an incorrect answer', () => {
      view.find('.answer').val('false');
      view.find('.check-btn').click();
      expect(view.find('.result').text().trim()).toEqual('Incorrect!');
    });
  });
  describe('navigation', () => {
    it('have a next problem', () => {
      let correctFlash = learnjs.buildCorrectFlash(1);
      expect(correctFlash.text().trim()).toEqual('Correct! Next Problem');
      expect(correctFlash.find('a').attr('href')).toEqual('#problem-2');
    });
    it('finished', () => {
      let correctFlash = learnjs.buildCorrectFlash(learnjs.problems.length);
      expect(correctFlash.text().trim()).toEqual('Correct! You\'re Finished!');
      expect(correctFlash.find('a').attr('href')).toEqual('');
    });
  });
  describe('application shell', () => {
    it('landing page link on toolbar', () => {
      let link = $('.nav-container > ul a:contains("LearnJS")');
      expect(link.attr('href')).toEqual('#');
    });
    it('start link on toolbar', () => {
      let link = $('.nav-container > ul a:contains("Start")');
      expect(link.attr('href')).toEqual('#problem-1');
    });
    it('not have skip link on toolbar in landing page', () => {
      learnjs.showView('');
      let link = $('.nav-container > ul a:contains("Skip This Problem")');
      expect(link.length).toEqual(0);
    });
    it('have skip link on toolbar in problem view', () => {
      learnjs.problemView('1');
      let link = $('.nav-container > ul a:contains("Skip This Problem")');
      expect(link.attr('href')).toEqual('#problem-2');
    });
    it('not have skip link on toolbar in final problem view', () => {
      learnjs.problemView(learnjs.problems.length);
      let link = $('.nav-container > ul a:contains("Skip This Problem")');
      expect(link.length).toEqual(0);
    });
  });
});

