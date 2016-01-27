import {merge, find} from 'lodash';

function createMatcher(value = '') {
    if (value instanceof RegExp) {
        return value;
    }

    const expr = value.replace(/:[a-zA-Z]+\(([^\)]*)\)/g, '($1)');
    return new RegExp(`^${expr}$`);
}

export function createMatchers(cmds) {
    return cmds.map((cmd) => {
        return merge(cmd, {pattern: createMatcher(cmd.pattern)});
    });
}

export function match(message, cmds) {
    return find(cmds, (cmd) => {
        return cmd.pattern.test(message);
    });
}

