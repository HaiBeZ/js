import {createHash} from 'crypto';
import * as fs from 'fs-extra';
import {rollup} from 'rollup';

export const createContentHash=(content:string):string=>{
    const hash=createHash('md5');
    hash.update(content);
    return hash.digest('hex');
}

console.log(createContentHash('d'));
console.log(createContentHash('d'));

