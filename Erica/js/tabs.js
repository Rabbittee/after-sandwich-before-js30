import { getDom } from './methods.js';

export default function toggleTabs() {
    const tabs = getDom('nav a', true)
    const sections = getDom('section', true)

    tabs.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault()
            const target = getDom(btn.getAttribute('href'))

            tabs.forEach((item) => item.classList.remove('active'))
            sections.forEach((item) => item.classList.remove('show'))

            btn.classList.add('active')
            target.classList.add('show')
        })
    })
}
