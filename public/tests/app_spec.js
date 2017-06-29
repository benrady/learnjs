describe('LearnJS', fuction() {
  if('can show a problem view', fuction() {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });
});
