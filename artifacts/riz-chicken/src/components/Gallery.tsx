import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const images = [
  "hero-bucket.jpg",
  "hero-wings.jpg",
  "brand-poster.jpg",
  "restaurant-front.jpg",
  "restaurant-interior.jpg",
  "kulcha.jpg",
  "combo-tray.jpg",
  "menu-crispy.jpg",
  "restaurant-counter.jpg"
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-secondary text-secondary-foreground relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold tracking-wider uppercase mb-2">Our Gallery</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white">
              The Riz Experience
            </h3>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-md text-sm md:text-base md:text-right"
          >
            Take a look inside our kitchen and see the passion we pour into every single meal we prepare.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group bg-muted/20"
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={`${import.meta.env.BASE_URL}${img}`} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="text-white w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 backdrop-blur transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={`${import.meta.env.BASE_URL}${selectedImage}`}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl shadow-black"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
