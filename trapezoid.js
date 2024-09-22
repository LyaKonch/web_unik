document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("trapezoid-form");
    const base1 = document.getElementById("base1");
    const base2 = document.getElementById("base2");
    const height = document.getElementById("height");
    const result = document.getElementById("result");
    const areaResult = document.getElementById("area-result");

    const errorBase1 = document.getElementById("error-base1");
    const errorBase2 = document.getElementById("error-base2");
    const errorHeight = document.getElementById("error-height");

    const calculateBtn = document.getElementById("calculate-btn");

    calculateBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Reset errors
        resetErrors();

        const a = parseFloat(base1.value);
        const b = parseFloat(base2.value);
        const h = parseFloat(height.value);
        let hasError = false;

        // Validation
        if (isNaN(a) || a <= 0) {
            showError(base1, errorBase1, "Введіть коректне позитивне значення для сторони 1.");
            hasError = true;
        }

        if (isNaN(b) || b <= 0) {
            showError(base2, errorBase2, "Введіть коректне позитивне значення для сторони 2.");
            hasError = true;
        }

        if (isNaN(h) || h <= 0) {
            showError(height, errorHeight, "Введіть коректне позитивне значення для висоти.");
            hasError = true;
        }

        if (!hasError) {
            const area = ((a + b) / 2) * h;
            areaResult.textContent = area.toFixed(2);
            result.classList.remove("hidden");
        }
    });

    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
        input.classList.add("error");
    }


    document.getElementById("reset").addEventListener("click", (event) => {
        event.preventDefault();

        // Reset errors
        resetErrors();
        base1.value = "";
        base2.value = "";
        height.value = "";

    });

    function resetErrors() {
        base1.classList.remove("error");
        base2.classList.remove("error");
        height.classList.remove("error");

        errorBase1.style.display = "none";
        errorBase2.style.display = "none";
        errorHeight.style.display = "none";
    }
});