describe('LearnJS', function() {
  it('can show a prolem view', function() {
    // ^内容, vテスト
    learnjs.showView('#problem-1')
    expect($('.view-container .problem-view').length).toEqual(1)
  })
})
