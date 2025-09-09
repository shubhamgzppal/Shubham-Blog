import React from 'react'

const ContactUs = () => {
  return (
    <div className="max-w-[680px] mx-auto my-10 bg-white p-6 rounded-lg shadow-[0_12px_30px_rgba(2,6,23,0.06)] text-gray-900">
      <h3 id="contact-heading" className="text-center text-3xl font-bold">Contact Us</h3>
      <p className="text-center text-gray-600">Have a question, feedback, or partnership idea? Send us a short message and we’ll get back within a few business days.</p>

      <form onSubmit={async (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        try {
          await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          alert('Your message has been sent successfully.')
          e.target.reset()
        } catch (err) {
          console.error(err)
          alert('Failed to send message.')
        }
      }} className="grid gap-2.5 mt-4">
        <input type="text" name="name" placeholder="Your name" aria-label="Name" className="p-2.5 rounded-md border border-gray-200" />
        <input type="email" name="email" placeholder="Your email" aria-label="Email" className="p-2.5 rounded-md border border-gray-200" />
        <textarea name="message" placeholder="Message" aria-label="Message" rows={6} className="p-2.5 rounded-md border border-gray-200" />
        <div className="flex justify-center">
          <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white rounded-md">Send message</button>
        </div>
      </form>
    </div>
  )
}

export default ContactUs