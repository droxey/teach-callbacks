var typed = new Typed("#typed", {
  strings: ["Click connect to start the live action callback demonstration..."],
  typeSpeed: 40,
  smartBackspace: true,
  backDelay: 5000,
  loop: true,
  cursorChar: "_"
});

var connection;
var hexCodeHistory = [];

function connectDevice() {
  disconnectDevice();

  Puck.connect(function(c) {
    if (!c) {
      console.error("Couldn't connect --- did you cancel the pairing dialog?");
      return;
    }

    var readLine = function(line) {
      try {
        var isColorChange = line.indexOf("#") !== -1;
        if (isColorChange) {
          var parsedLine = line.split("[J");
          var rgbString = parsedLine[1];
          $("body").css({ "background-color": rgbString });
          addHexCode(rgbString);
        }
      } catch (e) {
        console.error("Exception thrown in connectDevice.readLine:", e);
      }
    };

    var buf = "";
    connection = c;
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

function addHexCode(rgbString) {
  hexCodeHistory.push(rgbString);
}

function disconnectDevice() {
  if (connection) {
    connection.close();
    connection = undefined;
  }
}
