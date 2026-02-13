import { useState } from 'react'

const stats = [
  { title: 'Average Rating', value: '4.4', subtitle: 'out of 5', key: 'rating' },
  { title: 'Total Reviews', value: '128', subtitle: 'all time', key: 'reviews' },
  { title: 'Profile Views', value: '1,240', subtitle: 'last 30 days', key: 'views' },
  { title: 'Location Status', value: 'Active', subtitle: 'visible to customers', key: 'location' },
]

const initialMenu = [
  { id: 1, name: 'Pani Puri', price: 20 },
  { id: 2, name: 'Bhel Puri', price: 30 },
  { id: 3, name: 'Dahi Puri', price: 40 },
  { id: 4, name: 'Papdi Chaat', price: 45 },
]

const reviews = [
  {
    id: 1,
    customer: 'Aman Verma',
    rating: 5,
    comment: 'Very hygienic and tasty pani puri. Fast service.',
    date: '2026-02-11',
  },
  {
    id: 2,
    customer: 'Ritika S.',
    rating: 4,
    comment: 'Great taste, a bit crowded in evening.',
    date: '2026-02-10',
  },
  {
    id: 3,
    customer: 'Karan',
    rating: 5,
    comment: 'Best chaat near Karol Bagh. Must try.',
    date: '2026-02-08',
  },
  {
    id: 4,
    customer: 'Neha',
    rating: 4,
    comment: 'Fresh ingredients and clean stall.',
    date: '2026-02-07',
  },
]

function VendorDashboard({ onLogout }) {
  const [isOnline, setIsOnline] = useState(true)
  const [menuItems, setMenuItems] = useState(initialMenu)

  const deleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getStatIcon = (key) => {
    if (key === 'rating') return '⭐'
    if (key === 'reviews') return '🗣️'
    if (key === 'views') return '👀'
    return '📍'
  }

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar border-b border-base-300 bg-base-100 px-4 md:px-8">
        <div className="flex-1">
          <h1 className="text-xl font-bold">StreetSync</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-sm btn-ghost" onClick={onLogout} type="button">
            Return to Landing Page
          </button>
          <span className="hidden text-sm font-medium md:block">Raju Chaat Wala</span>
          <label className="label cursor-pointer gap-2">
            <span className={`badge ${isOnline ? 'badge-success' : 'badge-neutral'}`}>
                {isOnline ? 'Online' : 'Offline'}
            </span>
            <input
              checked={isOnline}
              className="toggle toggle-success toggle-sm"
              onChange={() => setIsOnline((prev) => !prev)}
              type="checkbox"
            />
          </label>
          <button className="btn btn-sm btn-outline" onClick={onLogout} type="button">
            Logout
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((card) => (
            <div key={card.title} className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body p-4">
                <p className="text-sm text-base-content/70">
                  {getStatIcon(card.key)} {card.title}
                </p>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-xs text-base-content/60">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="card-title">Menu Management</h2>
              <button className="btn btn-primary btn-wide" type="button">
                + Add New Item
              </button>
            </div>
            <div className="mt-2 space-y-3">
              {menuItems.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-base-300 p-3">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-base-content/70">Rs {item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-sm" type="button">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error btn-outline" onClick={() => deleteMenuItem(item.id)} type="button">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Customer Reviews</h2>
            <div className="mt-2 max-h-80 space-y-3 overflow-y-auto pr-1">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-base-300 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div>
                      <p className="font-semibold">{review.customer}</p>
                      <p className="text-sm text-amber-500">{renderStars(review.rating)}</p>
                    </div>
                    <span className="text-xs text-base-content/60">{review.date}</span>
                  </div>
                  <p className="mt-2 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex h-32 w-32 items-center justify-center rounded-lg border border-base-300 bg-base-200 text-xs text-base-content/70">
                  Stall Image
                </div>
                <p>
                  <span className="font-medium">Stall Name:</span> Raju Chaat Wala
                </p>
                <p>
                  <span className="font-medium">Description:</span> Fresh chaat and pani puri with clean preparation.
                </p>
                <p>
                  <span className="font-medium">Timings:</span> 4:00 PM - 10:30 PM
                </p>
                <p>
                  <span className="font-medium">Phone:</span> +91 98XXXXXX12
                </p>
                <p>
                  <span className="font-medium">FSSAI:</span> Optional
                </p>
                <p>
                  <span className="font-medium">Location:</span> Karol Bagh, New Delhi
                </p>
                <button className="btn btn-outline btn-sm mt-2" type="button">
                  Edit Profile
                </button>
              </div>
              <div className="rounded-lg border border-dashed border-base-300 p-4 text-sm text-base-content/70">
                Map preview placeholder
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default VendorDashboard
