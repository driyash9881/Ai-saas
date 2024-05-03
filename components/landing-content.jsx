"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sheetal ",
    avatar: "S",
    title: "Software Developer",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Sagar",
    avatar: "S",
    title: "Student",
    description: "I use this daily for generating new photos!",
  },
  {
    name: "Sonu",
    avatar: "M",
    title: "Student",
    description:
      "This app has changed my life, cannot imagine working without it!",
  },
  {
    name: "Durgesh",
    avatar: "M",
    title: "CA",
    description:
      "The best in class, definitely worth the subscription!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 -mt-0 pb-1 flex flex-col ">
      <h2 className="text-center text-4xl text-white font-extrabold p-5 m-5 mb-10">
        Testimonials
      </h2>
      <br/>
      <div >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10 ">
        {testimonials.map((item) => (
       <div class="rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-none text-white bg-slate-700 border-gradient-to-r from-purple-400 to-pink-600 hover:bg-opacity-75 hover:text-black">``
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="text-2xl font-semibold leading-none tracking-tight flex items-center gap-x-2">
              <div><p class="text-lg">{item.name}</p>
              <p class="text-zinc-400 text-sm">{item.title}</p>
              </div>
              </h3>
              <div className="flex ">
              <div className=" rounded  border-slate-100 w-4 h-4 `text-slate ">{item.avatar}</div>
              <div class="p-6 pt-4 px-0">{item.description}</div></div>
              </div>
              </div>


          // <Card
          //   key={item.description}
          //   className="bg-[#192339] border-none text-white"
          // >
          //   <CardHeader>
          //     <CardTitle className="flex items-center gap-x-2">
          //       <div>
          //         <p className="text-lg">{item.name}</p>
          //         <p className="text-zinc-400 text-sm">{item.title}</p>
          //       </div>
          //     </CardTitle>
          //     <CardContent className="pt-4 px-0">
          //       {item.description}
          //     </CardContent>
          //   </CardHeader>
          // </Card>
        ))}
        </div>
      </div>
    </div>
  );
};