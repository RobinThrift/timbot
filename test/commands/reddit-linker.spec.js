import {expect} from 'chai';
import {register} from '../../dist/commands/reddit-linker';
import {createMatchers, match} from '../helper/matcher';

suite('Timbot - Commands - Reddit Linker', () => {
    let commands;

    suiteSetup((done) => {
        register().then((cmds) => {
            commands = createMatchers(cmds);
            done();
        }).catch(done);
    });

    test('/r/funny transformed into link', () => {
        console.log(match('/r/funny', commands));
    });
});
