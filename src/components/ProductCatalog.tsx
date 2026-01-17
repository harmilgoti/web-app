import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import type { Product } from '../types';

export const ProductCatalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, stockFilter]);

    const fetchCategories = async () => {
        try {
            const cats = await productService.getCategories();
            setCategories(cats);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const filters: any = {};
            if (selectedCategory !== 'all') filters.category = selectedCategory;
            if (stockFilter === 'inStock') filters.inStock = true;
            if (stockFilter === 'outOfStock') filters.inStock = false;

            const data = await productService.getAll(filters);
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-catalog">
            <div className="catalog-header">
                <h2>Product Catalog</h2>
                <div className="filters">
                    <div className="filter-group">
                        <label>Category:</label>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Stock:</label>
                        <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value as any)}>
                            <option value="all">All Products</option>
                            <option value="inStock">In Stock</option>
                            <option value="outOfStock">Out of Stock</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="product-meta">
                                    <span className="product-price">${product.price.toFixed(2)}</span>
                                    <span className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                                    </span>
                                </div>
                                <span className="product-category">{product.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && products.length === 0 && (
                <div className="empty-state">No products found with the selected filters.</div>
            )}
        </div>
    );
};
