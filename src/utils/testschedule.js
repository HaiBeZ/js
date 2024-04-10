import { unstable_scheduleCallback } from 'scheduler';

new Promise((resolve)=>{
    console.log("Promise");
    resolve(111);
}).then(()=>console.log("then"))
unstable_scheduleCallback(1,()=>{
    console.log("hgh-test");
})
console.log("11111")