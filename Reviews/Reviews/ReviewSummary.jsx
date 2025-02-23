import React, { useState } from "react";

// Sample reviews data
const initialReviews = [
  {
    user: "Mukesh Kaana",
    rating: 5,
    title: "Excellent product!",
    description: "The product exceeded my expectations. Highly recommend!",
    images: ["/images/reviews/IMG1.jpg", "/images/reviews/IMG2.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Abhay bhainga",
    rating: 4,
    title: "Very good quality",
    description: "By wearing your opticals I can see future",
    images: ["/images/reviews/IMG3.jpg", "/images/reviews/IMG4.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Sumit hero",
    rating: 5,
    title: "Best decision to go for eyeOP",
    description:
      "I am using it since 2 months it have a great design and nice quality.Just go for it",
    images: ["/images/reviews/IMG1.jpg", "/images/reviews/IMG4.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Sumit op",
    rating: 5,
    title: "As expected",
    description:
      "Great value for the price, but the packaging could be improved.",
    images: [],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Mukesh Kaana",
    rating: 5,
    title: "Excellent product!",
    description: "The product exceeded my expectations. Highly recommend!",
    images: ["/images/reviews/IMG1.jpg", "/images/reviews/IMG2.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Abhay bhainga",
    rating: 4,
    title: "Very good quality",
    description: "By wearing your opticals I can see future",
    images: ["/images/reviews/IMG3.jpg", "/images/reviews/IMG4.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Sumit hero",
    rating: 5,
    title: "Best decision to go for eyeOP",
    description:
      "I am using it since 2 months it have a great design and nice quality.Just go for it",
    images: ["/images/reviews/IMG1.jpg", "/images/reviews/IMG4.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Sumit op",
    rating: 5,
    title: "As expected",
    description:
      "Great value for the price, but the packaging could be improved.",
    images: [],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Mukesh Kaana",
    rating: 5,
    title: "Excellent product!",
    description: "The product exceeded my expectations. Highly recommend!",
    images: ["/images/reviews/IMG1.jpg", "/images/reviews/IMG2.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Abhay bhainga",
    rating: 4,
    title: "Very good quality",
    description: "By wearing your opticals I can see future",
    images: ["/images/reviews/IMG3.jpg", "/images/reviews/IMG4.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
  {
    user: "Abhay bhainga",
    rating: 4,
    title: "Very good quality",
    description: "By wearing your opticals I can see future",
    images: ["/images/reviews/IMG3.jpg", "/images/reviews/IMG4.jpg"],
    profilePicture: "/images/reviews/anonymous.webp",
  },
];

// Calculate overall rating
const calculateOverallRating = () => {
  const totalRating = initialReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  return (totalRating / initialReviews.length).toFixed(1);
};

// Get all review images
const getReviewImages = () => {
  return initialReviews.flatMap((review) => review.images);
};

// Get rating distribution
const getRatingDistribution = () => {
  const distribution = [0, 0, 0, 0, 0];
  initialReviews.forEach((review) => {
    distribution[review.rating - 1]++;
  });
  return distribution;
};

const ReviewSummary = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(7);
  const [showMore, setShowMore] = useState(true);


  const overallRating = calculateOverallRating();
  const reviewImages = getReviewImages();
  const ratingDistribution = getRatingDistribution();

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setNewReview((prevReview) => ({
      ...prevReview,
      images: [...prevReview.images, ...imageUrls],
    }));
  };

  const addReview = () => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setNewReview({
      user: "",
      rating: 5,
      title: "",
      description: "",
      images: [],
    });
  };

  const showImageModal = (index) => {
    setModalImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImageIndex(0);
  };

  const showNextImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex + 1) % reviewImages.length);
  };

  const showPreviousImage = () => {
    setModalImageIndex(
      (prevIndex) => (prevIndex - 1 + reviewImages.length) % reviewImages.length
    );
  };

  const showMoreReviews = () => {
    setVisibleReviews((prev) => prev + 10);
  };



  const toggleImages = () => {
    if (showMore) {
      setVisibleImages(reviewImages.length);
    } else {
      setVisibleImages(7);
    }
    setShowMore(!showMore);
  };


  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Overall Rating Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Overall Rating
          </h2>
          <div className="flex items-center">
            <div className="flex items-center text-yellow-500 mr-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(overallRating)
                      ? "fill-current"
                      : "text-gray-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.5 3 1.5-6-5-4.5h6.5L10 2l2.5 5.5H19l-5 4.5 1.5 6z" />
                </svg>
              ))}
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {overallRating} out of 5
            </p>
            <p className="ml-3 text-gray-600">({reviews.length} Reviews)</p>
          </div>
          {/* Rating Distribution */}
          <div className="mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center mb-1">
                <div className="flex items-center text-yellow-500 mr-2">
                  {Array.from({ length: i + 1 }).map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.5 3 1.5-6-5-4.5h6.5L10 2l2.5 5.5H19l-5 4.5 1.5 6z" />
                    </svg>
                  ))}
                </div>
                <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{
                      width: `${
                        (ratingDistribution[4 - i] / reviews.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="ml-2 text-gray-600">
                  {ratingDistribution[4 - i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Images Section */}
        {reviewImages.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Review Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {reviewImages.slice(0, visibleImages).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer"
                  onClick={() => showImageModal(index)}
                />
              ))}
            </div>
            {reviewImages.length > 7 && (
              <div className="mt-4 text-center">
                <button
                  onClick={toggleImages}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                  {showMore ? "+ More" : "- Less"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Individual Reviews Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Customer Reviews
        </h2>
        <div className="space-y-8">
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={review.profilePicture}
                  alt={`${review.user}'s profile`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {review.user}
                  </p>
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? "fill-current" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.5 3 1.5-6-5-4.5h6.5L10 2l2.5 5.5H19l-5 4.5 1.5 6z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {review.title}
              </h3>
              <p className="text-gray-700 mb-4">{review.description}</p>
              {review.images.length > 0 && (
                <div className="mt-4 flex space-x-4">
                  {review.images.map((image, i) => (
                    <img
                      key={i}
                      src={image}
                      alt={`Review ${index + 1} Image ${i + 1}`}
                      className="w-28 h-28 object-cover rounded-lg shadow-md cursor-pointer"
                      onClick={() => showImageModal(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Read More Button */}
        {visibleReviews < reviews.length && (
          <div className="mt-6 text-center">
            <button
              onClick={showMoreReviews}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Read More Reviews
            </button>
          </div>
        )}

        {/* Add New Review Section */}
        {/* <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Add a Review
          </h2>
          <div className="grid gap-4">
            <input
              type="text"
              name="user"
              value={newReview.user}
              onChange={handleReviewChange}
              placeholder="Your Name"
              className="border rounded-lg px-4 py-2 w-full"
            />
            <input
              type="text"
              name="title"
              value={newReview.title}
              onChange={handleReviewChange}
              placeholder="Review Title"
              className="border rounded-lg px-4 py-2 w-full"
            />
            <textarea
              name="description"
              value={newReview.description}
              onChange={handleReviewChange}
              placeholder="Review Description"
              className="border rounded-lg px-4 py-2 w-full"
            ></textarea>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="border rounded-lg px-4 py-2 w-full"
            />
            <button
              onClick={addReview}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </div> */}
      </div>

      {/* Modal for Image Preview */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-3xl max-h-3xl">
            <img
              src={reviewImages[modalImageIndex]}
              alt="Modal Preview"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={showPreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-700 hover:bg-gray-800 text-white rounded-full focus:outline-none"
            >
              &#8249;
            </button>
            <button
              onClick={showNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-700 hover:bg-gray-800 text-white rounded-full focus:outline-none"
            >
              &#8250;
            </button>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full focus:outline-none"
            >
              <img
                src="/images/reviews/close.png"
                alt="Close"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSummary;
