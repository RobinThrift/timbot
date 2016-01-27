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

    test('/r/funny transformed into link', (done) => {
        new Promise((resolve, reject) => {
            match('/r/funny', commands).handler({
                message: {
                    type: 'message',
                    value: {
                        text: '/r/funny'
                    }
                }
            }, resolve, reject);
        }).then((resp) => {
            expect(resp.text).to.equal('https://reddit.com/r/funny');
            done();
        }).catch(done);
    });

    test('r/funny transformed into link', (done) => {
        new Promise((resolve, reject) => {
            match('r/funny', commands).handler({
                message: {
                    type: 'message',
                    value: {
                        text: 'r/funny'
                    }
                }
            }, resolve, reject);
        }).then((resp) => {
            expect(resp.text).to.equal('https://reddit.com/r/funny');
            done();
        }).catch(done);
    });

    test('find reddit link in a message', (done) => {
        new Promise((resolve, reject) => {
            match('hey, have you heared of /r/funny?', commands).handler({
                message: {
                    type: 'message',
                    value: {
                        text: 'hey, have you heared of /r/funny'
                    }
                }
            }, resolve, reject);
        }).then((resp) => {
            expect(resp.text).to.equal('https://reddit.com/r/funny');
            done();
        }).catch(done);
    });

    test('no false positives', (done) => {
        new Promise((resolve, reject) => {
            match('carter/funny', commands).handler({
                message: {
                    type: 'message',
                    value: {
                        text: 'yeah I know, funny, isn\'t it?'
                    }
                }
            }, resolve, reject);
        }).then((resp) => {
            done(new Error('Found response, where there should not be one: ' + resp));
        }).catch((e) => {
            done();
        });
    });
});
