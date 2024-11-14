import React from 'react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-12 overflow-hidden">
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="object-cover w-full h-full"
        >
          <source 
            src="https://www.apple.com/105/media/us/mac-pro/2019/466faaf3-8832-4c34-8178-59c4f1af8e5e/anim/hero/large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-[600px] mx-auto -mt-12">
        <h1 className="text-white text-5xl sm:text-6xl font-semibold tracking-tight mb-4">
          AI consultant
        </h1>
        <p className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-16">
          Your end to end personal business <span className="text-red-500">AI</span> consultant
        </p>
        <a 
          href="/select"
          className="inline-block bg-white text-black rounded-full px-6 py-3 text-base font-medium 
            hover:bg-white/90 transition-all duration-300"
        >
          Let's Dive In
        </a>
      </div>

      <div className="absolute bottom-4 w-full text-center text-white/60 text-sm">
        aiconsultant.in © 2024 all rights reserved
      </div>
    </section>
  );
}