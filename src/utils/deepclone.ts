const getType = (data) => {
    return Object.prototype.toString.call(data).slice(8, -1)
}

const TYPE = {
    Object: 'Object',
    Array: 'Array',
    Date: 'Date',
    RegExp: 'RegExp',
    Set: 'Set',
    Map: 'Map',
}


const isComplexDataType=(obj:any)=>{
    return obj instanceof Object || typeof obj === 'function';
}

const deepClone=(value:any,map=new WeakMap())=>{
    // 非复杂的数据类型
    if(!isComplexDataType(value)){
        return value;
    }
    // 防止循环引用
    if(map.has(value)) return map.get(value);

    const constructor=value.constructor;
    const desc=Object.getOwnPropertyDescriptors(value);
    let cloneObj;
    // DATA 和 reg exp
    if(/^(Function|Date|RegExp)$/i.test(constructor.name)){// ^(Function|Date|RegExp|Map|Set)$
        cloneObj=new constructor(value);
        return Object.defineProperties(cloneObj,desc);
 
    }

    // Map
    if(constructor.name === 'Map'){
        cloneObj=new constructor();
        Object.defineProperties(cloneObj,desc);
        value.forEach((key,v) => {
            cloneObj.set(key,deepClone(v,map));
        });
        return cloneObj;
    }

    // set
    if(constructor.name === 'Set'){
        cloneObj=new constructor();
        Object.defineProperties(cloneObj,desc);
        value.forEach((v) => {
            cloneObj.add(deepClone(v,map));
        });
        return cloneObj;
    }

    // 简单的对象 Object or Array
    cloneObj=Object.create(Object.getPrototypeOf(value),desc);
    map.set(value,cloneObj);

    for(let key of Reflect.ownKeys(value)){
        console.log("key:",key);
        cloneObj[key]=deepClone(value[key],map);
    }
    return cloneObj;


}

const _completeDeepClone = (target, map = new Map()) => {
    // 补全代码
    if(target === null || typeof target !== 'object') return target
    const constructor = target.constructor;
    if(/^(Function|Date|RegExp|Map|Set)$/i.test(constructor.name)) return new constructor(target)
    if(map.get(target)) return map.get(target)
    map.set(target, true)
    const clone = Array.isArray(target) ? [] : {}
    for(let key in target) {
        if(Object.hasOwnProperty(key)) {
            clone[key] = _completeDeepClone(target[key])
        }
    }
    return clone
  }


// 测试数据
const data = {
    a: [1, 2, 3],
    b: {foo: 'obj'},  
    c: new Date('2019-08-28'),
    d: /^abc$/g,
    e: function ab() {},
    f: new Set([1, 2, 3]),
    g: new Map([['foo', 'map']]),
}
const res=deepClone(data);
console.log(res.a=== data.a);
console.log(res.b === data.b);
console.log(res.c === data.c);
console.log(res.d === data.d);
console.log(res.e === data.e);
console.log(res.f === data.f);
console.log(res.g === data.g);
  