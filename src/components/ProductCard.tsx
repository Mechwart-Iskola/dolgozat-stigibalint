import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductCard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [result, setResult] = useState<Product | undefined>(undefined);
    const [search, setSearch] = useState("");
    const [emptySearch, setEmptySearch] = useState(true);


    useEffect(() => {
        const loadProducts = async () => {
            const response = await fetch("products.json");
            const data = await response.json();
            setProducts(data.products);
        };

        loadProducts();
    }, []);

    const SearchStart = () => {
      
        if (search == "") {
            setResult(undefined);
            setEmptySearch(true);
            alert("Üres keresés")
            return;
        }

        setResult(
            products.find((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            )
        );
        setEmptySearch(false);
    };
    return (

        <div className="product-card">
            <div className="search-section">
                <label htmlFor="productName">Add meg a terméknevet</label>
                <input
                    type="text"
                    id="productName"
                    value={search}
                    placeholder="Termék neve..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={SearchStart}>Keresés</button>
            </div>
            
            <div className="results-section">
                {result ? (
                    <div className="product-info">
                        <img
                            src={result.image}
                            alt={result.name}
                            className="product-image"
                        />
                        <div className="product-details">
                          <p>ID: <b>{result.id}</b></p>
                          <p>NAME: <b>{result.name}</b></p>
                          <p>PRICE: <b>{result.price}</b></p>
                          <p>CATEGPRY: <b>{result.category}</b></p>
                        </div>
                    </div>

                ) : emptySearch ? null : (
                    <p className="error">
                        No product found with the given name.
                    </p>
                )}
            </div>
        </div>
    );
};
export default ProductCard;