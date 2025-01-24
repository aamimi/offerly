import React from 'react';
import { truncateText } from '../../utils/stringUtils';

interface ExpandedTextProps {
    text: string;
    isExpanded: boolean;
    toggleExpand: () => void;
}

const ExpandedText: React.FC<ExpandedTextProps> = ({ text, isExpanded, toggleExpand }) => {
    return (
        <>
            {isExpanded ? text : truncateText(text, 400)}
            {text.length > 400 && (
                <button onClick={toggleExpand} className="text-blue-500 ml-2">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </>
    );
};

export default ExpandedText;