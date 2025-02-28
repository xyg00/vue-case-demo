function throttle(func: Function, wait: number) {
  let timeout: any
  return function (this: any, ...args: any[]) {
    if (!timeout) {
      func.apply(this, args)
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
    }
  }
}

// // 表单提交处理函数
// function handleSubmit(event: Event) {
//     event.preventDefault();
//     console.log("表单已提交");
// }

// // 使用 throttle 函数包装表单提交处理函数
// const throttledSubmit = throttle(handleSubmit, 2000);

// // 获取表单元素并添加提交事件监听器
// const form = document.querySelector('form');
// if (form) {
//     form.addEventListener('submit', throttledSubmit);
// }
