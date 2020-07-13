const currentPage = location.pathname
const headerItems = document.querySelectorAll('header .links a')


for ( let item of headerItems ) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}