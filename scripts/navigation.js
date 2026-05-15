const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hamButton.textContent = hamButton.textContent === "\u2630" ? "X" : "\u2630";
});