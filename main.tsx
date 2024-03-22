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


const
    reactBtn = document.createElement('button'),
    taskArr = Array.from({ length: 1000000 }).map((_, i) => genTask(i + 1)),
    onEnd = () => console.log('end')

reactBtn.textContent = 'React任务调度器方式执行'
document.body.appendChild(reactBtn)

reactBtn.onclick = () => {
    scheduleTask(taskArr, onEnd)
}


function genTask(item: number) {
    return () => {
        const el = document.createElement('div')
        el.textContent = item + ''
        document.body.appendChild(el)
    }
}


/** 一帧 一眼盯帧 */
const TICK = 1000 / 60

/**
 * 类似`React`调度器 在浏览器空闲时 用`MessageChannel`调度任务
 * @param taskArr 任务数组
 * @param onEnd 任务完成的回调
 * @param needStop 是否停止任务
 */
export function scheduleTask(taskArr: Function[], onEnd?: Function, needStop?: () => boolean) {
    let i = 0
    const { port1, port2 } = new MessageChannel()

    port2.onmessage = () => {
        runMacroTasks(hasIdleRunTask)
        start()
    }
    start()


    function start() {
        if (i >= taskArr.length) {
            onEnd?.()
        }
        else {
            port1.postMessage(null)
        }
    }
    function hasIdleRunTask(hasIdle: HasIdle) {
        const st = performance.now()
        while (hasIdle(st)) {
            if (i >= taskArr.length) return

            try {
                taskArr[i++]()
            }
            catch (error) {
                console.warn(`第${i}个任务执行失败`, error)
            }
        }
    }

    /** 放入宏任务执行 并回调***执行时间和开始时间的差值*** */
    function runMacroTasks(hasIdleRunTask: (hasIdle: HasIdle) => void) {
        hasIdleRunTask((st) => performance.now() - st < TICK)
    }
}

type HasIdle = (st: number) => boolean
