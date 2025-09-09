import React, { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import CommentTableItem from '../../components/admin/CommentTableItem.jsx';

const Comments = () => {

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const {axios} = useAppContext();

  const fetchComments = useCallback( async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');
      if(data.success){
        setComments(data.comments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [axios]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button 
          onClick={() => setFilter('Approved')} 
          className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointertext-xs ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'}`}
          >
            Approved
          </button>
          <button 
          onClick={() => setFilter('Not Approved')} 
          className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointertext-xs ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'}`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className='releative h-4/5 mt-4 max-w-3xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='test-sm text-gray-500 w-full'>
          <thead className='text-sm text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'> Blog Title & Comment </th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'> Date </th>
              <th scope='col' className='px-6 py-3'> Action </th>
            </tr>
          </thead>
          <tbody>
            { comments.filter((comment) => {
                if(filter === 'Approved') return comment.isApproved === true;
                else return comment.isApproved === false;
              }).map((comment, index) => <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments