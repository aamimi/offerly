import React from "react";

interface EmojiPickerProps {
    onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({onEmojiSelect}: EmojiPickerProps) => {
    const emojis: string[] = ["😀", "😂", "🤣", "😊", "😍", "🥰", "😎", "🤔", "😴", "😅",
        "👍", "👋", "❤️", "🎉", "✨", "🔥", "👏", "🙌", "🤝", "💪"];

    return (
        <div
            className="absolute w-60 bottom-9 -right-50 p-2 bg-zinc-100 dark:bg-zinc-900 border border-color rounded-sm shadow-lg grid grid-cols-6 gap-1 z-10">
            {emojis.map((emoji: string, index: number) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onEmojiSelect(emoji)}
                    className="hover:bg-gray-100 rounded p-1 text-lg"
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};
export default EmojiPicker;