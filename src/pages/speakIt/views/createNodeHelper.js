export default function createNode(tag, ...classNames) {
  const element = document.createElement(tag);
  if (classNames.length > 0) {
    classNames.forEach((className) => {
      element.classList.add(className);
    });
  }

  return element;
}
