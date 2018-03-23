import React, { Component } from 'react'

export default class HomePage extends Component {
  render() {
    return (
      <div id='home'>
        <div className='full_screen'>
          <div className='center_middle lg_half sm_full'>
            <h1>dmartinez.co</h1>
            <p>A personal site for Dave Martinez</p>
            <ul className='flat_menu'>
              <li><a>Resume</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}