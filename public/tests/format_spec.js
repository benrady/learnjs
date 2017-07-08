// var formattedProblems = [];
// learnjs.problem.forEach(function(problem) {
//   formattedProblems.push({
//     code: learnjs.formatCode(problem.code),
//     name: problem.name
//   });
// });
// return formattedProblems;
return learnjs.problems.map(learnjs.formatCode);
