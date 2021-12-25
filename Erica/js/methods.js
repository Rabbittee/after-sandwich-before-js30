export function getDom(el, all = false) {
    if (!!all) return document.querySelectorAll(el)
    else return document.querySelector(el)
}

export function render(answer, index) {
    const answer_nodes = getDom('.answer', true)
    answer_nodes[index - 1].innerHTML = `<pre>${JSON.stringify(answer, null, 2)}</pre>`
}


export function getLocation(data, value) {
    return data['parameter'].find((val) =>
        val.parameterName === value).parameterValue
}

export function getWeather(data, value) {
    return data['weatherElement'].find((val) =>
        val.elementName === value).elementValue
}
