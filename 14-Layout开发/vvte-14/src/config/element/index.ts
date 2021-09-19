import { App } from 'vue'
import {
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElFooter,
  ElInput,
  ElButton,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
  ElAvatar,
} from 'element-plus'

const components = [
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElFooter,
  ElInput,
  ElButton,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
  ElAvatar,
]

export function useElementComponents(app: App): void {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
