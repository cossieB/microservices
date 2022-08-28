"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(arr) {
    let localCopy = [...arr];
    let shuffledArray = [];
    while (localCopy.length > 0) {
        let index = Math.floor(Math.random() * localCopy.length);
        let elems = localCopy.splice(index, 1);
        shuffledArray = shuffledArray.concat(elems);
    }
    return shuffledArray;
}
exports.default = default_1;
