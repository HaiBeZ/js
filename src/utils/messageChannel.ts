const channel = new MessageChannel();
const {port1,port2}=channel;

setTimeout(()=>{
    console.log("setTimeout11111");
},0)

port1.postMessage({data:'2222'});

port2.onmessage=((res:any)=>{
    console.log(res);
})


setTimeout(()=>{
    console.log("setTimeout22222");
},0)


console.log("212222")
new Promise((resolve)=>{
    console.log("11111");
    resolve('33333')
});