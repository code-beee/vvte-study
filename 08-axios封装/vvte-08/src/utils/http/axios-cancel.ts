import axios, { AxiosRequestConfig, Canceler } from "axios"

// ↓取消axios请求类
export class AxiosCancel {
  // ↓挂起请求map，key=请求识别号，value=请求取消器
  private pendingMap = new Map<string, Canceler>()

  // ↓生成请求key
  genPendingKey(config: AxiosRequestConfig): string {
    return [config.method, config.url].join('&')
  }

  // ↓添加挂起请求
  addPending(config: AxiosRequestConfig) {
    const pendingKey = this.genPendingKey(config)
    console.log('addPending: ', pendingKey)
    // ↓实例化取消令牌，构造函数执行器接受一个取消函数
    config.cancelToken = new axios.CancelToken((canceler) => {
      if (!this.pendingMap.has(pendingKey)) {
        this.pendingMap.set(pendingKey, canceler);
      }
    })
  }

  // ↓移除挂起请求
  removePending(pendingKey: string) {
    console.log('removePending: ', pendingKey)
    this.pendingMap.delete(pendingKey)
  }

  // ↓清空挂起请求
  clearPending() {
    this.pendingMap.forEach((value, key) => {
      this.cancelRequest(key)
    })
    this.pendingMap.clear()
  }

  // ↓取消请求
  cancelRequest(pendingKey: string): boolean {
    if (this.pendingMap.has(pendingKey)) {
      console.log('cancelRequest: ', pendingKey)
      const canceler = this.pendingMap.get(pendingKey)
      // TODO 魔法值需配置化
      canceler && canceler('重复请求被取消')
      return false
    }
    return true;
  }

}