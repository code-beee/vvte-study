import { App } from 'vue'
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElInput,
  ElButton,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
  ElAvatar,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElRadioGroup,
  ElRadioButton,
} from 'element-plus'

const components = [
  ElContainer,
  ElHeader,
  ElMain,
  ElInput,
  ElButton,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElRadioGroup,
  ElRadioButton,
]

import { CaretBottom, Expand, Fold } from '@element-plus/icons'

const icons = [Fold, Expand, CaretBottom]

export function useElementComponents(app: App): void {
  components.forEach((component) => {
    app.component(component.name, component)
  })

  icons.forEach((icon) => {
    app.component(icon.name, icon)
  })
}
