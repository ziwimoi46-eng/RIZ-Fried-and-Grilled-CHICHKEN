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
  // KULCHA & WRAPS
  { id: "k1", name: "Chicken Kulcha", price: 210, category: "Kulcha & Wraps", badge: "Best Seller", image: "kulcha.jpg", desc: "Crispy stuffed kulcha with 1 sweet chilly & 1 garlic dip." },
  { id: "k2", name: "Chicken Peri Peri Kulcha", price: 210, category: "Kulcha & Wraps", badge: "Best Seller", image: "kulcha.jpg", desc: "Fiery peri peri stuffed kulcha with 1 sweet chilly & 1 garlic dip." },
  { id: "k3", name: "Chicken Makhani Kulcha", price: 210, category: "Kulcha & Wraps", badge: "Best Seller", image: "kulcha.jpg", desc: "Rich makhani chicken kulcha with 1 sweet chilly & 1 garlic dip." },
  { id: "k4", name: "Arabian Wrap", price: 150, category: "Kulcha & Wraps", image: "kulcha.jpg", desc: "Tender chicken in an Arabian-style wrap." },
  { id: "k5", name: "Desi Wrap", price: 150, category: "Kulcha & Wraps", image: "kulcha.jpg", desc: "Spiced chicken in a desi-style wrap." },

  // BURGERS
  { id: "b1", name: "Chicken Grilled Burger", price: 170, category: "Burgers", image: "menu-burgers.jpg", desc: "Choice of Zingy, Harissa or Peri Peri sauce. Add double patty @₹50 or fried egg @₹20." },
  { id: "b2", name: "Chicken Zip Zap Burger", price: 210, category: "Burgers", badge: "Best Seller", image: "menu-burgers.jpg", desc: "Crispy chicken patty with our signature zip zap sauce." },
  { id: "b3", name: "Chicken Tandoori Burger", price: 210, category: "Burgers", image: "menu-burgers.jpg", desc: "Juicy chicken with rich tandoori spices & garlic dip." },
  { id: "b4", name: "Chicken Smokey Burger", price: 210, category: "Burgers", image: "menu-burgers.jpg", desc: "Smokey flavour chicken patty served with garlic dip." },

  // CHICKEN WINGS
  { id: "w1", name: "Chicken Hot Wings [6 Pieces]", price: 210, category: "Chicken Wings", badge: "Best Seller", image: "hero-wings.jpg", desc: "Classic crispy hot wings with 1 sweet chilli & 1 garlic dip." },
  { id: "w2", name: "Peri Peri Wings [6 Pieces]", price: 220, category: "Chicken Wings", image: "hero-wings.jpg", desc: "Fiery peri peri wings with 1 sweet chilli & 1 garlic dip." },

  // SNACKS
  { id: "s1", name: "Chicken Popcorn", price: 230, category: "Snacks", badge: "Best Seller", image: "menu-popcorn-fries.jpg", desc: "Bite-sized crispy chicken with 1 sweet chilli & 1 garlic dip." },
  { id: "s2", name: "Peri Peri Popcorn", price: 240, category: "Snacks", image: "menu-popcorn-fries.jpg", desc: "Spicy peri peri popcorn with 1 sweet chilli & 1 garlic dip." },
  { id: "s3", name: "Chicken Boneless Strips [4 Pieces]", price: 230, category: "Snacks", image: "menu-popcorn-fries.jpg", desc: "Tender boneless chicken strips." },
  { id: "s4", name: "Chicken Boneless Strips [6 Pieces]", price: 300, category: "Snacks", image: "menu-popcorn-fries.jpg", desc: "Tender boneless chicken strips." },
  { id: "s5", name: "Chicken Boneless Strips [8 Pieces]", price: 370, category: "Snacks", image: "menu-popcorn-fries.jpg", desc: "Tender boneless chicken strips." },

  // FRENCH FRIES
  { id: "f1", name: "Fries", price: 80, category: "French Fries", image: "menu-popcorn-fries.jpg", desc: "Classic salted crispy fries." },
  { id: "f2", name: "Peri Peri Fries", price: 90, category: "French Fries", image: "menu-popcorn-fries.jpg", desc: "Crispy fries tossed in peri peri seasoning." },

  // CHICKEN BOXES
  { id: "hc1", name: "2 pc Hot & Crispy", price: 225, category: "Chicken Boxes", image: "menu-crispy.jpg", desc: "1 thigh 1 leg — with 1 sweet chilli & 1 garlic dip." },
  { id: "hc2", name: "4 pc Hot & Crispy", price: 390, category: "Chicken Boxes", image: "menu-crispy.jpg", desc: "2 thigh 2 leg — with 2 sweet chilli & 2 garlic dip." },
  { id: "hc3", name: "6 pc Hot & Crispy", price: 550, category: "Chicken Boxes", image: "menu-crispy.jpg", desc: "3 thigh 3 leg — with 3 sweet chilli & 3 garlic dip." },
  { id: "hc4", name: "8 pc Hot & Crispy", price: 650, category: "Chicken Boxes", image: "menu-crispy.jpg", desc: "4 thigh 4 leg — with 3 sweet chilli & 3 garlic dip." },
  { id: "cg1", name: "2 pc Chilli Garlic Chicken", price: 235, category: "Chicken Boxes", image: "menu-crispy.jpg", desc: "1 thigh 1 leg — with 1 sweet chilli & 1 garlic dip." },
  { id: "cg2", name: "4 pc Chilli Garlic Chicken", price: 400, category: "Chicken Boxes", image: "menu-crispy.jpg", desc: "2 thigh 2 leg — with 2 sweet chilli & 2 garlic dip." },
  { id: "cg3", name: "6 pc Chilli Garlic Chicken", price: 560, category: "Chicken Boxes", image: "menu-crispy.jpg", desc: "3 thigh 3 leg — with 3 sweet chilli & 3 garlic dip." },
  { id: "cg4", name: "8 pc Chilli Garlic Chicken", price: 660, category: "Chicken Boxes", image: "menu-crispy.jpg", desc: "4 thigh 4 leg — with 3 sweet chilli & 3 garlic dip." },
  { id: "g1", name: "2 pc Grilled Chicken", price: 240, category: "Chicken Boxes", image: "menu-grilled.jpg", desc: "1 thigh 1 leg — with 1 sweet chilli & 1 garlic dip." },
  { id: "g2", name: "4 pc Grilled Chicken", price: 410, category: "Chicken Boxes", image: "menu-grilled.jpg", desc: "2 thigh 2 leg — with 2 sweet chilli & 2 garlic dip." },
  { id: "g3", name: "6 pc Grilled Chicken", price: 580, category: "Chicken Boxes", image: "menu-grilled.jpg", desc: "3 thigh 3 leg — with 3 sweet chilli & 3 garlic dip." },
  { id: "g4", name: "8 pc Grilled Chicken", price: 670, category: "Chicken Boxes", image: "menu-grilled.jpg", desc: "4 thigh 4 leg — with 3 sweet chilli & 3 garlic dip." },

  // COMBOS
  { id: "c1", name: "Non Veg Burger Combo", price: 290, category: "Combos", image: "combo-tray.jpg", desc: "Chicken Burger + Fries + 200ml Cold Drink." },
  { id: "c2", name: "Wings Combo", price: 270, category: "Combos", image: "combo-tray.jpg", desc: "Wings + Fries + 200ml Cold Drink." },
  { id: "c3", name: "Popcorn Combo", price: 300, category: "Combos", badge: "Best Seller", image: "combo-tray.jpg", desc: "Chicken Popcorn + Fries + 200ml Cold Drink." },
  { id: "c4", name: "Veg Burger Combo", price: 250, category: "Combos", image: "combo-tray.jpg", desc: "Veg Burger + Fries + 200ml Cold Drink." },

  // VEG MENU
  { id: "v1", name: "Veg Burger", price: 140, category: "Veg Menu", image: "menu-burgers.jpg", desc: "Crispy veg patty with fresh lettuce & garlic dip." },
  { id: "v2", name: "Veg Tandoori Burger", price: 140, category: "Veg Menu", image: "menu-burgers.jpg", desc: "Veg patty with tandoori spice & garlic dip." },
  { id: "v3", name: "Veg Kulcha", price: 130, category: "Veg Menu", badge: "Best Seller", image: "kulcha.jpg", desc: "Stuffed veg kulcha with garlic dip & sweet chilly." },
  { id: "v4", name: "Veg Tandoori Kulcha", price: 130, category: "Veg Menu", badge: "Best Seller", image: "kulcha.jpg", desc: "Veg kulcha with tandoori spices, garlic dip & sweet chilly." },
  { id: "v5", name: "Veg Peri Peri Kulcha", price: 130, category: "Veg Menu", badge: "Best Seller", image: "kulcha.jpg", desc: "Veg kulcha with peri peri twist, garlic dip & sweet chilly." },

  // BEVERAGES
  { id: "bev1", name: "Popping Boba", price: 140, category: "Beverages", image: "hero-bucket.jpg", desc: "Choose from Cranberry, Blueberry, Lichi, Kiwi, Mango or Strawberry." },
  { id: "bev2", name: "Virgin Mojito", price: 100, category: "Beverages", image: "hero-bucket.jpg", desc: "Refreshing classic virgin mojito." },
  { id: "bev3", name: "Watermelon Mojito", price: 120, category: "Beverages", image: "hero-bucket.jpg", desc: "Cool watermelon-flavoured mojito." },
  { id: "bev4", name: "Green Apple Mojito", price: 120, category: "Beverages", image: "hero-bucket.jpg", desc: "Tangy green apple mojito." },
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
