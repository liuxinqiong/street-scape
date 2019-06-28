type StyleType = {
  [key: string]: any;
};

export function addStyle(el: HTMLElement, style: StyleType) {
  for (const attr in style) {
    if (style.hasOwnProperty(attr)) {
      el.style[attr as any] = style[attr];
    }
  }
}
