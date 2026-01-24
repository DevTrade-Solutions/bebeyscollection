// Product Data - EXPANDED FOR SHOP PAGE
const products = [
    // Original products (1-8)
    {
        id: 1,
        name: "Adinkra Heritage Dress",
        category: "Dresses",
        price: 2850.00,
        originalPrice: 3200.00,
        image: "img/shop/a1.jpg",
        description: "Elegant dress featuring traditional Adinkra symbols with a modern silhouette.",
        badge: "IN-STORE EXCLUSIVE",
        availability: "in-store",
        tags: ["new", "exclusive", "featured"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue/Black", "Red/Gold", "Green/Brown"]
    },
    {
        id: 2,
        name: "Golden Sands Top",
        category: "Tops",
        price: 1650.00,
        originalPrice: 1950.00,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
        description: "Luxurious top with gold thread embroidery and intricate beadwork.",
        badge: "NEW ARRIVAL",
        availability: "online",
        tags: ["new", "bestseller", "featured"],
        sizes: ["XS", "S", "M"],
        colors: ["Gold", "Ivory", "Bronze"]
    },
    {
        id: 3,
        name: "Ankara Palazzo Pants",
        category: "Bottoms",
        price: 1200.00,
        originalPrice: null,
        image: "img/shop/2P-set.png",
        description: "Wide-leg pants in vibrant Ankara print with comfortable elastic waist.",
        badge: null,
        availability: "both",
        tags: ["popular"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Multi-color", "Blue/White", "Red/Black"]
    },
    {
        id: 4,
        name: "Kente Stole",
        category: "Accessories",
        price: 890.00,
        originalPrice: 1100.00,
        image: "img/shop/dress-01.png",
        description: "Handwoven Kente stole with traditional Ashanti patterns.",
        badge: "SALE",
        availability: "online",
        tags: ["sale", "accessory"],
        sizes: ["One Size"],
        colors: ["Gold/Green", "Red/Black", "Blue/White"]
    },
    {
        id: 5,
        name: "Kids Top",
        category: "Kids Wear",
        price: 250.00,
        originalPrice: null,
        image: "img/shop/kid-top-b.JPG",
        description: "Contemporary jacket made from authentic Malian mudcloth.",
        badge: "IN-STORE EXCLUSIVE",
        availability: "in-store",
        tags: ["exclusive", "premium"],
        sizes: ["S", "M", "L"],
        colors: ["Natural", "Indigo", "Brown"]
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
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        description: "Complete Ankara set with top and skirt, perfect for special occasions.",
        badge: "BESTSELLER",
        availability: "online",
        tags: ["bestseller", "set"],
        sizes: ["S", "M", "L"],
        colors: ["Red/Black", "Blue/Gold", "Green/White"]
    },
    
    // Additional products for shop page (9-20)
    {
        id: 9,
        name: "Royal Kaftan",
        category: "Dresses",
        price: 1950.00,
        originalPrice: 2400.00,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
        description: "Elegant kaftan with intricate embroidery and flowing silhouette.",
        badge: "SALE",
        availability: "online",
        tags: ["sale", "popular"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Navy/Gold", "Emerald/Silver", "Burgundy"]
    },
    {
        id: 10,
        name: "Ankara Crop Top",
        category: "Tops",
        price: 950.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
        description: "Modern crop top with vibrant Ankara print and puff sleeves.",
        badge: "NEW ARRIVAL",
        availability: "both",
        tags: ["new", "trending"],
        sizes: ["XS", "S", "M"],
        colors: ["Yellow/Black", "Blue/White", "Pink/Orange"]
    },
    {
        id: 11,
        name: "Wax Print Midi Skirt",
        category: "Bottoms",
        price: 1350.00,
        originalPrice: 1600.00,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
        description: "Flowy midi skirt in authentic wax print fabric with elastic waist.",
        badge: null,
        availability: "online",
        tags: ["popular"],
        sizes: ["S", "M", "L"],
        colors: ["Red/Black", "Green/Gold", "Purple/White"]
    },
    {
        id: 12,
        name: "Beaded Leather Belt",
        category: "Accessories",
        price: 750.00,
        originalPrice: 950.00,
        image: "https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&w=800&q=80",
        description: "Handcrafted leather belt with traditional beadwork.",
        badge: "SALE",
        availability: "both",
        tags: ["sale", "accessory"],
        sizes: ["S", "M", "L"],
        colors: ["Brown", "Black", "Natural"]
    },
    {
        id: 13,
        name: "Mudcloth Blazer",
        category: "Outerwear",
        price: 2450.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        description: "Tailored blazer in authentic mudcloth for a sophisticated look.",
        badge: "NEW ARRIVAL",
        availability: "in-store",
        tags: ["new", "exclusive"],
        sizes: ["S", "M", "L"],
        colors: ["Indigo", "Natural", "Brown/White"]
    },
    {
        id: 14,
        name: "Bold Necklace Set",
        category: "Jewelry",
        price: 1200.00,
        originalPrice: 1500.00,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable lounge set in soft Ankara cotton.",
        badge: "NEW ARRIVAL",
        availability: "online",
        tags: ["new", "casual"],
        sizes: ["S", "M", "L"],
        colors: ["Pink/White", "Blue/Grey", "Green/Beige"]
    },
    {
        id: 17,
        name: "Maxi Kimono",
        category: "Dresses",
        price: 1750.00,
        originalPrice: 2100.00,
        image: "https://images.unsplash.com/photo-1542280756-1e9d9774cac6?auto=format&fit=crop&w=800&q=80",
        description: "Lightweight kimono with bold African prints and tassel details.",
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
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
        description: "Delicate blouse with hand-embroidered traditional motifs.",
        badge: "BESTSELLER",
        availability: "online",
        tags: ["bestseller", "featured"],
        sizes: ["XS", "S", "M"],
        colors: ["White", "Ivory", "Light Blue"]
    },
    {
        id: 19,
        name: "Tailored Trousers",
        category: "Bottoms",
        price: 1650.00,
        originalPrice: 1950.00,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        description: "Wide-leg tailored trousers in premium cotton blend.",
        badge: "SALE",
        availability: "both",
        tags: ["sale", "featured"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Olive"]
    },
    {
        id: 20,
        name: "Tailored Trousers",
        category: "Bottoms",
        price: 1650.00,
        originalPrice: 1950.00,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        description: "Wide-leg tailored trousers in premium cotton blend.",
        badge: "SALE",
        availability: "both",
        tags: ["sale", "featured"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Olive"]
    },
    {
        id: 21,
        name: "Leather Clutch with Beads",
        category: "Accessories",
        price: 950.00,
        originalPrice: 1200.00,
        image: "img/shop/2P-set.png",
        description: "Handcrafted leather clutch with traditional bead embroidery.",
        badge: "SALE",
        availability: "online",
        tags: ["sale", "accessory"],
        sizes: ["One Size"],
        colors: ["Red", "Black", "Brown"]
    }
];

// Store Information
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

// Store Events
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

// In-Store Exclusives
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

// Categories for filtering
const categories = [
    { id: "all", name: "All Products", count: 20 },
    { id: "dresses", name: "Dresses", count: 4 },
    { id: "tops", name: "Tops", count: 4 },
    { id: "bottoms", name: "Bottoms", count: 4 },
    { id: "accessories", name: "Accessories", count: 4 },
    { id: "outerwear", name: "Outerwear", count: 2 },
    { id: "jewelry", name: "Jewelry", count: 2 },
    { id: "evening-wear", name: "Evening Wear", count: 2 },
    { id: "sets", name: "Sets", count: 2 }
];

// Export data
export { products, storeInfo, storeEvents, storeExclusives, cart, user, categories };