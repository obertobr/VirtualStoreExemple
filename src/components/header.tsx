import React, { useState, useEffect } from 'react'

import Logo from '../images/logo.png';

import {products} from '../others/data';

import { informationType } from '../others/types';

interface InputProps {
    fav: Array<number>;
    setFav(fav:Array<number>): void;
}

const Header: React.FC<InputProps> = ({ fav, setFav }) => {
    let productsLS:Array<informationType> = JSON.parse(window.localStorage.getItem("prducts"))

    if(productsLS !== null ){
        var allProducts:Array<informationType> = [...products, ...productsLS]
    }else{
        var allProducts:Array<informationType> = products
    }
    
    const [show, setShow] =useState<boolean>(false)

    return(
        <header>
            <a href='/'><img className="logo" src={Logo}/></a>
            <div>
                <a href='/carrinho'><span id="fav" className="noselect material-symbols-outlined">shopping_cart</span></a>
                <span onClick={() => {setShow(!show)}} id="fav" className="noselect material-symbols-outlined">favorite</span>
                {show && (
                    <div id="favMenu">
                    <p>FAVORITOS</p>
                    <div>
                        <table>
                            {fav!== null && fav.map(idfav => {
                                let item:informationType = allProducts.find(i => i.id === idfav)
                                return (
                                    <tr>
                                        <td><a href={'/produto?id='+idfav}><img id="favTableImg" src={item.images[0]}/></a></td>
                                        <td id="favTableTitle"><a href={'/produto?id='+idfav}>{item.name}</a></td>
                                        <td><span onClick={() => {
                                            setFav(fav.filter(idf => idf !== idfav))
                                        }} id="favTableDelete" className="noselect material-symbols-outlined">delete</span></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </div>
                )}
            </div>
        </header>
)}

export default Header
