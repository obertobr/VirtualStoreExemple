import * as React from "react"
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {products} from '../others/data';

import { settingsType, informationType } from '../others/types';

const settings:settingsType = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

interface InputProps {
    id: number;
    fav: Array<number>;
    setFav(fav:Array<number>): void;
}

const Card: React.FC<InputProps> = ({ id, fav, setFav }) => {
    let productsLS:Array<informationType> = JSON.parse(window.localStorage.getItem("prducts"))

    if(productsLS !== null ){
        var allProducts:Array<informationType> = [...products, ...productsLS]
    }else{
        var allProducts:Array<informationType> = products
    }

    const item:informationType = allProducts.find(e => e.id == id)
    
    return(
        <div className="card">
            <a href={"/produto?id="+id}>
                <Slider {...settings}>
                {item.images.map((v) => {
                    return (
                        <div>
                            <img className="CarroselImg" src={v} />
                        </div>
                    )
                })}
                </Slider>
                <p className="TitleCard">{item.name}</p>
                <p className="PriceCard">{"R$ " + item.price.toFixed(2)}</p>
            </a>
            {fav !== null && fav.find(idfav => idfav === id) !== undefined 
            ?<span onClick={() => {
                setFav(fav.filter(idfav => idfav !== id))
            }}  className="CardFavOn noselect material-symbols-outlined">favorite</span>
            :<span onClick={() => {
                fav !== null? setFav([...fav, id ]): setFav([id])
            }} className="CardFav noselect material-symbols-outlined">favorite</span>
            }
        </div>
    )
}

export default Card
