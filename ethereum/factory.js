import web3 from './web3' ;
import CampaignFactory from './build/CampaignFactory.json' ;

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface) , 
    '0xA01b63A97ecF413d35fE6ADbcC3b22fA0f9A985a'
) ;

export default instance ;