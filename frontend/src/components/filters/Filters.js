import { useContext } from "react";
import { GlobalState } from "../../GlobalState";

const Filters = () => {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [category, setCategory] = state.ProductAPI.category;
    const [sort, setSort] = state.ProductAPI.sort;
    const [search, setSearch] = state.ProductAPI.search;

    const handleCategory = (e) => {
        setCategory(e.target.value);
        setSearch('');
    }

  return (
    <div className='filter_menu'>
        <div className="row">
            <span>Filters: </span>
            <select name="category" value={category} onChange={handleCategory}>
                <option value="">All Products</option>
                {
                    categories.map((category) => (
                        <option value={"category=" + category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>
        <input type="text" value={search} placeholder="Search product..." 
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <div className="row sort">
            <span>Sort By: </span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Newest</option>
                <option value="sort=oldest">oldest</option>
                <option value="sort=-sold">Best Sales</option>
                <option value="sort=-price">Price: Highest-Lowest</option>
                <option value="sort=price">Price: Lowest-Highest</option>
            </select>
        </div>
    </div>
  )
}

export default Filters;