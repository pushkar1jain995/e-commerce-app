import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const StarRating = ({ value, onChange }) => {
    const [rating, setRating] = useState(value);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        onChange(newRating);
    };

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => handleRatingChange(star)}
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const UserReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [newRating, setNewRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await fetch(`/api/products/${productId}/reviews`);
            const data = await res.json();
            setReviews(data);
        };
        fetchReviews();
    }, [productId]);

    const handleSubmitReview = async () => {
        const res = await fetch(`/api/products/${productId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ review: newReview, rating: newRating }),
        });
        const data = await res.json();
        setReviews([...reviews, data]);
        setNewReview('');
        setNewRating(0);
    };

    return (
        <div>
            <Card>
                <CardHeader>User Reviews</CardHeader>
                <CardContent>
                    {reviews.map((review) => (
                        <div key={review._id} className="mb-4">
                            <h3 className="font-bold">{review.user.name}</h3>
                            <StarRating value={review.rating} onChange={() => { }} readOnly />
                            <p>{review.review}</p>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <StarRating value={newRating} onChange={setNewRating} />
                    <Textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review..."
                        className="mb-2"
                    />
                    <Button onClick={handleSubmitReview}>Submit Review</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UserReviews;