export default function createNode(tag, ...classNames) {
  const element = document.createElement(tag);
  if (classNames.length > 0) {
    element.classList.add(...classNames);
  }
  return element;
}
