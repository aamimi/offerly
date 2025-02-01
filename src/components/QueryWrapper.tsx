import React from 'react';
import {LoaderPinwheel} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";

export const LoadingSpinner: React.FC = () => (
    <div className="flex flex-row items-center justify-center w-full h-full" aria-live="polite">
        <LoaderPinwheel className="animate-spin h-6 w-6 text-zinc-700 dark:text-zinc-100"/>
    </div>
);

interface ErrorMessageProps {
    error: string;
    message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> =
    ({error, message = "An error occurred. Please try again later."}) => {
        console.error(error);
        return (
            <Alert variant="destructive" className="my-4 h-fit">
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        );
    };

interface EmptyDataProps {
    message?: string;
}

export const EmptyData: React.FC<EmptyDataProps> =
    ({message = "No data available."}) => {
        return (
            <Alert className="my-4">
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        );
    };