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

      items.forEach((it) => {
        const cat = it.getAttribute('data-category')
        const match = filter === 'all' || cat === filter
        it.classList.toggle('d-none', !match)
        if (match) visibleCount++
      })

      empty.classList.toggle('d-none', visibleCount > 0)
    })
  })
})()
