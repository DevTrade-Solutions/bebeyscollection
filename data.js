// Product Data - EXPANDED FOR SHOP PAGE
const products = [
    // Original products (1-8) with corrected images
    {
        id: 1,
        name: "Kids Akara Dress",
        category: "Kids Wear",
        price: 350.00,
        originalPrice: 450.00,
        image: "img/shop/kids/kids-akara-1.JPG",
        description: "Elegant kids dress featuring traditional Adinkra symbols with a modern silhouette.",
        badge: "IN-STORE EXCLUSIVE",
        availability: "in-store",
        tags: ["new", "exclusive", "featured"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue/Black", "Red/Gold", "Green/Brown"]
    },
    {
        id: 2,
        name: "Rainbow Dashiki Top",
        category: "Tops",
        price: 1650.00,
        originalPrice: 1950.00,
        image: "img/shop/men/tops/rainbow.JPG",
        description: "Vibrant dashiki with colorful rainbow pattern, perfect for celebrations.",
        badge: "NEW ARRIVAL",
        availability: "online",
        tags: ["new", "bestseller", "featured"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Multicolor"]
    },
    {
        id: 3,
        name: "Ankara Palazzo Pants",
        category: "Bottoms",
        price: 1200.00,
        originalPrice: null,
        image: "img/shop/akara-pant-bnw.png",
        description: "Wide-leg pants in vibrant Ankara print with comfortable elastic waist.",
        badge: null,
        availability: "both",
        tags: ["popular"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black/White"]
    },
    {
        id: 4,
        name: "Handwoven Scarf",
        category: "Accessories",
        price: 890.00,
        originalPrice: 1100.00,
        image: "img/shop/a1.JPG",
        description: "Soft handwoven scarf with traditional patterns.",
        badge: "SALE",
        availability: "online",
        tags: ["sale", "accessory"],
        sizes: ["One Size"],
        colors: ["Multicolor"]
    },
    {
        id: 5,
        name: "Kids Ankara Top",
        category: "Kids Wear",
        price: 250.00,
        originalPrice: null,
        image: "img/shop/kid-top-b.JPG",
        description: "Colorful Ankara top for kids with comfortable fit.",
        badge: "IN-STORE EXCLUSIVE",
        availability: "in-store",
        tags: ["exclusive", "premium"],
        sizes: ["S", "M", "L"],
        colors: ["Blue/White", "Red/Black"]
    },
    {
        id: 6,
        name: "Bubu Dress",
        category: "Dresses",
        price: 650.00,
        originalPrice: 850.00,
        image: "img/shop/bubu-g.png",
        description: "Flowy Bubu dress with intricate patterns and comfortable fit.",
        badge: "NEW",
        availability: "both",
        tags: ["new", "dress"],
        sizes: ["One Size"],
        colors: ["Multicolor", "Gold/Red", "Blue/Green"]
    },
    {
        id: 7,
        name: "Heritage Collection Gown",
        category: "Evening Wear",
        price: 8500.00,
        originalPrice: null,
        image: "img/shop/dress-01.png",
        description: "Exclusive hand-embroidered gown with authentic African beads.",
        badge: "STORE EXCLUSIVE",
        availability: "in-store",
        tags: ["exclusive", "premium", "luxury"],
        sizes: ["Custom"],
        colors: ["Custom"]
    },
    {
        id: 8,
        name: "Modern Ankara Set",
        category: "Sets",
        price: 3500.00,
        originalPrice: 4200.00,
        image: "img/shop/video/2P-set.png",
        description: "Complete Ankara set with top and skirt, perfect for special occasions.",
        badge: "BESTSELLER",
        availability: "online",
        tags: ["bestseller", "set"],
        sizes: ["S", "M", "L"],
        colors: ["Red/Black", "Blue/Gold", "Green/White"]
    },
    
    // Additional products (9-22) with local images
    {
        id: 9,
        name: "Royal Kaftan",
        category: "Dresses",
        price: 1950.00,
        originalPrice: 2400.00,
        image: "img/shop/dress-02.png",
        description: "Elegant kaftan with intricate embroidery and flowing silhouette.",
        badge: "SALE",
        availability: "online",
        tags: ["sale", "popular"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Navy/Gold", "Emerald/Silver", "Burgundy"]
    },
    {
        id: 10,
        name: "Colorful Print Shirt",
        category: "Tops",
        price: 950.00,
        originalPrice: null,
        image: "img/shop/men/tops/rainbow1.JPG",
        description: "Modern shirt with vibrant African print and comfortable fit.",
        badge: "NEW ARRIVAL",
        availability: "both",
        tags: ["new", "trending"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Multicolor"]
    },
    {
        id: 11,
        name: "Ankara Print Trousers",
        category: "Bottoms",
        price: 1350.00,
        originalPrice: 1600.00,
        image: "img/shop/akara-pant-bnw1.png",
        description: "Stylish Ankara trousers with slim fit and elastic waist.",
        badge: null,
        availability: "online",
        tags: ["popular"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black/White"]
    },
    {
        id: 12,
        name: "Beaded Leather Belt",
        category: "Accessories",
        price: 750.00,
        originalPrice: 950.00,
        image: "img/shop/a2.JPG",
        description: "Handcrafted leather belt with traditional beadwork.",
        badge: "SALE",
        availability: "both",
        tags: ["sale", "accessory"],
        sizes: ["S", "M", "L"],
        colors: ["Brown", "Black", "Natural"]
    },
    {
        id: 13,
        name: "Blue African Print Top",
        category: "Tops",
        price: 2450.00,
        originalPrice: null,
        image: "img/shop/men/tops/d-blue-top.JPG",
        description: "Tailored top in deep blue African print with intricate patterns.",
        badge: "NEW ARRIVAL",
        availability: "in-store",
        tags: ["new", "exclusive"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue/White"]
    },
    {
        id: 14,
        name: "Bold Necklace Set",
        category: "Jewelry",
        price: 1200.00,
        originalPrice: 1500.00,
        image: "img/shop/a3.JPG",
        description: "Statement necklace with matching earrings in vibrant colors.",
        badge: "BESTSELLER",
        availability: "online",
        tags: ["bestseller", "accessory"],
        sizes: ["One Size"],
        colors: ["Gold/Red", "Silver/Blue", "Mixed Metals"]
    },
    {
        id: 15,
        name: "Evening Wrap Dress",
        category: "Evening Wear",
        price: 4200.00,
        originalPrice: 5000.00,
        image: "img/shop/wrap-dress-blue-01.png",
        description: "Silk wrap dress with traditional embroidery for elegant evenings.",
        badge: "SALE",
        availability: "both",
        tags: ["sale", "featured"],
        sizes: ["S", "M", "L"],
        colors: ["Emerald", "Royal Blue", "Deep Red"]
    },
    {
        id: 16,
        name: "Two-Piece Lounge Set",
        category: "Sets",
        price: 1850.00,
        originalPrice: null,
        image: "img/shop/video/2P-set1.png",
        description: "Comfortable lounge set in soft Ankara cotton.",
        badge: "NEW ARRIVAL",
        availability: "online",
        tags: ["new", "casual"],
        sizes: ["S", "M", "L"],
        colors: ["Pink/White", "Blue/Grey", "Green/Beige"]
    },
    {
        id: 17,
        name: "Bubu Kimono Dress",
        category: "Dresses",
        price: 1750.00,
        originalPrice: 2100.00,
        image: "img/shop/bubu-g2.png",
        description: "Lightweight bubu dress with bold African prints and tassel details.",
        badge: null,
        availability: "both",
        tags: ["popular", "featured"],
        sizes: ["One Size"],
        colors: ["Red/Black", "Blue/Gold", "Purple/Orange"]
    },
    {
        id: 18,
        name: "Embroidered Blouse",
        category: "Tops",
        price: 1250.00,
        originalPrice: null,
        image: "img/shop/men/tops/white-red-longsleeve.JPG",
        description: "Delicate blouse with hand-embroidered traditional motifs.",
        badge: "BESTSELLER",
        availability: "online",
        tags: ["bestseller", "featured"],
        sizes: ["XS", "S", "M"],
        colors: ["White/Red"]
    },
    {
        id: 19,
        name: "Kids Ankara Shorts",
        category: "Kids Wear",
        price: 450.00,
        originalPrice: 650.00,
        image: "img/shop/kids/b-kid-short.JPG",
        description: "Comfortable Ankara shorts for kids with elastic waist.",
        badge: "SALE",
        availability: "both",
        tags: ["sale", "kids"],
        sizes: ["S", "M", "L"],
        colors: ["Multicolor"]
    },
    {
        id: 21,
        name: "Rainbow Print Shirt",
        category: "Tops",
        price: 950.00,
        originalPrice: 1200.00,
        image: "img/shop/men/tops/rainbow2.JPG",
        description: "Bright and colorful shirt with traditional African print.",
        badge: "NEW ARRIVAL",
        availability: "online",
        tags: ["new", "trending"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Multicolor"]
    },
    {
        id: 22,
        name: "Kids Akara Dress - Blue",
        category: "Kids Wear",
        price: 380.00,
        originalPrice: 480.00,
        image: "img/shop/kids/kids-akara-2.JPG",
        description: "Beautiful kids Akara dress in blue tones with traditional patterns.",
        badge: "NEW",
        availability: "both",
        tags: ["new", "kids"],
        sizes: ["S", "M", "L"],
        colors: ["Blue/White", "Blue/Gold"]
    }
];

// Store Information (unchanged)
const storeInfo = {
    name: "Bebeys Collection Flagship Store",
    address: "123 Luxury Avenue, Sandton, Johannesburg 2196",
    phone: "(011) 234-5678",
    email: "store@bebeyscollection.com",
    hours: {
        weekday: "Monday - Saturday: 10:00 AM - 7:00 PM",
        weekend: "Sunday: 12:00 PM - 5:00 PM"
    },
    services: [
        "Personal Styling",
        "VIP Fittings",
        "Custom Alterations",
        "Exclusive Events",
        "Private Viewings",
        "Gift Wrapping"
    ],
    amenities: [
        "Complimentary Valet Parking",
        "Refreshment Lounge",
        "Private Fitting Rooms",
        "Children's Play Area",
        "WiFi Access"
    ]
};

// Store Events (unchanged)
const storeEvents = [
    {
        id: 1,
        title: "New Collection Launch",
        date: "2023-12-15",
        time: "6:00 PM - 9:00 PM",
        description: "Exclusive preview of our winter collection with live music and refreshments.",
        type: "VIP Event",
        registrationRequired: true
    },
    {
        id: 2,
        title: "Artisan Workshop",
        date: "2023-12-20",
        time: "2:00 PM - 5:00 PM",
        description: "Learn traditional African weaving techniques from master artisans.",
        type: "Workshop",
        registrationRequired: true
    },
    {
        id: 3,
        title: "Personal Styling Day",
        date: "2023-12-22",
        time: "10:00 AM - 6:00 PM",
        description: "Complimentary styling sessions with our expert stylists.",
        type: "Service Day",
        registrationRequired: false
    },
    {
        id: 4,
        title: "Holiday Shopping Night",
        date: "2023-12-23",
        time: "7:00 PM - 10:00 PM",
        description: "Extended hours with special discounts and gift wrapping.",
        type: "Shopping Event",
        registrationRequired: false
    }
];

// In-Store Exclusives (unchanged)
const storeExclusives = [
    {
        id: 1,
        name: "Heritage Collection",
        price: 8500,
        description: "Hand-embroidered pieces with authentic African beads",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
        type: "store-exclusive",
        requiresAppointment: false
    },
    {
        id: 2,
        name: "Bridal Collection",
        price: 15000,
        description: "Custom bridal gowns with traditional motifs",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        type: "by-appointment",
        requiresAppointment: true
    },
    {
        id: 3,
        name: "Artisan Series",
        price: 12000,
        description: "One-of-a-kind pieces by master artisans",
        image: "https://images.unsplash.com/photo-1567401893416-8f1f9e5b46ab",
        type: "limited-edition",
        requiresAppointment: false
    }
];

// Cart Data
let cart = [];

// User Data
const user = {
    isLoggedIn: false,
    name: "",
    email: "",
    preferences: {
        newsletter: true,
        storeEvents: true,
        newCollections: true
    },
    storeVisits: 0,
    lastVisit: null
};

// Categories for filtering (counts updated roughly)
const categories = [
    { id: "all", name: "All Products", count: 22 },
    { id: "dresses", name: "Dresses", count: 4 },
    { id: "tops", name: "Tops", count: 6 },
    { id: "bottoms", name: "Bottoms", count: 3 },
    { id: "accessories", name: "Accessories", count: 3 },
    { id: "kids-wear", name: "Kids Wear", count: 4 },
    { id: "sets", name: "Sets", count: 2 },
    { id: "evening-wear", name: "Evening Wear", count: 2 },
    { id: "jewelry", name: "Jewelry", count: 1 }
];

// Export data
export { products, storeInfo, storeEvents, storeExclusives, cart, user, categories };