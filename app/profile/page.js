"use client"

import { useUser } from '@auth0/nextjs-auth0/client'
import { Card } from '@/components';
import { useState, useEffect } from 'react';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const ProfilePage = () => {

  const { user } = useUser() 
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [myPosts, setMyPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/post/user/${user?.nickname}`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (user?.nickname) fetchPosts();
  }, [user?.nickname]);

  return (
    <div>
      <section className="max-w-7xl mx-auto">
        <div className='mb-4'>
          <h1 className="font-extrabold text-center text-[#ffffff] text-[32px]">{user?.name}'s Posts</h1>
        </div>    
      <div className="mt-10">
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <>
                {searchText && (
                  <h2 className="font-medium text-[#666e75] text-xl mb-3">
                    Showing Resuls for <span className="text-[#ffffff]">{searchText}</span>:
                  </h2>
                )}
                <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 m-5">
                  {searchText ? (
                    <RenderCards
                      data={searchedResults}
                      title="No Search Results Found"
                    />
                  ) : (
                    <RenderCards
                      data={myPosts}
                      title="No Posts Yet"
                    />
                  )}
                </div>
              </>
            )}
          </div>
      </section>
    </div>
  )
}

export default ProfilePage