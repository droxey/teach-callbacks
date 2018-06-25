// 02-marco-polo-refactor.js
// Introducing anonymous functions, closures, and lexical scope.

function shoutItOut(phrase) {
  return function() {
    if (phrase === "Marco") {
      console.log(`${phrase}? Who?!`);
    } else {
      console.log(`${phrase} who?!`);
    }
  };
}

shoutItOut("Marco")();
shoutItOut("Dani")();
