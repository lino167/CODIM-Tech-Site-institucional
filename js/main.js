document.getElementById('year').textContent = new Date().getFullYear()
// Navbar com leve sombra ao rolar
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar')
  nav.style.boxShadow =
    window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,.25)' : 'none'
})
