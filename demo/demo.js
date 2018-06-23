// Why isn't this a normal function call that returns a value?
// It takes time to send the data to Puck.js and get a response back!
// If your code waited for a response then the whole webpage would grind to a halt.
Puck.eval("BTN.read()", function(x) {
  console.log(x);
});
