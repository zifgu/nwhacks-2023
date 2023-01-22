import { Parallax } from 'react-parallax';
import age from '../images/age.jpg'
import second from '../images/2nd.jpg'
import last from '../images/last.jpg'
import React from "react";
import "./EndPage.css";

const ImageOne = () => (
  <Parallax className='image1' bgImage={age} strength={800}>
    <div className='content'>
      <span className="img-txt">Your OutLook is Bright</span>
    </div>
  </Parallax>
);

const ImageTwo = () => (
  <Parallax className='image' bgImage={second} strength={800}>
    <div className='content'>
      <span className="img-txt">You Have No Limit</span>
    </div>
  </Parallax>
);

const ImageThree= () => (
  <Parallax className='image' bgImage={last} strength={800}>
    <div className='content'>
      <span className="img-txt">You Can Be Anything</span>
    </div>
  </Parallax>
);

export function EndPage() {
  return (
    <div className="end-page">
      <ImageOne />
      <ImageTwo />
      <ImageThree />
    </div>
  );
}