// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Icon_search from '../icons/search.js';
import Icon_profile from '../icons/profile.js';
import Icon_basket from '../icons/basket.js';

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
class Header extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      top_closed: false,
      all_closed: false,
      scroll_end: -1,
      mobilenav_open: false,
    };

    this.on_scroll = this.on_scroll.bind(this);
    this.on_scroll_end = this.on_scroll_end.bind(this);
  }

  on_scroll(e) {
    if (window.scrollY === 0) {
      this.setState({
        ...this.state,
        top_closed: false,
        all_closed: false,
      });

      return;
    }

    if (this.state.scroll_end < window.scrollY) {
      this.setState({
        ...this.state,
        top_closed: true,
        all_closed: true,
      });
    } else if (this.state.scroll_end > window.scrollY) {
      this.setState({
        ...this.state,
        top_closed: true,
        all_closed: false,
      });
    }
  }

  on_scroll_end(e) {
    this.setState({
      ...this.state,
      scroll_end: window.scrollY,
    });
  }

  componentDidMount() {
    document.addEventListener('scroll', this.on_scroll);
    document.addEventListener('scrollend', this.on_scroll_end);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    document.removeEventListener('scroll', this.on_scroll);
    document.addEventListener('scrollend', this.on_scroll_end);
  }

  render() {
    return (
      <header
        className={cn(
          style['header'],
          this.state.top_closed ? style['headertopclosed'] : null,
          this.state.all_closed ? style['headerallclosed'] : null
        )}
      >
        <div className={cn(style['header-top'])}>
          <div className={cn(style['header-top-left'])}>
            {trs[this.context.state.ui_lang].cargo}
          </div>

          <div className={cn(style['header-top-right'])}>
            <a href="/login" target="_self">
              {trs[this.context.state.ui_lang].login}
            </a>

            <a href="/login" target="_self">
              {trs[this.context.state.ui_lang].signup}
            </a>
          </div>
        </div>

        <div className={cn(style['header-bottom'])}>
          <div className={cn(style['header-bottom-left'])}>
            <div
              className={cn(style['header-bottom-left-hamburger'])}
              onClick={() => {
                this.setState({
                  ...this.state,
                  mobilenav_open: !this.state.mobilenav_open,
                });
              }}
            >
              <div
                className={cn(
                  style['header-bottom-left-hamburger-stick'],
                  this.state.mobilenav_open
                    ? style['header-bottom-left-hamburger-stickopen']
                    : null
                )}
              ></div>

              <div
                className={cn(
                  style['header-bottom-left-hamburger-stick'],
                  this.state.mobilenav_open
                    ? style['header-bottom-left-hamburger-stickopen']
                    : null
                )}
              ></div>

              <div
                className={cn(
                  style['header-bottom-left-hamburger-stick'],
                  this.state.mobilenav_open
                    ? style['header-bottom-left-hamburger-stickopen']
                    : null
                )}
              ></div>
            </div>

            <img
              src="https://cdn.myikas.com/images/theme-images/3a50f747-bab2-496d-972c-50961b8ff963/image_180.webp"
              alt="hype-outside"
              title="Hype Outside"
            />

            <a
              className={cn(style['header-bottom-left-home'])}
              href="/"
              target="_self"
            >
              {trs[this.context.state.ui_lang].home}
            </a>

            <a
              className={cn(style['header-bottom-left-home'])}
              href="/"
              target="_self"
            >
              {trs[this.context.state.ui_lang].tshirts}
            </a>
          </div>

          <div className={cn(style['header-bottom-right'])}>
            <Icon_search />

            <Icon_profile />

            <div className={cn(style['header-bottom-right-basketctr'])}>
              <Icon_basket />
              <div className={cn(style['header-bottom-right-basketctr-value'])}>
                {}
              </div>
            </div>
          </div>

          {this.state.mobilenav_open ? (
            <div className={cn(style['header-bottom-mobilenav'])}>
              <a
                className={cn(style['header-bottom-mobilenav-item'])}
                href="/"
                target="_self"
              >
                {trs[this.context.state.ui_lang].home}
              </a>

              <a
                className={cn(style['header-bottom-mobilenav-item'])}
                href="/"
                target="_self"
              >
                {trs[this.context.state.ui_lang].tshirts}
              </a>
            </div>
          ) : null}
        </div>
      </header>
    );
  }
}

export default Header;
