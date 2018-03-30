import React from 'react';
import * as SCORM_WRAPPER from '../vendors/SCORM_API_Wrapper.js';
import {scormConnected, updateUserProfile} from './../reducers/actions';

export default class SCORM extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    window.addEventListener("load", this.onLoad.bind(this));
    window.addEventListener("beforeunload", this.onUnload.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("beforeunload", this.onUnload);
    window.removeEventListener("onload", this.onLoad);
  }
  componentDidUpdate(prevProps, prevState){
    if(SCORM_WRAPPER.isConnected()){
      let updateProgress = (prevProps.tracking.progress_measure !== this.props.tracking.progress_measure);
      if(updateProgress){
        SCORM_WRAPPER.updateProgressMeasure(this.props.tracking.progress_measure);
      }
      let updateScore = (prevProps.tracking.score !== this.props.tracking.score);
      if(updateScore){
        SCORM_WRAPPER.updateScore(this.props.tracking.score);
      }
      if(updateProgress || updateScore){
        SCORM_WRAPPER.commit();
      }
    }
  }
  onLoad(event){
    let scorm = new SCORM_WRAPPER.init(this.props.config.debug_scorm_api, this.props.config.debug_scorm_api_window);
    if(!SCORM_WRAPPER.isConnected()){
      return;
    }
    this.props.dispatch(scormConnected(scorm));

    // Init user profile
    let user = SCORM_WRAPPER.getUserProfile();
    if((typeof user === "object") && (typeof user.learner_preference === "object")){
      if(typeof user.learner_preference.difficulty !== "undefined"){
        let difficulty = parseInt(user.learner_preference.difficulty, 10);
        if(!(isNaN(difficulty))){
          user.learner_preference.difficulty = difficulty;
        }
      }
    }
    this.props.dispatch(updateUserProfile(user));

    // Send initial progress measure
    SCORM_WRAPPER.updateProgressMeasure(this.props.tracking.progress_measure);

    // Init score
    let hasScore = (Object.keys(this.props.tracking.objectives).reduce(function(acc, key){ return acc + this.props.tracking.objectives[key].score;}.bind(this), 0) > 0);
    if(hasScore){
      SCORM_WRAPPER.initScore();
    }
  }
  onUnload(event){
    if(SCORM_WRAPPER.isConnected()){
      SCORM_WRAPPER.onExit();
    }
  }
  render(){
    return (
      null
    );
  }
}