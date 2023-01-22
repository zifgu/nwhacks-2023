import { Parallax } from 'react-parallax';
import second from '../images/2nd.jpg'

const ImageTwo = () => (
    <Parallax className='image' bgImage={second} strength={800}>
        <div className='content'>
            <span className="img-txt">You Have No Limit</span>
        </div>
    </Parallax>
);

export default ImageTwo