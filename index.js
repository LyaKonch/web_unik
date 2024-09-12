// Отримуємо всі елементи з класом "open-modal-btn"
let buttons = document.getElementsByClassName("open-modal-btn");

// Проходимося по кожному елементу та додаємо обробник подій
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        // Додаємо клас "open" до елемента з класом "my-modal"
        document.getElementById("my-modal").classList.add("open");

        // Отримуємо елемент iframe
        var iframe = document.querySelector('#my-modal iframe');

        // Встановлюємо src для iframe в залежності від класу кнопки
        if (this.classList.contains('signin')) {
            iframe.src = '/signinform.html';
        } else if (this.classList.contains('login')) {
            iframe.src = '/loginform.html';
        }
    });
}

// закрити вікно модальне
document.getElementById("close-my-modal-btn").addEventListener("click", function() {
    document.getElementById("my-modal").classList.remove("open")
})

// закрити на esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open")
    }
});

// закрити поза областю
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});