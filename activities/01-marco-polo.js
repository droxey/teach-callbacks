// 01-marco-polo.js
// Introducing basic callbacks by implementing a simple version of a childhood game.

function getShoutResponse(phrase) {
  if (phrase === "Marco") {
    console.log("Marco? Polo!");
  } else {
    console.log(`${phrase}? Who?!`);
  }
}

function shoutItOut(phrase, respondToShout) {
  respondToShout(phrase);
}

shoutItOut("Marco", getShoutResponse);
shoutItOut("Dani", getShoutResponse);
