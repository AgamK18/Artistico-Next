"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Loader } from '@/components';

const CreatePost = () => {
  const router = useRouter()
  const { user } = useUser();
  const [prompt, setPrompt] = useState("")
  const [photo, setPhoto] = useState("") 
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("")

  const handleChange = (e) => {
    const {value} = e.target
    setPrompt(value)
  }
  
  const handleSelectChange = (e) => {
    setLang(e.target.value);
  };

  const generateImage = async () => {
    if (prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt_text: `${prompt}`,
            lang: `${lang}`
          }),
        });
        const data = await response.json();
        console.log(data)
        setPhoto(`${data.image}`);
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (prompt && photo) {
      setLoading(true);
      try {
        const response = await fetch("/api/post/new", {
          method: 'POST',
          body: 
            JSON.stringify({
              name: user.nickname,
              prompt: `${prompt}`,
              photo: `${photo}`
            })
        });

        await response.json();
        alert('Success');
        router.push('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className='text-center'>
        <h1 className="font-extrabold text-[#ffffff] text-[32px]">Create Art</h1>
        <p className="mt-2 text-[#ffffff] text-[14px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>
      <div class="max-w-4xl mx-auto mt-8">
        <div class="relative flex items-center w-full h-12 rounded-lg border-blue-700 border-2 focus-within:shadow-lg bg-white overflow-hidden">
          

        <div className="relative inline-block text-left">
            <select
              value={lang}
              onChange={handleSelectChange}
              className="block appearance-none w-15 bg-white border border-white hover:border-white px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
              <option value="Dutch">Dutch</option>
              <option value="Gujarati">Gujarati</option>
            </select>
        </div>

          <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-2" 
          type="text" 
          id="prompt"  
          onChange={handleChange} 
          value={prompt} 
          placeholder="Enter a prompt.." />
          
          <button className='button font-inter font-medium bg-[#6469ff] text-white px-4 py-4 rounded-md cursor-pointer' onClick={generateImage}>Generate</button>
        </div>
      </div>
        { photo ? (
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-9/12 p-3 mt-3 h-9/12 mx-auto">
            <img
              src={photo}
              alt={prompt}
              className="w-full h-full object-contain"
            />
          </div>
          ) : <></>
      }
      {generatingImg && (
        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
          <Loader />
        </div>
      )}
      {photo ?(
        <div className="mt-3 text-center">
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-lg w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={handleSubmit}
          >
            {loading ? 'Sharing...' : 'Share with the Community!'}
          </button>
        </div>
      ): <></>}
    </section>
  );
};

export default CreatePost;