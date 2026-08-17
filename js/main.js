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
