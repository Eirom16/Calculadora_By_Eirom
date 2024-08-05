document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let openParentheses = 0; // Contador de paréntesis abiertos
    const audio = new Audio('/pick_button.mp3'); // Ruta al archivo de sonido

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            audio.play(); // Reproducir sonido al presionar un botón
            const buttonText = button.innerText;

            if (!isNaN(buttonText) || buttonText === '.') {
                currentInput += buttonText;
                display.value += buttonText;
            } else if (buttonText.toLowerCase() === 'c') {
                currentInput = '';
                operator = '';
                display.value = '';
                openParentheses = 0; // Reiniciar el contador de paréntesis
            } else if (buttonText === '=') {
                try {
                    // Reemplazar los operadores personalizados y evaluar la expresión
                    display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
                    currentInput = display.value;
                } catch {
                    display.value = 'Error';
                }
            } else if (buttonText === '+/-') {
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    display.value = display.value.slice(0, -currentInput.length) + currentInput;
                }
            } else if (buttonText === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.value = display.value.slice(0, -currentInput.length) + currentInput;
            } else if (buttonText === '÷' || buttonText === '×' || buttonText === '-' || buttonText === '+') {
                if (currentInput) {
                    operator = buttonText;
                    currentInput = '';
                    display.value += ` ${buttonText} `;
                }
            } else if (buttonText === '(') {
                if (currentInput === '' && (display.value.slice(-1) !== '(' || openParentheses === 0)) {
                    display.value += '(';
                    openParentheses++;
                }
            } else if (buttonText === ')') {
                if (openParentheses > 0 && (display.value.slice(-1) !== '(' && !isNaN(display.value.slice(-1)))) {
                    display.value += ')';
                    openParentheses--;
                }
            }
        });
    });
});