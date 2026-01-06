
import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { visualizeCurtains } from '../services/geminiService';

interface ProductViewProps {
  product: Product;
  onClose: () => void;
}

const ProductView: React.FC<ProductViewProps> = ({ product, onClose }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clarification, setClarification] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVisualize = async () => {
    if (!userImage) return;
    setIsGenerating(true);
    try {
      const result = await visualizeCurtains(userImage, product.name, clarification);
      setResultImage(result);
    } catch (error) {
      alert("Error al procesar la imagen. Intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black overflow-y-auto animate-in fade-in duration-700">
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[120] mix-blend-difference text-white">
        <button onClick={onClose} className="font-futuristic text-[10px] tracking-[0.3em] flex items-center gap-4 hover:opacity-50 transition-opacity">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" /></svg>
          VOLVER A COLECCIÓN
        </button>
        <span className="font-futuristic text-[10px] tracking-[0.5em] hidden md:block">TECH_SPECS // {product.id}</span>
      </nav>

      <section className="relative h-[90vh] flex items-end p-8 md:p-20 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="relative z-10 w-full">
          <h1 className="font-futuristic text-5xl md:text-[10rem] leading-[0.85] tracking-tighter mb-8 font-extralight uppercase">
            {product.name.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? 'italic opacity-50' : ''}>{word} </span>
            ))}
          </h1>
        </div>
      </section>

      <section className="bg-white text-black py-32 px-8 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div>
              <h3 className="font-futuristic text-[10px] tracking-[0.5em] text-neutral-400 mb-8 uppercase">ESPECIFICACIONES</h3>
              <p className="text-2xl md:text-4xl font-light leading-snug mb-12">
                {product.longDescription}
              </p>
              <div className="grid grid-cols-2 gap-12">
                {product.specs.map((spec, i) => (
                  <div key={i} className="border-t border-black/10 pt-6">
                    <span className="font-futuristic text-[9px] tracking-widest text-neutral-400 block mb-2">{spec.label}</span>
                    <span className="text-lg font-light">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {product.gallery.map((img, idx) => (
                <div key={idx} className="aspect-video bg-neutral-100 overflow-hidden group border border-black/5">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12 bg-neutral-50 p-12 border border-black/5 self-start sticky top-24">
            <h3 className="font-futuristic text-[10px] tracking-[0.5em] text-neutral-400 mb-4 uppercase">AI ROOM VISUALIZER</h3>
            <p className="text-sm font-light text-neutral-500 mb-8">Sube una foto de tu espacio para ver cómo quedarían las {product.name}.</p>
            
            <div className="relative aspect-video bg-neutral-200 overflow-hidden flex items-center justify-center group">
              {(resultImage || userImage) ? (
                <img src={resultImage || userImage || ''} className="w-full h-full object-cover" alt="User space" />
              ) : (
                <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4" /></svg>
                  <span className="font-futuristic text-[9px] tracking-widest">SUBIR_FOTO_ESPACIO</span>
                </button>
              )}
              {isGenerating && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
                    <span className="font-futuristic text-[10px] tracking-[0.4em] text-white">PROCESANDO_IA</span>
                  </div>
                </div>
              )}
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

            {userImage && !resultImage && (
              <div className="space-y-4 animate-in fade-in">
                <textarea 
                  value={clarification}
                  onChange={(e) => setClarification(e.target.value)}
                  placeholder="Añade aclaraciones (ej. 'color gris oscuro', 'más transparentes'...)"
                  className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-sm font-light"
                />
                <button 
                  onClick={handleVisualize}
                  disabled={isGenerating}
                  className="w-full py-4 bg-black text-white font-futuristic text-[10px] tracking-[0.3em] hover:bg-neutral-800 transition-colors"
                >
                  GENERAR_VISTA_PREVIA
                </button>
                <button onClick={() => {setUserImage(null); setClarification('');}} className="w-full text-center text-[9px] font-futuristic tracking-widest opacity-40 hover:opacity-100 py-2">BORRAR</button>
              </div>
            )}
            
            {resultImage && (
              <button onClick={() => setResultImage(null)} className="w-full py-4 border border-black/10 font-futuristic text-[10px] tracking-[0.3em] hover:bg-black hover:text-white transition-all">PROBAR_CON_OTRA_FOTO</button>
            )}
          </div>
        </div>
      </section>

      <section className="py-32 px-8 md:px-20 text-center">
        <h2 className="font-futuristic text-[10px] tracking-[0.5em] text-neutral-600 mb-8">¿INTERESADO EN {product.name}?</h2>
        <a href="#contact" onClick={onClose} className="text-3xl md:text-5xl font-extralight border-b border-white/20 hover:border-white transition-colors pb-4 inline-block uppercase">
          SOLICITAR COTIZACIÓN <span className="italic opacity-30">_TECH</span>
        </a>
      </section>
    </div>
  );
};

export default ProductView;
