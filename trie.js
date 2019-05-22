'use strict'

////////////////////////
/// Trie class
////////////////////////

module.exports = class Trie {
    constructor(){
        this.root = new Node();
    }    
    
    add(input, price, node = this.root, total = '') {
        
            if (input.length == 0) {
                node.value = price;
                node.end = true;
                node.input = input;
                node.total = total;
                return;
            } else if (!node.keys.has(input[0])) {
                node.keys.set(input[0], new Node());
                return this.add(input.substr(1), price, node.keys.get(input[0]), total.length == 0 ? input:total);
            } else {
                return this.add(input.substr(1),price, node.keys.get(input[0]), total.length == 0 ? input:total);
            };
        
    };

    matchLongestPrefix(number) {
        return new Promise((resolve, reject) => {
            let node = this.root;
            let price;
            let matchingNr = "";
            while (number.length >= 0) {
                if(!node.keys.has(number[0])) {
                    if(!isNaN(node.value) && node.value != null){
                        price = node.value;
                    }
                    break;
                } else {
                    if(!isNaN(node.value) && node.value != null) price = node.value;
                    node = node.keys.get(number[0]);
                    matchingNr += number[0];
                    number = number.substr(1);
                };
            }
            
            if(price != null){
                resolve(price);
            } else {
                resolve(false); // No match, return false. An endnode should always have end true and an value.
            }
         
        });
    };
}


////////////////////////
/// Node class
////////////////////////
class Node {
    constructor(){
        this.keys = new Map();
        this.value = null;
        this.end = false;
    }

};

