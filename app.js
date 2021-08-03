
const theNumbers = document.querySelectorAll('.number');
const theOper = document.querySelectorAll('.sign');
const theClear = document.querySelector('.clear');
const theDel = document.querySelector('.del');
const theEqual = document.querySelector('.equal');
const theNumber1 = document.querySelector('.number1-input');
const theNumber2 = document.querySelector('.number2-input');

//initial states
let dis1 = '';
let dis2 = '';
let result = null;
let lastOp = '';
let theDot = false;

//'period' duplication function
theNumbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !theDot) {
            theDot = true;
        }
        else if (e.target.innerText === '.' && theDot) {
            return;
        }
        dis2 += e.target.innerText;
        theNumber2.innerText = dis2;
    })
});

//operator functionality
theOper.forEach(sign => {
    sign.addEventListener('click', (e) => {
        if (!dis2) return;
        theDot = false;
        const signName = e.target.innerText;
        if (dis1 && dis2 && lastOp) {
            mathOp();
        }
        else {
            result = parseFloat(dis2);
        }
        toClear(signName);
        lastOp = signName;
    })
});

//displaying numbers on calculators
function toClear(name = '') {
    dis1 += dis2 + ' ' + name + ' ';
    theNumber1.innerText = dis1;
    theNumber2.innerText = '';
    dis2 = '';
    theNumber2.innerText = result;
}

//the main operations
function mathOp() {
    if (lastOp === '*') {
        result = parseFloat(result) * parseFloat(dis2);
    } else if (lastOp === '+') {
        result = parseFloat(result) + parseFloat(dis2);
    } else if (lastOp === '-') {
        result = parseFloat(result) - parseFloat(dis2);
    } else if (lastOp === '/') {
        result = parseFloat(result) / parseFloat(dis2);
    }
}

//the 'equal' sign functionality to display the outcome
theEqual.addEventListener('click', (e) => {
    if (!dis2 || !dis1) return;
    theDot = false;
    mathOp();
    toClear();
    theNumber2.innerText = result;
    dis2 = result;
    dis1 = '';
});

//to clear everything on the calculator
theClear.addEventListener('click', (e) => {
    theNumber1.innerText = '0';
    theNumber2.innerText = '0';
    dis1 = '';
    dis2 = '';
    result = '';
})

//deleting by incrementing -1 to each number
theDel.addEventListener('click', (e) => {
    theNumber2.innerText = theNumber2.innerText.substring(0, theNumber2.innerText.length - 1);
    dis2 = '';
});

//keyboard functionality
window.addEventListener('keydown', (e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.') {
        clickKey(e.key);
    } else if (
        e.key === '*' ||
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/') {
        clickOp(e.key);
    } else if (e.key === 'Backspace') {
        numDel();
    }
});

//Below seiction is for the above keyboard operations
function clickKey(key) {
    theNumbers.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOp(key) {
    theOper.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function numDel() {
    theDel.click();
}