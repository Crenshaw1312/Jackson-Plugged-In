const { Plugin } = require('powercord/entities');
const commands = require('./commands');
const Settings = require('./Settings');

module.exports = class Jackson extends Plugin {

    startPlugin () {
        this.registerMain();

        powercord.api.settings.registerSettings('Jackson-Plugged-In', {
          category: this.entityID,
          label: 'Jackson',
          render: Settings
        });
    }

    pluginWillUnload () {
      powercord.api.settings.unregisterSettings('Jackson-Plugged-In')
      powercord.api.commands.unregisterCommand('jack')
    }

    registerMain () {
        powercord.api.commands.registerCommand({
          command: 'jack',
          description: 'Use Jackson commands',
          usage: '{c} <truth|dare> [rating]',
          executor: (args) => {
            // Running the subcommand
            const subcommand = commands[args[0]]
            // invalid subcommand
            if (!subcommand) {
              return {
                send: false,
                result: `\`${args[0] || " "}\` is not a valid subcommand`
              };
            }
            
            // actually running the command
            return subcommand.executor(args.slice(1), this)
          },
          // autocomplete table
          autocomplete: (args) => {
            if (args[0] !== void 0 && args.length === 1) {
              return {
                commands: Object.values(commands).filter(({ command }) => command.includes(args[0].toLowerCase())),
                header: 'Jackson subcommands'
              };
            }
    
            const subcommand = commands[args[0]];
            if (!subcommand || !subcommand.autocomplete) {
              return false;
            }
    
            return subcommand.autocomplete(args.slice(1), this.settings)
          }
        });
      }

}