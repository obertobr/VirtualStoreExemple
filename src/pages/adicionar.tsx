import React, { useState, useEffect } from 'react'
import '../style/style.css';

import Head from '../components/head';
import Header from "../components/header"

import {products} from '../others/data';

import { informationType } from '../others/types';

const Home: React.FC = () => {
  if(typeof window !== 'undefined'){
    const [fav, setFav] =useState<Array<number>>(JSON.parse(window.localStorage.getItem("fav")))

    const [name, setName] =useState<string>("")
    const [description, setDescription] =useState<string>("")
    const [price, setPrice] =useState<number>(0)
    const [img1, setImg1] =useState<string>("")
    const [img2, setImg2] =useState<string>("")
    const [img3, setImg3] =useState<string>("")
    const [download, setDownload] =useState<string>("")

    useEffect(() =>{
        if(fav!==null){
          window.localStorage.setItem("fav", JSON.stringify(fav))
        }
    }, [fav])
    
    return(
      <>
        <Head title="Minimalist 3D Arts"/>
        <Header fav={fav} setFav={setFav}/>
        <div id="send">
            <p>Adicionar Produto</p>
            <p>Nome:<input onChange={e => setName(e.target.value)} type="text"/></p>
            <p>Descrição:<input onChange={e => setDescription(e.target.value)} type="text"/></p>
            <p>Preço:<input onChange={e => setPrice(parseInt(e.target.value))} type="number" /></p>
            <p>Download:<input onChange={e => setDownload(e.target.value)} type="text"/></p>
            <p>Imagens:</p>
            <div>
                <p>Imagem 1:<input onChange={e => setImg1(e.target.value)} type="text"/></p>
                <p>Imagem 2:<input onChange={e => setImg2(e.target.value)} type="text"/></p>
                <p>Imagem 3:<input onChange={e => setImg3(e.target.value)} type="text"/></p>
            </div>
            <button onClick={() => {
                let productsLS:Array<informationType> = JSON.parse(window.localStorage.getItem("prducts"))
                let product:informationType = {
                    "id": productsLS !== null?productsLS[productsLS.length-1].id+1: products[products.length-1].id+1,
                    "name":name,
                    "description":description,
                    "price":price,
                    "images":[
                        img1,
                        img2,
                        img3,
                    ],
                    "download":download,
                }
                productsLS !== null ? productsLS = [...productsLS, product]: productsLS = [product]
                window.localStorage.setItem("prducts", JSON.stringify(productsLS))
                window.alert("Adicionado com sucesso")
            }} id="sendButon">ENVIAR</button>
        </div>
      </>
    )
  } else {return;}
}

export default Home
