'use client'
import { FileAudio } from "lucide-react";
import React, { useState } from 'react';
import axios from 'axios';
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
interface Video {
  images: {
    motion: string;
  };
}

const VideoGenerator: React.FC = () => {
  
  const [text, setText] = useState<string>('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const options = {
      method: 'POST',
      url: 'https://google-api31.p.rapidapi.com/videosearch',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key':process.env.NEXT_PUBLIC_API_KEY,
        'X-RapidAPI-Host': 'google-api31.p.rapidapi.com',
      },
      data: {
        text: text,
        safesearch: 'on',
        timelimit: '',
        duration: '',
        resolution:' 1080p',
        region: 'wt-wt',
        max_results: 8, // Fetch 8 videos
      },
    };

    try {
      const response = await axios.request<{ result: Video[] }>(options);
      const videoData = response.data.result;
      setVideos(videoData);
    } catch (error) {
      setError("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video."
        Icon={FileAudio}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
        <form className='rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2' onSubmit={handleSubmit}>
              <div className="col-span-12 lg:col-span-10 ">
              <div className='col-span-12 lg:col-span-6'>
              <div className="m-0 p-0" > 
    
              <input  className="border-0 outline-none p-4  w-[20rem] focus-visible:ring-0 focus-visible:ring-transparent" type="text"   placeholder='Type here '  value={text} onChange={(e) => setText(e.target.value)} />
             </div>
        </div>
      </div>
         <Button className='col-span-12 lg:col-span-2 w-full' type="submit">Generate Videos </Button>
    
      </form>
     </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {videos.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 gap-4 mt-5">
          {videos.map((video, index) => (
            <div key={index} className="relative">
              <video className="w-full h-full rounded-lg object-cover" controls>
                <source src={video.images.motion} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default VideoGenerator;
