import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />

      <section className="hero px-4 py-16 md:py-24">
        <div className="hero-content w-full max-w-5xl flex-col items-start px-0">
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Support Local Street Vendors Near You
          </h1>
          <p className="mt-4 max-w-2xl text-base-content/80 md:text-lg">
            Discover nearby street sellers. Order easily. Empower small businesses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn btn-primary">Explore Vendors</button>
            <button className="btn btn-outline">Join as Vendor</button>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold md:text-3xl">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="card border border-base-200 bg-base-100">
              <div className="card-body">
                <h3 className="card-title">🛍️ For Customers</h3>
                <ul className="space-y-1 text-sm">
                  <li>Find vendors near you</li>
                  <li>See their menu and prices</li>
                  <li>Get Recommended vendors</li>
                </ul>
              </div>
            </div>
            <div className="card border border-base-200 bg-base-100">
              <div className="card-body">
                <h3 className="card-title">🧑‍🍳 For Vendors</h3>
                <ul className="space-y-1 text-sm">
                  <li>Register in 2 minutes</li>
                  <li>Add your products</li>
                  <li>Reach a vider base of Customers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer footer-center border-t border-base-200 bg-base-100 p-8 text-base-content">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Privacy Policy</a>
        </nav>
        <p>&copy; 2026 StreetSync</p>
      </footer>
    </div>
  )
}

export default Home
