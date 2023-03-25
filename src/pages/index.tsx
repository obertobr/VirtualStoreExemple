import React, { useState, useEffect } from 'react'
import '../style/style.css';

import Head from '../components/head';
import Header from "../components/header"
import Card from "../components/card"

import { informationType } from '../others/types';

import {products} from '../others/data';

const Home: React.FC = () => {
  if(typeof window !== 'undefined'){
    let productsLS:Array<informationType> = JSON.parse(window.localStorage.getItem("prducts"))

    if(productsLS !== null ){
      var allProducts:Array<informationType> = [...products, ...productsLS]
    }else{
      var allProducts:Array<informationType> = products
    }

    const [fav, setFav] =useState<Array<number>>(JSON.parse(window.localStorage.getItem("fav")))

    useEffect(() =>{
        if(fav!==null){
          window.localStorage.setItem("fav", JSON.stringify(fav))
        }
    }, [fav])
    
    return(
      <>
        <Head title="Minimalist 3D Arts"/>
        <Header fav={fav} setFav={setFav}/>
        <section>
          {allProducts.map(p => {
            return <Card id={p.id} fav={fav} setFav={setFav}/>
          })}
        </section>
      </>
    )
  } else {return;}
}

export default Home
