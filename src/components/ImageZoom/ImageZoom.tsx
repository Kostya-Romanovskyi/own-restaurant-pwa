import { FC, useState } from 'react';

import Image from '../../assets/Hero__img/sushi_1.png';
import Image2 from '../../assets/Hero__img/sushi_2.png';

import './image-zoom.scss';

interface IImageZoom {
  image: string;
}

const ImageZoom: FC<IImageZoom> = ({ image }) => {
  const [isDisassembled, setIsDisassembled] = useState(false);

  // Toggle function
  const toggleDisassembly = () => {
    setIsDisassembled(!isDisassembled);
  };

  return (
    <div
      className={`sushi-container ${isDisassembled ? 'disassembled' : ''}`}
      onClick={toggleDisassembly}
    >
      {/* Layer nori */}
      <div className="sushi-layer nori">
        <img src={image} alt="Nori" />
      </div>
      {/* Layer fish */}
      <div className="sushi-layer fish">
        <img src={Image2} alt="Fish" />
      </div>
      {/* Layer rice */}
      <div className="sushi-layer rice">
        <img src={Image} alt="Rice" />
      </div>
    </div>
  );
};

export default ImageZoom;
