import React from 'react'

function Footer() {
  return (
    <>
            {/* ── FOOTER SECTION ── */}
          <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/home-img-8.webp')" }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 pt-16 lg:pt-24 text-white">
          <div className="grid grid-cols-2 gap-y-6 gap-x-0 text-[13px] sm:text-[14px]">
            <div className="text-[#F5C645] font-semibold tracking-wide text-[16px] md:text-[20px]">SOCIAL CALENDAR</div>
            <div className="text-start uppercase tracking-[0.25em] text-white text-[13px]">SUBSCRIBE</div>
            <div className="font-semibold text-white/90 text-[12px]">EVENTS IN YOUR AREA</div>
            <div>
              <span className="text-[#F5C645] font-semibold">WEST LONDON</span>
              <span className="text-white/90 text-[10px] ml-3">Elsewhere? Change?</span>
            </div>
            <div></div>
            <div className="space-y-2 text-white/90 text-[11px]">
              <p>BREAKFAST CLUB &nbsp; | &nbsp; 10 AM - INVESTMENT OPPORTUNITIES</p>
              <p>CHARITY &nbsp; | &nbsp; 3 PM - FUNDRAISER FOR CHILDREN'S HOSPITAL</p>
            </div>
          </div>
          <div className="mt-16 md:mt-20">
            <h1 className="text-[28px] md:text-[38px] font-light leading-[1.1]">
              LONDON <br /> NEWS
            </h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
