import React, { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { blogCategories } from '../../assets/assets'
import BlogCard from '../BlogCard'
import { useAppContext } from '../../context/AppContext.jsx'

const AllBlog = () => {
  const [menu, setMenu] = useState('All')
  const [sort, setSort] = useState('newest')

  const { blogs = [], input = '' } = useAppContext()

  const filteredBlogs = useMemo(() => {
    let items = Array.isArray(blogs) ? blogs.slice() : []

    // search input filter
    if (input && input.trim() !== '') {
      const q = input.trim().toLowerCase()
      items = items.filter(b => (b.title || '').toLowerCase().includes(q) || (b.category || '').toLowerCase().includes(q))
    }

    // category menu filter
    if (menu && menu !== 'All') {
      items = items.filter(b => (b.category || '') === menu)
    }

    // sort
    items.sort((a, b) => {
      const da = new Date(a.createdAt || a.date || 0)
      const db = new Date(b.createdAt || b.date || 0)
      return sort === 'newest' ? db - da : da - db
    })

    return items
  }, [blogs, input, menu, sort])

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='p-6 bg-white rounded-lg shadow-custom-sm border border-gray-300 m-8 shadow-lg max-w-8xl'>
        <h2 className='mb-12 text-center font-bold text-4xl'>All Posts</h2>

        <div className='flex-1 flex flex-row justify-between gap-3'>
          <div className='flex flex-col gap-3'>
            <h3 className='text-black text-center'>Filter by category</h3>
            <div className='flex items-center gap-4 sm:gap-8 mb-6 relative'>
              {blogCategories.map(cat => (
                <div key={cat} className='relative'>
                  <button onClick={() => setMenu(cat)} className={`cursor-pointer text-gray-500 ${menu === cat ? 'text-white px-4 pt-0.5 border rounded-full bg-primary' : ''}`}>
                    {cat}
                    {menu === cat && (
                      <Motion.div layoutId='underline' transition={{ type: 'spring', stiffness: 500, damping: 30 }} className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full' />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <small className='text-black text-center'>Sort</small>
            <div style={{display: 'flex', gap: 8}}>
              <button onClick={() => setSort('newest')} className={`cursor-pointer text-gray-500 ${sort === 'newest' ? 'text-white px-4 pt-0.5 border rounded-full bg-primary' : ''}`}>
                Newest
              </button>
              <button onClick={() => setSort('oldest')} className={`cursor-pointer text-gray-500 ${sort === 'oldest' ? 'text-white px-4 pt-0.5 border rounded-full bg-primary' : ''}`}>
                Oldest
              </button>
            </div>
          </div>
        </div>
        
        {filteredBlogs.length === 0 ? (
          <p className='p-2 text-gray-500 text-center'>No posts match the selected filters.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-8 sm:mx-16 xl:mx-auto mb-24'>
            {filteredBlogs.map(blog => <BlogCard key={blog._id || blog.id || blog.title} blog={blog} />)}
          </div>
        )}
        
        <div className='text-gray-600 absolute right-14 bottom-4'>
          <small>{filteredBlogs.length} posts</small>
        </div>
      </div>
    </div>
  )
}

export default AllBlog