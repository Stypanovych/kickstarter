import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const { abi } = CampaignFactory;
const instance = new web3.eth.Contract(
    abi, 
    '0x7CaaA2b49cAf2c76411ccA2C3D4cF6c9ebAd0c1E'
);
export default instance;