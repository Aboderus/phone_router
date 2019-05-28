'use strict'

const format_number = require('./format_number.js');
const Trie = require('./trie.js');
// Bigger testing payload
const operators = require('./operators.js')

// const operators = {
//     a: {
//         1: 0.9,
//         268: 5.1,
//         4: 0.01,
//         46: 0.17,
//         4620: 0.0,
//         468: 0.15,
//         4631: 0.15,
//         4673: 0.9,
//         46732: 1.1
//     },
//     b: {
//         1: 0.92,
//         4: 0.01,
//         44: 0.5,
//         46: 0.2,
//         467: 1.0,
//         48: 1.2
//     }
// }




function mapOperatorTries(operator) {
    let operatorTrie = new Trie();
    Object.entries(operator).map((value) => {
        operatorTrie.add(value[0], value[1]);
    }) 
    return operatorTrie
};

function getIndexesOfOperators(arr, val) {
    // Get all indexes of our best price operators
    let index = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            index.push(i);
    return index;
}

function getBestOperatorNames(indexes, operators){
    // Get all names of the operators with the best price
    let names = [];
    for (let index of indexes) {
        names.push(operators[index].name);
    }   
    return names.toString()
}




format_number.format(process.argv[2]).then((number) => {
    let operatorList = new Array()
    
    Object.entries(operators).map((values) => {
        let operatorTrie = mapOperatorTries(values[1]);
        operatorList.push({name: values[0], prefixList: operatorTrie}) // push operator name and priselist trie to operatorlist
    })
    let startTime = new Date; // start of simple performance comparison, starts after setting up tries as to simulate a running program.
    Promise.all(
        operatorList.map((operator) => {
            return operator.prefixList.matchLongestPrefix(number);
        })
    ).then((operatorBests) => {
        if(
            operatorBests.filter((el) => {
                return !isNaN(el) && el != null;
            }).length == 0
        ){
            console.log('No matching prefixes for number.')
        }else{
            let bestPrice = Math.min.apply(Math, operatorBests.filter((el) => {return !isNaN(el) && el != null}));
            let indexOfBest = getIndexesOfOperators(operatorBests, bestPrice) 
            let bestOperators = getBestOperatorNames(indexOfBest, operatorList)
            console.log('Best match is ', bestPrice, 'in ', bestOperators);
            let endTime = new Date;
            console.log('Took', endTime - startTime); // simple performance comparison
        }
    });
});





  
    






