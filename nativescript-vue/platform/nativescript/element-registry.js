const elementMap = new Map

class ViewMeta {
    constructor(options = {}) {
        this.skipAddToDom = options.skipAddToDom || false
        this.isUnaryTag = options.isUnaryTag || false
    }
}

// class VueView extends View {
//     constructor(name, meta) {
//         super()
//         this.nodeType = 0
//         this.nodeName = name
//         this.templateParent = null
//         this.meta = meta
//     }
// }
const camelCaseSplit = /([a-z0-9])([A-Z])/g;

export function registerElement(elementName, resolver, meta) {
    if (elementMap.has(elementName)) {
        throw new Error(`Element for ${elementName} already registered.`)
    }

    const entry = {resolver: resolver, meta: meta}
    elementMap.set(elementName.toLowerCase(), entry)
    elementMap.set(elementName.replace(camelCaseSplit, "$1-$2").toLowerCase(), entry);

    // console.log(`Element ${elementName} has been registered!`)
}

export function getViewClass(elementName) {
    const entry = elementMap.get(elementName.toLowerCase())

    if (!entry) {
        throw new TypeError(`No known component for element ${elementName}.`)
    }

    try {
        return entry.resolver();
    } catch (e) {
        throw new TypeError(`Could not load view for: ${elementName}. ${e}`)
    }
}

export function getViewMeta(nodeName) {
    let meta = new ViewMeta()
    const entry = elementMap.get(nodeName.toLowerCase())

    if (entry && entry.meta) {
        meta = entry.meta;
    }

    return meta;
}

export function isKnownView(elementName) {
    return elementMap.has(elementName.toLowerCase())
}

// registerElement("stack-layout", () => require('ui/layouts/stack-layout').StackLayout);
// registerElement("Label", () => require("ui/label").Label);
// registerElement("Button", () => require("ui/button").Button);
// registerElement("TextField", () => require("ui/text-field").TextField);

registerElement("AbsoluteLayout", () => require("ui/layouts/absolute-layout").AbsoluteLayout);
registerElement("ActivityIndicator", () => require("ui/activity-indicator").ActivityIndicator);
registerElement("Border", () => require("ui/border").Border);
registerElement("Button", () => require("ui/button").Button);
registerElement("ContentView", () => require("ui/content-view").ContentView);
registerElement("DatePicker", () => require("ui/date-picker").DatePicker);
registerElement("DockLayout", () => require("ui/layouts/dock-layout").DockLayout);
registerElement("GridLayout", () => require("ui/layouts/grid-layout").GridLayout);
registerElement("HtmlView", () => require("ui/html-view").HtmlView);
registerElement("Image", () => require("ui/image").Image);
registerElement("img", () => require("ui/image").Image);
registerElement("Label", () => require("ui/label").Label);
registerElement("ListPicker", () => require("ui/list-picker").ListPicker);
registerElement("ListView", () => require("ui/list-view").ListView);
registerElement("Page", () => require("ui/page").Page);
registerElement("Placeholder", () => require("ui/placeholder").Placeholder);
registerElement("Progress", () => require("ui/progress").Progress);
registerElement("ProxyViewContainer", () => require("ui/proxy-view-container").ProxyViewContainer);
registerElement("Repeater", () => require("ui/repeater").Repeater);
registerElement("ScrollView", () => require("ui/scroll-view").ScrollView);
registerElement("SearchBar", () => require("ui/search-bar").SearchBar);
registerElement("SegmentedBar", () => require("ui/segmented-bar").SegmentedBar);
registerElement("SegmentedBarItem", () => require("ui/segmented-bar").SegmentedBarItem);
registerElement("Slider", () => require("ui/slider").Slider);
registerElement("StackLayout", () => require("ui/layouts/stack-layout").StackLayout);
registerElement("FlexboxLayout", () => require("ui/layouts/flexbox-layout").FlexboxLayout);
registerElement("Switch", () => require("ui/switch").Switch);
registerElement("TabView", () => require("ui/tab-view").TabView);
registerElement("TextField", () => require("ui/text-field").TextField);
registerElement("TextView", () => require("ui/text-view").TextView);
registerElement("TimePicker", () => require("ui/time-picker").TimePicker);
registerElement("WebView", () => require("ui/web-view").WebView);
registerElement("WrapLayout", () => require("ui/layouts/wrap-layout").WrapLayout);
registerElement("FormattedString", () => require("text/formatted-string").FormattedString);
registerElement("Span", () => require("text/span").Span)

registerElement("Comment", () => require("ui/placeholder").Placeholder)