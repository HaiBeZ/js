class SuperTask {
    //首先我们来定义一下需要的东西
    constructor(parallelCount = 2) {
        this.parallelCount = parallelCount; //并发数量
        this.runningCount = 0; //正在运行的任务数
        this.tasks = [];//任务队列
        this.result=[]
    }

    addMutiTask(arrParam,maxNum=2){
      return  new Promise((resolve) => {
            // 无任务数据时
            if(!arrParam.length){
                resolve([]);
                return;
            }
            const results = []; // 最终的结果集合，用于保存接口返回的信息
            let index = 0; // 用于记录下一个接口下标
            let count = 0; // 用于记录发送了多少条数据
            
    
            const request = async () => {
                if(index === arrParam.length) return; // 出口
                const i = index; // 当前下标（备份）
                // 组装请求路径与参数
                // const url = arrParam[i].url;
                // const param = arrParam[i].data;
                const task= arrParam[i];
                index++; // 预先记录下一个请求的下标
                try{
                    // 发送请求
                    // const resp = await dispatchSqlGuardSwitchProcess(url, param);
                    const resp=await task;
                    results[i] = resp; // 记录返回结果
                } catch( error ){
                    results[i] = error;
                } finally {
                    count++ ; // 当前接口完成，下一个接口调用开始
                    if(count === arrParam.length){ // 全部任务池中的接口都调用完毕
                        resolve(results)
                    }
                    request(); // 继续下一个请求
                }    
            }
            
            // 初始化请求数
            const maxParallelRequests = Math.min(maxNum, arrParam.length);
            for(let i = 0; i < maxParallelRequests; i++){
                request()
            }
             
        })
    }


    //通过需求代码得知，我们需要一个add函数，这个函数要返回一个Promise
    add(task) {
        return new Promise((resolve, reject) => {
            /*
            这里不能直接task()，有可能当前正在运行的异步任务已经到达两个了,那我们就给他全部放到tasks中
            为什么要带上resolve和reject呢？
            下面_run函数在处理调用，但是add函数的Promsie结束不了啊，我们就需要把他们一起放进任务队列来供_run函数使用
            */
            this.tasks.push({ task, resolve, reject});
            //单独写一个_run函数来处理调用
            this._run()
        });
    }
    //依次运行tasks队列里的所有任务
    _run() {
        //依次执行队列里的所有任务，当然要满足我们的需求，当前任务的数量要小于并发数量
        while (this.runningCount < this.parallelCount && this.tasks.length) {
            //拿到任务队列中的第一个任务，并把原任务队列中的第一个任务删除。
            const { task, resolve, reject } = this.tasks.shift();
            //当前运行任务增加进行记录
            this.runningCount++;
            //对异步任务进行调用
            task()
                .then(resolve, reject)
                .finally(() => {
                    //每运行完一个任务，减少当前运行任务，重新启动_run函数运行下一个任务
                    this.runningCount--;
                    this._run();
                });
        }
    }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(()=>{
        resolve(time)
    }, time);
  });


const superTask = new SuperTask(1);
function addTask(time, name) {
    superTask
        .add(() => timeout(time))
        .then((res) => {
            console.log(`任务${res} ${name}完成`);
        });
}
// addTask(1000, 1);
// addTask(500, 2);
// addTask(300, 3);
// addTask(400, 4);
// addTask(500, 5);




superTask.addMutiTask([ timeout(1000),timeout(2000),timeout(1000)]).then(res=>console.log(res))
