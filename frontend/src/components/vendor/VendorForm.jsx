import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  password: '',
  stallName: '',
  country: '',
  state: '',
  city: '',
}

function VendorForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (onSubmit) {
      const success = await onSubmit(form)
      if (success) {
        setForm(initialForm)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card border border-base-200 bg-base-100 p-4 shadow-sm">
      <div className="grid gap-3">
        <input
          className="input input-bordered w-full"
          name="name"
          onChange={handleChange}
          placeholder="Your name"
          value={form.name}
          required
        />
        <input
          className="input input-bordered w-full"
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          value={form.email}
          required
        />
        <input
          className="input input-bordered w-full"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password (min 6 chars)"
          value={form.password}
          required
        />
        <input
          className="input input-bordered w-full"
          name="stallName"
          onChange={handleChange}
          placeholder="Stall name"
          value={form.stallName}
          required
        />
        <input
          className="input input-bordered w-full"
          name="country"
          onChange={handleChange}
          placeholder="Country"
          value={form.country}
          required
        />
        <input
          className="input input-bordered w-full"
          name="state"
          onChange={handleChange}
          placeholder="State"
          value={form.state}
          required
        />
        <input
          className="input input-bordered w-full"
          name="city"
          onChange={handleChange}
          placeholder="City"
          value={form.city}
          required
        />
        <button type="submit" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  )
}

export default VendorForm
