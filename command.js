module.exports = {
  cmdReader: function (data) {
    var cmds = data.toString().trim();
    var cmd = cmds.split(' ')[0]
    // remove the newline
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
      case 'echo':
        echo(cmds.slice(cmd.length + 1))
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
  fs.readdir(path, function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      process.stdout.write(file.toString() + "\n");
    })
  });
}

function echo(string) {
  var words = string.split(' ')
  words.forEach(function(word){
    if (word[0] === '$') {
      if (Object.keys(process.env).includes(word.slice(1))){
        string = string.replace(word, process.env[word.slice(1)])
      }
    }
  });
  outIt('echo', string)
}

