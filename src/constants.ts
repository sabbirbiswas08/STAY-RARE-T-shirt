export const STORE_CONFIG = {
  STORE_NAME: "EmpireBD",
  PRODUCT_NAME: "STAY RARE T-shirt",
  PRODUCT_DESCRIPTION: "Make a statement with our 'STAY RARE' premium cotton T-shirt. Designed for those who value uniqueness and quality. Soft, breathable, and perfectly fitted for any occasion.",
  CURRENCY: "BDT",
  DEFAULT_COUNTRY: "Bangladesh",
  DELIVERY_CHARGE: 100,
  FREE_DELIVERY_THRESHOLD: 3,
  
  VARIANTS: [
    { 
      name: "Black", 
      price: 800, 
      image: "https://qitpqoxcpudsuttyylni.supabase.co/storage/v1/object/public/Images%20for%20Website(shop)/Stay%20rare%20black%20T-shirt%20flat%20lay.png" 
    },
    { 
      name: "White", 
      price: 780, 
      image: "https://qitpqoxcpudsuttyylni.supabase.co/storage/v1/object/public/Images%20for%20Website(shop)/Stay%20rare%20white%20T-shirt%20design%20flat%20lay.png" 
    },
    { 
      name: "Blue", 
      price: 900, 
      image: "https://qitpqoxcpudsuttyylni.supabase.co/storage/v1/object/public/Images%20for%20Website(shop)/Stay%20rare%20blue%20T-shirt%20flat%20lay.png" 
    }
  ],
  
  // Benefits Section
  BENEFITS: [
    {
      title: "100% Premium Cotton",
      description: "Breathable, soft, and durable fabric that keeps you comfortable all day long in any weather.",
      icon: "Leaf"
    },
    {
      title: "Perfect Fit",
      description: "Tailored to perfection to ensure you look sharp and feel confident wherever you go.",
      icon: "ShieldCheck"
    },
    {
      title: "Color Fastness",
      description: "High-quality dyes that won't fade after multiple washes, maintaining that new look.",
      icon: "Clock"
    }
  ],
  
  // FAQ Section
  FAQ: [
    {
      question: "How do I pay with Cash on Delivery?",
      answer: "Simply place your order by providing your address. You will pay the delivery man in cash once you receive the product."
    },
    {
      question: "What is the delivery charge?",
      answer: "Standard delivery charge is 100 BDT across Bangladesh. However, if you purchase 3 or more T-shirts, delivery is completely FREE!"
    },
    {
      question: "Can I check the product before paying?",
      answer: "Yes, you can check the product quality at the time of delivery before handing over the cash to the courier."
    }
  ],
  
  // Supabase Config
  SUPABASE_URL: "https://qitpqoxcpudsuttyylni.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_6JkRDR4OooV0bovfVBFZuQ_7jIB6NEA"
};
