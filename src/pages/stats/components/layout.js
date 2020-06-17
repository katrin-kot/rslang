import './layout.css'

export function layoutGrid(children = []) {
    const grid = document.createElement('div');
    grid.className = 'layout-grid';
    children.forEach((child) => grid.appendChild(child));
    return grid;
}