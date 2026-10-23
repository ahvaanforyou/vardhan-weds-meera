export interface CouplePerson {
  name: string;
  teluguName: string;
  role: string;
  parents: string;
  grandparents?: string;
  description?: string;
  image: string;
  instagram?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  teluguTitle?: string;
  date: string;
  time: string;
  venue: string;
  address?: string;
  description?: string;
  dressCode?: string;
  isMainEvent?: boolean;
  googleMapsUrl?: string;
  icon: "kalash" | "mehendi" | "mandapam" | "reception";
}

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  category: "all" | "traditional" | "pre-wedding" | "candid";
  aspect: "portrait" | "landscape" | "square";
}

export interface WeddingConfig {
  couple: {
    bride: CouplePerson;
    groom: CouplePerson;
  };
  shlokas: {
    sanskritGanesha: string;
    teluguGanesha: string;
    blessingTelugu?: string;
    blessingEnglish?: string;
  };
  weddingDateTime: {
    iso: string;
    dateFormatted: string;
    dayFormatted: string;
    muhurthamTime: string;
    muhurthamTelugu: string;
    teluguTithi: string;
    timezone: string;
  };
  events: WeddingEvent[];
  venue: {
    name: string;
    teluguName?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmarks?: string;
    googleMapsUrl?: string;
    googleMapsEmbedUrl?: string;
    parkingNotes?: string;
    showMapEmbed: boolean;
  };
  gallery: GalleryPhoto[];
  rsvp: {
    enabled: boolean;
    deadline?: string;
    maxGuests: number;
    contactPhone?: string;
    contactEmail?: string;
  };
  audio: {
    enabled: boolean;
    title?: string;
    subtitle?: string;
    src: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    bride: {
      name: "Meera Devi",
      teluguName: "మీరా దేవి",
      role: "Meet the Bride",
      parents: "Sri Madhava Reddy and Smt Krishna Veni",
      image: "/images/bride.jpeg?v=30ebd56f1c04",
    },
    groom: {
      name: "Raja Vardhan Reddy",
      teluguName: "రాజ వర్ధన్ రెడ్డి",
      role: "Meet the Groom",
      parents: "Sri Ravi Prakash Reddy and Smt Anasuya",
      image: "/images/groom.jpeg?v=040600e29711",
    },
  },
  shlokas: {
    sanskritGanesha: "॥ श्री गणेशाय नमः ॥",
    teluguGanesha: "॥ శ్రీ గణేశాయ నమః ॥",
    blessingTelugu: "కళ్యాణ వైభోగమే",
    blessingEnglish:
      "With the loving blessings of our elders and the divine grace of Sri Venkateswara Swamy, we invite you to share our joy as we begin our sacred journey of togetherness.",
  },
  weddingDateTime: {
    iso: "2026-11-11T10:00:00+05:30",
    dateFormatted: "Wednesday, November 11, 2026",
    dayFormatted: "Wednesday",
    muhurthamTime: "10:00 AM",
    muhurthamTelugu: "శుభ ముహూర్తం : ఉదయం 10:00 నిమిషములకు",
    teluguTithi: "",
    timezone: "Asia/Kolkata",
  },
  events: [
    {
      id: "event-pellikoduku",
      title: "Pellikoduku",
      teluguTitle: "పెళ్లికొడుకు",
      date: "10 November 2026",
      time: "10:00 AM",
      venue: "Krishnam Setty Palli",
      address: "Giddalur, Prakasam District, Andhra Pradesh",
      googleMapsUrl: "https://maps.app.goo.gl/2yJFYmmdupgWBZmi6?g_st=ac",
      icon: "kalash",
    },
    {
      id: "event-wedding",
      title: "Wedding",
      teluguTitle: "వివాహం",
      date: "11 November 2026",
      time: "Muhurtham: 10:00 AM",
      venue: "Tirumala Convention",
      address: "Kurnool Main Road, Giddalur, Andhra Pradesh",
      isMainEvent: true,
      googleMapsUrl: "https://maps.app.goo.gl/KvgDPvJsi1yk5SVc8?g_st=ic",
      icon: "mandapam",
    },
  ],
  venue: {
    name: "Tirumala Convention",
    address: "Kurnool Main Road, Giddalur, Andhra Pradesh",
    city: "Giddalur",
    state: "Andhra Pradesh",
    pincode: "",
    googleMapsUrl: "https://maps.app.goo.gl/KvgDPvJsi1yk5SVc8?g_st=ic",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Tirumala+Convention%2C+9WHR%2BJH6%2C+Giddalur%2C+Andhra+Pradesh+523357&output=embed",
    showMapEmbed: true,
  },
  gallery: [
    {
      id: "photo-1",
      src: "/images/gallery-1.jpeg",
      caption: "Raja Vardhan Reddy & Meera Devi",
      category: "traditional",
      aspect: "landscape",
    },
  ],
  rsvp: {
    enabled: true,
    maxGuests: 6,
  },
  audio: {
    enabled: true,
    title: "Mangala Vaadhyam",
    subtitle: "Nadaswaram & Thavil Traditional Wedding Harmony",
    src: "/audio/seetha-kalyana.mp3",
  },
};
