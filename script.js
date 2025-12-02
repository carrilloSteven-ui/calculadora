// -------------------------------------------------------
// Clases de Operaciones (Orientadas a Objetos)
// -------------------------------------------------------

class Addition {
    execute(a, b) {
        return a + b;
    }
}

class Subtraction {
    execute(a, b) {
        return a - b;
    }
}

class Multiplication {
    execute(a, b) {
        return a * b;
    }
}

class Division {
    execute(a, b) {
        if (b === 0) {
            throw new Error("No se puede dividir entre cero");
        }
        return a / b;
    }
}

// -------------------------------------------------------
// Clase Calculadora (controlador OOP)
// -------------------------------------------------------

class Calculator {
    constructor() {
        this.operations = {
            "+": new Addition(),
            "-": new Subtraction(),
            "*": new Multiplication(),
            "/": new Division(),
        };
    }

    calculate(symbol, a, b) {
        if (!(symbol in this.operations)) {
            throw new Error("Operación no válida");
        }
        return this.operations[symbol].execute(a, b);
    }
}

// -------------------------------------------------------
// Interfaz gráfica (orientada a objetos)
// -------------------------------------------------------

class CalculatorGUI {
    constructor() {
        this.display = document.getElementById('display');
        this.calc = new Calculator();
        this.firstValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Números
        document.querySelectorAll('.btn.number').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.writeNumber(e.target.dataset.value);
            });
        });

        // Operadores
        document.querySelectorAll('.btn.operator').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setOperation(e.target.dataset.operator);
            });
        });

        // Igual
        document.getElementById('equals').addEventListener('click', () => {
            this.calculateResult();
        });

        // Limpiar (DEL)
        document.getElementById('clear').addEventListener('click', () => {
            this.backspace();
        });

        // Reset
        document.getElementById('reset').addEventListener('click', () => {
            this.clearDisplay();
        });

        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.writeNumber(e.key);
            } else if (e.key === '.') {
                this.writeNumber('.');
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                this.setOperation(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.calculateResult();
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                this.backspace();
            } else if (e.key === 'c' || e.key === 'C') {
                this.clearDisplay();
            }
        });
    }

    writeNumber(value) {
        if (this.shouldResetDisplay) {
            this.display.value = '';
            this.shouldResetDisplay = false;
        }

        if (value === '.' && this.display.value.includes('.')) {
            return;
        }

        this.display.value += value;
    }

    setOperation(op) {
        try {
            this.firstValue = parseFloat(this.display.value);
            if (isNaN(this.firstValue)) {
                alert("Entrada inválida");
                return;
            }
            this.operation = op;
            this.shouldResetDisplay = true;
        } catch (error) {
            alert("Error: " + error.message);
        }
    }

    calculateResult() {
        try {
            if (this.operation === null || this.firstValue === null) {
                return;
            }

            const secondValue = parseFloat(this.display.value);
            if (isNaN(secondValue)) {
                alert("Entrada inválida");
                return;
            }

            const result = this.calc.calculate(this.operation, this.firstValue, secondValue);
            this.display.value = result.toString();
            this.firstValue = null;
            this.operation = null;
            this.shouldResetDisplay = true;
        } catch (error) {
            alert("Error: " + error.message);
            this.clearDisplay();
        }
    }

    backspace() {
        this.display.value = this.display.value.slice(0, -1);
    }

    clearDisplay() {
        this.display.value = '';
        this.firstValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;
    }
}

// -------------------------------------------------------
// Inicializar la App
// -------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    new CalculatorGUI();
});
