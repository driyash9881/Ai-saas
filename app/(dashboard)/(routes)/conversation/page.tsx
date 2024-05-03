'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

import {Heading} from '../../../../components/heading'
import { MessageSquare } from 'lucide-react';
import { Loader } from '@/components/loader';


const Text: React.FC = () => {
  const [userMessage, setUserMessage] = useState<string>('');
  const [botResponse, setBotResponse] = useState<string>('');
  const [Loading, setLoading] = useState(false)
   
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key':"e2150b805emsh9bee4dba3e5d826p1e3bcfjsncab6fa36e2b4",
        'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false
      }
    };

    try {
      const response = await axios.request<{ result: string }>(options);
      console.log('Bot Response:', response.data);
      setBotResponse(response.data.result);
      setLoading(false);
 
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    console.log(botResponse);
  };

  return (
    <div >
      <Heading
        title="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
     <div className="px-4 lg:px-8">
      <form className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2

            " onSubmit={handleSubmit}>
              <div className="col-span-12 lg:col-span-10 ">
                <div className="m-0 p-0" > 
                <input className="border-0 outline-none p-4  w-[20rem] focus-visible:ring-0 focus-visible:ring-transparent" type="text" 
        placeholder='Type here '
        value={userMessage} onChange={handleChange} />
                </div>
              </div>
        
        <Button className='col-span-12 lg:col-span-2 w-full' variant={"default"} type="submit">Send</Button>
      </form>
      {Loading && (
            <div className="p-8 rounded-lg w-full flex items-centerjustify-center bg-muted">
              <Loader />
            </div>
          )}
<div className='flex flex-col-reverse gap-y-4'>
<div key={botResponse} className="p-8 w-full flex items-start gap-x-8 rounded-lg">
<p className="text-sm">{botResponse}</p>
</div>
</div>   
    </div>
    </div>
    
    );
};

export default Text;

