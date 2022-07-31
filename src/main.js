const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x') || null
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://bilibili.com' }
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')  // 删除 / 之后的内容    
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        // console.log(index);
        const $li = $(`
        <li>
            <div class="site">
                <div class="icon">${node.logo[0]}</div>
                <div class="text">${simplifyUrl(node.url)}</div>
                <div class="iconfont icon-close"></div>
            </div>
        </li>`).insertBefore($lastLi)

        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.iconfont', (e) => {
            e.stopPropagation()  // 阻止冒泡
            // console.log(hashMap)
            hashMap.splice(index, 1)
            render()
        }) 
    })
}

render();

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        })
        render();
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    // console.log(e)
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})