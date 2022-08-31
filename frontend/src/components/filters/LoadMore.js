import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';

const LoadMore = () => {
    const state = useContext(GlobalState)
    const [page, setPage] = state.ProductAPI.page;
    const [result, setResult] = state.ProductAPI.result;

  return (
    <div className='load_more'>
        {
            result < page * 9 ? ""
            : <button onClick={() => setPage(page+1)}>Load more</button>
        }
    </div>
  )
}

export default LoadMore;