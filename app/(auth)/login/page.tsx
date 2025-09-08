import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-6 lg:gap-0  lg:grid grid-cols-2 divide-x-2 divide-neutral-gray/30 lg:p-50
      relative
      bg-[linear-gradient(0deg,transparent_50%,rgba(107,114,128,0.015)_50%),linear-gradient(90deg,transparent_50%,rgba(107,114,128,0.015)_50%)]
      [background-size:calc(0.36rem*51)_calc(0.36rem*51)]
      bg-[#f5f5f5]   /* base background color */
    ">
      <div className="w-full lg:h-full flex justify-center items-center lg:w-full text-[4em]/10 md:text-5xl lg:text-6xl font-extrabold leading-tight">
        Veltrix<span className="text-danger">.</span>
      </div>
      <div className=" w-full md:w-4/5 lg:w-full flex flex-col justify-center items-center gap-7 ">
          <form action="" method="post" className="w-4/5 flex flex-col justify-center items-center gap-7" >
            <input type="email" name="" id="" className="h-15 w-full lg:w-lg border-2 border-brand-teal rounded-lg font-semibold pl-2 " placeholder="email: example@gmail.com" />
            <input type="password" name="" id="" className=" h-15 w-full lg:w-lg border-2 border-brand-teal rounded-lg font-semibold pl-2" placeholder="Password: 8+ characters long" />
            <button type="submit" className="h-15 w-full lg:w-lg bg-brand-teal rounded-lg text-neutral-light font-semibold" >sign up</button>
          </form>
          <div className="login text-neutral-gray text-lg font-semibold">Create an account - <Link href={'/sign-up'} className="text-danger underline italic">Sign up</Link></div>
      </div>
    </section>
  );
}