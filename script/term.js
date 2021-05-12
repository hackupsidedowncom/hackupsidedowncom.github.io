//	Setup the terminal
const terminal = new Terminal({ cursorBlink: "block" })

const colours = { 'black': '30', 'red': '31', 'green': '32', 'yellow': '33', 'blue': '34', 'magenta': '35', 'cyan': '36', 'lightGray': '37', 'gray': '90', 'lightRed': '91', 'lightGreen': '92', 'lightYellow': '93', 'lightBlue': '94', 'lightMagenta': '95', 'lightCyan': '96', 'white': '97' }
const bgColours = { 'black': '40', 'red': '41', 'green': '42', 'yellow': '43', 'blue': '44', 'magenta': '45', 'cyan': '46', 'lightGray': '47', 'gray': '100', 'lightRed': '101', 'lightGreen': '102', 'lightYellow': '103', 'lightBlue': '104', 'lightMagenta': '105', 'lightCyan': '106', 'white': '107' }

//	Ref: https://dev.to/ifenna__/adding-colors-to-bash-scripts-48g4
const colour = (col) => '\u001b['+colours[col]+'m'
const colourEnd = () => '\33[0m'

const lines = [
	`${colour('lightRed')   }██   ██ ██████  ██   ██ ██   ██${colour('lightGreen') }     ██████  ██████  ███    ███ ${colourEnd()}`,
	`${colour('magenta')    } ██  ██      ██ ██   ██ ██   ██${colour('cyan')       }    ██      ██    ██ ████  ████ ${colourEnd()}`,
	`${colour('blue')       }  █████      ██ ███████ ███████${colour('blue')       }    ██      ██    ██ ██ ████ ██ ${colourEnd()}`,
	`${colour('cyan')       } ██  ██      ██ ██   ██ ██   ██${colour('magenta')    }    ██      ██    ██ ██  ██  ██ ${colourEnd()}`,
	`${colour('lightGreen') }██   ██ ██████   █████  ██   ██${colour('lightRed')   } ██  ██████  ██████  ██      ██ ${colourEnd()}`
]

//	Simple animation for logo
let timeout = 200
lines.forEach(line => setTimeout(() => terminal.write(line + '\r\n'), timeout+=100))

const shell = new XtermJSShell.default(terminal)

shell
.command('help', async (shell) => {
	await shell.printLine(`Try running one of these commands:\r\n${shell.commands.map((command) => ` - ${command}`).join('\n')}`)
})

.command('ls', async (shell, args) => {
	terminal.write('This is ʞɔɐɥ.com - you can do anything at ʞɔɐɥ dot com!' + '\r\n')
})

terminal.open(document.getElementById('term'))

//	Wait for the logo intro animation
setTimeout(() => {
	terminal.write('\n')
	// Start the Read-Eval-Print-Loop
	shell.repl()

	terminal.focus()
}, 800)