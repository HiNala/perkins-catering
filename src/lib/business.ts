/**
 * Perkins Catering Co. — Business Information
 * Source: captured pages from perkinscateringco.com
 * Preserved per build brief requirements.
 */

export const business = {
  name: "Perkins Catering Co.",
  tagline: "Local Ingredients. Expert Care. Quality Events.",
  phone: "707-981-7822",
  phoneHref: "tel:+17079817822",
  email: "reservations@perkinscateringco.com",
  emailHref: "mailto:reservations@perkinscateringco.com",
  serviceArea: "Napa County · Sonoma County · Marin County",
  serviceAreas: ["Napa County", "Sonoma County", "Marin County"],
  chefName: "Austin Perkins",
  chefTitle: "Executive Chef & Owner",
  founded: 2011,
  url: "https://perkins-catering.up.railway.app",
} as const;

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

export const navigation: NavItem[] = [
  { label: "Chef", href: "/bio" },
  { label: "Menu", href: "/menu" },
  { label: "Photos", href: "/photos" },
  { label: "Events", href: "/events" },
  { label: "Summer", href: "/summer" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Resources", href: "/resources" },
  { label: "Inquire", href: "/inquire", highlight: true },
];

export const footerNav = {
  explore: [
    { label: "Chef", href: "/bio" },
    { label: "Menu", href: "/menu" },
    { label: "Photos", href: "/photos" },
    { label: "Events", href: "/events" },
  ],
  more: [
    { label: "Summer Meals", href: "/summer" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Cost & Pricing", href: "/cost" },
    { label: "Resources", href: "/resources" },
  ],
  contact: [
    { label: "Inquire", href: "/inquire" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const testimonials = [
  {
    quote:
      "We love working with Austin and the team from Perkins Catering. Not only is the food consistently delicious and beautifully presented, but Austin and everyone he brings to work on our events is a dream to work with: always professional, ready on time, respectful, and accommodating to all our needs. We always get rave reviews and recipe requests for the pairings they put together to match our wines.",
    author: "Valerie Wathen",
    affiliation: "Dutton-Goldfield Winery",
  },
  {
    quote:
      "We had the recent pleasure of working with Austin and his team at Perkins Catering Co when they catered our wedding for 200 in October of 2017. We haven't been able to say enough good things about them – Austin was a total pleasure to work with. He was endlessly patient and knowledgeable during the planning process, accommodated changes in the guest count and menu, and made himself available to answer all of our questions. The wedding venue and setting were a little unusual and rustic (at an outdoor property at an old ranch without many hookups, lighting or useful infrastructure) and Austin and his crew were great sports – they set up without any trouble, bringing everything they needed to create a memorable and delicious dining experience in the redwoods for our guests. The menu was perfect, the food was delicious, and they got compliments from everyone. They were such a hit! The whole experience was seamless and easy, and Austin and his crew helped to facilitate the most magical weekend of our lives. We look forward to working with them again in the near future and recommend them with full hearts.",
    author: "Leslie M.",
    affiliation: "Mill Valley, CA",
  },
  {
    quote:
      "Thanks to you guys for your great food, service and professionalism from beginning to end. Everyone here was very impressed with the quality and the variety. Plus you're such nice people! We already nibbled on left overs this morning and are looking forward to Sugo and chicken for dinner. We are greatly appreciative and promise to spread the word any chance we get. Hopefully we can do it again sometime. Again, thank you very much.",
    author: "Jonathon F.",
    affiliation: "Novato, CA",
  },
] as const;

export const faqs = [
  {
    question: "What areas does Perkins Catering Co. serve?",
    answer:
      "We proudly serve Napa County, Sonoma County, and Marin County. If your event is outside these areas, please reach out — we may be able to accommodate depending on the event.",
  },
  {
    question: "How are menus created?",
    answer:
      "Every menu is hand-crafted by our chefs for each individual event. We use only in-season produce and the best available local proteins to make every event truly one of a kind. We work closely with you during the planning phase to ensure every detail has been thoroughly considered.",
  },
  {
    question: "What types of events do you cater?",
    answer:
      "We cater everything from intimate in-home dinners for eight to large wedding buffets for 250+ guests and corporate events for 300+ attendees. Whether casual or a multi-course decadent meal, we bring the same restaurant quality to every event.",
  },
  {
    question: "Do you offer tastings before booking?",
    answer:
      "Yes. We believe every event should feel just the way you intend it to. During the planning process, we develop custom menus based on your preferences and can arrange tastings to ensure everything is perfect.",
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer:
      "Absolutely. Our goal is to meet the needs of any guest's request. Since every menu is custom-crafted, we can accommodate vegetarian, vegan, gluten-free, and other dietary requirements with advance notice.",
  },
  {
    question: "How do I get a quote for my event?",
    answer:
      "The best way to get started is through our inquiry form. Tell us about your event — the type, date, guest count, and any preferences — and we'll craft a custom proposal for you. You can also call us directly at 707-981-7822.",
  },
] as const;

export const services = [
  {
    title: "Weddings",
    description:
      "From intimate ceremonies to grand celebrations, we craft wedding menus that reflect your love story. Custom menus, expert service, and unforgettable flavors.",
    icon: "rings",
    features: ["Custom menu design", "Full-service staffing", "Wine pairings", "Dietary accommodations"],
  },
  {
    title: "Corporate Events",
    description:
      "Impress your team and clients with restaurant-quality catering for corporate gatherings, retreats, and celebrations of all sizes.",
    icon: "briefcase",
    features: ["Oyster & raw bars", "Buffet or plated service", "Flexible scheduling", "Volume catering"],
  },
  {
    title: "Private Dinners",
    description:
      "Intimate in-home dinners with a personal chef experience. Perfect for special occasions, celebrations, or simply an extraordinary evening.",
    icon: "utensils",
    features: ["Chef-prepared onsite", "Multi-course tasting menus", "Wine pairings", "Custom themes"],
  },
  {
    title: "Seasonal Meals",
    description:
      "Our summer meal program offers pickup and delivery of chef-prepared seasonal dishes. Perfect for enjoying restaurant-quality food at home.",
    icon: "sun",
    features: ["Weekly seasonal menus", "Pickup at Imagery Winery", "Delivery available", "Pre-order online"],
  },
] as const;
