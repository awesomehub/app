// .env variables
declare var ENV: {
    APP_ENV: string;
    APP_URL: string;
    API_URL: string;
};

// Material Design Lite typings
interface MdlComponentHandler {
    upgradeDom(optJsClass: string, optCssClass: string): void;
    upgradeElement(element: Element, optJsClass?: string): void;
    upgradeElements(elements: Element | Array<Element> | NodeList | HTMLCollection): void;
    upgradeAllRegistered(): void;
    registerUpgradedCallback(jsClass: string, callback: (data?: any) => void): void;
    register(config: {
        constructor: () => void,
        classAsString: string,
        cssClass: string,
        widget: string | boolean | undefined
    }): void;
    downgradeElements(nodes: Node | Array<Node> | NodeList): void;
}

interface Window {
    componentHandler: MdlComponentHandler;
}
