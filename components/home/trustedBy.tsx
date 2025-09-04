import Image from "next/image";

export default function TrustedBy(){
    const logos = [
        { src: "/brand/airbnb.svg", alt: "Airbnb Logo" },
        { src: "/brand/cardano.svg", alt: "Cardano Logo" },
        { src: "/brand/cloudbees.svg", alt: "CloudBees Logo" },
        { src: "/brand/envato.svg", alt: "Envato Logo" },
        { src: "/brand/fox.svg", alt: "Fox Logo" },
        { src: "/brand/jbl.svg", alt: "JBL Logo" },
        { src: "/brand/kred.svg", alt: "Kred Logo" },
        { src: "/brand/mcafee.svg", alt: "McAfee Logo" },
        { src: "/brand/pixiv.svg", alt: "Pixiv Logo" },
        { src: "/brand/playstation2.svg", alt: "PlayStation Logo" },
        { src: "/brand/reason.svg", alt: "Reason Logo" },
        { src: "/brand/supabase.svg", alt: "Supabase Logo" },
        { src: "/brand/taichilang.svg", alt: "TaichiLang Logo" },
        { src: "/brand/tesla.svg", alt: "Tesla Logo" },
    ];

    return (
        <section className="trustedBy h-[25vh] sm:h-[30vh] md:h-[35vh] w-full bg-neutral-light flex flex-col justify-center items-center gap-2 py-10 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="trustedText text-neutral-gray mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg lg:text-xl font-medium sm:font-semibold text-center max-w-2xl">
                Trusted by the world&apos;s leading companies
            </div>
            <div className="trustedLogos w-full overflow-hidden">
                <div className="flex animate-scroll gap-4 sm:gap-6 md:gap-8 lg:gap-10" style={{
                    '--logo-width': '3rem',
                    '--logo-gap': '1rem',
                    '--logo-count': '14'
                } as React.CSSProperties & {
                    '--logo-width': string;
                    '--logo-gap': string;
                    '--logo-count': string;
                }}>
                    {/* First set */}
                    {logos.map((logo, index) => (
                        <div key={`first-${index}`} className="image relative flex flex-col justify-center items-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 text-neutral-gray">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                className="object-contain"
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(43%) sepia(11%) saturate(289%) hue-rotate(178deg) brightness(95%) contrast(87%)'
                                }}
                                priority={index < 6} 
                                sizes="(max-width: 480px) 48px, (max-width: 640px) 56px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                            />
                        </div>
                    ))}
                    {/* Duplicate */}
                    {logos.map((logo, index) => (
                        <div key={`second-${index}`} className="image relative flex flex-col justify-center items-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 text-neutral-gray">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                className="object-contain"
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(43%) sepia(11%) saturate(289%) hue-rotate(178deg) brightness(95%) contrast(87%)'
                                }}
                                sizes="(max-width: 480px) 48px, (max-width: 640px) 56px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
