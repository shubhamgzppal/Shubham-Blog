import React from 'react'

const NewsLetter = () => {
  const endpoint = 'https://buttondown.email/api/emails/embed-subscribe/example'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    try {
      await fetch(endpoint, { method: 'POST', body: form })
      alert('Thanks for subscribing! Please check your inbox.')
      e.target.reset()
    } catch (err) {
      console.error(err)
      alert('Subscription failed — please try again later.')
    }
  }

  return (
    <div className="max-w-[640px] mx-auto my-9 bg-white p-5 rounded-lg shadow-[0_8px_20px_rgba(2,6,23,0.06)] text-center">
      <h3 id="newsletter-heading" className="text-xl font-semibold">Stay in the Loop</h3>
      <p className="text-gray-600">Subscribe to our newsletter for weekly updates, tutorials, and behind-the-scenes insights.</p>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-3 justify-center">
        <input name="email" type="email" aria-label="Email" placeholder="you@example.com" required className="p-2.5 rounded-md border border-gray-200 min-w-[220px]" />
        <button type="submit" className="px-3 py-2.5 bg-blue-600 text-white rounded-md">Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter