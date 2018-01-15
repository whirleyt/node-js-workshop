module.exports = {
  cmd: function (data) {
    var cmd = data.toString().trim(); // remove the newline
    if (cmd === 'pwd') {
      process.stdout.write('pwd: ' + process.cwd())
    } else if (cmd === 'date') {
      process.stdout.write('date: ' + new Date().toString())
    }
    //process.stdout.write('You typed: ' + cmd);
    process.stdout.write('\nprompt > ');
  }
}
