(function () {
  
  // # Monkeypatching for Arrays to have a contains function.
  Array.prototype.contains = function (needle) {
    for (hay in this)
      if(this[hay] === needle)
        return true
    return false
  }
  
  document.addEventListener("DOMContentLoaded", function(event) {
  
    // # Grab the input element.
    var input = document.getElementsByTagName('input')[0],
        output = document.getElementById('content'),
        commands = [
          'man',
          'help',
          'ouroboros'
        ]

    output.appendLine = function (line) {
      var d = document.createElement('p')
      d.innerHTML = line
      this.appendChild(d)
    }
    
    input.focus()

    // # On `enter` keyup:
    input.onkeyup = function (e) {
      if (e.keyCode !== 13) return;

      // ## Shift the page so the CLI is at the top and the output is 90% of the height
      

      // ## Attempt to run the given command
      // ### Break the command down into command and args
      var command = input.value.split(' ')[0],
          args = input.value.substr(command.length + 1).split(' ')

      // ### Determine if command is valid
      // TODO: Investigate -- could this be automatable? Think Seth's bot.
      // If this code could be 'aware' of all the possible runnable commands
      // without needing to manually enumerate them in the commands array...
      output.appendLine('> ' + input.value)
      input.value = ''
      
      if(commands.contains(command))
        run(command, args)

      else {
        output.appendLine('unknown command: ' + command + '.\nType \'help\' for usage.')
      }
    }

    var run = function (command, args) {
      
      switch(command) {
        case 'man':
          man(args)
          break
        case 'help':
          help(args)
          break
        case 'ouroboros':
          ouroboros(args)
          break
        default:
          output.appendLine('Couldn\'t run command `' + command + '`.\nType \'help\' for a list of available commands.')
          break
      }
              
      output.appendLine('&nbsp;')
        
    }
    
    var man = function (args) {
      output.appendLine('man ' + args + '...')
      
      if(args[0] === 'javakat')
        help(args)
      else
        output.appendLine('(man functionality is currently unwritten.)')
    }
    
    var help = function (args) {
      output.appendLine('===== COMMAND LIST =====')
      output.appendLine('man&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;launches a manual page about the topic')
      output.appendLine('ouroboros&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;launches a game of Ouroboros on the page')
      output.appendLine('&lt;member name, handle&gt;&nbsp;&nbsp;&nbsp;&nbsp;brings you to that member\'s personal page')
      output.appendLine('&nbsp;')
      output.appendLine('and `help`, which will print this prompt again.')
    }
    
  })
  
})()