'use strict';
const patters = require('../patterns');
const xRegExp  = require('xregexp');

let createEntities = (str,pattern) =>{
    return xRegExp.exec(str,xRegExp(pattern,"i"));
}

let matchPattern = (str, cb) => {
    let getResult = patters.find(item=>{
        if(xRegExp.test(str, xRegExp(item.pattern,"i"))){
            return true;
        }
    });
    if(getResult){
        return cb({
            intent :getResult.intent,
            entities : createEntities(str, getResult.pattern)
        });
    }else{
        return cb({});
    }
}
module.exports = matchPattern;
