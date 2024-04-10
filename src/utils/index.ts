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


function useDebounce(fn, delay, dep = []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(function () {
      current.fn = fn;
    }, [fn]);
  
    return useCallback(function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn(...args);
      }, delay);
    }, dep)
}


function useThrottle(fn, delay, dep = []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(function () {
      current.fn = fn;
    }, [fn]);
  
    return useCallback(function f(...args) {
      if (!current.timer) {
        current.timer = setTimeout(() => {
          delete current.timer;
        }, delay);
        current.fn(...args);
      }
    }, dep);
  }
  