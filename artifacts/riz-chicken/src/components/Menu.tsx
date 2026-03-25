import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  badge?: string;
  image: string;
  desc?: string;
};

const menuData: MenuItem[] = [
  // BURGERS
  { id: "b1", name: "Chicken Zip Zap Burger", price: 245, category: "Burgers", badge: "Best Seller", image: "menu-burgers.jpg", desc: "Crispy chicken patty with our secret zip zap sauce." },
  { id: "b2", name: "Chicken Tandoori Zip Zap Burger", price: 245, category: "Burgers", image: "menu-burgers.jpg", desc: "Infused with rich tandoori spices." },
  { id: "b3", name: "Chicken Habanero Zip Zap Burger", price: 239, category: "Burgers", image: "menu-burgers.jpg", desc: "Extra spicy habanero kick." },
  { id: "b4", name: "Chicken Smokey Zip Zap Burger", price: 245, category: "Burgers", image: "menu-burgers.jpg", desc: "Smokey BBQ flavors inside out." },
  { id: "b5", name: "Veg Burger", price: 169, category: "Burgers", image: "menu-burgers.jpg", desc: "Crunchy veg patty with fresh lettuce." },
  { id: "b6", name: "Veg Tandoori Burger", price: 169, category: "Burgers", image: "menu-burgers.jpg", desc: "Veg patty with a tandoori twist." },
  
  // STARTERS / WINGS
  { id: "w1", name: "Chicken Wings [6 Pieces]", price: 229, category: "Starters / Wings", badge: "Best Seller", image: "hero-wings.jpg", desc: "Classic crispy fried wings." },
  { id: "w2", name: "Peri Peri Chicken Wings [6 Pieces]", price: 229, category: "Starters / Wings", image: "hero-wings.jpg", desc: "Tossed in fiery peri peri seasoning." },
  
  // SNACKS
  { id: "s1", name: "Chicken Popcorn", price: 265, category: "Snacks", badge: "Best Seller", image: "menu-popcorn-fries.jpg", desc: "Bite-sized crispy chicken joy." },
  { id: "s2", name: "Peri Peri Chicken Popcorn", price: 265, category: "Snacks", image: "menu-popcorn-fries.jpg", desc: "Spicy bite-sized chicken." },
  { id: "s3", name: "Chicken Kulcha", price: 219, category: "Snacks", image: "kulcha.jpg", desc: "Stuffed chicken bread delight." },
  { id: "s4", name: "Chicken Makhani Kulcha", price: 219, category: "Snacks", image: "kulcha.jpg", desc: "Rich makhani gravy inside." },
  { id: "s5", name: "Chicken Habanero Kulcha", price: 219, category: "Snacks", image: "kulcha.jpg", desc: "Spicy stuffed kulcha." },
  
  // FRENCH FRIES
  { id: "f1", name: "Salted Fries", price: 90, category: "French Fries", image: "menu-popcorn-fries.jpg" },
  { id: "f2", name: "Peri Peri Fries", price: 90, category: "French Fries", image: "menu-popcorn-fries.jpg" },
  
  // COMBOS
  { id: "c1", name: "Chicken Zip Zap Burger Combo", price: 299, category: "Combos", image: "combo-tray.jpg", desc: "Burger + Fries + Drink" },
  { id: "c2", name: "Chicken Tandoori Zip Zap Combo", price: 299, category: "Combos", image: "combo-tray.jpg", desc: "Tandoori Burger + Fries + Drink" },
  { id: "c3", name: "Chicken Habanero Zip Zap Combo", price: 299, category: "Combos", image: "combo-tray.jpg", desc: "Spicy Burger + Fries + Drink" },
  
  // HOT & CRISPY
  { id: "hc1", name: "2 pc Hot & Crispy", price: 170, category: "Hot & Crispy", image: "menu-crispy.jpg", desc: "With 2 dippings." },
  { id: "hc2", name: "4 pc Hot & Crispy", price: 320, category: "Hot & Crispy", image: "menu-crispy.jpg", desc: "With 4 dippings." },
  { id: "hc3", name: "6 pc Hot & Crispy", price: 450, category: "Hot & Crispy", image: "menu-crispy.jpg", desc: "With 6 dippings." },
  { id: "hc4", name: "8 pc Hot & Crispy", price: 570, category: "Hot & Crispy", image: "menu-crispy.jpg", desc: "With 6 dippings." },
  
  // GRILLED SPICY
  { id: "g1", name: "2 pc Grilled Spicy Chicken", price: 170, category: "Grilled Spicy", image: "menu-grilled.jpg" },
  { id: "g2", name: "4 pc Grilled Spicy Chicken", price: 320, category: "Grilled Spicy", image: "menu-grilled.jpg" },
  { id: "g3", name: "6 pc Grilled Spicy Chicken", price: 450, category: "Grilled Spicy", image: "menu-grilled.jpg" },
  { id: "g4", name: "8 pc Grilled Spicy Chicken", price: 570, category: "Grilled Spicy", image: "menu-grilled.jpg" },
];

const categories = ["All", ...Array.from(new Set(menuData.map(item => item.category)))];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem } = useCart();
  const { toast } = useToast();

  const filteredMenu = activeCategory === "All" 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addItem(item.name, item.price);
    toast({
      title: "Added to order!",
      description: `${item.name} - ₹${item.price}`,
      duration: 2000,
    });
  };

  return (
    <section id="menu" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase mb-2"
          >
            Explore Our Menu
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground"
          >
            Fresh, Hot & Ready
          </motion.h3>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105" 
                  : "bg-background text-foreground border border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl p-4 flex gap-4 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden relative bg-muted">
                  <img 
                    src={`${import.meta.env.BASE_URL}${item.image}`} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.badge && (
                    <div className="absolute top-0 left-0 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 flex items-center shadow-md">
                      <Star className="w-3 h-3 mr-0.5 fill-current" />
                      {item.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h4 className="font-bold text-foreground leading-tight text-base sm:text-lg">
                        {item.name}
                      </h4>
                      <span className="font-black text-primary text-lg whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>
                    {item.desc && (
                      <p className="text-muted-foreground text-xs leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button 
                      size="sm" 
                      onClick={() => handleAdd(item)}
                      className="rounded-full h-8 px-4 text-xs font-bold hover:scale-105 transition-transform"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
