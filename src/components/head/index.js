// MODULES
import React from 'react';
import Head from 'next/head';

class Comp_head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Head lang="en">
        <title>{this.props.title}</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="title" content={this.props.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={this.props.desc} />

        <meta property="og:image" content={this.props.ogimg} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="soultextile" />
        <meta property="og:title" content={this.props.title} />
        <meta property="og:description" content={this.props.ogdesc} />

        <meta name="twitter:site" content="@soultextile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@soultextile" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
    );
  }
}

export default Comp_head;
