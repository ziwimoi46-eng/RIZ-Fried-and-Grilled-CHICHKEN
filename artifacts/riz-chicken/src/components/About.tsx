import { motion } from "framer-motion";
import { Flame, Clock, HeartHandshake, ShieldCheck } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Fresh Ingredients",
      desc: "Farm-fresh chicken and premium spices sourced daily for unmatched quality."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Fast Service",
      desc: "Piping hot, crispy meals served lightning fast without compromising taste."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-primary" />,
      title: "Affordable Combos",
      desc: "Generous portions and pocket-friendly combo meals for the whole family."
    }
  ];

  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-primary font-bold tracking-wider uppercase mb-2">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              More Than Just <br/>Fried Chicken.
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At Riz Fried and Grilled Chicken, we believe in serving joy in every bite. 
              Our secret recipe features a perfect blend of premium herbs and spices, 
              ensuring every piece is delightfully crispy on the outside and incredibly juicy inside.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                <div className="text-3xl font-black text-primary mb-1">1000+</div>
                <div className="text-sm font-semibold text-foreground">Happy Customers</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                <div className="text-3xl font-black text-primary mb-1">5+</div>
                <div className="text-sm font-semibold text-foreground">Years of Excellence</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full z-0"></div>
            
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative z-10 bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border/50 hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 ${
                  index === 2 ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''
                }`}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
