import {random, isNaN} from 'lodash';

function randNumberFactory(floating) {
    return (req, resolve, reject) => {
        if (req.message.type !== 'message') {
            reject();
        }

        let max = (floating) ? parseFloat(req.params.max) : parseInt(req.params.max, 10);
        let min = (floating) ? parseFloat(req.params.min) : parseInt(req.params.min, 10);

        if (max < min || max < 0 && min < 0 || isNaN(max) || isNaN(min)) {
            resolve({
                text: 'Please provide sensible arguments, you little bugger.'
            });
        } else {
            resolve({
                text: `Here is your random ${(floating) ? 'double' : 'integer'}, good sir: ` + random(min, max, false)
            });
        }
    };
}

export function register() {
    return new Promise((resolve) => {
        resolve([
            {
                pattern: 'randInt :min([0-9\-]+) :max([0-9\-]+)',
                handler: randNumberFactory(false)
            },
            {
                pattern: 'randDouble :min([0-9\.\-]+) :max([0-9\.\-]+)',
                handler: randNumberFactory(true)
            }
        ]);
    });
}

