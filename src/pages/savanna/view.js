export default class View {
    constructor() {
      this.app = this.getElement('body')
      this.appContainer = this.createElement('div', 'savanna');

      this.app.append(this.appContainer)
    }
  
    createElement(tag, ...classNames) {
      const element = document.createElement(tag);
      if (classNames.length > 0) {
        classNames.forEach((className) => {
          element.classList.add(className);
        });
      }
  
      return element;
    }
  
    getElement(selector) {
      const element = document.querySelector(selector);
  
      return element;
    }
  
    getElements(selector) {
      const elements = document.querySelectorAll(selector);
  
      return elements;
    }
  }