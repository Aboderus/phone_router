'use strict'

module.exports = {
    format: function(number){
        return new Promise((resolve, reject) => {   
            resolve(number.replace(/\D/g,'').replace(/^0+/g, '')) // first removes everything that's not 0-9 then removes any leading 00 as in: 0046.....
        })
    }
};