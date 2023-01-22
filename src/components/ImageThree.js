import { Parallax } from 'react-parallax';
import last from '../images/last.jpg'

const ImageThree= () => (
    <Parallax className='image' bgImage={last} strength={800}>
        <div className='content'>
            <span className="img-txt">You Can Be Anything</span>
        </div>
    </Parallax>
);

export default ImageThree