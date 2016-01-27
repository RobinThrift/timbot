import {expect} from 'chai';
import {register} from '../../dist/commands/rand';
import {createMatchers, match} from '../helper/matcher';

suite('Timbot - Commands - Random', () => {
    let commands;

    suiteSetup((done) => {
        register().then((cmds) => {
            commands = createMatchers(cmds);
            done();
        }).catch(done);
    });

    test('randInt', (done) => {
        new Promise((resolve, reject) => {
            match('randInt 3 10', commands).handler({
                message: {
                    type: 'message',
                    value: {
                        text: 'randInt 3 10'
                    }
                },
                params: {
                    max: '10',
                    min: '3'
                }
            }, resolve, reject);
        }).then((resp) => {
            expect(parseInt(10, resp.text.replace('Here is your random integer, good sir: ', '')))
                .to.be.within(3, 10);
            done();
        }).catch(done);
    });

    test('randDouble', (done) => {
        new Promise((resolve, reject) => {
            match('randDouble 3.4 10.1', commands).handler({
                message: {
                    type: 'message',
                    value: {
                        text: 'randDouble 3.4 10.1'
                    }
                },
                params: {
                    max: '10.1',
                    min: '3.4'
                }
            }, resolve, reject);
        }).then((resp) => {
            expect(parseFloat(resp.text.replace('Here is your random double, good sir: ', '')))
                .to.be.within(3.4, 10.1);
            done();
        }).catch(done);
    });

    test('error when supplied with incorrect parameters', (done) => {
        new Promise((resolve, reject) => {
            match('randInt -3 -6', commands).handler({
                message: {
                    type: 'message',
                    value: {
                        text: 'randInt -3 -6'
                    }
                },
                params: {
                    max: '-6',
                    min: '-3'
                }
            }, resolve, reject);
        }).then((resp) => {
            expect(resp.text).to.equal('Please provide sensible arguments, you little bugger.');
            done();
        }).catch(done);
    });
});
