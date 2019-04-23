const axios = require("axios");
const chalk = require('chalk');

/**
 * This varible is the filed in the returned object knowing if it is expected.
 */
let judged = require("./config").judged; 

/**
 * Get the command line arguments
 * 1. Load which section, section file is saved in config folder
 * 2. The command, which is the key name of api object in config file
 * 3. The argument, decide concerte test of specilized API
 */
let section = process.argv[2];
const configure = require(`./config/${section}`);

let command = process.argv[3];
command = command.toLowerCase();

let argument = process.argv[4] || "default";
argument = argument.toLowerCase();

/**
 * Make command and argument unsensitive to upper or lower case 
 * @param {object} configure
 * @return {object} ApiMap 
 */
const formApiMap = function (configure) {
    const copy = function(ApiMap,configure){
        Object.keys(configure).forEach((command) => {
            ApiMap[command.toLowerCase()] = {};
            let lowerCommand = command.toLowerCase();
            Object.keys(configure[command]).forEach((argument) => {
                let lowerArgument = argument.toLowerCase();
                ApiMap[lowerCommand][lowerArgument] = configure[command][argument];
            })
        })
        return ApiMap;
    }
    return copy({},configure);
}
const ApiMap = formApiMap(configure);

/**
 * Run the request
 * @param {object} req   This is the block in the JSON config in which is a url and its relatives
 * @param {object} axios
 * @return {object}  result.data , This is the data returned
 */
const send = async (req, axios) => {
    let result = await axios[req.method](req.url, req.data).catch((error) => {
        console.error(error.message);
        return false;
    });
    return result.data;
}

/**
 * Send the request
 * Display the result
 * @param {object} block This is the block in the JSON config in which is a url and its relatives
 * @param {object} axios
 * @return {boolean} if request is success 
 */
const requestAndDisplay = async function(block,axios){
    console.info('\r');
    console.info(chalk.cyan(`${block.description}:`));
    console.info(chalk.magenta(block.method.toUpperCase()) + `  ${block.url}`)
    let result = await send(block, axios).catch((error)=>{
        console.error(error.message);
        return false;
    });
    if (result !== undefined) {
        if(block.expected !== result[judged]){
            console.log(chalk.red('Someting go wrong...'))
            console.dir(result);
        }else{
            console.dir(result);
        }
    }
    console.info('\r');
    return true;
}

/**
 * MAIN PROGRAM
 */
const main = async ()=>{
    if (ApiMap[command]) {
        if (argument === "loop") {
            for (let key in ApiMap[command]) {
                await requestAndDisplay(ApiMap[command][key],axios);
            }
        } else {
            if (ApiMap[command][argument]) {
                await requestAndDisplay(ApiMap[command][argument],axios);
            } else {
                console.error("Unknow argument");
            }
        }
    } else {
        console.error("Unknown Command");
    }
}
main();

/**
 * Catch global unhandled promise rejection
 */
process.on('unhandledRejection', (reason) => {
    console.error(reason);
})

