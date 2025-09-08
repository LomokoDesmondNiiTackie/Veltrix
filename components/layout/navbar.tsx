import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b-black/5 flex items-center justify-between p-10 px-4 sm:px-10 md:px-16 lg:px-24 bg-[#f5f5f5]">
      <div className="logo font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
        Veltrix<span className="text-danger">.</span>
      </div>

      <Link href={'/login'} className="loginBtn bg-brand-teal hover:bg-brand-teal/90 hover:shadow-inner-glow h-10 w-20 flex justify-center items-center rounded shadow-soft text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-semibold text-neutral-light">
        Login
      </Link>
    </nav>
  );
}
