import React from 'react'

const Privacy_Term = () => {
  return (
    <div className="max-w-[720px] mx-auto my-10 bg-white p-6 rounded-lg shadow-[0_8px_24px_rgba(2,6,23,0.06)]">
      <h3 id="legal-heading" className="text-3xl font-bold text-center">Privacy &amp; Terms</h3>
      <p className="text-center text-gray-600">
        We respect your privacy. Your data will never be sold. Please read our policies for full details.
      </p>

      <p className="text-center">
        Read the full <a href="/privacy-policy" className="text-blue-600">Privacy Policy</a> and <a href="/terms-of-service" className="text-blue-600">Terms of Service</a> for details.
      </p>
    </div>
  )
}

export default Privacy_Term