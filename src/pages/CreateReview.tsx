import {Link, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {fetchProductById} from '../api/products';
import {createProductReview} from '../api/reviews';
import RatingSelector from '../components/Global/RatingSelector';

const CreateReview = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: product, isLoading, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id || ''),
    });

    const mutation = useMutation({
        mutationFn: (newReview: { rating: number; review: string }) => createProductReview(id || '', newReview),
        onSuccess: () => {
            navigate(`/products/${id}`);
        },
        onError: (error) => {
            formik.setFieldError('general', `Error: ${error.message}`);
        }
    });

    const validationSchema = yup.object({
        rating: yup
            .number()
            .required('Rating is required')
            .min(1, 'Rating must be at least 1')
            .max(5, 'Rating must be at most 5'),
        review: yup
            .string()
            .max(1100, 'Review must be at most 1100 characters')
    });

    const formik = useFormik({
        initialValues: {
            rating: 0,
            review: '',
            general: ''
        },
        validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto">
            <div className="card">
                <h1 className="mb-4">Create Review</h1>
                {product && (
                    <div className="flex items-center gap-3 border-b pb-6 mb-4">
                        <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover mr-3"/>
                        <p>{product.title}</p>
                    </div>
                )}
                <form onSubmit={formik.handleSubmit}>
                    <div className="border-b pb-12">
                        <div className="mb-4">
                            <label htmlFor="rating">Rating</label>
                            <RatingSelector onRatingChange={(value) => formik.setFieldValue('rating', value)}/>
                            {
                                formik.touched.rating && formik.errors.rating ?
                                    <ErrorMessage message={formik.errors.rating}/> :
                                    null
                            }
                            <p className="mt-1 text-sm/6 text-gray-600">Choose a rating from 1 to 5</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="review">Review</label>
                            <textarea
                                name="review"
                                id="review"
                                rows={3}
                                placeholder="What did you like or dislike about the product?"
                                value={formik.values.review}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                            {
                                formik.touched.review && formik.errors.review ?
                                    <ErrorMessage message={formik.errors.review}/> :
                                    null
                            }
                            <p className="mt-1 text-sm/6 text-gray-600">
                                Write a few sentences about the product and your experience with it.
                            </p>
                        </div>
                    </div>
                    {formik.errors.general && <div className="mt-4 text-red-600">{formik.errors.general}</div>}
                    <div className="mt-6 flex items-center justify-end gap-x-4">
                        <Link to={`/products/${id}`} className="btn-base btn-link">
                            Cancel
                        </Link>
                        <button type="submit" className="btn-base btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ErrorMessage = ({message}: { message: string }) => (
    <div className="text-red-600">{message}</div>
);
export default CreateReview;