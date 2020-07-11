import './footer.css';

export const footer = () => {
  const body = document.querySelector('body');
  const footerBlock = `
    <footer>
      <div class="footer-wrap">
        <div class="promo-icon">
          <a href="/promo.html">Промо</a>
        </div>
        <div class="about-icon">
          <a href="/about.html">О нас</a>
        </div>
      </div>
    </footer>`;

  body.insertAdjacentHTML('beforeend', footerBlock);
};
