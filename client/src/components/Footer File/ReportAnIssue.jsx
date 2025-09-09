import React, { useState } from 'react'

const ReportAnIssue = () => {
  const [form, setForm] = useState({ name: '', email: '', description: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // prefer mailto for user-provided configuration
    if (form.description.trim().length < 10) {
      setStatus({ type: 'error', message: 'Please provide a longer description (min 10 characters).' })
      return
    }

    const mailto = `mailto:shubhamgzppal@gmail.com?subject=${encodeURIComponent('[Issue] ' + (form.name || 'Report'))}&body=${encodeURIComponent(form.description + '\n\nContact: ' + form.email)}`
    window.location.href = mailto
    setStatus({ type: 'success', message: 'Opening your mail client to send the report...' })
    setForm({ name: '', email: '', description: '' })
  }

  return (
    <div className="max-w-[760px] mx-auto my-8 bg-white p-5 rounded-lg shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
      <h3 id="report-heading" className="text-4xl font-bold text-center">Report an issue</h3>

      <p className="text-center text-gray-600">
        Help us improve the site by reporting bugs, broken links, or incorrect
        content. Provide clear reproduction steps and any relevant screenshots.
      </p>

      <form onSubmit={handleSubmit} className="grid gap-2.5 mt-3">
        <label className="block">
          <div className="mb-1">Name</div>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full p-2.5 rounded-md border border-gray-200" required />
        </label>

        <label className="block">
          <div className="mb-1">Email</div>
          <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.example" className="w-full p-2.5 rounded-md border border-gray-200" required />
        </label>

        <label className="block">
          <div className="mb-1">Description (required)</div>
          <textarea name="description" value={form.description} onChange={handleChange} rows={6} placeholder="What went wrong? Steps to reproduce, expected vs actual behavior" className="w-full p-2.5 rounded-md border border-gray-200" />
        </label>

        <div className="flex gap-2 items-center justify-center">
          <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white rounded-md">Submit report</button>
          {status && (
            <span className={status.type === 'error' ? 'text-red-600' : 'text-green-600'}>{status.message}</span>
          )}
        </div>
      </form>
    </div>
  )
}

export default ReportAnIssue