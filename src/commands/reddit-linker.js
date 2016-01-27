export function register() {
    return new Promise((resolve) => {
        resolve([
            {
                pattern: /\/?r\/[A-Za-z0-9]+/i,
                handler: (req, res, reject) => {
                    if (req.message.type !== 'message') {
                        return reject(new Error(`message not of type message, recieved ${req.message.type}`));
                    }
                    let msg = req.message.value.text;
                    let matches = /\/?(r\/[A-Za-z0-9]+)/i.exec(msg);
                    if (!matches) {
                        return reject(new Error('no reddit link found'));
                    }

                    res({
                        text: 'https://reddit.com/' + matches[1]
                    });
                }
            }
        ]);
    });
}

