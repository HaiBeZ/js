const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

class SuperTask {
  constructor(max = 2) {
    this.max = 2;
    this.count = 0;
    this.tasks = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this._run();
    });
  }

  _run() {
    while (this.count < this.max && this.tasks.length) {
      const { task, reject, resolve } = this.tasks.shift();
      this.count++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.count--;
          this._run();
        });
    }
  }
}

const superTask = new SuperTask();
function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}
console.time("soluction")
addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
addTask(500, 5);
console.timeEnd("soluction")
