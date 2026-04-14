import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="flex items-center mb-6">
              <div className="bg-white rounded-xl overflow-hidden h-14 w-14 flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}riz-logo.jpg`} alt="Riz Chicken Logo" className="h-full w-full object-contain" />
              </div>
            </a>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Premium quality fried and grilled chicken in Aurangabad. Crispy on the outside, juicy on the inside, and 100% Halal certified.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#menu" className="text-gray-400 hover:text-primary transition-colors">Menu</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li>F10, Hudco Rd, 12, Chhatrapati Sambhaji Nagar Rd, Navjivan Colony, Chhatrapati Sambhajinagar, Maharashtra 431001</li>
              <li>+91 8552997625</li>
              <li>rizwanrhan124@gmail.com</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Riz Fried and Grilled Chicken. All rights reserved.</p>
          <p>Designed with passion.</p>
        </div>
      </div>
    </footer>
  );
}
