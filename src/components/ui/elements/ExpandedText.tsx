import React from 'react';
import { truncateText } from '@lib/stringUtils';

interface ExpandedTextProps {
    text: string;
    isExpanded: boolean;
    toggleExpand: () => void;
}

const maxLength = 500;

const ExpandedText: React.FC<ExpandedTextProps> = ({ text, isExpanded, toggleExpand }) => {
    return (
        <>
            {isExpanded ? text : truncateText(text, maxLength)}
            {text.length > maxLength && (
                <button onClick={toggleExpand} className="font-semibold ml-2">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </>
    );
};

export default ExpandedText;