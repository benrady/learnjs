/*
var formattedProblems = [];
learnjs.problems.forEach(function(problem) {
  formattedProblems.push({
    code: learnjs.formatedCode(problem.code),
    name: problem.name
  });
});

return formattedProblems;
*/

return learnjs.problems.map(learnjs.formatedCode);
