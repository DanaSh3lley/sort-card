const word = document.querySelector('.main__word')
const inputArea = document.querySelector('.input__textarea')
const inputs = {
    new: document.querySelector('.input__new'),
    know: document.querySelector('.input__know'),
    other: document.querySelector('.input__other')
}

const copy = {
    new: document.querySelector('.copy-new'),
    know: document.querySelector('.copy-know'),
    other: document.querySelector('.copy-other')
}

const stat = {
    new: document.querySelector('.statistic__item--new'),
    know: document.querySelector('.statistic__item--know'),
    other: document.querySelector('.statistic__item--other'),
    all: document.querySelector('.statistic__item--all'),
    left: document.querySelector('.statistic__item--left'),
    done: document.querySelector('.statistic__item--done')
}
console.log(stat)


const submitButton = document.querySelector('.submit')

export default class Card {
    wordList
    index

    lists = {
        know: [],
        new: [],
        other: []
    }

    history = []

    constructor(wordList, index) {
        this.wordList = wordList;
        this.index = index;
    }


    get wordList() {
        return this.wordList;
    }

    set wordList(value) {
        this.wordList = value;
    }

    get index() {
        return this.index;
    }

    set index(value) {
        this.index = value;
    }

    displayCard() {
        word.textContent = this.wordList[this.index]
        this.updateStat()
    }


    toList(listName) {
        if (this.index < this.wordList.length) {
            this.lists[listName].push(this.wordList[this.index])
            this.history.push(listName)
            inputs[listName].value = this.lists[listName].join('\n')
            this.index++
            this.index < this.wordList.length ? this.displayCard() : word.textContent = "Finish :)"; this.updateStat()
        }
    }

    fromList() {
        if (this.index > 0) {
            this.index--
            const last = this.history.pop()
            this.lists[last].pop()
            inputs[last].value = this.lists[last].join('\n')

            this.displayCard()
        }
    }

    updateStat() {
        stat.all.textContent = this.wordList.length
        stat.new.textContent = (this.lists.new.length).toString()
        stat.know.textContent = (this.lists.know.length).toString()
        stat.other.textContent = (this.lists.other.length).toString()
        stat.done.textContent = (+stat.new.textContent + +stat.know.textContent + +stat.other.textContent).toString()
        stat.left.textContent = (stat.all.textContent - stat.done.textContent).toString()
    }
}

inputArea.value = 'a\nb\nc\nd\n'

let start = false
const card = new Card([], 0)

submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    start = true

    card.wordList = inputArea.value.trim().split('\n')
    card.index = 0
    card.displayCard()

    Object.keys(inputs).forEach(el => {
        inputs[el].value = ''
    })

    Object.keys(card.lists).forEach(el => {
        card.lists[el] = []
    })
})

Object.keys(copy).forEach(el => {
    copy[el].addEventListener('click', (e) => {
        // e.preventDefault()
        inputs[el].select();
        inputs[el].setSelectionRange(0, 99999);
        navigator.clipboard.writeText(inputs[el].value);
    })
})

window.addEventListener('keydown', (event) => {
    if (start) {
        if (event.code === 'ArrowRight') {
            card.toList('new')
        }
        if (event.code === 'ArrowLeft') {
            card.toList('know')
        }
        if (event.code === 'ArrowUp') {
            card.toList('other')
        }
        if (event.code === 'ArrowDown') {
            card.fromList()
        }
    }
})