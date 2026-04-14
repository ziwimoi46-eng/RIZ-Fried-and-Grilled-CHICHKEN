import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";

const orderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Must be exactly 10 digits"),
  details: z.string().min(5, "Please enter your order details"),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export default function ContactOrder() {
  const { items, totalPrice, clearCart } = useCart();
  
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, setValue, reset } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema)
  });

  // Sync cart with order details textarea
  useEffect(() => {
    if (items.length > 0) {
      const orderList = items.map(item => `${item.quantity}x ${item.name}`).join('\n');
      const totalStr = `\n\nTotal: ₹${totalPrice}`;
      setValue("details", `I would like to order:\n${orderList}${totalStr}`);
    } else {
      setValue("details", "");
    }
  }, [items, totalPrice, setValue]);

  const onSubmit = (data: OrderFormValues) => {
    const message = `Hi Riz Chicken! I want to order:%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AOrder details:%0A${encodeURIComponent(data.details)}`;
    const waUrl = `https://wa.me/918552997625?text=${message}`;
    
    // Open WhatsApp
    window.open(waUrl, "_blank");
    
    // Clear form and cart after short delay
    setTimeout(() => {
      reset();
      clearCart();
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="order" className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Details & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold tracking-wider uppercase mb-2">Visit Us</h2>
            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-8">
              Craving Chicken? <br/>We're Here.
            </h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-border mt-1">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Location</h4>
                  <p className="text-muted-foreground">Riz Fried and Grilled Chicken<br/>F10, Hudco Rd, 12, Chhatrapati Sambhaji Nagar Rd,<br/>Navjivan Colony, Chhatrapati Sambhajinagar,<br/>Maharashtra 431001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-border mt-1">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Call Us</h4>
                  <p className="text-muted-foreground">+91 8552997625</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-border mt-1">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email</h4>
                  <p className="text-muted-foreground">rizwanrhan124@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-10">
              <Button onClick={() => window.location.href = "tel:8552997625"} className="rounded-xl flex-1 bg-secondary text-white hover:bg-secondary/90">
                <Phone className="w-4 h-4 mr-2" /> Call Now
              </Button>
              <Button onClick={() => window.open("https://wa.me/918552997625", "_blank")} className="rounded-xl flex-1 bg-[#25D366] text-white hover:bg-[#25D366]/90 border-none shadow-lg shadow-[#25D366]/30">
                <Send className="w-4 h-4 mr-2" /> WhatsApp Now
              </Button>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50 h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120944.9839!2d75.2375!3d19.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb98cccc1e8dbf%3A0x4a64afdb2e3d4f5a!2sAurangabad%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </motion.div>

          {/* Order Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 sm:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border/50 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            
            <h3 className="text-3xl font-black text-foreground mb-2">Place an Order</h3>
            <p className="text-muted-foreground mb-8">
              Fill out the details below. You will be redirected to WhatsApp to complete your order.
            </p>

            {isSubmitSuccessful ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#25D366]/10 border border-[#25D366]/30 p-8 rounded-2xl text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-[#25D366] mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-foreground mb-2">Redirecting...</h4>
                <p className="text-muted-foreground">Please complete your order on WhatsApp.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
                  <Input 
                    {...register("name")}
                    placeholder="John Doe"
                    className={`h-14 rounded-xl bg-background text-base ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1 font-medium">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                  <Input 
                    {...register("phone")}
                    placeholder="10-digit mobile number"
                    type="tel"
                    maxLength={10}
                    className={`h-14 rounded-xl bg-background text-base ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1 font-medium">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Order Details</label>
                  <Textarea 
                    {...register("details")}
                    placeholder="E.g., 2x Chicken Zip Zap Burger, 1x Salted Fries..."
                    className={`min-h-[150px] rounded-xl bg-background text-base resize-none ${errors.details ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  {errors.details && <p className="text-destructive text-xs mt-1 font-medium">{errors.details.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform"
                >
                  Send Order via WhatsApp
                </Button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
