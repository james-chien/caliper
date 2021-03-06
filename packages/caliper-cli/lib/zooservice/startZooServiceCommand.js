/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

const Start = require ('./lib/startZooService');

// enforces singletons
const checkFn = (argv, options) => {

    ['caliper-zooconfig'].forEach((e)=>{
        if (Array.isArray(argv[e])){
            throw new Error(`Option ${e} can only be specified once`);
        }
    });

    return true;
};
module.exports._checkFn = checkFn;
module.exports.command = 'start';
module.exports.describe = 'Start a zookeeper service';
module.exports.builder = function (yargs){
    yargs.options({
        'caliper-zooconfig' : {describe: 'Path to a zookeeper service yaml file.', type: 'string' }
    });
    yargs.usage('caliper zooservice start --caliper-zooconfig ./my-zoo-service.yaml');

    // enforce singletons
    yargs.check(checkFn);

    return yargs;
};

module.exports.handler = (argv) => {
    return argv.thePromise = Start.handler(argv);
};
