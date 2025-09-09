import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets.js';
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { parse } from  'marked';

const AddBlog = () => {

  const {axios} = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [Loading, setLoading] = useState(false);

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  // Function to generate content using AI (placeholder)
  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title to generate content");
    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
        toast.success("Content generated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = { title, subtitle, description: quillRef.current.root.innerHTML, category, isPublished };
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

  const {data} = await axios.post('/api/blog/add', formData);
      if(data.success){
        toast.success(data.message);
        setImage(false);
        setTitle('');
        quillRef.current.root.innerHTML = '';
        setCategory('Startup');
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false);
    }
  }

  useEffect(() => {
    // Initialize Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write something awesome...',
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload Thumbnail</p>
        <label htmlFor='image'>
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Type your blog title' className='w-full mt-2 p-2 border border-gray-300 rounded outline-none max-w-lg' required />
        
        <p className='mt-4'>Blog Subtitle</p>
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} type="text" placeholder='Type your blog subtitle' className='w-full mt-2 p-2 border border-gray-300 rounded outline-none max-w-lg' required />
        
        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef} className='h-full border border-gray-300 rounded'></div>
          {Loading && <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/10 flex items-center justify-center mt-2'>
            <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
          </div>}
          <button 
          disabled={Loading}
          type='button' 
          onClick={generateContent} 
          className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
          >
            Generate with AI
          </button>
        </div>

        <p className='mt-4'>Category</p>
        <select name='category' onChange={(e) => setCategory(e.target.value)} className='text-gray-500 mt-2 px-3 py-2 border border-gray-300 rounded outline-none'>
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{ item }</option>
          })}
        </select>

        <div className='mt-4 flex gap-2'>
          <p>Publish Now</p>
          <input checked={isPublished} onChange={e => setIsPublished(e.target.checked)} type="checkbox" className='scale-125 cursor-pointer' />
        </div>

        <button disabled={isAdding} type='submit' className='mt-8 w-40 h-10 text-sm cursor-pointer bg-primary text-white rounded hover:brightness-90'>{isAdding ? 'Adding...' : 'Add Blog'}</button>
      </div>
    </form>
  )
}

export default AddBlog