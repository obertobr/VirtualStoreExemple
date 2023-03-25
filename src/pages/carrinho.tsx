import React, { useState, useEffect } from 'react'
import '../style/style.css';

import Head from '../components/head';
import Header from "../components/header"
import CartCard from "../components/cartCard"

import { cartType, cupomType, informationType } from '../others/types';

import {products, cupoms} from '../others/data';

const Carrinho: React.FC = () => {
    if(typeof window !== 'undefined'){
        let productsLS:Array<informationType> = JSON.parse(window.localStorage.getItem("prducts"))

        if(productsLS !== null ){
            var allProducts:Array<informationType> = [...products, ...productsLS]
        }else{
            var allProducts:Array<informationType> = products
        }

        const [cart, setCart] =useState<Array<cartType>>(JSON.parse(window.localStorage.getItem("cart")))
        const [fav, setFav] =useState<Array<number>>(JSON.parse(window.localStorage.getItem("fav")))
        const [cupom, setCupom] =useState<string>("")
        const [discont, setDiscont] =useState<number>(0)

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

        const Delete = (id:number) => {
            setCart(cart.filter(item => item.id !== id))
        }

        const Total = ():number => {
            let t = 0
            cart !== null && cart.map(i => {
                t = t + (allProducts.find(p => p.id == i.id).price * i.amount)
            })
            return t
        }
        if(cart === null || cart.length === 0){
            return(
                <>
                    <Head title="Finalizar Compra"/>
                    <Header fav={fav} setFav={setFav}/>
                    <div id="CartContent">
                        <p>Meu carrinho</p>
                    </div>
                    <p id="CartEmpty">Nenhum item no carrinho no momento =( , volte a pagina principal para escolher algo</p>
                </>
            )
        } else {
            return(
                <>
                    <Head title="Finalizar Compra"/>
                    <Header fav={fav} setFav={setFav}/>
                    <div id="CartContent">
                        <p>Meu carrinho</p>
                        <table id="ItemsCart">
                            <tr>
                                <th colSpan={2}>Obra de arte</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th className="CartTotal">Total</th>
                                <th></th>
                            </tr>
                            {cart !== null && cart.map(p => {
                                return <CartCard id={p.id} amount={p.amount} Delete={Delete} cart={cart} setCart={setCart}/>
                            })}
                        </table>
                        <div id="cupom">
                            <p>Cupom</p>
                            <div>
                                <input onChange={t => setCupom(t.target.value)}/>
                                <button onClick={() => {
                                    let cupomItem:cupomType = cupoms.find(c => c.code==cupom)
                                    if(cupomItem !== undefined){
                                        window.alert(cupomItem.percent+"% de desconto")
                                        setDiscont(cupomItem.percent)
                                    } else {
                                        window.alert("CODIGO INVALIDO")
                                    }
                                }}>Aplicar</button>
                            </div>
                        </div>
                        <div id="values">
                            <div><span>Subtotal:</span><span>{"R$"+Total().toFixed(2)}</span></div>
                            <div><span>Desconto:</span><span>{(discont > 0 ? "- R$" : "R$") + (Total() * discont/100).toFixed(2)}</span></div>
                            <div><span>total:</span><span>{"R$"+(Total() - (Total() * discont/100)).toFixed(2)}</span></div>
                        </div>
                        <button onClick={() => {
                            if(discont === 100){
                                cart.map(cartItem => {
                                    console.log(cartItem.id)
                                    window.open(allProducts.find(item => item.id === cartItem.id).download);
                                })
                            } else{
                                window.alert("Deculpe você não tem dinhero suficiente :(")
                            }
                        }} id="checkout">FINALIZAR COMPRA</button>
                    </div>
                </>
            )
        }
    } else {return;}
}

export default Carrinho
