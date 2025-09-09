import React, { useState, useEffect, useCallback } from 'react'
import { assets } from '../../assets/assets.js';
import BlogTableItem from '../../components/admin/BlogTableItem.jsx';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext.jsx';

const Dasboard = () => {

    const [dasboardData, setDasboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    });

    const {axios} = useAppContext();

    const fetchDasboardData = useCallback( async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard');
            data.success ? setDasboardData(data.dasboardData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }    
    }, [axios]);
    
    useEffect(() => {
        fetchDasboardData();
    }, [fetchDasboardData]);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
        <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-4 bg-white p-4 rounded min-w-58 shadow cursor-pointer hover::scale-105 transition-all'>
                <img src={assets.dashboard_icon_1} alt="" className='' />
                <div className=''>
                    <p>{dasboardData.blogs}</p>
                    <p className='text-gray-400 font-light'>Blogs</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white p-4 rounded min-w-58 shadow cursor-pointer hover::scale-105 transition-all'>
                <img src={assets.dashboard_icon_2} alt="" className='' />
                <div className=''>
                    <p>{dasboardData.comments}</p>
                    <p className='text-gray-400 font-light'>Comments</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white p-4 rounded min-w-58 shadow cursor-pointer hover::scale-105 transition-all'>
                <img src={assets.dashboard_icon_3} alt="" className='' />
                <div className=''>
                    <p>{dasboardData.drafts}</p>
                    <p className='text-gray-400 font-light'>Drafts</p>
                </div>
            </div> 
        </div>

        <div>
            <div className='mt-6 m-4 flex items-center text-gray-600 gap-3'>
                <img src={assets.dashboard_icon_4} alt="" className='' />
                <p className='text-lg font-semibold'>Letest Blogs</p>
            </div>

            <div className='releative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                <table className='test-sm text-gray-500 w-full'>
                    <thead className='text-sm text-gray-600 text-left uppercase'>
                        <tr>
                            <th className='px-2 py-4 xl:px-6'>#</th>
                            <th className='px-2 py-4'>Blog Title</th>
                            <th className='px-2 py-4 max-sm:hidden'>Date</th>
                            <th className='px-2 py-4 max-sm:hidden'>Status</th>
                            <th className='px-2 py-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { dasboardData.recentBlogs.map((blog, index) => {
                            return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDasboardData} index={index + 1} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  )
}

export default Dasboard