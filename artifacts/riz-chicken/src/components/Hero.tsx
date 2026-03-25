import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ChevronRight } from "lucide-react";

export default function Hero() {
  const heroImage = `${import.meta.env.BASE_URL}hero-wings.jpg`;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Crispy Fried Chicken" 
          className="w-full h-full object-cover object-center scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg shadow-accent/20">
              100% Halal Certified
            </span>
            <span className="flex items-center text-white/90 text-sm font-medium">
              <UtensilsCrossed className="w-4 h-4 mr-1 text-primary" />
              Aurangabad's Best
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[1.1] mb-6 drop-shadow-2xl"
          >
            RIZ FRIED & <br/>
            <span className="text-primary relative inline-block">
              GRILLED CHICKEN
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl font-light leading-relaxed"
          >
            Crispy. Juicy. Unforgettable. Experience the ultimate fast-food brand quality right here in Maharashtra.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#order">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/30 hover:scale-105 transition-transform duration-300">
                Order Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="#menu">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-md transition-all duration-300">
                View Menu
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-background"></path>
        </svg>
      </div>
    </section>
  );
}
