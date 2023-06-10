// MODULES
import React from 'react';
import axios from 'axios';
import cn from 'classnames';

// COMPONENTS
import Head from '../components/head';
import Layout_user from '../components/layouts/user';

// CONTEXT
import { Context } from '../context/index.js';

// UTILS
import UTILS from '../utils/index.js';
import UTILS_API from '../utils/api.js';

// STYLES
import style from '../styles/pages/home.module.css';

/**
 *
 * SERVER SIDE
 *
 */
export async function getServerSideProps({ req }) {
  const ip =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress;

  const api_res_ip = await axios.get(
    'http://ip-api.com/json/' + '31.223.52.141' // IP
  );

  return {
    props: {
      lang: api_res_ip.data.countryCode.toLowerCase(),
    },
  };
}

/*
 *
 * COMPONENT BANNER BUTTON
 *
 */
class Comp_banner_button extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    this.trs = {
      en: {},
      tr: {},
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={cn(style['compbannerbutton'])}>
        <div className={cn(style['compbannerbutton-desc'])}>
          HYPE OUTSIDE olarak sadece şıklığı değil, kumaş ve baskı kalitesi gibi
          faktörleri göz önünde bulundurarak, genç ve dinamik tasarımlarla
          beklentilerini karşılamayı hedefliyoruz.
        </div>

        <div className={cn(style['compbannerbutton-title'])}>
          YOU ARE IN THE RIGHT PLACE TO BE HYPED
        </div>

        <div className={cn(style['compbannerbutton-buttonctr'])}>
          <a
            href="/"
            target="_self"
            className={cn(style['compbannerbutton-buttonctr-button'])}
          >
            OVERSIZE T-SHIRT
          </a>
        </div>
      </div>
    );
  }
}

/*
 *
 * COMPONENT SLIDER
 *
 */
class Comp_slider extends React.Component {
  static contextType = Context;

  /**
   *
   * SLIDER:
   * section_width in mouse up and leave has to be equal with the elements you want to display in one scroll area
   *
   */

  constructor(props) {
    super(props);
    this.state = {
      scroll_left: 0,
      mouse_down: false,
      mouse_down_x: 0,
      mouse_last_x: 0, // To decide which way is the user scrolling, previous value agains e.clientX
      index: 0,
    };

    this.clicked = false;

    this.ref_ctr = React.createRef();
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={cn(style['compslider'])}>
        <div className={cn(style['compslider-title'])}>
          <div className={cn(style['compslider-title-text'])}>
            PICKS FOR YOU
          </div>
        </div>

        <div
          onMouseDown={(e) => {
            this.setState({
              ...this.state,
              mouse_down: true,
              mouse_down_x: e.clientX,
              mouse_last_x: e.clientX,
            });
          }}
          onMouseMove={(e) => {
            if (!this.state.mouse_down) {
              return;
            }

            if (this.state.mouse_last_x > e.clientX) {
              // Scrolling ctr to left

              this.ref_ctr.current.scrollLeft =
                this.state.scroll_left + (this.state.mouse_down_x - e.clientX);
            } else {
              // Scrolling ctr to right

              this.ref_ctr.current.scrollLeft =
                this.state.scroll_left - (e.clientX - this.state.mouse_down_x);
            }

            this.setState({
              ...this.state,
              mouse_last_x: e.clientX,
            });
          }}
          onMouseUp={(e) => {
            const child_width =
              this.ref_ctr.current.children[0].getBoundingClientRect().width;
            const section_width = child_width * 4;
            const division = this.ref_ctr.current.scrollLeft / section_width;

            if (division > this.state.index) {
              const final_left = (this.state.index + 1) * section_width;

              this.ref_ctr.current.scrollTo({
                top: 0,
                left: final_left,
                behavior: 'smooth',
              });

              this.setState({
                ...this.state,
                scroll_left: final_left,
                mouse_down: false,
                index: this.state.index + 1,
              });
            }

            if (division < this.state.index) {
              const final_left =
                (this.state.index - 1 < 0 ? 0 : this.state.index - 1) *
                section_width;

              this.ref_ctr.current.scrollTo({
                top: 0,
                left: final_left,
                behavior: 'smooth',
              });

              this.setState({
                ...this.state,
                scroll_left: final_left,
                mouse_down: false,
                index: this.state.index - 1 < 0 ? 0 : this.state.index - 1,
              });
            }
          }}
          onMouseLeave={(e) => {
            const child_width =
              this.ref_ctr.current.children[0].getBoundingClientRect().width;
            const section_width = child_width * 4;
            const division = this.ref_ctr.current.scrollLeft / section_width;

            if (division > this.state.index) {
              const final_left = (this.state.index + 1) * section_width;

              this.ref_ctr.current.scrollTo({
                top: 0,
                left: final_left,
                behavior: 'smooth',
              });

              this.setState({
                ...this.state,
                scroll_left: final_left,
                mouse_down: false,
                index: this.state.index + 1,
              });
            }

            if (division < this.state.index) {
              const final_left =
                (this.state.index - 1 < 0 ? 0 : this.state.index - 1) *
                section_width;

              this.ref_ctr.current.scrollTo({
                top: 0,
                left: final_left,
                behavior: 'smooth',
              });

              this.setState({
                ...this.state,
                scroll_left: final_left,
                mouse_down: false,
                index: this.state.index - 1 < 0 ? 0 : this.state.index - 1,
              });
            }
          }}
          ref={this.ref_ctr}
          className={cn(style['compslider-ctr'])}
        >
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>

          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>

          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>

          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
          <div className={cn(style['compslider-ctr-item'])}>
            <a
              onMouseDown={() => {
                this.clicked = true;

                setTimeout(() => {
                  this.clicked = false;
                }, 100);
              }}
              onClick={(e) => {
                if (!this.clicked) {
                  e.preventDefault();
                  return;
                }
              }}
              draggable="false"
              className={cn(style['compslider-ctr-item-product'])}
              href="/test"
            >
              <img
                draggable="false"
                src="https://cdn.myikas.com/images/00a8335a-d12d-429e-ba5c-8dfebd243bfe/fefd2249-37db-4b4a-bd1b-0608e0c6f767/720/oversize-tshirt-hype-outside-it-will-happen-arka.webp"
              />

              <div className={cn(style['compslider-ctr-item-product-info'])}>
                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-title']
                  )}
                >
                  {'SUNROOM'.toUpperCase()}
                </div>

                <div
                  className={cn(
                    style['compslider-ctr-item-product-info-price']
                  )}
                >
                  ₺ 369.90 <span>₺ 469.90</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className={cn(style['compslider-index'])}>
          <div className={cn(style['compslider-index-ctr'])}>
            <div
              className={cn(
                style['compslider-index-ctr-section'],
                this.state.index === 0
                  ? style['compslider-index-ctr-sectionactive']
                  : null
              )}
              onClick={() => {
                const child_width =
                  this.ref_ctr.current.children[0].getBoundingClientRect()
                    .width;
                const section_width = child_width * 4;
                const division =
                  this.ref_ctr.current.scrollLeft / section_width;

                this.ref_ctr.current.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });

                this.setState({
                  ...this.state,
                  scroll_left: 0,
                  index: 0,
                });
              }}
            ></div>
            <div
              className={cn(
                style['compslider-index-ctr-section'],
                this.state.index === 1
                  ? style['compslider-index-ctr-sectionactive']
                  : null
              )}
              onClick={() => {
                const child_width =
                  this.ref_ctr.current.children[0].getBoundingClientRect()
                    .width;
                const section_width = child_width * 4;

                this.ref_ctr.current.scrollTo({
                  top: 0,
                  left: section_width,
                  behavior: 'smooth',
                });

                this.setState({
                  ...this.state,
                  scroll_left: section_width,
                  index: 1,
                });
              }}
            ></div>
            <div
              className={cn(
                style['compslider-index-ctr-section'],
                this.state.index === 2
                  ? style['compslider-index-ctr-sectionactive']
                  : null
              )}
              onClick={() => {
                const child_width =
                  this.ref_ctr.current.children[0].getBoundingClientRect()
                    .width;
                const section_width = child_width * 4;

                this.ref_ctr.current.scrollTo({
                  top: 0,
                  left: section_width * 2,
                  behavior: 'smooth',
                });

                this.setState({
                  ...this.state,
                  scroll_left: section_width * 2,
                  index: 2,
                });
              }}
            ></div>
            <div
              className={cn(
                style['compslider-index-ctr-section'],
                this.state.index === 3
                  ? style['compslider-index-ctr-sectionactive']
                  : null
              )}
              onClick={() => {
                const child_width =
                  this.ref_ctr.current.children[0].getBoundingClientRect()
                    .width;
                const section_width = child_width * 4;

                this.ref_ctr.current.scrollTo({
                  top: 0,
                  left: section_width * 3,
                  behavior: 'smooth',
                });

                this.setState({
                  ...this.state,
                  scroll_left: section_width * 2,
                  index: 3,
                });
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    this.on_mount = this.on_mount.bind(this);
  }

  async on_mount() {
    const context_state = {
      ...this.context.state,
      ui_toasts: [],
    };

    /**
     *
     * ASYNC PROMISE CALLS
     *
     */ // [get_profile(), another_async_func()]
    const api_responses = await Promise.all([UTILS_API.auth_get_profile(1)]);
    const api_res_auth_get_profile = api_responses[0];

    if (api_res_auth_get_profile.code) {
      context_state.ui_toasts = [
        ...context_state.ui_toasts,
        {
          type: 'error',
          message: api_res_auth_get_profile.message,
          created_at: new Date(),
        },
      ];
    } else if (api_res_auth_get_profile.data === null) {
      context_state.user_auth = false;
      context_state.user_id = null;
      context_state.user_username = null;
      context_state.user_email = null;
      context_state.user_email_verified = null;
      context_state.user_role = null;
      context_state.user_img = null;
    } else if (api_res_auth_get_profile.data) {
      context_state.user_auth = true;
      context_state.user_id = api_res_auth_get_profile.data._id;
      context_state.user_username = api_res_auth_get_profile.data.username;
      context_state.user_email = api_res_auth_get_profile.data.email;
      context_state.user_email_verified =
        api_res_auth_get_profile.data.email_verified;
      context_state.user_role = api_res_auth_get_profile.data.role;
      context_state.user_img = api_res_auth_get_profile.data.img;
    }

    /**
     *
     * CONTEXT UPDATE
     *
     */
    this.context.set_state(context_state);
  }

  componentDidMount() {
    this.on_mount();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <Head title="Soultextile" desc="" />

        <Layout_user>
          <section className={cn('section', style['sectionbanner'])}>
            <img
              src="https://cdn.myikas.com/images/theme-images/9c8fc1c3-feee-4a58-8f23-cc12ef5daeec/image_1728.webp"
              alt="hype-outside"
              title="Hype Outside"
            />
          </section>

          <section className={cn(style['sectionbannerbutton'])}>
            <Comp_banner_button />
          </section>

          <section className={cn(style['sectionslider'])}>
            <Comp_slider />
          </section>
        </Layout_user>
      </>
    );
  }
}

export default Home;
