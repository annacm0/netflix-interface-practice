// Armazenar perfil ativo no localStorage
document.addEventListener('DOMContentLoaded', () => {
    const profiles = document.querySelectorAll('.profile');
    
    profiles.forEach(profile => {
        profile.addEventListener('click', (e) => {
            // Pega o nome e a imagem do perfil
            const figure = profile.querySelector('figure');
            const img = figure.querySelector('img');
            const figcaption = figure.querySelector('figcaption');
            
            // Armazena no localStorage
            localStorage.setItem('perfilAtivoNome', figcaption.textContent);
            localStorage.setItem('perfilAtivoImagem', img.src);
        });
    });
});

const selectedLanguage = localStorage.getItem('language') || 'pt';
const welcomeMessage = selectedLanguage === 'en'
    ? 'Welcome to the Netflix movies and series catalog!'
    : 'Seja bem-vindo(a) ao catálogo de filmes e séries da Netflix!';

alert(welcomeMessage);