export function TabsComponent(content) {
    const navigationContainer = document.createElement("div")
    navigationContainer.className = 'tabs__navigation'
    content.forEach((el, index) => {
        const btn = document.createElement("button")
        btn.innerText = el[0]
        btn.setAttribute("data-index", index)
        btn.addEventListener("click", e => {
            Array.from(document.querySelectorAll("[data-tab]")).forEach(el => {
                el.style.display = 'none'
            })
            document.querySelector(`[data-tab-index="${index}"]`).style.display = 'block'
        })
        navigationContainer.appendChild(btn)
    })

    const tabsContainer = document.createElement("div")
    tabsContainer.className = 'tabs__content'

    content.forEach((el, index) => {
        const tab = document.createElement("div")
        tab.setAttribute("data-tab", "true")
        tab.setAttribute("data-tab-index", index)
        tab.style.display = index === 0 ? 'block' : 'none'
        tab.appendChild(el[1])
        tabsContainer.appendChild(tab)
    })
    const tabs = document.createElement("div")
    tabs.className = "tabs"
    tabs.appendChild(navigationContainer)
    tabs.appendChild(tabsContainer)
    return tabs
}