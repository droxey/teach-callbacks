var connection;

function connectDevice() {
  if (connection) {
    connection.close();
    connection = undefined;
  }

  var readLine = function(line) {
    try {
      var j = JSON.parse(line);
      console.log("Received JSON: ", j);
    } catch (e) {
      console.log("Received: ", line);
    }
  };

  Puck.connect(function(c) {
    if (!c) {
      console.error("Couldn't connect --- did you cancel the pairing dialog?");
      return;
    }

    connection = c;
    var buf = "";
    connection.on("data", function(d) {
      buf += d;
      var i = buf.indexOf("\n");
      while (i >= 0) {
        readLine(buf.substr(0, i));
        buf = buf.substr(i + 1);
        i = buf.indexOf("\n");
      }
    });
  });
}

function writeLine(cmd) {
  connection.write("reset();\n", function() {
    setTimeout(function() {
      connection.write(
        `setInterval(function(){Bluetooth.println(${cmd});},500);NRF.on('disconnect', function() {reset()});\n`,
        function() {
          console.log("Ready...");
        }
      );
    }, 1500);
  });
}
