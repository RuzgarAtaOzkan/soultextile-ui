// MODULES
import React from 'react';
import Script from 'next/script';
import cn from 'classnames';

// COMPONENTS
import Header from '../../header';
import Footer from '../../footer';
import Toaster from '../../toaster';

// CONTEXT
import { Context } from '../../../context/index.js';

// UTILS
import UTILS from '../../../utils/index.js';
import UTILS_API from '../../../utils/api.js';

// STYLES
import style from './style.module.css';

class Layout_user extends React.Component {
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
      <>
        <Header />
        <main
          className={cn(
            style['main'],
            this.props.height === 'auto' ? style['mainautoheight'] : null
          )}
        >
          {this.props.element || this.props.children}
        </main>
        <Footer />
        <Toaster />

        <Script src="https://js.hcaptcha.com/1/api.js" async defer></Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F28TSKZ877"
        ></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-F28TSKZ877');",
          }}
        ></Script>
      </>
    );
  }
}

export default Layout_user;
