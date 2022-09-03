const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    endResult: null,
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
        callOperator(target.value);
        console.log(calculator);
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

    if (target.classList.contains('equals')) {
        switch (calculator.operator) {
            case '+':
                calculator.secondOperand = calculator.displayValue;    
                add(calculator.firstOperand, calculator.secondOperand);
                calculator.displayValue = calculator.endResult;

                break;
            case '-':
                calculator.secondOperand = calculator.displayValue;    
                subtract(calculator.firstOperand, calculator.secondOperand);
                calculator.displayValue = calculator.endResult;
                break;
            case '*':
                calculator.secondOperand = calculator.displayValue;    
                multiply(calculator.firstOperand, calculator.secondOperand);
                calculator.displayValue = calculator.endResult;
                break;
            case '/':
                calculator.secondOperand = calculator.displayValue;    
                divide(calculator.firstOperand, calculator.secondOperand);
                calculator.displayValue = calculator.endResult;
                break;    
        }
        //console.log(calculator.displayValue);
        calculator.operator = null; 
        // I'm not sure if this is the right thing. Note to self: the first time you 
        // press enter, if you try to enter in more numbers, it appends it to the
        // previous end result. It should hard reset upon entering any more numbers
    }

    inputDigits(target.value);
    changeDisplay();
});

function clearAll(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.secondOperand = null;
    calculator.endResult = null;
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

function callOperator (op) {
        //console.log(calculator.operator); // debugging
        calculator.operator = op;
        //console.log(calculator.operator);
        calculator.firstOperand = calculator.displayValue;
        calculator.displayValue = '0';
        //console.log(calculator.firstOperand);
}


// operations below this point
function add(a,b){
    let number = Number(a) + Number(b);
    calculator.endResult = number;
}

function subtract(a,b) {
    let number = Number(a) - Number(b);
    calculator.endResult = number;
}

function multiply(a,b) {
    let number = Number(a) * Number(b);
    calculator.endResult = number;
}

function divide(a,b) {
    let number = Number(a) / Number(b);
    calculator.endResult = number;
}