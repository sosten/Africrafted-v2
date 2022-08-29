import { useState, useEffect } from 'react';
import axios from "axios";

const ProductAPI = () => {
    const [product, setProduct] = useState([]);

    const getProduct = async ()=> {
        const res = await axios.get('/api/product')
        setProduct(res.data.product)
    }

    useEffect(()=>{
        getProduct();
    }, [])

  return {
    product: [product, setProduct]
  }
}

export default ProductAPI;