import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles.module.css'

const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;


const App = React.createClass({
  render: function() {
    return (
      <div className={styles['container']}>
        Ganey Bahadur
      </div>
    );
  }
});

const mountNode = document.querySelector('#root');
ReactDOM.render(<App />, mountNode);
