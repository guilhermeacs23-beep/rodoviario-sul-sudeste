/* ===== Rodoviário Sul Sudeste — interações ===== */

// Barra fixa: esconde a topbar ao rolar
const nav = document.querySelector('.nav');
const topbar = document.querySelector('.topbar');
function aoRolar(){
  const rolou = window.scrollY > 50;
  nav.classList.toggle('scrolled', rolou);
  if (topbar) topbar.classList.toggle('oculta', rolou);
}
window.addEventListener('scroll', aoRolar, { passive:true });
aoRolar();

// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('aberto'));

// Animação de entrada
const obs = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visivel'); obs.unobserve(e.target); } });
}, { threshold:.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Contadores dos números
const contadores = document.querySelectorAll('[data-contar]');
if (contadores.length){
  const obsNum = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, alvo = parseInt(el.dataset.contar,10), suf = el.dataset.sufixo || '';
      let atual = 0; const passo = Math.max(1, Math.ceil(alvo/44));
      const t = setInterval(() => {
        atual += passo;
        if (atual >= alvo){ atual = alvo; clearInterval(t); }
        el.textContent = atual + suf;
      }, 26);
      obsNum.unobserve(el);
    });
  }, { threshold:.5 });
  contadores.forEach(el => obsNum.observe(el));
}

// Slideshow do herói (crossfade entre as imagens)
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1){
  let atualSlide = 0;
  setInterval(() => {
    heroSlides[atualSlide].classList.remove('ativa');
    atualSlide = (atualSlide + 1) % heroSlides.length;
    heroSlides[atualSlide].classList.add('ativa');
  }, 5000);
}

// Formulários que enviam para o WhatsApp
document.querySelectorAll('form[data-wpp]').forEach(f => {
  f.addEventListener('submit', ev => {
    ev.preventDefault();
    const dados = new FormData(f);
    let txt = (f.dataset.titulo || 'Contato pelo site') + '%0A%0A';
    for (const [k,v] of dados.entries()) if (v) txt += k + ': ' + v + '%0A';
    window.open('https://wa.me/' + f.dataset.wpp + '?text=' + txt, '_blank');
  });
});

/* ===== Revelação das fotos: colunas que se encaixam ===== */
(function(){
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduz) return;

  // todo container que tenha uma foto ganha o efeito
  const alvos = document.querySelectorAll('.visual-box, .hero, .page-hero, .foto-onda, .faixa-foto');

  alvos.forEach(el => {
    const foto = el.querySelector('img');
    if (!foto && !el.classList.contains('faixa-foto')) return;

    // o fade padrão mascarava o efeito: desliga nesse elemento
    el.classList.remove('reveal');
    el.classList.add('com-mosaico');

    const largura = el.offsetWidth || window.innerWidth;
    const colunas = largura > 900 ? 14 : (largura > 560 ? 9 : 6);
    const m = document.createElement('div');
    m.className = 'mosaico';
    const meio = (colunas - 1) / 2;
    for (let i = 0; i < colunas; i++){
      const s = document.createElement('span');
      s.style.transitionDelay = (Math.abs(i - meio) * 48 + (i % 2 ? 26 : 0)) + 'ms';
      m.appendChild(s);
    }
    el.appendChild(m);
    if (foto) foto.classList.add('foto-zoom');
    el.__mosaico = m;
  });

  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      const el = e.target;
      if (e.isIntersecting){
        if (el.__mosaico) el.__mosaico.classList.add('aberto');
        const foto = el.querySelector('img');
        if (foto) foto.classList.add('pronta');
        el.__visto = true;
      } else if (el.__visto && e.boundingClientRect.top > 0){
        // saiu pela parte de baixo: rearma para tocar de novo ao voltar
        if (el.__mosaico) el.__mosaico.classList.remove('aberto');
        const foto = el.querySelector('img');
        if (foto) foto.classList.remove('pronta');
        el.__visto = false;
      }
    });
  }, { threshold: .18, rootMargin: '0px 0px -8% 0px' });

  alvos.forEach(el => { if (el.__mosaico) obs.observe(el); });
})();

/* Cascata nos cards de cada grade */
document.querySelectorAll('.grid-cards, .servicos-cards, .acoes-grid, .valores-grid, .unidades-grid, .contato-grid, .lista-beneficios')
  .forEach(grade => {
    [...grade.children].forEach((filho, i) => {
      if (filho.classList.contains('reveal')) filho.style.transitionDelay = (i * 70) + 'ms';
    });
  });
