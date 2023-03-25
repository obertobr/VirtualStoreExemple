import React, { useState, useEffect } from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {products} from '../others/data';

import { cartType, informationType } from '../others/types';

interface InputProps {
    id: number;
    amount: number;
    cart:Array<cartType>;
    Delete(id:number): void;
    setCart(c:Array<cartType>): void;
}

const Card: React.FC<InputProps> = ({ id, amount, Delete, cart, setCart }) => {
    let productsLS:Array<informationType> = JSON.parse(window.localStorage.getItem("prducts"))

    if(productsLS !== null ){
        var allProducts:Array<informationType> = [...products, ...productsLS]
    }else{
        var allProducts:Array<informationType> = products
    }

    const productItem:informationType = allProducts.find(e => e.id == id)
    const cartItem:cartType = cart.find(e => e.id === id)
    
    return(
        <tr>
            <th id="Timg"><img src={productItem.images[0]}/></th>
            <th id="Ttitle"><span>{productItem.name}</span></th>
            <th>{"R$"+productItem.price.toFixed(2)}</th>
            <th>
                <table id="TCart" className='amountCard'>
                    <tr>
                        <th className="ASCart noselect"><button onClick={() => {
                            setCart(cart.map(item => 
                                item.id === id 
                                ?{...item, amount: item.amount+1}
                                :item
                            ))
                        }}>+</button></th>
                        <th className="ASCart"><span>{cartItem.amount}</span></th>
                        <th className="ASCart noselect"><button onClick={() => {
                            if(cartItem.amount !== 1){
                                setCart(cart.map(item => 
                                    item.id === id 
                                    ?{...item, amount: item.amount-1}
                                    :item
                                ))
                            }
                        }}>-</button></th>
                    </tr>
                </table>
            </th>
            <th className="CartTotal">{"R$"+(productItem.price * amount).toFixed(2)}</th>
            <th id="trash"><span onClick={() => Delete(id)} className="noselect material-symbols-outlined">delete</span></th>
        </tr>
)}

export default Card
