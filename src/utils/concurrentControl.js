const concurrentControl = (arrParam, maxNum = 10) => 
	new Promise((resolve) => {
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
            const url = arrParam[i].url;
            const param = arrParam[i].data;
            index++; // 预先记录下一个请求的下标
            try{
                // 发送请求
                const resp = await dispatchSqlGuardSwitchProcess(url, param);
                result[i] = resp; // 记录返回结果
            } catch( error ){
                result[i] = error;
            } finally {
                count++ ; // 当前接口完成，下一个接口调用开始
                if(count === arrParam.length){ // 全部任务池中的接口都调用完毕
                    resolve(results)
                }
                request()(); // 继续下一个请求
            }    
        }
        
        // 初始化请求数
        const maxParallelRequests = Math.min(maxNum, arrParam.length);
        for(let i = 0; i < maxParallelRequests; i++){
            request()
        }
         
    })
