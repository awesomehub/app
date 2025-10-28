// Material Design Lite typings
interface MdlComponentHandler {
  upgradeDom(optJsClass: string, optCssClass: string): void
  upgradeElement(element: Element, optJsClass?: string): void
  upgradeElements(elements: Element | Element[] | NodeList | HTMLCollection): void
  upgradeAllRegistered(): void
  registerUpgradedCallback(jsClass: string, callback: (data?: any) => void): void
  registerUpgradedCallback(
    jsClass: 'MaterialLayout',
    callback: (
      data?: HTMLDivElement & { MaterialLayout?: Record<'content_' | 'drawer_' | 'header_', HTMLDivElement> },
    ) => void,
  ): void
  register(config: {
    constructor: () => void
    classAsString: string
    cssClass: string
    widget: string | boolean | undefined
  }): void
  downgradeElements(nodes: Node | Node[] | NodeList): void
}

interface Window {
  componentHandler: MdlComponentHandler
}
