const currentPage = location.pathname
const headerItems = document.querySelectorAll('header .links a') || null

if (headerItems) {
    for (let item of headerItems) {
        if (currentPage.includes(item.getAttribute('href'))) {
            item.classList.add('active')
        }
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input)

        let results = Validate[func](input.value)

        input.value = results.value

        if (results.error) Validate.displayError(input, results.error)
    },
    displayError(input, error) {
        // criando elemento de mensagem e adicionando classes
        const div = document.createElement('div')
        div.classList.add('messages')
        div.classList.add('error')
        div.innerHTML = error

        input.parentNode.appendChild(div)

        // deixando input com classe invalid
        input.classList.add('invalid')

        input.focus()
    },
    clearErrors(input) {
        const divError = input.parentNode.querySelector('.error')

        if (divError) {
            divError.remove('error')
            input.classList.remove('invalid')
        }
    },
    isEmail(value) {
        let error = null
        
        const mailFormat = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!value.match(mailFormat) && value.length > 0) {
            error = 'Email inválido'
        }

        return {
            error,
            value
        }
    }
}