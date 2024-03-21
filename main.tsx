// const server = Bun.serve({
//     port: 3000,
//     fetch(...argus) {
//       console.log(argus.length);
//       return new Response("Welcome to Bun!11112222");
//     },
//   });
//   console.log(`Listening on localhost:${server.port}`);

// function DefaultValue(value: any) { return (target: any, key: string) => { target[key] = value; }; } 
// class MyClass {
//    @DefaultValue(42) myProperty: number; 
// } 
// const instance = new MyClass();
// console.log(instance.myProperty); // Output: 42



const rewritetConsole=()=> {
   const consoleLog = console.log
   console.log = (...args: any[]) => {
     // const now = dayjs().format('YYYY-MM-DD HH:mm:ss:SSS')
     consoleLog.apply(console, [`${new Date().getTime()} [info]`, ...args])
   }
 }
 
 rewritetConsole();
 console.log("HAHAHA")