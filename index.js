
const UI = require('./libs/ui');
const Core = require('./libs/core');

class Plugin {
  constructor(opt) {
    new UI()
    .onGenerate((argv) => {
        return new Core(argv);
    });
  }
}

module.exports = Plugin;
