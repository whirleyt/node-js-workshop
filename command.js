module.exports = {
  cmdReader: function (data) {
    var cmd = data.toString().trim(); // remove the newline
    switch (cmd) {
      case 'pwd':
        pwd();
        break;
      case 'date':
        date();
        break;
      case 'ls':
        ls('.');
        break;
      default:
        break;
    }
    process.stdout.write('\nprompt > ');
  }
}

var fs = require('fs');

function outIt(cmd, val) {
  process.stdout.write(`${cmd}: ${val}`)
}
function pwd() {
  outIt('pwd', process.cwd())
}

function date() {
  outIt('date', new Date().toString())
}
function ls(path) {
  fs.readdir(path, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      process.stdout.write(file.toString() + "\n");
    })
  });
}

