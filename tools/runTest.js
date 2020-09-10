let NODE_ENV = process.env.NODE_ENV;
import { execSync } from 'child_process';  // replace ^ if using ES modules


switch (NODE_ENV) {
    case "test": {
        console.log("test env! run testim.io");
        break;
    }
    case "production": {
        const output = execSync('mocha ./test/**/*.spec.js', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);
        break;
    }
    default: {
        throw new Error(`Unknown env: ${NODE_ENV}`);
    }
}
