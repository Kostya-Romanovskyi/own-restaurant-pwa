import './reviews-section.scss';

const reviews = [
  // {
  //   author: 'John Doe',
  //   rating: 5,
  //   text: 'Amazing service!',
  //   date: '2024-02-20',
  //   avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  // },
  // {
  //   author: 'Jane Smith',
  //   rating: 4,
  //   text: 'Great food, but the wait was long.',
  //   date: '2024-02-18',
  //   avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  // },
  // {
  //   author: 'Emily Johnson',
  //   rating: 5,
  //   text: 'Fantastic experience! Highly recommend.',
  //   date: '2024-02-15',
  //   avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  // },
  // {
  //   author: 'Michael Brown',
  //   rating: 3,
  //   text: 'It was okay, nothing special.',
  //   date: '2024-02-10',
  //   avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  // },
  {
    author: 'Sarah Davis',
    rating: 4,
    text: 'The ambiance was wonderful, but the dessert was too sweet.',
    date: '2024-02-08',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    author: 'David Wilson',
    rating: 2,
    text: 'Disappointing experience. The food was cold.',
    date: '2024-02-05',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    author: 'Olivia Taylor',
    rating: 3,
    text: 'Decent, but there are better options nearby.',
    date: '2024-01-25',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
  },
  {
    author: 'Sophia Martinez',
    rating: 5,
    text: 'Absolutely loved it! Will come back again.',
    date: '2024-02-02',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    author: 'James Anderson',
    rating: 4,
    text: 'Great value for the price. Friendly staff too!',
    date: '2024-01-30',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
  },

  {
    author: 'Ethan Moore',
    rating: 5,
    text: 'Outstanding service and delicious food!',
    date: '2024-01-20',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
];

const ReviewsSection = () => {
  return (
    <div className="container">
      <h2 className="reviews__title">Our Reviews</h2>
      <ul className="reviews">
        {reviews.map((review, index) => (
          <li key={index} className="review">
            <img src={review.avatar} alt={review.author} className="review__avatar" />
            <div className="review__content">
              <h4 className="review__author">{review.author}</h4>
              <p className="review__date">{new Date(review.date).toLocaleDateString()}</p>
              <div className="review__rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review__text">{review.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsSection;
