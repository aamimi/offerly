import React, {useRef, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {getSearchResult} from "@api/search";
import {useDebounce} from '@hooks/useDebounce';
import {SearchInput} from './SearchInput';
import {SearchResults} from './SearchResults';

interface SearchComponentProps {
    onSearchSubmit?: (query: string) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({onSearchSubmit}: SearchComponentProps) => {
    const navigate: NavigateFunction = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchResultVisible, setIsSearchResultVisible] = useState<boolean>(false);
    const searchResultRef = useRef<HTMLDivElement>(null);
    const searchInputGroupRef = useRef<HTMLDivElement>(null);
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const {
        data: searchResult = {data:{categories: [], products: []}},
        isLoading,
        isError
    } = useQuery({
        queryKey: ['search', debouncedSearchQuery],
        queryFn: () => getSearchResult(debouncedSearchQuery),
        enabled: !!debouncedSearchQuery || isSearchResultVisible,
        refetchOnWindowFocus: false,
        retry: 1
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSearchSubmit) {
            onSearchSubmit(searchQuery);
        } else {
            navigate(`products?search=${searchQuery}`);
        }
        setIsSearchResultVisible(false);
    };

    const handleSearchFocus = () => {
        setIsSearchResultVisible(true);
    };

    const clearSearch = () => {
        setIsSearchResultVisible(false);
        setSearchQuery('');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            searchResultRef.current &&
            searchInputGroupRef.current &&
            !searchResultRef.current.contains(event.target as Node) &&
            !searchInputGroupRef.current.contains(event.target as Node)
        ) {
            setIsSearchResultVisible(false);
        }
    };

    // Add click outside listener
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full relative" ref={searchInputGroupRef}>
            <SearchInput
                searchQuery={searchQuery}
                isLoading={isLoading}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
                handleSearchFocus={handleSearchFocus}
                clearSearch={searchQuery ? clearSearch : undefined}
            />

            {isSearchResultVisible && (
                <div
                    ref={searchResultRef}
                    className="base-card rounded-md shadow-md absolute max-h-96 w-full mx-auto mt-1 z-50 overflow-y-auto"
                >
                    <SearchResults
                        isError={isError}
                        isLoading={isLoading}
                        categories={searchResult.data.categories}
                        products={searchResult.data.products}
                        onClose={() => setIsSearchResultVisible(false)}
                    />
                </div>
            )}
        </div>
    );
};