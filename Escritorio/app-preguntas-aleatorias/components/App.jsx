import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import Quiz from './Quiz.jsx';


import { Player } from 'video-react';




export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
      video: ""
    };
  }


  render(){


    //this.ref.player.startTime = 2;
    return (
      <div id="container">
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
        <div>
        <Quiz dispatch={this.props.dispatch} tracking={this.props.tracking} quiz={SAMPLES.question_example} config={GLOBAL_CONFIG} I18n={I18n}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);