// ====== 1) Filtros dos Cases (JS puro + animação fade) ======
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
              () => it.classList.remove('fade-enter', 'fade-enter-active'),
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

      // estado de vazio
      if (empty) empty.classList.toggle('d-none', visibleCount > 0)
    })
  })
})()

// ====== 2) Timeline reveal on scroll (levíssimo) ======
;(function setupTimelineReveal() {
  const els = document.querySelectorAll('.timeline-item .timeline-content')
  if (!els.length) return

  const apply = () => {
    els.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const visible = rect.top < window.innerHeight - 80
      el.style.transform = visible ? 'translateY(0)' : 'translateY(12px)'
      el.style.opacity = visible ? '1' : '0'
      el.style.transition = 'all .45s ease'
    })
  }

  // roda 1x ao carregar e depois a cada scroll
  apply()
  document.addEventListener('scroll', apply, { passive: true })
})()

// ====== 3) Contato: validação + máscara + envio simulado ======
;(function setupContactForm() {
  const form = document.getElementById('contactForm')
  if (!form) return

  const successAlert = document.getElementById('contact-success')
  const phoneInput = document.getElementById('phone')
  const honeypot = document.getElementById('website')

  // Máscara simples (Brasil)
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let v = phoneInput.value.replace(/\D/g, '').slice(0, 11)
      if (v.length > 6) {
        phoneInput.value = `(${v.slice(0, 2)}) ${
          v.length === 11
            ? v.slice(2, 7) + '-' + v.slice(7)
            : v.slice(2, 6) + '-' + v.slice(6)
        }`
      } else if (v.length > 2) {
        phoneInput.value = `(${v.slice(0, 2)}) ${v.slice(2)}`
      } else if (v.length > 0) {
        phoneInput.value = `(${v}`
      }
    })
  }

  // Feedback ao digitar/sair do campo
  form.querySelectorAll('input, select, textarea').forEach((el) => {
    const check = () => {
      const ok = el.type === 'checkbox' ? el.checked : el.checkValidity()
      el.classList.toggle('is-invalid', !ok)
    }
    el.addEventListener('input', check)
    el.addEventListener('blur', check)
  })

  // Submit com validação campo-a-campo
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    let allValid = true
    form.querySelectorAll('[required]').forEach((el) => {
      const ok = el.type === 'checkbox' ? el.checked : el.checkValidity()
      el.classList.toggle('is-invalid', !ok)
      if (!ok) allValid = false
    })

    // Honeypot anti-bot
    if (honeypot && honeypot.value.trim() !== '') return

    if (!allValid) {
      form.classList.add('was-validated')
      return
    }

    // Envio simulado (aqui entraria EmailJS/API no futuro)
    if (successAlert) {
      successAlert.classList.remove('d-none')
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    form.reset()
    form.classList.remove('was-validated')
  })
})()

// ====== Cases Modal (preenche conteúdo dinâmico) ======
;(function setupCasesModal() {
  const modalEl = document.getElementById('caseModal')
  if (!modalEl) return

  const titleEl = document.getElementById('caseModalTitle')
  const imgEl = document.getElementById('caseModalImg')
  const descEl = document.getElementById('caseModalDesc')
  const linkEl = document.getElementById('caseModalLink')

  // Banco mínimo de dados (mock)
  const DATA = {
    alfa: {
      title: 'Empresa Alfa — Site Institucional',
      img: 'https://via.placeholder.com/1200x720/181818/ffffff?text=Empresa+Alfa',
      desc: 'Site institucional com SEO, páginas essenciais e acessibilidade.',
      link: '#',
    },
    kairos: {
      title: 'Kairos OS — Sistema de OS',
      img: 'https://via.placeholder.com/1200x720/181818/ffffff?text=Kairos+OS',
      desc: 'CRUD de ordens de serviço, perfis de acesso e métricas operacionais.',
      link: '#',
    },
    kpis: {
      title: 'Indicadores Comerciais — Dashboard',
      img: 'https://via.placeholder.com/1200x720/181818/ffffff?text=Dashboard+KPIs',
      desc: 'Painel com KPIs, filtros rápidos e export básico.',
      link: '#',
    },
  }

  modalEl.addEventListener('show.bs.modal', (ev) => {
    const btn = ev.relatedTarget
    const key = btn?.getAttribute('data-case')
    const data = key ? DATA[key] : null
    if (!data) return
    titleEl.textContent = data.title
    imgEl.src = data.img
    imgEl.alt = data.title
    descEl.textContent = data.desc
    linkEl.href = data.link
  })
})()
