import {useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {createProductReview} from '@api/reviews';
import RatingSelector from '@ui/elements/RatingSelector';
import {Button} from '@ui/button';
import {Textarea} from '@ui/textarea';
import {Label} from '@ui/label';
import {AlertDestructive} from "@ui/elements/AlertDestructive";
import ReviewProduct from '@components/Product/ReviewProduct';

type FormValues = {
    rating: number
    review: string
}

const CreateReview = () => {
    const [serverError, setServerError] = useState<string>('');
    const {id} = useParams();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (newReview: FormValues) => createProductReview(id || '', newReview),
        onSuccess: () => {
            navigate(`/products/${id}`);
        },
        onError: (error) => {
            console.error(error);
            setServerError("Server side error, please try again later.");
        }
    });

    const validationSchema = yup
        .object({
            rating: yup
                .number()
                .required('Rating is required')
                .min(1, 'Rating must be at least 1')
                .max(5, 'Rating must be at most 5'),
            review: yup
                .string()
                .required('Review is required')
                .max(1100, 'Review must be at most 1100 characters')
        });

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValues>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        mutation.mutate(values);
    };

    return (
        <div className="container mx-auto">
            <div className="card">
                <h1 className="mb-4">Create Review</h1>
                {id && <ReviewProduct productId={id} />}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="border-b pb-12 mb-4">
                        <div className="mb-4">
                            <Label htmlFor="rating">Rating</Label>
                            <RatingSelector
                                onRatingChange={(value: number): void => setValue('rating', value)}
                                ariaInvalid={!!errors.rating}/>
                            {
                                errors.rating &&
                                <div className="text-red-500 mb-2" role="alert">{errors.rating.message}</div>
                            }
                            <p className="text-sm text-muted-foreground">Choose a rating from 1 to 5</p>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="review">Review</Label>
                            <Textarea
                                {...register('review')}
                                id="review"
                                rows={3}
                                placeholder="What did you like or dislike about the product?"
                                aria-invalid={errors.review ? "true" : "false"}
                            />
                            {
                                errors.review &&
                                <div className="text-red-500 mb-2" role="alert">{errors.review.message}</div>
                            }
                            <p className="text-sm text-muted-foreground">
                                Write a few sentences about the product and your experience with it.
                            </p>
                        </div>
                    </div>
                    {serverError && <AlertDestructive message={serverError}/>}
                    <div className="mt-6 flex items-center justify-end gap-x-4">
                        <Button asChild variant="link">
                            <Link to={`/products/${id}`}>
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;