import React from 'react';

export default class Audio extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    //console.log("estoy en Video.jsx y la source es "+ this.props.video);
    let key= this.props.key_audio;

    return (
      <div>
        <div>
          <audio key={key} width="700" height="500" controls>
            <source src={this.props.source_audio} type="video/mp4"/>
          </audio>
        </div>
      </div>
    )
  }
}