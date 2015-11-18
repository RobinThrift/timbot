
import SlackRobot from 'slack-robot';

function main(config) {
    let bot = new SlackRobot(config, config.messageOptions);

    config.commands.forEach((cmd) => {
        let listener = bot.listen(cmd.pattern);

        if (cmd.channels) {
            listener = listener.acl((req) => {
                console.log(req);
                if (cmd.channels.indexOf(req.channel.name) !== -1) {
                    return true;
                }

                return false;
            });
        }

        listener.handler(cmd.responder);
    });
}


import {defaultConfig} from './defaultConfig';
main(defaultConfig);
