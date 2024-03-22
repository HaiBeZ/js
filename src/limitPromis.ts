

const Task = (time: number): Promise<string> => {
    return new Promise((resolve, rejected) => {
        setTimeout(() => {
            resolve(`task has done in ${time} ms`)
        }, time)
    })
}

const limitPromise = (reqList: Promise<string>[], limitedNum: number) => {
    return new Promise((resolve) => {
        let i = -1;
        let result: string[] = [];
        const maxLen = reqList.length;
        const next = () => {
            ++i;
            console.log("i:",i,limitedNum,maxLen);
            if(i >= maxLen){
                return;
            }
            reqList[i].then(res => {
                console.log(res);
                result.push(res);
                if (result.length === maxLen) {
                    resolve(result)
                } else {
                    next()
                }

            });

        }
        for (let index = 1; index <= Math.min(limitedNum,maxLen); index++) {
            next();
        }

    })
}

console.time("demo");
const res = await limitPromise([Task(1000), Task(2000), Task(3000),Task(3000)], 1);
console.log(res);
console.timeEnd("demo");