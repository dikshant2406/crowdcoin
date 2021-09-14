const fs = require('fs-extra') ;
const solc = require('solc') ;
const path = require('path') ;

const buildpath = path.resolve(__dirname , 'build') ;
fs.removeSync( buildpath ) ;

const campaignPath = path.resolve(__dirname , 'contracts' , 'Campaign.sol') ;
const source = fs.readFileSync(campaignPath , 'utf8') ;
const output = solc.compile(source , 1).contracts ;

console.log(output) ;
fs.ensureDirSync(buildpath) ;

for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildpath, contract.replace(':' , '') + '.json') , 
        output[contract] 
    ) ;
}