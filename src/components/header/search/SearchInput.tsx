import React from 'react';
import {Loader, Search, X} from 'lucide-react';

interface SearchInputProps {
    searchQuery: string;
    isLoading: boolean;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleSearchFocus: () => void;
    clearSearch?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = (
    {
        searchQuery,
        isLoading,
        handleSearchChange,
        handleSearchSubmit,
        handleSearchFocus,
        clearSearch
    }
) => {
    return (
        <form onSubmit={handleSearchSubmit} className="w-full">
            <div
                onClick={handleSearchFocus}
                role="button"
                className="flex flex-row items-center pl-2 py-1.5 rounded-md
                 bg-transparent border border-zinc-300 shadow-sm"
            >
                {
                    isLoading
                        ? (<Loader size={24} className="animate-spin text-zinc-400 mr-2"/>)
                        : (<Search size={24} className="text-zinc-400 mr-2"/>)
                }
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="flex-grow px-2 rounded-md bg-transparent font-semibold
                               placeholder:font-normal placeholder-zinc-400 focus:outline-none"
                    aria-label="Search input"
                />
                {searchQuery && clearSearch && (
                    <X
                        size={20}
                        className="text-zinc-400 cursor-pointer mr-2"
                        onClick={clearSearch}
                    />
                )}
            </div>
        </form>
    );
};