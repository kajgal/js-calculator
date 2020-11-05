class Calculator {
    /** w konstruktorze przypisuje się dwa divy
     * pierwszy - poprzednia wartosć
     * drugi - następna wartość
     **/
    constructor(previousValueText, currentValueText) {
        this.previousValueTextSpot = previousValueText
        this.currentValueTextSpot = currentValueText
    }

    // funkcja czyszczącą pamięc kalkulatora
    clear() {
        this.previousValue = ''
        this.currentValue = ''
        this.operation = undefined
    }

    // funkcja usuwająca ostatnią cyfrę
    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }

    // funkcja wstawiającą cyfrę 
    appendNumber(number) {
        // pierwsze kliknięcie
        if (this.currentValue === undefined)
            this.currentValue = ''
        // kliknięcie kropki gdy w liczbie mamy już kropkę - brak reakcji
        if (number === '.' && this.currentValue.toString().includes('.')) return
        this.currentValue = this.currentValue.toString() + number.toString()
    }

    transform() {
        if (this.currentValue != '')
            this.currentValue = -this.currentValue
    }

    // funkcja określająca działanie które ma się wykonać
    chooseOperation(operation) {
        if (this.currentValue === '') return
        if (this.previousValue !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousValue = this.currentValue
        this.currentValue = ''
    }

    // funkcja wykonująca działanie
    compute() {
        let result
        const prev = parseFloat(this.previousValue)
        const current = parseFloat(this.currentValue)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = prev * current
                break
            case '÷':
                result = prev / current
                break
            default:
                break
        }
        this.currentValue = result
        this.operation = undefined
        this.previousValue = ''
    }

    // formatowanie (dodanie spacji co 3 cyfry)
    displayResult(mainNumber) {
        const stringNumber = mainNumber.toString()
        const integerPart = parseFloat(stringNumber.split(".")[0])
        const decimalPart = stringNumber.split('.')[1]
        let numToDisplay
        if (isNaN(integerPart)) {
            numToDisplay = ''
        } else {
            numToDisplay = integerPart.toLocaleString('pl')
            console.log(numToDisplay)
        }
        if (decimalPart != null) {
            return `${numToDisplay}.${decimalPart}`
        } else {
            return numToDisplay
        }
    }

    // funkcja odświeżająca widok kalkulatora 
    updateDisplay() {
        if (this.currentValue != undefined)
            this.currentValueTextSpot.innerText = `${this.displayResult(this.currentValue)}`
        if (this.previousValue != undefined)
            this.previousValueTextSpot.innerText = this.previousValue
        if (this.operation != null) {
            this.previousValueTextSpot.innerText = `${this.displayResult(this.previousValue)} ${this.operation}`
        }
    }

}

const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const allClearBtn = document.querySelector('[data-all-clear')
const deleteBtn = document.querySelector('[data-delete]')
const transformBtn = document.querySelector('[data-transform]')
const previousValueText = document.querySelector('[data-previous-value]')
const currentValueText = document.querySelector('[data-current-value]')

const calculator = new Calculator(previousValueText, currentValueText)

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.innerText)
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.innerText)
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

transformBtn.addEventListener('click', () => {
    calculator.transform()
    calculator.updateDisplay()
})