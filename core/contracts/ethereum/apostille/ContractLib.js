const ContractBuilder = require('./../EthContractBuilder')
const ContractData = require('./ContractData.js')
class ElectionsLib{
	constructor(app){
        this.app = app;
        this.eth = app.eth;
        this.validator=app.validator;
        this.logger = app.logger;
        this.contractBuilder = new ContractBuilder(app);
        this.httpProvider=this.eth.httpProvider;
        this.wsProvider = this.eth.wsProvider;
        this.provider = this.eth.provider;
        this.admin = this.eth.admin;
	}
    init(){
        return new Promise(async(resolve,reject)=>{
            try{
                this.contractData = new ContractData();
                this.contract = await this.contractBuilder.build(
                        this.contractData.getAddress(),
                        this.contractData.getAbi(),
                        this.contractData.getRecommendedProvider(),
                    );
                // this.getAllCandidates().then((data)=>{
                //     console.log(data)
                //     return resolve(data)
                // })
                return resolve(true);
            }catch(e){
                return reject(e)
            }
        })
    }

    addApostille(_hash,_tag='MyApostille',privKey){
        let address = this.eth.getAddressFromPrivKey(privKey);   
        _tag = this.eth.defaultProvider.utils.fromAscii(_tag);
        return new Promise(async(resolve,reject)=>{
            let params=this.eth.formatTransactionParams(
                        address,
                        this.contract.address,
                        privKey,
                        '0',
                        10,
                        300000,
                        this.contract.methods.addApostille(_hash,_tag).encodeABI()
                        );
            let txHash = await this.eth.makeTransaction(params);
            return resolve(txHash); 
        })
    }
    getApostille(_hash){
        return new Promise(async(resolve,reject)=>{
            try{
                let rawResult = await this.contract.methods.getApostille(_hash).call();
                let result = {
                    tag:this.eth.defaultProvider.utils.toAscii(rawResult[0]),
                    hash:_hash,
                    owner:rawResult[1],
                    timestamp:this.app.dateConverter.toDatetime(rawResult[2])
                }
                return resolve(result);
            }catch(e){
                return reject(e)
            }
        });
    }
    getAllApostilles(address){
        return new Promise(async(resolve,reject)=>{
            try{
                let rawApostilles = await this.getApostillesOfUser(address);
                let apostilles = {};

                for(let key in rawApostilles){
                    let apostilleData = await this.getApostille(rawApostilles[key]);
                    apostilles[rawApostilles[key]]=apostilleData;
                }
                return resolve(apostilles)
            }catch(e){
                return reject(e);
            }         
        })        
    }
    getApostillesOfUser(address){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.contract.methods.getApostillesOfUser(address).call();
                return resolve(result);
            }catch(e){
                return reject(e)
            }
        });
    }
    verify(_hash,_owner){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.contract.methods.verify(_hash,_owner).call();
                return resolve(result);
            }catch(e){
                return reject(e)
            }
        });
    }
}

module.exports = ElectionsLib;