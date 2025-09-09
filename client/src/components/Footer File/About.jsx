import React from 'react'
import favicon from '../../assets/favicon.svg'
import twitter from '../../assets/twitter_icon.svg'
import { blogCategories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext.jsx'
import { useMemo } from 'react'


const popularTags = blogCategories
const About = () => {

  const { blogs = [] } = useAppContext()

  const filteredBlogs = useMemo(() => {
      let items = Array.isArray(blogs) ? blogs.slice() : []
      return items
  }, [ blogs])

  return (
    <div className="max-w-[1280px] mx-auto my-10 bg-white p-3 rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.08)] text-gray-900 text-center">
      <div className="flex gap-3 items-center justify-center">
        <img src={favicon} alt="Shubham Blog logo" className="w-18 h-18 rounded-md" />
        <div>
          <h2 id="about-heading" className="m-0 text-3xl font-bold">About Shubham Blog</h2>
          <small className="text-gray-500">Practical guides &amp; open-source projects</small>
        </div>
      </div>

      <p className="mt-4 leading-relaxed">
        A space for exploring technology, design, and ideas that shape the future. Started in 2021, this blog covers practical tutorials, thought pieces, and insights on modern development trends.
      </p>

      <div className="flex gap-7 mt-4 justify-center flex-wrap">
        <ul className="pl-4 list-none m-0">
          <li><strong>Founded:</strong> 2025</li>
          <li><strong>Articles:</strong> {filteredBlogs.length} post</li>
          <li><strong>Readers:</strong> 12k/month (sample)</li>
        </ul>

        <div className="min-w-[160px]">
          <strong>Popular tags</strong>
          <div className="flex gap-2 flex-wrap mt-2 justify-center">
            {popularTags.map(tag => (
              <span key={tag} className="bg-gray-100 px-2.5 py-1 rounded-full text-sm">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-3 items-center justify-center">
        <span className="text-gray-600">Contact:</span>
        <a href="mailto:shubhamgzppal@gmail.com" className="text-blue-600">shubhamgzppal@gmail.com</a>

        <div className="flex gap-2">
          <a href="https://x.com/1SHUBHAM_PAL" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="Twitter" className="w-5 h-5" />
          </a>
          <a href="https://github.com/shubhamgzppal" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About