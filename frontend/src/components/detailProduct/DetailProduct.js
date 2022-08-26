import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import ProductItem from '../utils/ProductItem';

const DetailProduct = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [ product ] = state.productAPI.product;
    const addToCart = state.userAPI.addToCart;
    const [ detailProduct, setDetailProduct ] = useState([])

    useEffect(()=>{
        if(params.id){
            product.forEach(product =>{
                if(product._id === params.id) setDetailProduct(product)
            })
        }

    },[params.id, product]);

    if(detailProduct.length === 0) return null;

  return (
    <>
        <div className='detail'>
            <img src={detailProduct.images.url} alt="" />
            <div className="box_detail">
                <div className="row">
                    <h2>{detailProduct.title}</h2>
                    <h6>#Id {detailProduct.product_id}</h6>
                </div>
                <span>{detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.content}</p>
                <p>Sold: {detailProduct.sold}</p>
                <Link to={'/cart'} className="cart" onClick={()=> addToCart(detailProduct)}>Buy Now</Link>
            </div>
        </div>
        <div>
            <h2>Related Products</h2>
            <div className="products">
                {
                    product.map(product => {
                        return product.category === detailProduct.category
                        ? <ProductItem key={product._id} product={product} /> : null
                    })
                }
            </div>
        </div>
    </>
  )
}

export default DetailProduct;