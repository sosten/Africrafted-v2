import { useState, useEffect } from 'react';
import axios from "axios";

const ProductAPI = () => {
    const [product, setProduct] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(()=>{
      const getProduct = async ()=> {
        const res = await axios.get('/api/product')
        setProduct(res.data.product)
      }
      getProduct();
  }, [callback])

  return {
    product: [product, setProduct],
    callback: [callback, setCallback]
  }
}

export default ProductAPI;