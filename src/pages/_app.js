// MODULES
import React from 'react';

// CONTEXT
import { Provider } from '../context';

// COMPONENTS
import Error from '../components/error';

// STYLES
import '../styles/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.init = this.init.bind(this);
  }

  init() {
    if (this.props.pageProps.statusCode) {
      return (
        <Provider>
          <Error data={this.props.pageProps.statusCode} />
        </Provider>
      );
    }

    return (
      <Provider>
        <this.props.Component {...this.props.pageProps} />
      </Provider>
    );
  }

  componentDidMount() {}

  render() {
    return this.init();
  }
}

export default App;
