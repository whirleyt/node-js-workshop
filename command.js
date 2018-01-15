module.exports = {
  cmdReader: function (data) {
    var cmds = data.toString().trim();
    var cmd = cmds.split(' ')[0]
    var fileName = cmds.slice(cmd.length + 1)
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
        echo(fileName)
        break;
      case 'cat':
        cat(fileName)
        break;
      case 'head':
        head(fileName)
        break;
      case 'tail':
        tail(fileName)
        break;
      default:
        rePrompt();
        break;
    }
  }
}

function rePrompt() {
  process.stdout.write('\nprompt > ');
}

var fs = require('fs');

function outIt(cmd, val) {
  process.stdout.write(`${cmd}: ${val}`)
  rePrompt();
}
function pwd(fileName) {
  outIt('pwd', process.cwd())
}

function date(fileName) {
  outIt('date', new Date().toString())
}
function ls(path) {
  fs.readdir(path, function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      process.stdout.write(file.toString() + "\n");
    })
    process.stdout.write('\nprompt > ');
  });
}

function echo(string) {
  var words = string.split(' ')
  words.forEach(function (word) {
    if (word[0] === '$') {
      if (Object.keys(process.env).includes(word.slice(1))) {
        string = string.replace(word, process.env[word.slice(1)])
      }
    }
  });
  outIt('echo', string)
}

function cat(fileName) {
  fs.readFile(fileName, function (err, data) {
    if (err) throw err;
    outIt('cat', data)
  })
}


function head(fileName) {
  fs.readFile(fileName, function (err, data) {
    if (err) throw err;
    var array = data.split('\n').slice(0, 10)
    array.forEach(function (line) {
      process.stdout.write(line + '\n')
    })
    rePrompt()
  })
}

function tail() {

}