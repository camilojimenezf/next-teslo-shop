import { FC } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from './ProductSlideshow.module.css'

interface Props {
  images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
      <div className="slide-container">
        <Slide
          easing='ease'
          duration={7000}
          indicators
        >
         {images.map((productImg, index)=> (
            <div className={styles['each-slide']} key={index}>
              <div style={{
                backgroundImage: `url(/products/${productImg})`,
                backgroundSize: 'cover'
              }}>
                {/* <span>{productImg.caption}</span> */}
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    );
}
