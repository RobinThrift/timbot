export const defaultConfig = {
    token: process.env.SLACK_TOKEN,
    autoReconnect: true,
    autoMark: true,

    messageOptions: {
        listenToGeneralChannel: false,
        requireMention: true,
        noMentionInDM: true
    },

    commands: [
        {
            channels: ['general', 'random'],
            pattern: 'hello',
            responder: (req, res) => {
                return res.reply('Hello There');
            }
        }
    ]
};
