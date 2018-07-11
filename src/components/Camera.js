import React, { Component } from 'react';
import Webcam from 'react-webcam';

export class WebcamCapture extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			src: ''
		}
	}
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({src: imageSrc});
    console.log(imageSrc);
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/png"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
        <img scr={this.state.src} />
      </div>
    );
  }
}