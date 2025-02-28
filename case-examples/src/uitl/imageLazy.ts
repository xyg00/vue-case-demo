
const LazyLoad = {
  // install方法
  install(Vue : any, options : any) {
    // 代替图片的loading图
    let defaultSrc = options.default
    Vue.directive('lazy', {
      bind(el : any, binding : any) {
        LazyLoad.init(el, binding.value, defaultSrc)
      },
      inserted(el : any) {
        // 兼容处理
        if ('IntersectionObserver' in window) {
          LazyLoad.observe(el)
        } else {
          LazyLoad.listenerScroll(el)
        }
      },
    })
  },
  // 初始化
  init(el : any, val : any, def : any) {
    // data-src 储存真实src
    el.setAttribute('data-src', val)
    // 设置src为loading图
    el.setAttribute('src', def)
  },
  // 利用IntersectionObserver监听el
  observe(el : any) {
    let io = new IntersectionObserver((entries) => {
      let realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    })
    io.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el : any) {
    let handler = LazyLoad.throttle(LazyLoad.load, 300)
    LazyLoad.load(el)
    window.addEventListener('scroll', () => {
      handler(el)
    })
  },
  // 加载真实图片
  load(el : any) {
    let windowHeight = document.documentElement.clientHeight
    let elTop = el.getBoundingClientRect().top
    let elBtm = el.getBoundingClientRect().bottom
    let realSrc = el.dataset.src
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  },
  // 节流
  throttle(fn : any, delay : any) {
    let timer : any
    let prevTime : any
    return  (...args : any) => {
      let currTime = Date.now()
      let context = this
      if (!prevTime) prevTime = currTime
      clearTimeout(timer)

      if (currTime - prevTime > delay) {
        prevTime = currTime
        fn.apply(context, args)
        clearTimeout(timer)
        return
      }

      timer = setTimeout(function () {
        prevTime = Date.now()
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  },
}
export default LazyLoad
