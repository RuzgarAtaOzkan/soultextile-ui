// MODULES
import React from 'react';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="28"
        viewBox="0 0 339 382"
      >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g
            fill="currentColor"
            fillRule="nonzero"
            stroke="currentColor"
            strokeWidth="3"
            transform="translate(3 3)"
          >
            <path d="M166.55-1.5c26.408 0 50.35 8.379 67.71 21.876 16.923 13.158 27.594 31.17 28.347 51.058l.02.616h57.123c3.49 0 6.67 1.03 9.047 2.712 2.457 1.737 4.065 4.16 4.419 6.89l.034.305.9 243.92v.856c0 14.033-8.212 26.814-21.619 36.051-12.983 8.946-30.83 14.556-50.535 14.713l-.846.003H71.95c-20.04 0-38.213-5.642-51.381-14.716C7.32 353.655-.856 341.066-1.047 327.228l-.003-.495v-.861l.9-243.93c.324-2.849 1.986-5.383 4.527-7.18 2.282-1.613 5.274-2.625 8.545-2.707l.428-.005h57.122c.555-20.133 11.27-38.38 28.368-51.674C116.2 6.879 140.142-1.5 166.55-1.5zm140.7 95H25.85l.1 233.29.012.4c.312 7.75 5.454 14.666 13.4 19.717 8.381 5.328 19.903 8.593 32.588 8.593h189.2l.716-.003c12.396-.12 23.638-3.359 31.86-8.572 8.089-5.13 13.277-12.18 13.424-20.058h0l.1-233.367zm-140.7-73c-19.08 0-36.38 6.027-48.917 15.794-11.97 9.326-19.6 22.072-20.151 36.206h138.136l-.026-.565c-.729-13.909-8.314-26.44-20.125-35.64C202.93 26.526 185.63 20.5 166.55 20.5z"></path>
          </g>
        </g>
      </svg>
    );
  }
}

export default Basket;
