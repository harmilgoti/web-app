import React, { useState } from 'react';
import { searchService } from '../services/searchService';
import type { SearchResult } from '../types';

export const SearchPanel: React.FC = () => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState<'all' | 'products' | 'users'>('all');
    const [results, setResults] = useState<SearchResult<any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = async (page: number = 1) => {
        if (!query.trim()) return;

        setLoading(true);
        setCurrentPage(page);
        try {
            const data = await searchService.search(query, searchType, page, 10);
            setResults(data);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(1);
        }
    };

    return (
        <div className="search-panel">
            <h2>Search</h2>

            <div className="search-controls">
                <div className="search-input-group">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for products, users..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="search-button" onClick={() => handleSearch(1)} disabled={!query.trim()}>
                        🔍 Search
                    </button>
                </div>

                <div className="search-type-selector">
                    <label>
                        <input
                            type="radio"
                            value="all"
                            checked={searchType === 'all'}
                            onChange={(e) => setSearchType(e.target.value as any)}
                        />
                        All
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="products"
                            checked={searchType === 'products'}
                            onChange={(e) => setSearchType(e.target.value as any)}
                        />
                        Products
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="users"
                            checked={searchType === 'users'}
                            onChange={(e) => setSearchType(e.target.value as any)}
                        />
                        Users
                    </label>
                </div>
            </div>

            {loading && <div className="loading">Searching...</div>}

            {results && !loading && (
                <div className="search-results">
                    <div className="results-header">
                        <span>
                            Found {results.total} result{results.total !== 1 ? 's' : ''}
                        </span>
                        <span>
                            Page {results.page} of {results.totalPages}
                        </span>
                    </div>

                    <div className="results-list">
                        {results.items.map((item: any, index) => (
                            <div key={item.id || index} className="result-item">
                                <div className="result-type-badge">{item.type || 'unknown'}</div>
                                <div className="result-content">
                                    {item.name && <div className="result-title">{item.name}</div>}
                                    {item.email && <div className="result-subtitle">{item.email}</div>}
                                    {item.description && <div className="result-description">{item.description}</div>}
                                    {item.price !== undefined && (
                                        <div className="result-price">${item.price.toFixed(2)}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {results.totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => handleSearch(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="pagination-button"
                            >
                                ← Previous
                            </button>
                            <span className="pagination-info">
                                Page {currentPage} of {results.totalPages}
                            </span>
                            <button
                                onClick={() => handleSearch(currentPage + 1)}
                                disabled={currentPage === results.totalPages}
                                className="pagination-button"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            )}

            {results && results.items.length === 0 && !loading && (
                <div className="empty-state">No results found for "{query}"</div>
            )}
        </div>
    );
};
