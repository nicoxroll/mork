
import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <section id="contact-info" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <h3 className="font-futuristic text-[10px] tracking-[0.5em] text-neutral-500 mb-4 uppercase">UBICACIÓN_FLAGSHIP</h3>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter">ESTAMOS EN <br /><span className="opacity-40 italic">EL CENTRO.</span></h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <h4 className="font-futuristic text-[9px] tracking-widest text-neutral-500 mb-2 uppercase">DIRECCIÓN</h4>
                  <p className="text-xl font-light">Calle 17 y 50 N° 903, La Plata</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <h4 className="font-futuristic text-[9px] tracking-widest text-neutral-500 mb-2 uppercase">HORARIOS</h4>
                  <p className="text-sm font-light text-neutral-400">Lun a Vie: 09:00 — 18:00</p>
                  <p className="text-sm font-light text-neutral-400">Sábados: 10:00 — 14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-video bg-neutral-900 overflow-hidden group border border-white/5">
            {/* OpenStreetMap Embed - Static & Stylyzed */}
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-57.95962,-34.91777,-57.94962,-34.90777&amp;layer=mapnik&amp;marker=-34.91277,-57.95462" 
              className="w-full h-full border-0 grayscale invert opacity-70 contrast-125 hover:opacity-90 transition-opacity"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-white/10 group-hover:border-white/20 transition-colors"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
