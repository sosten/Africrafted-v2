import { useState, useEffect } from 'react';
import axios from "axios";

const ProductAPI = () => {
    const [product, setProduct] = useState([]);
    const [callback, setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    useEffect(()=>{
      const getProduct = async ()=> {
        const res = await axios.get(`/api/product?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
        setProduct(res.data.product)
        setResult(res.data.result)
      }
      getProduct();
  }, [callback, category, sort, search, page])

  return {
    product: [product, setProduct],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult]
  }
}

export default ProductAPI;