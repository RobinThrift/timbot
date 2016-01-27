export function register() {
    return new Promise((resolve) => {
        resolve([
            {
                pattern: /\/?r\/[A-Za-z0-9]+/gi,
                handler: (req, res) => {
                    if (req.message.type !== 'message') {
                        return;
                    }
                    let msg = req.message.value.text;
                    let matches = /\/?(r\/[A-Za-z0-9]+)/.exec(msg);
                    if (!matches) {
                        return;
                    }

                    res.text('https://reddit.com/' + matches[1]);
                    return res.send();
                }
            }
        ]);
    });
}

