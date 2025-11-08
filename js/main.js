// ====== Filtro de Cases ======
;(function setupCaseFilters() {
  const buttons = document.querySelectorAll('[data-filter]')
  const items = document.querySelectorAll('.case-item')
  const empty = document.getElementById('cases-empty')

  if (!buttons.length || !items.length) return

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // estado visual dos botões
      buttons.forEach((b) => {
        b.classList.remove('active')
        b.setAttribute('aria-pressed', 'false')
      })
      btn.classList.add('active')
      btn.setAttribute('aria-pressed', 'true')

      const filter = btn.getAttribute('data-filter')
      let visibleCount = 0

      // animação de saída/entrada
      items.forEach((it) => {
        const cat = it.getAttribute('data-category')
        const match = filter === 'all' || cat === filter

        if (match && it.classList.contains('d-none')) {
          // entrando
          it.classList.remove('d-none')
          it.classList.add('fade-enter')
          requestAnimationFrame(() => {
            it.classList.add('fade-enter-active')
            it.addEventListener(
              'transitionend',
              () => {
                it.classList.remove('fade-enter', 'fade-enter-active')
              },
              { once: true }
            )
          })
          visibleCount++
        } else if (!match && !it.classList.contains('d-none')) {
          // saindo
          it.classList.add('fade-exit')
          requestAnimationFrame(() => {
            it.classList.add('fade-exit-active')
            it.addEventListener(
              'transitionend',
              () => {
                it.classList.add('d-none')
                it.classList.remove('fade-exit', 'fade-exit-active')
              },
              { once: true }
            )
          })
        } else if (match) {
          visibleCount++
        }
      })

      empty.classList.toggle('d-none', visibleCount > 0)
    })
  })
})()
