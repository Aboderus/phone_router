'use strict'

const format_number = require('./format_number.js');
// Bigger testing payload
const operators = require('./operators_map.js')

// let operators = {
//     a: new Map([
//         ['1', 0.9],
//         ['268', 5.1],
//         ['4', 0.01],
//         ['46', 0.17],
//         ['4620', 0.0],
//         ['468', 0.15],
//         ['4631', 0.15],
//         ['4673', 0.9],
//         ['46732', 1.1],
//         ['4673200000', 0.000005]
//     ]),
//     b: new Map([
//         ['1', 0.92],
//         ['4', 0.01],
//         ['44', 0.5],
//         ['46', 0.2],
//         ['467', 1.0],
//         ['48', 1.2]
//     ])
// }

function bestMatchingForOperator(operator, number){
    // Finds longest prefix by operating on number maxlength
    return new Promise((resolve, reject) => {
      let maxLen = number.length;
      let hit;
      while(maxLen > 0 && typeof(hit) == "undefined"){
        if (operators[operator].has(number.substr(0, maxLen))) hit = operators[operator].get(number.substr(0, maxLen));
        maxLen--;
      }
      if(typeof(hit) == "undefined"){
          resolve(false);
      }else{
        resolve({operator: operator, hit: hit}); 
      }
    });
}

function findBestOperators (results){
    // sort by hit value and then push names of operators that the have lowest price.
    let names = [];
    let price;
    results.sort(function(a, b) {
        return a.hit - b.hit;
    });
    price = results[0].hit;
    results.map((operator) =>{
        if (operator.hit == price) names.push(operator.operator);
    });
    return {operators: names.toString(), price: price}
};

// Simulate program input, format number.
 format_number.format('+00046 7321 23 45').then((number) => {
    let startTime = new Date;
    Promise.all(
        Object.keys(operators).map((operator) => {
        return bestMatchingForOperator(operator, number);
        })
    ).then((result) => {                            // Filter misses
        let validResults = result.filter((el) => {
            return !isNaN(el.hit);
        });
        if(validResults.length == 0){
            console.log('No matches');
        }else{
            let cheapestMatch = findBestOperators(result);
            console.log("Cheapest operator was: "+cheapestMatch.operators+" With a price of: "+ cheapestMatch.price);
            let endTime = new Date;
            console.log('Took', endTime - startTime); // simple performance comparison
        }
    });
});