'use client'
import { Button } from '@/components/ui/button';
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import Image from "next/image";
 import { Loader } from '@/components/loader';
 import {Heading} from '../../../../components/heading'
 import { Download, ImageIcon } from "lucide-react";
 import { Card, CardFooter } from "@/components/ui/card";
interface Image {
  image: string;
}

const Text: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<{ result: Image[] }>('https://google-api31.p.rapidapi.com/imagesearch', {
        text: text,
        safesearch: 'off',
        region: 'wt-wt',
        color: '',
        size: '',
        type_image: '',
        layout: '',
        max_results: 10
      }, {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'e2150b805emsh9bee4dba3e5d826p1e3bcfjsncab6fa36e2b4',
          'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
        }
      });
      setImages(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // GSAP Animation
  useEffect(() => {
    if (images.length > 0) {
      gsap.from('.image', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5 // Delay added for better visualization
      });
    }
  }, [images]);

  return (
    <div >
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
        <input  className="border-0 outline-none p-4  w-[20rem] focus-visible:ring-0 focus-visible:ring-transparent" type="text"   placeholder='Type here ' type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div></div></div>
        <Button className='col-span-12 lg:col-span-2 w-full' type="submit">Generate Images</Button>
      </form>
      </div>
      {loading && (
        <div className="text-center my-8">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="text-center my-8">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {images.map((img, index) => (
          <div>
          <Card key={index} className="rounded-lg overflow-hidden">
          <div className="relative aspect-square">
          <img src={img.image} alt={`Image ${index}`} />
           </div>
           <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(img.image)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
              </div>
            ))}
          </div>  
          </div>
          

      </div>   

  );
};

export default Text;
