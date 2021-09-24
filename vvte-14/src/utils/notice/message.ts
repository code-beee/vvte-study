import { ElMessage } from 'element-plus'

// 正常
const normalMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
  })
}

// 成功
const successMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: 'success',
  })
}

// 警告
const warnMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: 'warning',
  })
}

// 错误
const errorMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: 'error',
  })
}

export { normalMessage, successMessage, warnMessage, errorMessage }
