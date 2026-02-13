import { useMemo, useState } from 'react'

const vendorData = [
  {
    id: 1,
    name: 'Raju Chaat Wala',
    rating: 4.6,
    reviewsCount: 128,
    description: 'Crispy pani puri and spicy bhel made fresh every evening.',
    location: 'Karol Bagh, New Delhi',
    distance: '0.8 km',
    category: 'Chaat',
    timings: '4:00 PM - 10:30 PM',
    contact: '+91 98XXXXXX12',
    image: 'Stall Image',
    menu: [
      { id: 1, item: 'Pani Puri', price: 20 },
      { id: 2, item: 'Bhel Puri', price: 30 },
      { id: 3, item: 'Sev Puri', price: 35 },
    ],
    reviews: [
      { id: 1, user: 'Aman', rating: 5, comment: 'Great taste and clean setup.', date: '2026-02-10' },
      { id: 2, user: 'Ritika', rating: 4, comment: 'Good flavor, quick service.', date: '2026-02-09' },
    ],
  },
  {
    id: 2,
    name: 'Sharma Tea Point',
    rating: 4.3,
    reviewsCount: 92,
    description: 'Masala chai, lemon tea and snacks for evening breaks.',
    location: 'Rajendra Place, New Delhi',
    distance: '1.2 km',
    category: 'Tea',
    timings: '7:00 AM - 8:00 PM',
    contact: '+91 97XXXXXX41',
    image: 'Stall Image',
    menu: [
      { id: 1, item: 'Masala Chai', price: 15 },
      { id: 2, item: 'Ginger Tea', price: 20 },
      { id: 3, item: 'Bun Maska', price: 25 },
    ],
    reviews: [
      { id: 1, user: 'Neha', rating: 4, comment: 'Nice tea and polite owner.', date: '2026-02-11' },
      { id: 2, user: 'Sahil', rating: 5, comment: 'Best tea in this area.', date: '2026-02-07' },
    ],
  },
  {
    id: 3,
    name: 'Vicky Snacks Corner',
    rating: 3.9,
    reviewsCount: 64,
    description: 'Quick snacks, rolls and sandwiches near metro gate.',
    location: 'Patel Nagar, New Delhi',
    distance: '2.4 km',
    category: 'Snacks',
    timings: '12:00 PM - 11:00 PM',
    contact: '+91 96XXXXXX77',
    image: 'Stall Image',
    menu: [
      { id: 1, item: 'Veg Roll', price: 45 },
      { id: 2, item: 'Aloo Sandwich', price: 35 },
      { id: 3, item: 'Cheese Toast', price: 50 },
    ],
    reviews: [
      { id: 1, user: 'Kunal', rating: 4, comment: 'Affordable and filling.', date: '2026-02-08' },
      { id: 2, user: 'Ishita', rating: 3, comment: 'Good but can be less oily.', date: '2026-02-06' },
    ],
  },
]

const ratingOptions = ['All Ratings', '4 and above', '3 and above']
const distanceOptions = ['All Distances', 'Nearby (under 1 km)', 'Under 3 km']
const categoryOptions = ['All Categories', 'Chaat', 'Tea', 'Snacks']

function UserDashboard({ onLogout }) {
  const [query, setQuery] = useState('')
  const [ratingFilter, setRatingFilter] = useState('All Ratings')
  const [distanceFilter, setDistanceFilter] = useState('All Distances')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [reviewDraft, setReviewDraft] = useState({ rating: 5, comment: '' })
  const [userName] = useState('Harsh')

  const filteredVendors = useMemo(() => {
    return vendorData.filter((vendor) => {
      const matchQuery =
        vendor.name.toLowerCase().includes(query.toLowerCase()) ||
        vendor.menu.some((menuItem) => menuItem.item.toLowerCase().includes(query.toLowerCase()))

      const matchRating =
        ratingFilter === 'All Ratings' ||
        (ratingFilter === '4 and above' && vendor.rating >= 4) ||
        (ratingFilter === '3 and above' && vendor.rating >= 3)

      const vendorDistance = parseFloat(vendor.distance)
      const matchDistance =
        distanceFilter === 'All Distances' ||
        (distanceFilter === 'Nearby (under 1 km)' && vendorDistance < 1) ||
        (distanceFilter === 'Under 3 km' && vendorDistance < 3)

      const matchCategory = categoryFilter === 'All Categories' || vendor.category === categoryFilter

      return matchQuery && matchRating && matchDistance && matchCategory
    })
  }, [query, ratingFilter, distanceFilter, categoryFilter])

  const submitReview = (event) => {
    event.preventDefault()
    setReviewDraft({ rating: 5, comment: '' })
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar border-b border-base-300 bg-base-100 px-4 md:px-8">
        <div className="flex-1">
          <h1 className="text-xl font-bold">StreetSync</h1>
        </div>
        <div className="hidden flex-1 justify-center px-4 lg:flex">
          <input
            className="input input-bordered w-full max-w-md"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search vendors or food items"
            value={query}
          />
        </div>
        <div className="flex-none items-center gap-3">
          <span className="hidden text-sm font-medium md:block">{userName}</span>
          <button className="btn btn-sm btn-outline" onClick={onLogout} type="button">
            Logout
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Search and Filters</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <input
                className="input input-bordered w-full lg:hidden"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search vendors or food items"
                value={query}
              />
              <select
                className="select select-bordered w-full"
                onChange={(event) => setRatingFilter(event.target.value)}
                value={ratingFilter}
              >
                {ratingOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                className="select select-bordered w-full"
                onChange={(event) => setDistanceFilter(event.target.value)}
                value={distanceFilter}
              >
                {distanceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                className="select select-bordered w-full"
                onChange={(event) => setCategoryFilter(event.target.value)}
                value={categoryFilter}
              >
                {categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Vendors Near You</h2>
            <p className="text-sm text-base-content/70">{filteredVendors.length} vendors found</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVendors.map((vendor) => (
              <article key={vendor.id} className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body">
                  <div className="flex h-36 items-center justify-center rounded-lg bg-base-200 text-xs text-base-content/70">
                    {vendor.image}
                  </div>
                  <h3 className="card-title mt-3 text-lg">{vendor.name}</h3>
                  <p className="text-sm text-amber-500">★ {vendor.rating}</p>
                  <p className="text-sm text-base-content/70">{vendor.reviewsCount} reviews</p>
                  <p className="text-sm">{vendor.description}</p>
                  <p className="text-sm text-base-content/70">{vendor.location}</p>
                  <div className="card-actions mt-2 justify-end">
                    <button className="btn btn-primary btn-sm" onClick={() => setSelectedVendor(vendor)} type="button">
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <dialog className={`modal ${selectedVendor ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-3xl">
          {selectedVendor ? (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex h-48 items-center justify-center rounded-lg bg-base-200 text-xs text-base-content/70">
                  {selectedVendor.image}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{selectedVendor.name}</h3>
                  <p>{selectedVendor.description}</p>
                  <p className="text-sm text-base-content/70">
                    <strong>Timings:</strong> {selectedVendor.timings}
                  </p>
                  <p className="text-sm text-base-content/70">
                    <strong>Location:</strong> {selectedVendor.location}
                  </p>
                  <p className="text-sm text-base-content/70">
                    <strong>Contact:</strong> {selectedVendor.contact}
                  </p>
                  <p className="text-sm text-amber-500">
                    ★ {selectedVendor.rating} ({selectedVendor.reviewsCount} reviews)
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <section className="rounded-lg border border-base-300 p-3">
                  <h4 className="font-semibold">Menu</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    {selectedVendor.menu.map((menuItem) => (
                      <li key={menuItem.id} className="flex items-center justify-between">
                        <span>{menuItem.item}</span>
                        <span>Rs {menuItem.price}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-lg border border-base-300 p-3">
                  <h4 className="font-semibold">Reviews</h4>
                  <div className="mt-2 max-h-44 space-y-2 overflow-y-auto pr-1 text-sm">
                    {selectedVendor.reviews.map((review) => (
                      <div key={review.id} className="rounded border border-base-300 p-2">
                        <p className="font-medium">{review.user}</p>
                        <p className="text-amber-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                        <p>{review.comment}</p>
                        <p className="text-xs text-base-content/60">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <section className="rounded-lg border border-base-300 p-3">
                <h4 className="font-semibold">Submit Review</h4>
                <form className="mt-3 space-y-3" onSubmit={submitReview}>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className={`btn btn-sm ${reviewDraft.rating === rating ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setReviewDraft((prev) => ({ ...prev, rating }))}
                        type="button"
                      >
                        {rating}★
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    onChange={(event) => setReviewDraft((prev) => ({ ...prev, comment: event.target.value }))}
                    placeholder="Write your review"
                    rows={3}
                    value={reviewDraft.comment}
                  />
                  <button className="btn btn-primary" type="submit">
                    Submit Review
                  </button>
                </form>
              </section>
            </div>
          ) : null}
          <div className="modal-action">
            <button className="btn" onClick={() => setSelectedVendor(null)} type="button">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default UserDashboard
