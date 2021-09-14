const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require('./build/CampaignFactory.json') ;

const provider = new HDWalletProvider(
  "believe inside young mammal because trim success need patient smoke sunset solve",
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/f46e617f801e49b48b7898b821777173"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts) ;

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0], gasPrice: '500000000000' });

//   console.log(interface) ;
  console.log("Contract deployed to", result.options.address);
};
deploy();