const EthereumLib = require('./EthereumLib');
const ContractLib = require('./../core/contracts/ethereum/apostille/ContractLib');
const DateConverter = require('../core/helpers/DateConverter');
let Validator = require('../core/utilites/Validator');
let Logger = require('../core/utilites/Logger')
let keccakLib = require('keccak');
const PdfHelper = require('../core/services/PdfHelper')
const FileService = require('../core/services/FileService')
let template_1 = require('../document_templates/template_1.js');
let template_2 = require('../document_templates/template_3.js');
let template_3 = require('../document_templates/template_2.js');
let template_4 = require('../document_templates/template_4.js');

let templates = {
    1:template_1,
    2:template_2,
    3:template_3,
    4:template_4
};
class ClientApplication{
    constructor(){
        this.initialized = false;
        this.logger = new Logger();
        this.validator = new Validator();
        this.dateConverter = new DateConverter();
        this.fileService = new FileService(this)
        //new code
        this.protocols = {};
        this.eth = new EthereumLib(this);
        this.contract = new ContractLib(this);
        this.keccakLib = keccakLib;
        this.templates = {};
        this.templates = templates;
        this.pdfHelper = new PdfHelper();
    }  

init(){
    return new Promise(async(resolve,reject)=>{
        try{
            await this.contract.init();
            this.initialized = true;
            console.log('Application is ready');
            return resolve(true);
        }catch(e){
            return reject(e)
        }
    })
}
isReady(){
    return this.initialized;
}
    addApostille(_hash,_tag,privKey){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(await this.contract.addApostille(_hash,_tag,privKey))
            }catch(e){
                return reject(e);
            }
        })
    }
    getAllApostilles(_owner){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(await this.contract.getAllApostilles(_owner))
            }catch(e){
                return reject(e);
            }
        })
    }
    verify(_hash,_owner){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(await this.contract.verify(_hash,_owner))
            }catch(e){
                return reject(e);
            }
        })
    }
    getApostille(_hash){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(await this.contract.getApostille(_hash))
            }catch(e){
                return reject(e);
            }
        })
    }


    getDocumentTemplate(key){
        return this.templates[key];
    }
    getAddress(){
        let privKey = getPrivateKey();
        return application.eth.getAddressFromPrivKey(privKey);
    }
    getSha256(string){
        return new Promise(async(resolve,reject)=>{
            try{
                let hash = await application.eth.defaultProvider.utils.soliditySha3(string);
                //web3.utils.soliditySha3(
                return resolve(hash);
            }catch(e){
                return reject(e);
            }
        })
    }
    getBase64(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }
    getBase64FromFile(file) {
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(this.fileService.readUploadedFile(file));
                // var reader = new FileReader();
                // reader.readAsDataURL(file);
                // reader.onload = function () {
                //     return resolve(reader.result);
                // };
                // reader.onerror = function (error) {
                //     throw error;
                // };
            }catch(e){
                return reject(e);
            }
        })
    }

    htmlToPdf(text){
        return this.pdfHelper.htmlToPdf(text);
    }

}

module.exports = ClientApplication;