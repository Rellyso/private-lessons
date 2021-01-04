const pagination = document.querySelector('.pagination')

const filter = +pagination.dataset.filter
const total = +pagination.dataset.total
const selectedPage = +pagination.dataset.page
const pages = paginate(selectedPage, total)

if (pagination) {
    createPagination(pages, selectedPage)
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const isFirstPages = currentPage > (selectedPage + 1)
        const isLastPages = currentPage < (selectedPage - 1)
        if (totalPages > 7) {
            if (currentPage < 3 || currentPage > totalPages - 2) {
                pages.push(currentPage)
                oldPage = currentPage
            } else if (isFirstPages || isLastPages) {

                if (oldPage != '...') {
                    pages.push('...')
                }
                oldPage = '...'
            } else {
                pages.push(currentPage)
                oldPage = currentPage
            }
        } else {
            pages.push(currentPage)
        }
    }

    return pages
}

function createPagination(pages, selectedPage) {
    let elements = ''

    let isSelectedClass = ''

    for (let page of pages) {
        page == selectedPage
            ? isSelectedClass = 'selected'
            : isSelectedClass = ''

        if (String(page).includes('...')) {
            elements += `<span>...</span>`
        } else {
            if (filter) {
                elements += `<a class="${isSelectedClass}" href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a class="${isSelectedClass}" href="?page=${page}">${page}</a>`
            }
        }
    }
    pagination.innerHTML = elements
}



