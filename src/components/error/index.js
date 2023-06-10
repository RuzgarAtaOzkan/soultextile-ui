// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Head from '../../components/head';

// STYLES
import style from './style.module.css';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Head title="Soultextile.com" desc="Falan filan" />

        <main>
          <section className={cn('section', style['sectionerror'])}>
            <div className={cn(style['sectionerror-ctr'])}>
              <div className={cn(style['sectionerror-ctr-title'])}>
                {this.props.data}
              </div>

              <div className={cn(style['sectionerror-ctr-desc'])}>
                {this.props.data === 404
                  ? "Sorry, couldn't find the page you are looking for."
                  : null}
              </div>

              <a className={cn(style['sectionerror-ctr-homebtn'])} href="/">
                Go home
              </a>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Error;
