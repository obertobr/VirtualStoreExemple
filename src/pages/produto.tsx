import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import '../style/style.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {products} from '../others/data';

import { cartType, informationType, settingsType } from '../others/types';

import Head from '../components/head';
import Header from "../components/header"

const settings:settingsType = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

const Produto: React.FC = () => {
    if(typeof window !== 'undefined'){
        let productsLS:Array<informationType> = JSON.parse(window.localStorage.getItem("prducts"))

        if(productsLS !== null ){
            var allProducts:Array<informationType> = [...products, ...productsLS]
        }else{
            var allProducts:Array<informationType> = products
        }
        
        var urlP:URLSearchParams = new URLSearchParams(window.location.search);
        const information:informationType = allProducts.find(e => e.id == parseInt(urlP.get("id")))

        const [cart, setCart] =useState<Array<cartType>>(JSON.parse(window.localStorage.getItem("cart")))
        const [fav, setFav] =useState<Array<number>>(JSON.parse(window.localStorage.getItem("fav")))

        useEffect(() =>{
            if(cart!==null){
                window.localStorage.setItem("cart", JSON.stringify(cart))
            }
        }, [cart])
        useEffect(() =>{
            if(fav!==null){
                window.localStorage.setItem("fav", JSON.stringify(fav))
            }
        }, [fav])
        
        return(
            <>
                <Head title={information.name}/>
                <Header fav={fav} setFav={setFav}/>
                <div id="ProductContent">
                    <div id="left">
                        <Slider {...settings}>
                            {information.images.map((v, index) => {
                                return(
                                    <div>
                                        <img className="CarroselImg" src={v} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                    <div id="right">
                        <p id="TitleP">{information.name}</p>
                        <p id="PriceP">{"R$"+information.price.toFixed(2)}</p>
                        <div id="CCP">
                            {cart!==null && cart.find(e => e.id === information.id) !== undefined ? (
                                <table id="TCart">
                                    <tr>
                                        <th className="ASCart noselect"><button onClick={() => {
                                            setCart(cart.map(item => 
                                                item.id === information.id 
                                                ?{...item, amount: item.amount+1}
                                                :item
                                            ))
                                        }}>+</button></th>
                                        <th className="ASCart"><span>{cart.find(e => e.id === information.id).amount}</span></th>
                                        <th className="ASCart noselect"><button onClick={() => {
                                            if(cart.find(e => e.id === information.id).amount === 1){
                                                setCart(cart.filter(item => item.id !== information.id))
                                            } else{
                                                setCart(cart.map(item => 
                                                    item.id === information.id 
                                                    ?{...item, amount: item.amount-1}
                                                    :item
                                                ))
                                            }
                                        }}>-</button></th>
                                    </tr>
                                </table>
                            ):(
                                <button id="AddCart" onClick={() => cart===null?setCart([{id: information.id, amount: 1}]):cart.find(e => e.id === information.id)===undefined?setCart([...cart, {id: information.id, amount: 1}]):null}>Adicionar essa obra de arte ao carrinho <span id="cartP" className="noselect material-symbols-outlined">shopping_cart</span></button>
                            )}
                            {fav !== null && fav.find(idfav => idfav === information.id) !== undefined 
                            ?<span onClick={() => {
                                setFav(fav.filter(idfav => idfav !== information.id))
                            }}  id="favPon" className="noselect material-symbols-outlined">favorite</span>
                            :<span onClick={() => {
                                fav !== null? setFav([...fav, information.id ]): setFav([information.id])
                            }} id="favP" className="noselect material-symbols-outlined">favorite</span>
                            }
                        </div>
                        <p>Descrição:</p>
                        <p id="DescriptionP">{information.description}</p>
                    </div>
                </div>
            </>
        )
    }else{return;}
}

export default Produto
