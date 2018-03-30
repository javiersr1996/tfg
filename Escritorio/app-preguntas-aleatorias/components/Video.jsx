import React from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    //console.log("estoy en Video.jsx y la source es "+ this.props.video);
    let key= this.props.key_video;

    return (
      <div>
        <div>
          <video key={key} width="700" height="400" controls>
            <source src={this.props.video} type="video/mp4"/>
          </video>
        </div>
      </div>
    )
  }
}