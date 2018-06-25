var connection;
var hexCodeHistory = [];
var typed = new Typed("#typed", {
  typeSpeed: 40,
  cursorChar: "_",
  backDelay: 5000,
  loop: true,
  strings: ["Click connect to start the live-action callback demo..."]
});

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
          hexCodeHistory.push(`${rgbString}`);
          resetTyped(
            "Callback executed!\n^200 `Received color: " + rgbString + "`"
          );
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

    resetTyped("Connected to device!");
  });
}

function resetTyped(newLines) {
  if (newLines === undefined || newLines.length === 0) {
    return;
  }

  if (typed && typed.constructor === Typed) {
    typed.destroy();
  }

  var strings = [`${newLines}`];
  typed = new Typed("#typed", {
    typeSpeed: 40,
    cursorChar: "_",
    strings: strings
  });
}

function disconnectDevice() {
  if (connection) {
    connection.close();
    connection = undefined;
  }
}
