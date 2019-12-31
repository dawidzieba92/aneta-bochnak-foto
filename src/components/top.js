import React from "react"
import cloudinary from 'cloudinary-core';
import {Image, CloudinaryContext} from 'cloudinary-react';
import { Fade  } from 'react-slideshow-image';

import Scroller from "../components/scroller"
import config from "../config.json"

const cloudName = config.cloudinaryCloudName; 
const sliderProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  arrows: false,
}

export default class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        images: []
    };
  }

  componentDidMount() {
    const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: cloudName});
    const url = cloudinaryCore.url('top', {format: 'json', type: 'list'});
    fetch(url)
      .then(res => res.json())
      .then(result => { 
        let images = result.resources.map(el => el.public_id);
        this.setState({images: images});
      });

    this.setSizeOfWindow();
    window.onresize = ()=>{
      this.setSizeOfWindow();
    }
  }

  setSizeOfWindow() {
    const width = window.innerWidth;
    const height = Math.round(window.innerHeight*1.2);
    this.setState({wWidth: width, wHeight: height});
  }

  render() {
    const {wWidth, wHeight, images} = this.state;
    return (
    <header className="masthead">
      <div className="slide-container">
        <CloudinaryContext cloudName={cloudName} width={wWidth} height={wHeight} crop='fill' gravity='auto'>
          <Fade {...sliderProperties}>
            {images.map(image => {
              return <div className="pickgradient each-slide" key={image} >
                      <Image publicId={image} />
                    </div>
            })}
          </Fade >
        </CloudinaryContext>
      </div>
      <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-10 align-self-end">
              <h1 className="text-uppercase text-white font-weight-bold">Magia zatrzymanej chwili</h1>
              <hr className="divider my-4"/>
              </div>
              <div className="col-lg-8 align-self-baseline">
              <p className="text-white-75 font-weight-light mb-5">Najlepsze zdjęcia na świecie</p>
              <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about" onClick={Scroller.handleAnchorScroll}>Dowiedz się więcej</a>
              </div>
          </div>
      </div>
    </header>
    );
  }
}
