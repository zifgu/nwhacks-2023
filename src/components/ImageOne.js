import { Parallax } from 'react-parallax';
import age from '../images/age.jpg'

const ImageOne = () => (
    <Parallax className='image1' bgImage={age} strength={800}>
        <div className='content'>
            <span className="img-txt">Your OutLook is Bright</span>
        </div>
    </Parallax>
);

export default ImageOne