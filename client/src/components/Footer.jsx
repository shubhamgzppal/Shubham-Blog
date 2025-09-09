import React from 'react'
import { assets, footer_data } from '../assets/assets';
import { useNavigate } from 'react-router-dom'

const Footer = () => {
        const navigate = useNavigate()
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>

        <div className='flex flex-col md:flex-row items-start justify-between py-5 gap-10 border-b border-gray-500/30 text-gray-500'>

            <div className='flex flex-col'>
                <img src={assets.logo} alt="logo" className='w-44 sm:w-56' />
                <p className='max-w-[410px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem harum repellendus cumque beatae quis quaerat corporis ab quisquam blanditiis suscipit saepe ex libero pariatur voluptatem quas unde, esse rem. Blanditiis!</p>
            </div>

            <div className='flex flex-wrap mt-5 justify-between w-full md:w-[45%] gap-5'>
                {footer_data.map((section, index) => (
                    <div key={index}>
                        <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                        <ul className='text-sm space-y-1'>
                            {section.links.map((link, i) => {
                                const isString = typeof link === 'string'
                                let href = '#'
                                let target = undefined
                                let rel = undefined
                                let label = ''

                                if (isString) {
                                    label = link
                                } else {
                                    label = link.name || 'Link'
                                    if (link.url) {
                                        href = link.url
                                        if (/^https?:\/\//.test(link.url)) {
                                            target = '_blank'
                                            rel = 'noopener noreferrer'
                                        }
                                    } else if (link.page) {
                                        // convert page value to an internal path, e.g. 'Instagram' -> '/instagram'
                                        href = '/' + String(link.page).toLowerCase().replace(/\s+/g, '-')
                                    }
                                }

                                return (
                                    <li key={i}>
                                        <a href={href} target={target} rel={rel} className='hover:underline transition' onClick={(e) => {
                                                if (!target && href && href.startsWith('/')) {
                                                    // use react-router navigation for full-page route
                                                    e.preventDefault()
                                                    // strip leading slash and navigate
                                                    navigate(href)
                                                }
                                            }}>{label}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>

        </div>

    <p className='py-4 text-center text-sm md:text-base text-gray-500'>Copyright 2025 © ShubhamBlog All Right Reserved</p>
    </div>
  )
}

export default Footer