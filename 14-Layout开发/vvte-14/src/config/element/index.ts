import { App } from 'vue'
import { ElContainer, ElAside, ElHeader, ElMain, ElFooter, ElInput, ElButton } from 'element-plus'

const components = [ElContainer, ElAside, ElHeader, ElMain, ElFooter, ElInput, ElButton]

export function useElementComponents(app: App): void {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
