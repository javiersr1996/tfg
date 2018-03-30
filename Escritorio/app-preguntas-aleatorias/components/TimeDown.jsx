import React from 'react';

export default class TimeDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining:0,
    };
    this.tick = this.tick.bind(this);
    this.tiempoAgotado = this.tiempoAgotado.bind(this);
  };

  tick(){
    this.setState({
      secondsRemaining:this.state.secondsRemaining -1
    });
    if(this.state.secondsRemaining <=0){
      clearInterval(this.interval);
      this.tiempoAgotado();
    }
  };

  componentDidMount(){
    this.setState({
      secondsRemaining: this.props.secondsRemaining
    });

    this.interval = setInterval(this.tick,1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  };

  tiempoAgotado(){
      this.props.onAnswerQuiz();
  };


  render() {

    return (

        <div>
          Tiempo para responder: {this.state.secondsRemaining}
       </div>
    )
  }
}