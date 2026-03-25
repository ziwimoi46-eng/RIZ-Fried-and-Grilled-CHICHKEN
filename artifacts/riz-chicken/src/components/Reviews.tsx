import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ahmad Raza Chishti",
    stars: 5,
    text: "Best food in Overall Aurangabad. Dine in ₹200-400. Excellent service and taste.",
    source: "Google Review"
  },
  {
    name: "Seema Sayyed",
    stars: 4,
    text: "Dine in after couple of months as we were going at their mill corner location. Amazing taste!",
    source: "Google Review"
  },
  {
    name: "Rahul S.",
    stars: 5,
    text: "Best fried chicken in Aurangabad! Hands down beats all the international chains.",
    source: "Customer"
  },
  {
    name: "Priya M.",
    stars: 5,
    text: "Amazing taste and fast delivery! The Zip Zap burger is my absolute favorite.",
    source: "Zomato Order"
  },
  {
    name: "Amit K.",
    stars: 4,
    text: "Combos are totally worth the price! Quality is consistently good.",
    source: "Customer"
  },
  {
    name: "Farhan A.",
    stars: 5,
    text: "Highly recommended! Best fast food in city. The crispy chicken is perfectly cooked.",
    source: "Google Review"
  }
];

export default function Reviews() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", breakpoints: { '(min-width: 768px)': { align: "start" } } }, 
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  return (
    <section id="reviews" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase mb-2"
          >
            Testimonials
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground"
          >
            What Our Customers Say
          </motion.h3>
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 py-4">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_30%] min-w-0"
              >
                <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-lg shadow-black/5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < review.stars ? 'text-accent fill-accent' : 'text-muted fill-muted'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-foreground text-lg leading-relaxed mb-6 font-medium">
                      "{review.text}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <h4 className="font-bold text-foreground">{review.name}</h4>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                      {review.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
