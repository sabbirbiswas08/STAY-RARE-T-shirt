
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Truck, 
  ShieldCheck, 
  Clock,
  Smartphone,
  Leaf,
  Moon,
  Package,
  ArrowRight,
  Menu,
  X,
  Star,
  ShoppingBag,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { STORE_CONFIG } from './constants';
import { supabase } from './supabase';

const IconMap: Record<string, any> = {
  Smartphone,
  Leaf,
  Moon,
  ShieldCheck,
  Clock
};

// --- Components ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-3xl font-black tracking-tighter text-indigo-600 font-display">{STORE_CONFIG.STORE_NAME}</span>
          </div>
          <nav className="hidden md:flex space-x-12">
            <button onClick={() => scrollToSection('how-it-works')} className="text-xs font-black text-gray-900 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] font-display">Pro[...]
            <button onClick={() => scrollToSection('benefits')} className="text-xs font-black text-gray-900 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] font-display">Feature[...]
            <button onClick={() => scrollToSection('faq')} className="text-xs font-black text-gray-900 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] font-display">FAQ</button>
          </nav>
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => scrollToSection('order-form')}
              className="px-8 py-3 bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all transform hov[...]
            >
              Order Now
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-2xl absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-lg font-bold text-gray-800">How it Works</button>
              <button onClick={() => scrollToSection('benefits')} className="block w-full text-left text-lg font-bold text-gray-800">Features</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-lg font-bold text-gray-800">FAQ</button>
              <button 
                onClick={() => scrollToSection('order-form')}
                className="block w-full text-center px-4 py-4 border border-transparent text-lg font-bold rounded-2xl shadow-xl text-white bg-indigo-600"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ selectedVariant, setSelectedVariantName }: { selectedVariant: any, setSelectedVariantName: (name: string) => void }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white mb-8 uppercase tracking-[0.2em] font-display">
                New Collection 2026
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8 font-display">
                {STORE_CONFIG.PRODUCT_NAME.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? 'block' : 'text-indigo-600 block'}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg mb-12 font-medium">
                {STORE_CONFIG.PRODUCT_DESCRIPTION}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                {STORE_CONFIG.VARIANTS.map((variant) => (
                  <motion.button
                    key={variant.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVariantName(variant.name)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all border-2 font-display ${
                      selectedVariant.name === variant.name 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-200' 
                        : 'bg-white text-gray-700 border-gray-100 hover:border-indigo-200'
                    }`}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full border border-white/20`}
                      style={{ 
                        backgroundColor: variant.name.toLowerCase() === 'white' ? '#f9fafb' : variant.name.toLowerCase(),
                        border: variant.name.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                      }}
                    />
                    {variant.name}
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center px-10 py-5 bg-gray-900 text-white text-lg font-black rounded-2xl hover:bg-black transition-all transform hover:-translate-y-[...]
                  >
                    Order Now — {selectedVariant.price} {STORE_CONFIG.CURRENCY}
                  </button>
                  <p className="text-sm font-black text-indigo-600 uppercase tracking-widest animate-pulse">
                    🔥 Order 3 shirts and get FREE DELIVERY!
                  </p>
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-gray-100 h-fit">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-500 font-display">500+ Happy Customers</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 mt-16 lg:mt-0">
            <motion.div 
              key={selectedVariant.name}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative"
            >
              {/* Solid Background Card */}
              <div className="aspect-[4/5] bg-white rounded-[60px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] overflow-hidden border-[16px] border-white relative group">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={selectedVariant.image}
                  alt={selectedVariant.name}
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/20">
                  <span className="text-2xl font-black text-indigo-600 font-display">{selectedVariant.price} {STORE_CONFIG.CURRENCY}</span>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-12 left-12">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2 font-display">Selected Color</p>
                  <h3 className="text-4xl font-black text-gray-900 font-display">{selectedVariant.name}</h3>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/5 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-200 flex justify-center p-1">
          <div className="w-1 h-2 bg-indigo-600 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const Benefits = () => {
  return (
    <section id="benefits" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight font-display">Why Choose Our Polo?</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto mt-6 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STORE_CONFIG.BENEFITS.map((benefit, index) => {
            const Icon = IconMap[benefit.icon] || Smartphone;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-50 p-10 rounded-[40px] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-5[...]
              >
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all dura[...]
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 font-display">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Fill the Form",
      description: "Provide your delivery details in the form below. No payment needed now.",
      icon: Package,
      color: "bg-blue-500"
    },
    {
      title: "Fast Shipping",
      description: "We ship your Polo within 24 hours with a tracking number.",
      icon: Truck,
      color: "bg-indigo-500"
    },
    {
      title: "Pay on Receipt",
      description: "Check your product and pay the courier only when you are satisfied.",
      icon: ShieldCheck,
      color: "bg-emerald-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-indigo-950 text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black tracking-tight font-display">3 Simple Steps to Order</h2>
          <p className="mt-6 text-indigo-200 text-xl max-w-2xl mx-auto font-medium opacity-80">The easiest and safest way to shop online in Bangladesh.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[65%] w-full h-0.5 border-t-2 border-dashed border-indigo-800" />
              )}
              <div className={`w-24 h-24 ${step.color} rounded-[32px] flex items-center justify-center shadow-2xl mb-10 transform rotate-3 hover:rotate-0 transition-transform duration-500`}>
                <step.icon size={40} />
              </div>
              <h3 className="text-2xl font-black mb-4 font-display">{step.title}</h3>
              <p className="text-indigo-100 text-lg leading-relaxed font-medium opacity-70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderForm = ({ 
  selectedVariant, 
  quantity, 
  setQuantity, 
  setSelectedVariantName 
}: { 
  selectedVariant: any; 
  quantity: number; 
  setQuantity: (q: number) => void; 
  setSelectedVariantName: (name: string) => void;
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    country: STORE_CONFIG.DEFAULT_COUNTRY,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastCustomerName, setLastCustomerName] = useState('');

  const deliveryCharge = quantity >= STORE_CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : STORE_CONFIG.DELIVERY_CHARGE;
  const totalPrice = (quantity * selectedVariant.price) + deliveryCharge;

  const isStep1Valid = true; // Selection is always valid
  const isStep2Valid = 
    formData.customer_name.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.city.trim() !== '' &&
    formData.address.trim() !== '' &&
    (formData.email.trim() === '' || /\S+@\S+\.\S+/.test(formData.email));

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customer_name) newErrors.customer_name = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);

    try {
      const orderData = {
        customer_name: formData.customer_name,
        email: formData.email || null,
        address: formData.address,
        size: selectedVariant.name,
        quantity: quantity,
        notes: formData.notes || ''
      };

      // POST to Cloudflare Workers API
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error('Order submission failed');
      }
      
      setLastCustomerName(formData.customer_name);
      setSubmitStatus('success');
      setFormData({
        customer_name: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        country: STORE_CONFIG.DEFAULT_COUNTRY,
        notes: ''
      });
      setQuantity(1);
      setStep(1);
    } catch (error: any) {
      console.error('Error submitting order:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight font-display">Complete Your Order</h2>
          <p className="mt-4 text-gray-600 font-medium">Follow the steps below to secure your premium Polo.</p>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-12 space-x-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {s}
                </div>
                {s === 1 && <div className={`w-20 h-1 mx-2 rounded-full transition-all ${step > 1 ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-gray-100 border-8 border-gray-50 shadow-inner">
                      <img 
                        src={selectedVariant.image} 
                        alt={selectedVariant.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 font-display mb-2">{STORE_CONFIG.PRODUCT_NAME}</h3>
                        <p className="text-indigo-600 text-2xl font-black">{selectedVariant.price} {STORE_CONFIG.CURRENCY}</p>
                      </div>

                      <div>
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">Select Color</label>
                        <div className="grid grid-cols-1 gap-3">
                            {STORE_CONFIG.VARIANTS.map((variant) => (
                              <button
                                key={variant.name}
                                onClick={() => setSelectedVariantName(variant.name)}
                                className={`px-6 py-4 rounded-2xl font-bold text-sm transition-all border-2 text-left flex items-center justify-between ${
                                  selectedVariant.name === variant.name 
                                    ? 'bg-indigo-50 border-indigo-600 text-indigo-600' 
                                    : 'bg-white border-gray-100 text-gray-500 hover:border-indigo-200'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-4 h-4 rounded-full border border-black/5"
                                    style={{ 
                                      backgroundColor: variant.name.toLowerCase() === 'white' ? '#f9fafb' : variant.name.toLowerCase(),
                                      border: variant.name.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                                    }}
                                  />
                                  <span>{variant.name}</span>
                                </div>
                                {selectedVariant.name === variant.name && <CheckCircle2 size={18} />}
                              </button>
                            ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">Quantity</label>
                        <div className="flex items-center space-x-6">
                          <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all text-xl font-black"
                          >
                            -
                          </button>
                          <span className="text-2xl font-black w-8 text-center">{quantity}</span>
                          <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all text-xl font-black"
                          >
                            +
                          </button>
                        </div>
                        <p className="mt-4 text-xs font-black text-indigo-600 uppercase tracking-[0.1em] bg-indigo-50 px-4 py-2 rounded-xl inline-block">
                          {quantity < 3 
                            ? `🔥 Add ${3 - quantity} more for FREE DELIVERY!` 
                            : "🎉 You've unlocked FREE DELIVERY!"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="text-left space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Total Amount</p>
                        {deliveryCharge === 0 && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-full">Free Delivery</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-4xl font-black text-gray-900 font-display">{totalPrice} {STORE_CONFIG.CURRENCY}</p>
                        <p className="text-[10px] text-gray-400 font-bold">
                          {quantity} x {selectedVariant.price} + {deliveryCharge} Delivery
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-cent[...]
                    >
                      <span>Continue to Shipping</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center justify-between mb-8">
                    <button 
                      onClick={() => setStep(1)}
                      className="text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors flex items-center"
                    >
                      <ChevronDown className="rotate-90 mr-2" size={16} /> Back to Selection
                    </button>
                    <div className="text-right">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Order Total</p>
                      <p className="text-xl font-black text-indigo-600">{totalPrice} {STORE_CONFIG.CURRENCY}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                        <input 
                          type="text"
                          required
                          value={formData.customer_name}
                          onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                          className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.customer_name ? 'border-red-200 bg-red-50' : 'border-gray-50 bg-gray-50'} focus:bg-white focus:border-indigo-6[...]
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                        <input 
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.phone ? 'border-red-200 bg-red-50' : 'border-gray-50 bg-gray-50'} focus:bg-white focus:border-indigo-600 outli[...]
                          placeholder="01XXXXXXXXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address (Optional)</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.email ? 'border-red-200 bg-red-50' : 'border-gray-50 bg-gray-50'} focus:bg-white focus:border-indigo-600 outline[...]
                        placeholder="your@email.com (optional)"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">City</label>
                        <input 
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.city ? 'border-red-200 bg-red-50' : 'border-gray-50 bg-gray-50'} focus:bg-white focus:border-indigo-600 outlin[...]
                          placeholder="Dhaka"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Country</label>
                        <select 
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium appearance-none[...]
                        >
                          <option value="Bangladesh">Bangladesh</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Address</label>
                      <textarea 
                        rows={3}
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className={`w-full px-6 py-4 rounded-2xl border-2 ${errors.address ? 'border-red-200 bg-red-50' : 'border-gray-50 bg-gray-50'} focus:bg-white focus:border-indigo-600 outli[...]
                        placeholder="House, Road, Area..."
                      />
                    </div>

                    <AnimatePresence>
                      {submitStatus === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-6 bg-red-50 border-2 border-red-100 rounded-[24px] flex items-center space-x-4 text-red-700"
                        >
                          <AlertCircle size={24} className="flex-shrink-0" />
                          <div>
                            <p className="font-black font-display">Submission Failed</p>
                            <p className="text-sm opacity-80 font-medium">{errorMessage || 'Please try again or contact us.'}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-6 text-white text-xl font-black rounded-[24px] shadow-2xl transition-all flex items-center justify-center space-x-3 transform active:scale-95 font-disp[...]
                    >
                      {isSubmitting ? (
                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Confirm Order</span>
                          <CheckCircle2 size={24} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Popup */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 mb-4 font-display">Thank You, {lastCustomerName}!</h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
                      Your order has been placed successfully. We will deliver it to you <span className="text-indigo-600 font-black">ASAP</span>!
                    </p>
                    <button 
                      type="button"
                      onClick={() => setSubmitStatus('idle')}
                      className="w-full py-5 bg-gray-900 text-white text-xl font-black rounded-2xl hover:bg-gray-800 transition-all font-display"
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight font-display">Got Questions?</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto mt-6 rounded-full" />
        </div>
        <div className="space-y-6">
          {STORE_CONFIG.FAQ.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-[32px] overflow-hidden border border-transparent hover:border-indigo-100 transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-7 flex justify-between items-center text-left"
              >
                <span className="text-xl font-black text-gray-900 font-display">{item.question}</span>
                <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-indigo-600 text-white rotate-180' : 'bg-white text-gray-400'}`}>
                  <ChevronDown size={24} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-8 text-gray-600 text-lg leading-relaxed font-medium"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <div className="space-y-6">
            <span className="text-3xl font-black tracking-tighter text-indigo-500 font-display">{STORE_CONFIG.STORE_NAME}</span>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Premium quality Polo T-shirts delivered to your doorstep across Bangladesh. Style meets comfort.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all cursor-pointer"><Smartphone size={20} /></div>
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all cursor-pointer"><Mail size={20} /></div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-xl font-black font-display">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">How it Works</button></li>
              <li><button onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Features</button></li>
              <li><button onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Order Now</button></li>
              <li><button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">FAQ</button></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-black font-display">Contact Us</h4>
            <ul className="space-y-6 text-gray-400 font-medium">
              <li className="flex items-start"><MapPin size={20} className="mr-4 text-indigo-500 flex-shrink-0" /> Dhaka, Bangladesh</li>
              <li className="flex items-start"><Phone size={20} className="mr-4 text-indigo-500 flex-shrink-0" /> +880 1XXXXXXXXX</li>
              <li className="flex items-start"><Mail size={20} className="mr-4 text-indigo-500 flex-shrink-0" /> support@empirebd.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-bold">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.STORE_NAME}. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedVariantName, setSelectedVariantName] = useState(STORE_CONFIG.VARIANTS[0].name);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = STORE_CONFIG.VARIANTS.find(v => v.name === selectedVariantName) || STORE_CONFIG.VARIANTS[0];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-600 selection:text-white">
      <Header />
      <main>
        <Hero selectedVariant={selectedVariant} setSelectedVariantName={setSelectedVariantName} />
        <Benefits />
        <HowItWorks />
        <OrderForm 
          selectedVariant={selectedVariant} 
          quantity={quantity} 
          setQuantity={setQuantity}
          setSelectedVariantName={setSelectedVariantName}
        />
        <FAQ />
      </main>
      <Footer />

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-40">
        <button 
          onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-200 flex items-center justify-center space-x-3 font-display"
        >
          <span>Order Now</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
