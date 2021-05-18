import { useEffect, useState } from 'react'

export const isFalsy = (value) => (value === 0 ? false : !value)

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// const debounce = (func, delay) => {
//   let timeout
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(function () {
//       func(...param)
//     }, delay)
//   }
// }
// const log = debounce(() => console.log('call'), 5000)
// 一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
// log() // timeout #1
// log() // 发现 timeout#1! 取消之，然后设置timeout#2
// log() // 发现 timeout#2! 取消之，然后设置timeout#3
// 所以，log()#3 结束后，就只剩timeout#3在独自等待了

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次在value变化后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
