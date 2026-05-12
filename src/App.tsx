import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Plus, Package, LogOut, ShoppingBag, X, Minus, Upload, Trash2 } from 'lucide-react';
import { Product, ProductStatus, CartItem } from './types';
import { INITIAL_PRODUCTS, HERO_CAROUSEL } from './constants';

// --- Components ---

const Navbar = ({ onLoginClick, isAdmin, onLogout, cartCount, onCartClick }: { onLoginClick: () => void, isAdmin: boolean, onLogout: () => void, cartCount: number, onCartClick: () => void }) => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-dark/10 px-6 py-4 flex justify-between items-center">
    <div className="text-2xl font-serif tracking-[0.2em] font-light">ARTEMES</div>
    <div className="flex items-center gap-6">
      <button className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors hidden md:block">Collection</button>
      <button 
        onClick={onCartClick}
        className="relative group p-2"
      >
        <ShoppingBag className="w-5 h-5 group-hover:text-brand-gold transition-colors" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </button>
      {isAdmin ? (
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-tighter bg-brand-dark text-white px-2 py-0.5 rounded">Admin Mode</span>
          <button onClick={onLogout} title="Logout">
            <LogOut className="w-5 h-5 hover:text-brand-gold cursor-pointer" />
          </button>
        </div>
      ) : (
        <button onClick={onLoginClick} title="Admin Login">
          <LogIn className="w-5 h-5 hover:text-brand-gold cursor-pointer" />
        </button>
      )}
    </div>
  </nav>
);

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_CAROUSEL.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={HERO_CAROUSEL[current]} 
            alt={`Hero ${current}`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/30" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl md:text-8xl mb-4 font-light tracking-tight"
        >
          Timeless Elegance
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl uppercase tracking-[0.3em] font-light italic"
        >
          Artemes Spring Collection 2026
        </motion.p>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
        {HERO_CAROUSEL.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-1000 ${current === i ? 'w-12 bg-white' : 'w-4 bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, onView }: { product: Product, onView: (p: Product) => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative cursor-pointer"
    onClick={() => onView(product)}
  >
    <div className="aspect-[3/4] overflow-hidden bg-brand-cream relative">
      <img 
        src={product.images[0]} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      {product.status === ProductStatus.OUT_OF_STOCK && (
        <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] flex items-center justify-center">
          <span className="border-2 border-white text-white px-4 py-2 uppercase tracking-[0.2em] font-medium text-sm">
            Out of Stock
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full py-4 bg-brand-dark text-white opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 uppercase text-xs tracking-widest font-medium text-center">
        View Details
      </div>
    </div>
    <div className="mt-4 flex justify-between items-start">
      <div>
        <h3 className="text-lg font-medium tracking-tight">{product.name}</h3>
        <p className="text-xs text-brand-dark/50 uppercase tracking-widest mt-1 italic">{product.category}</p>
      </div>
      <span className="text-lg font-light">${product.price}</span>
    </div>
  </motion.div>
);

const ProductModal = ({ 
  product, 
  onClose, 
  onAddToCart 
}: { 
  product: Product, 
  onClose: () => void, 
  onAddToCart: (p: Product, size: string, color: string) => void 
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-brand-cream w-full max-w-5xl h-[90vh] md:h-auto overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 hover:bg-white transition-colors rounded-full text-brand-dark">
          <X className="w-6 h-6" />
        </button>
        
        <div className="w-full md:w-1/2 h-1/2 md:h-auto">
          <img 
            src={product.images[0]} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            {product.category}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">{product.name}</h2>
          <p className="text-2xl font-light mb-10">${product.price}</p>
          
          <div className="space-y-10">
            <div>
              <p className="text-sm font-light leading-relaxed text-brand-dark/70 mb-8 italic">
                {product.description}
              </p>
            </div>

            {product.status === ProductStatus.IN_STOCK ? (
              <>
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/50">Size</p>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 text-xs border transition-all ${selectedSize === size ? 'bg-brand-dark text-white border-brand-dark' : 'border-brand-dark/10 hover:border-brand-gold'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/50">Color</p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-2 text-xs border transition-all ${selectedColor === color ? 'bg-brand-dark text-white border-brand-dark' : 'border-brand-dark/10 hover:border-brand-gold'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                  className="w-full bg-brand-dark text-white py-5 uppercase tracking-[0.2em] font-bold hover:bg-brand-gold transition-all"
                >
                  Add to Bag
                </button>
              </>
            ) : (
              <div className="bg-red-50 text-red-800 p-6 text-center border border-red-100 italic">
                Currently Out of Stock
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AdminPanel = ({ 
  products, 
  onAddProduct, 
  onToggleStatus 
}: { 
  products: Product[], 
  onAddProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void,
  onToggleStatus: (id: string) => void
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    category: 'Men',
    imageUrl: '',
    sizes: '',
    colors: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      ...formData,
      images: [formData.imageUrl || 'https://picsum.photos/seed/new/800/1000'],
      status: ProductStatus.IN_STOCK,
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
      colors: formData.colors.split(',').map(c => c.trim()).filter(c => c)
    });
    setFormData({ name: '', price: 0, description: '', category: 'Men', imageUrl: '', sizes: '', colors: '' });
    setShowAdd(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 bg-white shadow-2xl rounded-sm mt-20">
      <div className="flex justify-between items-center mb-10 border-b border-zinc-100 pb-6">
        <h2 className="text-3xl tracking-tight">Product Management</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 bg-brand-dark text-white px-6 py-2 hover:bg-brand-gold transition-colors"
        >
          {showAdd ? 'View Products' : <><Plus className="w-4 h-4" /> Add Product</>}
        </button>
      </div>

      {showAdd ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-brand-dark/60">Product Name</label>
              <input 
                required
                className="w-full border-b border-brand-dark/20 p-2 focus:border-brand-gold outline-none transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-brand-dark/60">Price ($)</label>
              <input 
                required type="number"
                className="w-full border-b border-brand-dark/20 p-2 focus:border-brand-gold outline-none transition-colors"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-brand-dark/60">Description</label>
            <textarea 
              required
              className="w-full border-b border-brand-dark/20 p-2 focus:border-brand-gold outline-none transition-colors min-h-[100px]"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-brand-dark/60">Category</label>
              <select 
                className="w-full border-b border-brand-dark/20 p-2 focus:border-brand-gold outline-none transition-colors bg-white"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Men</option>
                <option>Women</option>
                <option>Accessories</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-brand-dark/60">Upload Photo</label>
              <div className="flex gap-4 items-center">
                <label className="flex-1 cursor-pointer flex items-center justify-center border-2 border-dashed border-brand-dark/10 p-4 hover:border-brand-gold transition-all group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <div className="text-center group-hover:text-brand-gold">
                    <Upload className="w-6 h-6 mx-auto mb-2 opacity-50 group-hover:opacity-100" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Select File</span>
                  </div>
                </label>
                {formData.imageUrl && (
                  <img src={formData.imageUrl} className="w-20 h-20 object-cover border border-brand-gold p-1" />
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-brand-dark/60">Available Sizes (comma separated)</label>
              <input 
                placeholder="S, M, L, XL"
                className="w-full border-b border-brand-dark/20 p-2 focus:border-brand-gold outline-none transition-colors"
                value={formData.sizes}
                onChange={e => setFormData({...formData, sizes: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-brand-dark/60">Available Colors (comma separated)</label>
              <input 
                placeholder="Black, White, Blue"
                className="w-full border-b border-brand-dark/20 p-2 focus:border-brand-gold outline-none transition-colors"
                value={formData.colors}
                onChange={e => setFormData({...formData, colors: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-brand-dark text-white py-4 uppercase tracking-[0.2em] font-medium hover:bg-brand-gold transition-colors">
            Publish Product
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {products.map(p => (
            <div key={p.id} className="flex items-center justify-between p-4 border border-zinc-100 hover:border-brand-gold transition-all group">
              <div className="flex items-center gap-4">
                <img src={p.images[0]} className="w-12 h-16 object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-medium">{p.name}</h4>
                  <p className="text-xs text-brand-dark/40 uppercase tracking-widest">{p.category} | ${p.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] uppercase font-bold tracking-tighter px-2 py-0.5 ${p.status === ProductStatus.IN_STOCK ? 'text-green-600' : 'text-red-600'}`}>
                  {p.status.replace('_', ' ')}
                </span>
                <button 
                  onClick={() => onToggleStatus(p.id)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-brand-dark/60"
                  title="Toggle Out of Stock"
                >
                  <Package className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CartDrawer = ({ 
  cart, 
  onClose, 
  updateQuantity, 
  removeItem,
  onCheckout
}: { 
  cart: CartItem[], 
  onClose: () => void,
  updateQuantity: (id: string, delta: number) => void,
  removeItem: (id: string) => void,
  onCheckout: () => void
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/30 backdrop-blur-[2px]"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-brand-cream h-full flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-brand-dark/10 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-serif">Shopping Bag ({cart.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-brand-cream transition-colors rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-brand-dark/40 italic">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
              <p>Your bag is empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 pb-6 border-b border-brand-dark/5">
                <img src={item.images[0]} className="w-20 h-24 object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-dark/50 mt-1">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-brand-dark/10 p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:text-brand-gold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:text-brand-gold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-light">${item.price * item.quantity}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-white border-t border-brand-dark/10 space-y-6">
            <div className="flex justify-between items-center text-xl">
              <span className="font-serif">Subtotal</span>
              <span className="font-light">${total}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-brand-dark text-white py-5 uppercase tracking-[0.2em] font-bold hover:bg-brand-gold transition-colors"
            >
              Checkout Now
            </button>
            <p className="text-[10px] text-center uppercase tracking-widest opacity-40">
              Complimentary shipping on all orders
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const CheckoutModal = ({ 
  onClose, 
  onComplete 
}: { 
  onClose: () => void, 
  onComplete: (details: { name: string, phone: string, address: string }) => void 
}) => {
  const [details, setDetails] = useState({ name: '', phone: '', address: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(details);
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-brand-cream p-10 max-w-md w-full relative z-10 shadow-2xl"
      >
        <h2 className="text-3xl mb-8 font-serif tracking-tight">Shipping Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 block">Full Name</label>
            <input 
              required
              className="w-full border-b border-brand-dark/20 bg-transparent py-2 outline-none focus:border-brand-gold transition-colors"
              value={details.name}
              onChange={e => setDetails({...details, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 block">Phone Number</label>
            <input 
              required type="tel"
              className="w-full border-b border-brand-dark/20 bg-transparent py-2 outline-none focus:border-brand-gold transition-colors"
              value={details.phone}
              onChange={e => setDetails({...details, phone: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 block">Shipping Address</label>
            <textarea 
              required
              className="w-full border-b border-brand-dark/20 bg-transparent py-2 outline-none focus:border-brand-gold transition-colors min-h-[80px]"
              value={details.address}
              onChange={e => setDetails({...details, address: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-brand-dark text-white py-5 uppercase text-xs tracking-widest font-bold hover:bg-brand-gold transition-colors">
            Confirm Order
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('artemes_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('artemes_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  useEffect(() => {
    localStorage.setItem('artemes_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('artemes_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'ArtemesAdmin' && loginForm.password === 'Artemes2026') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials. Hint: ArtemesAdmin / Artemes2026');
    }
  };

  const addProduct = (p: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...p,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setProducts([newProduct, ...products]);
  };

  const toggleStatus = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, status: p.status === ProductStatus.IN_STOCK ? ProductStatus.OUT_OF_STOCK : ProductStatus.IN_STOCK } : p
    ));
  };

  const addToCart = (product: Product, size: string, color: string) => {
    const cartId = `${product.id}-${size}-${color}`;
    const existing = cart.find(item => `${item.id}-${item.selectedSize}-${item.selectedColor}` === cartId);
    
    if (existing) {
      setCart(cart.map(item => 
        `${item.id}-${item.selectedSize}-${item.selectedColor}` === cartId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]);
    }
    setSelectedProduct(null);
    setShowCart(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    // Note: id in this context should be the cart composite key if we had one, but let's just 
    // find by product id for now or pass the item object. For simplicity, keeping product id.
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const completeCheckout = (details: { name: string, phone: string, address: string }) => {
    console.log('Order received:', { details, items: cart });
    alert(`Thank you ${details.name}! Your order has been placed successfully.`);
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        onLoginClick={() => setShowLogin(true)} 
        isAdmin={isAdmin}
        onLogout={() => setIsAdmin(false)}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      <AnimatePresence>
        {showCart && (
          <CartDrawer 
            cart={cart} 
            onClose={() => setShowCart(false)} 
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
          />
        )}
        {showCheckout && (
          <CheckoutModal 
            onClose={() => setShowCheckout(false)} 
            onComplete={completeCheckout} 
          />
        )}
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={addToCart} 
          />
        )}
      </AnimatePresence>

      {isAdmin ? (
        <AdminPanel 
          products={products} 
          onAddProduct={addProduct}
          onToggleStatus={toggleStatus}
        />
      ) : (
        <main>
          <HeroCarousel />
          
          <section className="px-6 py-32 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <span className="text-brand-gold uppercase tracking-[0.3em] font-medium text-xs mb-2 block">Curation</span>
                <h2 className="text-5xl md:text-6xl font-light tracking-tight">The Essentials</h2>
              </div>
              <p className="max-w-md text-brand-dark/60 font-light italic text-right leading-relaxed">
                Handpicked masterpieces designed to transcend seasonal trends and embody the spirit of modern luxury.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {products.map(product => (
                <div key={product.id}>
                  <ProductCard product={product} onView={setSelectedProduct} />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-brand-dark text-white py-32 px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <ShoppingBag className="w-12 h-12 mx-auto mb-8 text-brand-gold" />
              <h2 className="text-4xl md:text-5xl mb-6 font-light">Join the Movement</h2>
              <p className="text-brand-cream/60 font-light leading-relaxed mb-10">
                Subscribe to receive exclusive access to collection launches, private sales, and the Artemes Journal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  placeholder="Your Email" 
                  className="flex-1 bg-transparent border-b border-brand-cream/30 py-3 px-2 outline-none focus:border-brand-gold transition-colors text-sm"
                />
                <button className="bg-brand-cream text-brand-dark px-10 py-3 uppercase text-xs tracking-widest font-bold hover:bg-brand-gold hover:text-white transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
          
          <footer className="px-6 py-12 border-t border-brand-dark/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">
            <p>&copy; 2026 Artemes International</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Instagram</a>
            </div>
          </footer>
        </main>
      )}

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white p-10 max-w-sm w-full relative z-10 shadow-2xl"
            >
              <h2 className="text-3xl mb-8 tracking-tight text-center">Brand Manager Login</h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 block">Username</label>
                  <input 
                    required
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-brand-gold transition-colors"
                    value={loginForm.username}
                    onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 block">Password</label>
                  <input 
                    required type="password"
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-brand-gold transition-colors"
                    value={loginForm.password}
                    onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-brand-dark text-white py-4 uppercase text-xs tracking-widest font-bold hover:bg-brand-gold transition-colors">
                  Authenticate
                </button>
              </form>
              <p className="text-[10px] text-center mt-6 text-brand-dark/40 uppercase tracking-widest italic">
                Authorized Personnel Only
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
