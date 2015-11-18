
export const config = {
    token: process.env.SLACK_TOKEN,
    autoReconnect: true,
    autoMark: true,

    messageOptions: {
        listenToGeneralChannel: false,
        requireMention: true,
        noMentionInDM: true,
    },

    commands: [
        {
            pattern: /hello/g,
            responder: function(req) {
                return '';
            }
        }
    ]
};
