import Image from "next/image";
import { PlayIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="hero h-[100vh] w-full flex md:flex-col lg:flex-row lg:gap-8 justify-center items-center px-4 sm:px-10 md:px-16 lg:px-24">
      <div className="heroLeft h-full md:h-[40%]  lg:h-[80%] w-full lg:w-1/2 px-4 flex flex-col gap-15 justify-center md:justify-center lg: md:items-center text-justify">
        <h1 className="lg:w-full text-[4em]/10 md:text-5xl lg:text-6xl font-bold leading-tight">
          Clarity<span className="text-danger">.</span>
          <br className="block sm:hidden" />
          Flow<span className="text-danger">.</span>
          <br className="block sm:hidden lg:block" />
          <span className="text-brand-teal">Execution</span>
        </h1>
        
        <p className="text-xl lg:text-2xl w-[80%] lg:w-full text-gray-600 leading-relaxed">
          Organize tasks, align teams, and drive progress with veltrix, your real-time kanban operating system.
        </p>
        
        <div className="heroButtons lg:w-full flex gap-2 md:gap-15">
          <button className="btn btn-primary w-1/2 h-15 md:w-50 md:h-15 bg-brand-teal shadow-soft rounded text-neutral-light font-bold">
            Try for Free
          </button>
          <button className="btn btn-outline w-1/2 h-15 md:w-50 md:h-15 bg-danger shadow-soft rounded  text-neutral-light font-bold flex items-center justify-center gap-2">
            <PlayIcon className="w-5 h-5" />
            Watch Demo
          </button>
        </div>
      </div>
      
      <div className="heroRight h-[40%] lg:h-[80%] w-full md:block lg:w-1/2 hidden relative">
        <Image
          src="/undraw_scrum-board.svg"
          alt="Hero Image"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </section>
  );
}
