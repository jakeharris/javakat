(function () {
  
  // # Monkeypatching for Arrays to have a contains function.
  Array.prototype.contains = function (needle) {
    for (hay in this)
      if(this[hay] === needle)
        return true
    return false
  }
  
  // # Grab the input element.
  var input = document.getElementsByTagName('input')[0],
      output = document.getElementById('content'),
      commands = [
        'man',
        'help',
        'ouroboros'
      ]
  
  
  // # On `enter` keyup:
  input.onkeyup = function (e) {
    if (e.keyCode !== 13) return;
    
    // ## Shift the page so the CLI is at the top and the output is 90% of the height
    
    
    // ## Attempt to run the given command
    // ### Break the command down into command and args
    var command = input.value.split(' ')[0],
        args = input.value.substr(command.length).split(' ')
    
    // ### Determine if command is valid
    // TODO: Investigate -- could this be automatable? Think Seth's bot.
    // If this code could be 'aware' of all the possible runnable commands
    // without needing to manually enumerate them in the commands array...
    console.log('command: ' + command)
    
    if(commands.contains(command))
      run(command)
      
    else
      output.appendChild(document.createElement('p').innerHTML('unknown command: ' + command + '.\nType \'help\' for usage.'))
    
  }
  
  var run = function (command) {
     
  }
  
})()