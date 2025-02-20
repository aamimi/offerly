import React, {useRef, useState} from 'react';
import {Button} from "@ui/button.tsx";
import {Textarea} from "@ui/textarea";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createComment} from '@api/comments';
import {SendHorizontal, Smile} from 'lucide-react';
import EmojiPicker from "@ui/elements/EmojiPicker.tsx";
import {insertEmoji} from "@lib/textAreaHelpersUtils.ts";
import {useToast} from "@hooks/use-toast";
import {Toaster} from "@components/ui/toaster";

interface CommentFormProps {
    slug: string;
}

const CommentForm: React.FC<CommentFormProps> = ({slug}) => {
    const [content, setContent] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const queryClient = useQueryClient();
    const {toast} = useToast();

    const {mutate, isPending} = useMutation({
        mutationFn: () => createComment(slug, content),
        onSuccess: () => {
            setContent('');
            setShowEmojis(false);
            queryClient.invalidateQueries({queryKey: ['product-comments', slug]});
            toast({
                title: "Comment posted",
                description: "Your comment has been posted successfully.",
                variant: "default",
            });
        },
        onError: (error) => {
            if (error instanceof Error) {
                console.error(error.message);
            }
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to post comment. Please try again.",
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            mutate();
        }
    };

    const handleEmojiInsert = (emoji: string) => {
        insertEmoji(emoji, content, textareaRef, setContent);
        setShowEmojis(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="border border-color mb-4 p-4">
                    <div className="mb-4">
                        <Textarea
                            ref={textareaRef}
                            placeholder="Write a comment..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={2}
                            className="w-full resize-y mb-2 border-0 shadow-none"
                        />
                    </div>
                    <div className="flex justify-between items-center relative">
                        <div className="relative">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowEmojis(!showEmojis)}
                                className="gap-2"
                            >
                                <Smile className="w-5 h-5"/>
                                Emoji
                            </Button>
                            {showEmojis && <EmojiPicker onEmojiSelect={handleEmojiInsert}/>}
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending || !content.trim()}
                            className="gap-2"
                        >
                            <SendHorizontal className="w-4 h-4"/>
                            {isPending ? 'Sending...' : 'Send'}
                        </Button>
                    </div>
                </div>
            </form>
            <Toaster/>
        </>
    );
};

export default CommentForm;