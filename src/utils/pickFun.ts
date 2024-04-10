// 测试用例
const obj = {
    a: "A",
    b: "B",
    c: {
        d: "D",
    },
};
// 函数第一
function PickFunc<T, K extends keyof T>(obj: T, keys: K[]): { [P in K]: T[P] } {
    return Object.assign({}, ...keys.map(key => ({ [key]: obj[key] }))) as { [P in K]: T[P] };
}

const pickedObj = PickFunc(obj, ['a', 'c']);
console.log(pickedObj);
console.log(JSON.stringify(PickFunc(obj, ["a", "c"])) === `{"a":"A","c":{"d":"D"}}`);




