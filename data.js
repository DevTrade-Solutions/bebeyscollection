// Product Data
const products = [
    {
        id: 1,
        name: "Adinkra Heritage Dress",
        category: "Dresses",
        price: 2850.00,
        originalPrice: 3200.00,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        description: "Elegant dress featuring traditional Adinkra symbols with a modern silhouette.",
        badge: "IN-STORE EXCLUSIVE",
        availability: "in-store",
        tags: ["new", "exclusive"],
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
        tags: ["new", "bestseller"],
        sizes: ["XS", "S", "M"],
        colors: ["Gold", "Ivory", "Bronze"]
    },
    {
        id: 3,
        name: "Ankara Palazzo Pants",
        category: "Bottoms",
        price: 1200.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        description: "Handwoven Kente stole with traditional Ashanti patterns.",
        badge: "SALE",
        availability: "online",
        tags: ["sale", "accessory"],
        sizes: ["One Size"],
        colors: ["Gold/Green", "Red/Black", "Blue/White"]
    },
    {
        id: 5,
        name: "Mudcloth Jacket",
        category: "Outerwear",
        price: 2200.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1567401893416-8f1f9e5b46ab?auto=format&fit=crop&w=800&q=80",
        description: "Contemporary jacket made from authentic Malian mudcloth.",
        badge: "IN-STORE EXCLUSIVE",
        availability: "in-store",
        tags: ["exclusive", "premium"],
        sizes: ["S", "M", "L"],
        colors: ["Natural", "Indigo", "Brown"]
    },
    {
        id: 6,
        name: "Beaded Statement Earrings",
        category: "Jewelry",
        price: 650.00,
        originalPrice: 850.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        description: "Handcrafted beaded earrings with traditional African patterns.",
        badge: "NEW",
        availability: "both",
        tags: ["new", "accessory"],
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

// Export data
export { products, storeInfo, storeEvents, storeExclusives, cart, user };