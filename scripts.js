const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function changeDisplay(){
   const display = document.querySelector('.result-display');
   display.value = calculator.displayValue;
}

changeDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    // access the clicked element
    const { target } = event;

    // check if the clicked element is a button
    // if not, exit from the function
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        console.log('operator', target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        changeDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        clearAll();
        changeDisplay();
        //check back and clear operand as well
        return;
    }

    inputDigits(target.value);
    changeDisplay();
});

function clearAll(){
    calculator.displayValue = '0';
}

function inputDigits(digit) {
    const { displayValue } = calculator;
    // overwrite 'displayValue' if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue === '0' ? digit: displayValue + digit;
    /*if (displayValue === '0'){
        return digit;
    } else {
        return displayValue + digit}*/
    console.log(calculator);
    
}

function inputDecimal(dot) {
    // check to see if the display already has a decimal point
    if(!calculator.displayValue.includes(dot)) {
        //if not, add a decimal point
        calculator.displayValue += dot;
    }
}

function callOperator (