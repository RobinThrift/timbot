import SlackRobot from 'slack-robot';
import requireDir from 'require-dir';
import {defaults, map} from 'lodash';

function generalHandler(handler) {
    return function(req, res) {
        if (handler.directOnly && req.to.type !== 'message') {
            return;
        }

        if (handler.requireMention && !req.message.value.mentioned) {
            return;
        }

        if (handler.ignoreChannels && handler.ignoreChannels.indexOf(req.to.name) !== -1) {
            return;
        }

        return new Promise((resolve, reject) => {
            handler.handler(req, resolve, reject);
        }).then((resp) => {
            if (resp.text) {
                res.text(resp.text);
            }

            if (resp.attachment) {
                res.text(resp.attachment.text, resp.attachment.data);
            }

            if (resp.upload) {
                res.text(resp.upload.name, resp.upload.data);
            }

            if (resp.reaction) {
                res.reaction(resp.reaction);
            }

            return res.send();
        }).catch((e) => {
            console.error(e);
        });
    };
}

let defaultConfig = {
    token: null,
    ignore: '',
    commands: false
};

function main(argv) {
    let config = defaults({}, argv, defaultConfig);
    let bot = new SlackRobot(config.token);

    config.ignore.split(',').forEach((channel) => {
        bot.ignore('#' + channel);
    });

    let commandFiles = requireDir((config.commands) ? config.commands : './commands');

    let registers = map(commandFiles, (command) => {
        return command.register(config);
    });

    Promise.all(registers).then((commands) => {
        commands.forEach((listeners) => {
            listeners.forEach((listener) => {
                bot.listen(listener.pattern, generalHandler(listener));
            });
        });

        bot.start();
    }).catch((e) => { throw e; });
}

import yargs from 'yargs';
let argv = yargs.argv;

main(argv);
