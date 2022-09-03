const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    endResult: null,
    operator: null,
    awaitingSecond: false,
};

function changeDisplay(){
   const display = document.querySelector('.result-display');
   display.value = calculator.displayValue;
}

changeDisplay();

// need to select all the keys and add eventListeners to the whole lot
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
        if (calculator.awaitingSecond === true) {
            equalOut();
            changeDisplay();
        }
        calculator.awaitingSecond = true;
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
        return;
    }

    if (target.classList.contains('equals')) {
        equalOut();
        // I'm not sure if this is the right thing. Note to self: the first time you 
        // press enter, if you try to enter in more numbers, it appends it to the
        // previous end result. It should hard reset upon entering any more numbers
        changeDisplay();
    }

    if (target.classList.contains('number-key')){
        inputDigits(target.value);
        changeDisplay();
    }
    
    //calculator.displayValue = 0;
});

// clearAll needs to set all properties of the calculator object to default
function clearAll(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.secondOperand = null;
    calculator.endResult = null;
    calculator.awaitingSecond = false;
}

function equalOut(){
    calculator.secondOperand = calculator.displayValue;
        
        switch (calculator.operator) {
            case '+':  
                add(calculator.firstOperand, calculator.secondOperand);
                break;
            case '-': 
                subtract(calculator.firstOperand, calculator.secondOperand);
                break;
            case '*':   
                multiply(calculator.firstOperand, calculator.secondOperand);
                break;
            case '/':  
                divide(calculator.firstOperand, calculator.secondOperand);
                break;    
        }
        calculator.displayValue = calculator.endResult;
        calculator.operator = null;
        calculator.firstOperand = null;
        changeDisplay(); 
        console.log(calculator);
}

function inputDigits(digit) {
    const { displayValue } = calculator;
    // overwrite 'displayValue' if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue === '0'? digit: displayValue + digit;   
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
        calculator.operator = op;
        calculator.firstOperand = calculator.displayValue;
        calculator.displayValue = '0';
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