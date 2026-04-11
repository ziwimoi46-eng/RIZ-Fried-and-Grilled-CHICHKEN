import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import ContactOrder from "@/components/ContactOrder";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Menu />
          <Gallery />
          <ContactOrder />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
