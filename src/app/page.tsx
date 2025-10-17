"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#dbeafe] text-gray-800 min-h-screen">

      <header className="flex justify-between items-center px-8 py-5 bg-[#e0f2fe] shadow-md sticky top-0 z-50">

        <div className="text-blue-600 text-2xl font-bold">NammaKarya</div>


        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          <Link
            href="/login"
            className="bg-blue-400 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-500 transition-transform hover:-translate-y-1"
          >
            Login
          </Link>
        </div>
      </header>


      <section className="text-center py-20 px-6 bg-[#bfdbfe]">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Find Skilled Workers Near You
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Hire trusted local professionals — carpenters, plumbers, electricians, mechanics, and more.
          Get work done faster, safer, and easier — all from one platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-blue-500 text-white font-semibold py-3 px-7 rounded-full hover:bg-blue-600 transition-transform hover:-translate-y-1">
            Hire a Professional
          </button>
          <button className="border-2 border-blue-500 text-blue-600 font-semibold py-3 px-7 rounded-full hover:bg-blue-500 hover:text-white transition-transform hover:-translate-y-1">
            Join as Worker
          </button>
        </div>
      </section>


      <section
        id="about"
        className="max-w-6xl mx-auto my-20 px-6 grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Empowering Local Skilled Workers
          </h2>
          <p className="text-gray-700 mb-3">
            The platform bridges the gap between skilled workers and customers who need reliable services.
            By enabling direct hiring, SkillLink ensures fair wages, flexible work, and transparent job opportunities.
          </p>
          <p className="text-gray-700">
            Whether you’re fixing a leaky pipe or building furniture — find verified local experts nearby
            and get your tasks done with confidence.
          </p>
        </div>
        <Image
          src="https://picsum.photos/seed/workers/600/400"
          alt="Workers"
          width={600}
          height={400}
          data-ai-hint="construction workers"
          className="rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)]"
        />
      </section>


      <section id="services" className="bg-[#e0f2fe] text-center py-20 px-6">
        <h2 className="text-3xl font-semibold text-blue-700 mb-10">
          Top Service Categories
        </h2>
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            {
              title: "Plumbing",
              desc: "Get expert plumbing solutions for leaks, repairs, and installations.",
            },
            {
              title: "Electrical",
              desc: "Hire certified electricians for safe wiring and maintenance work.",
            },
            {
              title: "Carpentry",
              desc: "From furniture making to repairs — skilled carpenters at your service.",
            },
            {
              title: "Mechanic",
              desc: "Trusted mechanics for vehicle servicing, repairs, and maintenance.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              <h3 className="text-blue-600 text-xl font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section id="contact" className="text-center py-20 px-6 bg-[#bfdbfe]">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 mb-6">
          Have questions or need help? Reach out to our support team.
        </p>
        <a
          href="mailto:support@skilllink.com"
          className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-600 transition-transform hover:-translate-y-1"
        >
          Email Us
        </a>
      </section>


      <section
        id="join"
        className="bg-gradient-to-r from-blue-400 to-blue-500 text-white text-center py-20 px-6"
      >
        <h2 className="text-3xl font-semibold mb-4">
          Join the Local Work Revolution
        </h2>
        <p className="max-w-xl mx-auto mb-8">
          Empower yourself — whether you’re hiring or offering your skills.
        </p>
        <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-transform hover:-translate-y-1">
          Get Started Today
        </button>
      </section>


      <footer className="bg-[#e0f2fe] text-center py-4 border-t border-blue-200 text-gray-700 text-sm">
        © 2025 SkillLink | Empowering Local Talent & Community Growth
      </footer>
    </main>
  );
}
