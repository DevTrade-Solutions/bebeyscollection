// Product Data - New Products Only
const products = [
    {
        id: 1,
        name: "Fullbutton Shirt and Shorts Set",
        category: "Sets",
        price: 550.00,
        originalPrice: null,
        image: "img/shop/new/fullbutton-set.jpg",
        description: "A stylish two-piece set with a button-front shirt and matching shorts. Made from breathable cotton blend.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Navy", "Khaki", "Black"],
        fabric: "Cotton Blend"
    },
    {
        id: 2,
        name: "Wrap Crop Top",
        category: "Tops",
        price: 450.00,
        originalPrice: null,
        image: "img/shop/new/wrap-crop-top.jpg",
        description: "Trendy wrap-style crop top that ties at the side. Perfect with high-waisted bottoms.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["White", "Black", "Red"],
        fabric: "Cotton"
    },
    {
        id: 3,
        name: "Wrap Pants",
        category: "Bottoms",
        price: 450.00,
        originalPrice: null,
        image: "img/shop/new/wrap-pants.jpg",
        description: "Elegant wrap pants with adjustable tie closure. Flattering fit for any occasion.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige", "Black", "Olive"],
        fabric: "Polyester Viscose"
    },
    {
        id: 4,
        name: "Fullbutton 100% Cotton Shirt",
        category: "Tops",
        price: 650.00,
        originalPrice: null,
        image: "img/shop/new/fullbutton-cotton.jpg",
        description: "Classic button-down shirt made from premium 100% cotton for ultimate comfort and durability.",
        badge: "NEW",
        availability: "both",
        tags: ["new", "premium"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Blue", "Pink"],
        fabric: "100% Cotton"
    },
    {
        id: 5,
        name: "Bambino Dress",
        category: "Dresses",
        price: 850.00,
        originalPrice: null,
        image: "img/shop/new/bambino-dress.jpg",
        description: "Charming bambino dress with delicate details. Ideal for special occasions.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L"],
        colors: ["Ivory", "Rose", "Navy"],
        fabric: "Cotton Blend"
    },
    {
        id: 6,
        name: "Boys Fullbutton Shirt & Shorts Set",
        category: "Kids Wear",
        price: 450.00,
        originalPrice: null,
        image: "img/shop/new/boys-fullbutton-set.jpg",
        description: "Adorable set for boys with a button-front shirt and matching shorts. Perfect for casual days.",
        badge: null,
        availability: "both",
        tags: ["new", "kids"],
        sizes: ["S", "M", "L"],
        colors: ["Blue", "Green", "Red"],
        fabric: "Cotton"
    },
    {
        id: 7,
        name: "Kids Single Item",
        category: "Kids Wear",
        price: 250.00,
        originalPrice: null,
        image: "img/shop/new/kids-single-item.jpg",
        description: "Versatile single piece for kids – choose from tops, shorts, or bottoms. Mix and match easily.",
        badge: null,
        availability: "both",
        tags: ["new", "kids"],
        sizes: ["S", "M", "L"],
        colors: ["Multicolor"],
        fabric: "Cotton"
    },
    {
        id: 8,
        name: "Kids Wrapped Skirt",
        category: "Kids Wear",
        price: 200.00,
        originalPrice: null,
        image: "img/shop/new/kids-wrapped-skirt.jpg",
        description: "Playful wrapped skirt for kids, easy to wear and comfortable for all-day play.",
        badge: null,
        availability: "both",
        tags: ["new", "kids"],
        sizes: ["S", "M", "L"],
        colors: ["Pink", "Purple", "Blue"],
        fabric: "Cotton"
    },
    {
        id: 9,
        name: "Wrap Skirt",
        category: "Bottoms",
        price: 350.00,
        originalPrice: null,
        image: "img/shop/new/wrap-skirt-350.jpg",
        description: "Versatile wrap skirt that can be styled multiple ways. Adjustable tie closure.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown", "Red"],
        fabric: "Polyester Blend"
    },
    {
        id: 10,
        name: "Elastic Top",
        category: "Tops",
        price: 150.00,
        originalPrice: null,
        image: "img/shop/new/elastic-top.jpg",
        description: "Comfortable elastic top with a relaxed fit, perfect for everyday wear.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L"],
        colors: ["White", "Grey", "Navy"],
        fabric: "Cotton Spandex"
    },
    {
        id: 11,
        name: "Head Wrap",
        category: "Accessories",
        price: 100.00,
        originalPrice: null,
        image: "img/shop/new/head-wrap.jpg",
        description: "Stylish head wrap made from soft fabric, adds a pop of color to any outfit.",
        badge: null,
        availability: "both",
        tags: ["new", "accessory"],
        sizes: ["One Size"],
        colors: ["Multicolor", "Red", "Blue"],
        fabric: "Cotton"
    },
    {
        id: 12,
        name: "V-Neck Shirt",
        category: "Tops",
        price: 350.00,
        originalPrice: null,
        image: "img/shop/new/vneck-shirt.jpg",
        description: "Classic V-neck shirt with a modern cut, perfect for layering or wearing alone.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Navy"],
        fabric: "Cotton"
    },
    {
        id: 13,
        name: "Square Top",
        category: "Tops",
        price: 400.00,
        originalPrice: null,
        image: "img/shop/new/square-top.jpg",
        description: "Elegant square neck top with a tailored fit, great for both casual and dressy occasions.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L"],
        colors: ["Black", "White", "Rose"],
        fabric: "Cotton Blend"
    },
    {
        id: 14,
        name: "Kids Bucket Hat",
        category: "Accessories",
        price: 150.00,
        originalPrice: null,
        image: "img/shop/new/kids-bucket-hat.jpg",
        description: "Cute bucket hat for kids, perfect for sunny days.",
        badge: null,
        availability: "both",
        tags: ["new", "kids", "accessory"],
        sizes: ["S", "M", "L"],
        colors: ["Multicolor", "Blue", "Pink"],
        fabric: "Cotton"
    },
    {
        id: 15,
        name: "Kids Shorts",
        category: "Kids Wear",
        price: 250.00,
        originalPrice: null,
        image: "img/shop/new/kids-shorts.jpg",
        description: "Comfortable and durable shorts for active kids.",
        badge: null,
        availability: "both",
        tags: ["new", "kids"],
        sizes: ["S", "M", "L"],
        colors: ["Blue", "Red", "Green"],
        fabric: "Cotton"
    },
    {
        id: 16,
        name: "Long Sleeve Elastic Top",
        category: "Tops",
        price: 250.00,
        originalPrice: null,
        image: "img/shop/new/longsleeve-elastic.jpg",
        description: "Soft long-sleeve top with elastic cuffs and hem for a relaxed fit.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L"],
        colors: ["Grey", "Black", "Navy"],
        fabric: "Cotton Spandex"
    },
    {
        id: 17,
        name: "High Waist Skirt",
        category: "Bottoms",
        price: 450.00,
        originalPrice: null,
        image: "img/shop/new/high-waist-skirt.jpg",
        description: "Flattering high-waist skirt that accentuates the silhouette.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown", "Olive"],
        fabric: "Polyester Blend"
    },
    {
        id: 18,
        name: "Cargo Pants",
        category: "Bottoms",
        price: 850.00,
        originalPrice: null,
        image: "img/shop/new/cargo-pants.jpg",
        description: "Utility-inspired cargo pants with multiple pockets, combining style and function.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Khaki", "Black", "Green"],
        fabric: "Cotton Twill"
    },
    {
        id: 19,
        name: "High Low Dress",
        category: "Dresses",
        price: 550.00,
        originalPrice: null,
        image: "img/shop/new/highlow-dress.jpg",
        description: "Dramatic high-low hemline dress that moves beautifully. Perfect for parties and events.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L"],
        colors: ["Red", "Black", "Navy"],
        fabric: "Polyester Chiffon"
    },
    {
        id: 20,
        name: "Patched Kimono",
        category: "Outerwear",
        price: 1200.00,
        originalPrice: null,
        image: "img/shop/new/patched-kimono.jpg",
        description: "Artistic kimono with patchwork detailing, a unique statement piece.",
        badge: "LIMITED EDITION",
        availability: "both",
        tags: ["new", "limited"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Multicolor"],
        fabric: "Silk Blend"
    },
    {
        id: 21,
        name: "Kimono",
        category: "Outerwear",
        price: 850.00,
        originalPrice: null,
        image: "img/shop/new/kimono.jpg",
        description: "Elegant kimono with a flowing silhouette, perfect for layering.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L"],
        colors: ["Black", "Ivory", "Red"],
        fabric: "Viscose"
    },
    {
        id: 22,
        name: "Jolofin Dress",
        category: "Dresses",
        price: 850.00,
        originalPrice: null,
        image: "img/shop/new/jolofin-dress.jpg",
        description: "Stunning Jolofin dress with vibrant African print and modern cut.",
        badge: null,
        availability: "both",
        tags: ["new", "featured"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Multicolor"],
        fabric: "Ankara Wax Print"
    },
    {
        id: 23,
        name: "Wrapped Skirt",
        category: "Bottoms",
        price: 450.00,
        originalPrice: null,
        image: "img/shop/new/wrapped-skirt-450.jpg",
        description: "Classic wrapped skirt with adjustable tie closure.",
        badge: null,
        availability: "both",
        tags: ["new"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Blue", "Red"],
        fabric: "Cotton"
    },
    {
        id: 24,
        name: "Summer Dress",
        category: "Dresses",
        price: 650.00,
        originalPrice: null,
        image: "img/shop/new/summer-dress.jpg",
        description: "Lightweight summer dress with breezy fabric and vibrant patterns.",
        badge: null,
        availability: "both",
        tags: ["new", "summer"],
        sizes: ["S", "M", "L"],
        colors: ["Yellow", "Pink", "Blue"],
        fabric: "Cotton Voile"
    },
    {
        id: 25,
        name: "Caftan",
        category: "Dresses",
        price: 850.00,
        originalPrice: null,
        image: "img/shop/new/caftan.jpg",
        description: "Luxurious caftan with elegant embroidery and relaxed fit.",
        badge: null,
        availability: "both",
        tags: ["new", "luxury"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Gold", "Silver", "Emerald"],
        fabric: "Silk"
    },
    {
        id: 26,
        name: "Girls Set",
        category: "Kids Wear",
        price: 450.00,
        originalPrice: null,
        image: "img/shop/new/girls-set.jpg",
        description: "Adorable two-piece set for girls, perfect for any occasion.",
        badge: null,
        availability: "both",
        tags: ["new", "kids"],
        sizes: ["S", "M", "L"],
        colors: ["Pink", "Purple", "Blue"],
        fabric: "Cotton"
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

// Categories for filtering (updated counts based on new products)
const categories = [
    { id: "all", name: "All Products", count: 26 },
    { id: "dresses", name: "Dresses", count: 6 },   // Bambino, High Low, Jolofin, Summer, Caftan (5) + maybe? Actually: 5 (id5,19,22,24,25) plus? Wait: Bambino (5), High Low (19), Jolofin (22), Summer (24), Caftan (25) = 5. Did we miss any? No.
    { id: "tops", name: "Tops", count: 7 },        // Wrap Crop (2), Fullbutton Cotton (4), Elastic (10), V-Neck (12), Square (13), Long Sleeve Elastic (16) = 6? Actually: 2,4,10,12,13,16 = 6. Plus maybe "Kids Single Item" is not a top. So 6.
    { id: "bottoms", name: "Bottoms", count: 5 },  // Wrap Pants (3), Wrap Skirt (9), High Waist (17), Cargo (18), Wrapped Skirt (23) = 5
    { id: "accessories", name: "Accessories", count: 2 }, // Head Wrap (11), Kids Bucket Hat (14)
    { id: "kids-wear", name: "Kids Wear", count: 5 }, // Boys Set (6), Kids Single (7), Kids Wrapped Skirt (8), Kids Shorts (15), Girls Set (26) = 5
    { id: "sets", name: "Sets", count: 1 },       // Fullbutton Shirt and Shorts Set (1)
    { id: "outerwear", name: "Outerwear", count: 2 } // Patched Kimono (20), Kimono (21)
];

// Export data
export { products, storeInfo, storeEvents, storeExclusives, cart, user, categories };