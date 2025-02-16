export const insertEmoji = (
    emoji: string,
    content: string,
    textareaRef: React.RefObject<HTMLTextAreaElement>,
    setContent: (content: string) => void
) => {
    const textarea = textareaRef.current;
    if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newContent = content.substring(0, start) +
            emoji +
            content.substring(end);

        setContent(newContent);

        setTimeout(() => {
            textarea.focus();
            const newPosition = start + emoji.length;
            textarea.setSelectionRange(newPosition, newPosition);
        }, 0);
    }
};