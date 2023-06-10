// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Icon_search from '../icons/search.js';
import Icon_profile from '../icons/profile.js';
import Icon_basket from '../icons/basket.js';
import Icon_instagram from '../icons/instagram.js';

// CONTEXT
import { Context } from '../../context/index.js';

// STYLES
import style from './style.module.css';

/**
 *
 * TRANSLATIONS
 *
 */
const trs = {
  en: {
    cargo: 'CARGO IS FREE ON ORDERS WITH 300 TL AND ABOVE!',
    login: 'Login',
    signup: 'Signup',
    home: 'HOME',
    tshirts: 'T-SHIRTS',
  },
  tr: {
    cargo: '300 TL VE ÜZERİ SİPARİŞLERDE KARGO ÜCRETSİZ!',
    login: 'Giris Yap',
    signup: 'Kayit Ol',
    home: 'ANA SAYFA',
    tshirts: 'T-SHIRTS',
  },
};

/**
 *
 * COMPONENT
 *
 */
class Footer extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <footer className={cn(style['footer'])}>
        <div className={cn(style['footer-top'])}>
          <div className={cn(style['footer-top-left'])}>
            <div className={cn(style['footer-top-left-title'])}>Abone Ol</div>

            <div className={cn(style['footer-top-left-desc'])}>
              İndirimlerden ve kampanyalardan ilk sizin haberiniz olsun.
            </div>

            <div className={cn(style['footer-top-left-inputtitle'])}>
              Fırsatları kaçırma
            </div>

            <div className={cn(style['footer-top-left-inputctr'])}>
              <input value="ruzgarataozkan@gmail.comsdfdffsd" />
              <div>Kayit Ol</div>
            </div>

            <a href="https://instagram.com/soultextile" target="_blank">
              <Icon_instagram />
            </a>
          </div>

          <div className={cn(style['footer-top-right'])}>
            <div className={cn(style['footer-top-right-list'])}>
              <div className={cn(style['footer-top-right-list-title'])}>
                HYPE OUTSIDE
              </div>

              <a
                href="/privacy-policy"
                className={cn(style['footer-top-right-list-item'])}
              >
                Gizlilik Politikası
              </a>
              <a href="#" className={cn(style['footer-top-right-list-item'])}>
                Mesafeli Satış Sözleşmesi
              </a>
              <a href="#" className={cn(style['footer-top-right-list-item'])}>
                Teslimat ve Iade
              </a>
            </div>

            <div className={cn(style['footer-top-right-list'])}>
              <div className={cn(style['footer-top-right-list-title'])}>
                HESAP
              </div>

              <a href="#" className={cn(style['footer-top-right-list-item'])}>
                Uye Girisi
              </a>
              <a href="#" className={cn(style['footer-top-right-list-item'])}>
                Siparislerim
              </a>
            </div>
          </div>
        </div>

        <div className={cn(style['footer-bottom'])}>
          <div className={cn(style['footer-bottom-left'])}>
            HYPE OUTSIDE © {new Date().getFullYear()}
          </div>
          <div className={cn(style['footer-bottom-right'])}>
            <img src="/images/visa.svg" />
            <img src="/images/maestro.svg" />
            <img src="/images/mastercard.svg" />
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
