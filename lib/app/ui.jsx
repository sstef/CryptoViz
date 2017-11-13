import React from 'react';
import ReactDOM from 'react-dom';
// import { BuildPieChart } from './piechart';

export default class UI extends React.Component {
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <div id="static-page">
        <header>

        </header>

        <footer>
          <a href="https://github.com/sstef" target="_blank">
            <img src="lib/images/git_logo.png" />
          </a>

          <a href="http://www.linkedin.com/in/stevenjstef" target="_blank">
            <img src="lib/images/linked_logo.png" />
          </a>

          <a href="https://sstef.github.io" target="_blank">
            <img src="lib/images/portfolio_logo.png" />
          </a>
        </footer>
      </div>
    )
  }

}
