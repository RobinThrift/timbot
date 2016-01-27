import {random} from 'lodash';

function randNumberFactory(floating) {
    return (req, res) => {
        if (req.message.type !== 'message') {
            return;
        }

        let max = (floating) ? parseFloat(req.params.max) : parseInt(10, req.params.max);
        let min = (floating) ? parseFloat(req.params.min) : parseInt(10, req.params.min);

        if (max < min || max < 0 && min < 0) {
            res.text('Please provide sensible arguments, you little bugger.');
        } else {
            res.text(`Here is your random ${(floating) ? 'double' : 'integer'}, good sir: ` + random(min, max, false));
        }

        res.send();
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

