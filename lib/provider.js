'use babel';

import { EventEmitter } from 'events';

import meta from '../package.json';

export const config = {
  buildPath: {
    title: 'Build Path',
    description: 'Set path to dart interpreter',
    type: 'string',
    'default': 'dart',
    order: 0
  },
  customArguments: {
    title: 'Custom Arguments',
    description: 'Set custom arguments for executing',
    type: 'string',
    'default': '',
    order: 1
  }
};

export function activate() {
  
}

export function provideBuilder() {
  return class DartProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-cmd.customArguments', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'Command Prompt';
    }

    isEligible() {
      return true;
    }

    settings() {
      const cwdPath = '{FILE_ACTIVE_PATH}';

      const args = [
        '{FILE_ACTIVE}'
      ];

      const customArguments = atom.config.get(meta.name + '.customArguments').trim().split(' ');
      const buildPath = atom.config.get(meta.name + '.buildPath');

      return [
        {
          name: 'Dart',
          exec: buildPath,
          args: args,
          cwd: cwdPath,
          sh: false,
          atomCommandName: 'dart:run-script'
        }
      ];
    }
  };
}
