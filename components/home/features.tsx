import Image from "next/image";

export default function Features(){
    return (
        <section className="features min-h-screen w-full lg:w-[90%] flex flex-col py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-10 md:px-16 lg:px-24">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 md:mb-16 lg:mb-20">Features</h1>
                <div className="featureContainer w-full grid grid-rows-3 lg:grid-cols-4 lg:grid-rows-4 gap-6 md:gap-8 auto-rows-fr">
                    {/* Feature 1 - Drag and Drop */}
                    <div className="flex lg:col-span-4 lg:row-span-2 rounded-3xl bg-brand-teal p-8 lg:p-12 lg:gap-10 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="featureLeft w-full lg:w-1/2 lg:h-full flex flex-col justify-between">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Drag and Drop flow</h2>
                            <p className="text-lg md:text-xl lg:text-2xl text-white/90">Easily create and manage your workflows with our intuitive drag and drop interface.</p>
                        </div>
                        <div className="featureRight w-1/2 h-full hidden lg:block bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden relative">
                            <Image
                                src="/undraw_drag-and-drop.svg"
                                alt="Drag and Drop Interface"
                                fill
                                className="object-contain p-6"
                                priority
                            />
                        </div>
                    </div>
                    
                    {/* Feature 2 - Real-time Collaboration */}
                    <div className="flex lg:col-start-1 lg:col-span-2 lg:row-span-2 lg:row-start-3 rounded-3xl bg-brand-azure p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="featureLeft w-full lg:w-1/2 h-full flex flex-col justify-between">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white z-1">Real-time Collaboration</h2>
                            <p className="text-lg md:text-xl lg:text-2xl text-white/90">Work together with your team in real-time, making changes and seeing updates instantly.</p>
                        </div>
                        <div className="featureRight w-1/2 h-full bg-white/10 backdrop-blur-sm hidden lg:block rounded-2xl overflow-hidden relative">
                            <Image
                                src="/undraw_real-time-collaboration.svg"
                                alt="Real-time Collaboration"
                                fill
                                className="object-contain p-6"
                                priority
                            />
                        </div>
                    </div>
                    
                    {/* Feature 3 - Analytics */}
                    <div className="flex lg:col-start-3 lg:col-span-2 lg:row-span-2 rounded-3xl bg-brand-purple p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="featureLeft w-full lg:w-1/2 h-full flex flex-col justify-between">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Analytics Driven</h2>
                            <p className="text-lg md:text-xl lg:text-2xl text-white/90">Make data-driven decisions with our powerful analytics tools.</p>
                        </div>
                        <div className="featureRight w-1/2 h-full hidden lg:block bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden relative">
                            <Image
                                src="/undraw_grades.svg"
                                alt="Analytics Dashboard"
                                fill
                                className="object-contain p-6"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
