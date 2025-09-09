import React from 'react'

const JoinCommunity = () => {
  return (
    <div className="max-w-[680px] mx-auto my-10 bg-white p-6 rounded-lg shadow-[0_8px_20px_rgba(2,6,23,0.06)]">
      <h3 id="community-heading" className="text-center text-3xl font-bold">Join the community</h3>
      <p className="text-center text-gray-600">Connect with other readers, ask questions, and share your work.</p>

      <ul className="max-w-[420px] mx-auto leading-relaxed mt-3">
        <li><a href="https://discord.com/channels/@me/1217591115281076405" target="_blank" rel="noreferrer" className="text-blue-500">Discord</a> — Join discussions &amp; Q&A</li>
        <li><a href="https://x.com/1SHUBHAM_PAL" target="_blank" rel="noreferrer" className="text-blue-500">Twitter</a> — short updates and announcements</li>
        <li><a href="https://github.com/shubhamgzppal" target="_blank" rel="noreferrer" className="text-blue-500">GitHub</a> — view projects and open issues</li>
      </ul>
    </div>
  )
}

export default JoinCommunity