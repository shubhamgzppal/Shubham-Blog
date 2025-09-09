import React from 'react'
import qrImage from '../../assets/paymaent image.jpg';

const Contribute = () => {
  return (
    <div className="max-w-[720px] mx-auto my-10 bg-white p-6 rounded-lg shadow-[0_10px_28px_rgba(2,6,23,0.06)]">
      <h3 id="contribute-heading" className="text-center text-3xl font-bold">Contribute</h3>
      <p className="text-center text-gray-600">We welcome code contributions, tutorials, and fixes. If you have an idea for a post or a small patch, please open a PR on our GitHub and add a short description.</p>

      <ul className="max-w-[520px] mx-auto text-center leading-relaxed mt-4">
        <li>Open source projects and tutorials are prioritized.</li>
        <li>Follow our content guide: clear examples, minimal setup, and tests.</li>
        <li>We accept drafts and guest posts — email proposals to the editor.</li>
      </ul>

      <p className="text-center mt-4">
        Quick links: <a href="https://github.com/username/repo/CONTRIBUTING.md" target="_blank" rel="noreferrer" className="text-blue-500">Contribution guidelines</a> · Submit a post
      </p>

      <div className="mt-4 text-center">
        <strong>Support the project</strong>
        <div className="mt-2">
          {/* If you have a QR image in assets, replace the path below. */}
          <div className="inline-block pt-3 rounded-md bg-gray-50">
            <div className="text-sm mb-2">UPI: <strong>7800286043@ptaxis</strong></div>
            {/* show a placeholder box for the QR image; user can replace with actual asset */}
            <div className="w-[300px] h-[500px] bg-white flex items-center justify-center border border-gray-200">
              <img src={qrImage} alt="QR code for donations" className="max-w-full max-h-full" />
            </div>
          </div>
        </div>
        <div className="mt-2">Or email submissions to <a href="mailto:shubhamgzppal@gmail.com" className="text-blue-500">shubhamgzppal@gmail.com</a></div>
      </div>
    </div>
  )
}

export default Contribute