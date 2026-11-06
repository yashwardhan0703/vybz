export interface Track {
  id: string;
  title: string;
  artist: string;
}

export interface ThemeWorld {
  id: string;
  name: string;
  nameHindi: string;
  subtitle: string;
  pillTitle: string;
  pillSub: string;
  subQuote: string;
  bg: string;
  themeColor: string;
  tracks: Track[];
  quotes: { title: string; sub: string }[];
  tagline?: string;
  theme?: string;
}

export const SALON_SERVICES = [
  { name: 'Special Cutting', price: '₹70', icon: '✂️' },
  { name: 'Shaving + Fitkari', price: '₹40', icon: '🪒' },
  { name: 'Navratna Oil Champi', price: '₹50', icon: '💆‍♂️' },
  { name: 'Face D-Tan', price: '₹120', icon: '✨' },
  { name: 'Beard Trim & Setting', price: '₹50', icon: '🧔' },
];

export const THEMES: ThemeWorld[] = [
  {
    id: 'bartan_time',
    name: 'Bartan Time',
    nameHindi: 'बर्तन टाइम',
    subtitle: 'JHAADU, POCHA AUR GAANE',
    tagline: 'Jhaadu, pocha aur gaane',
    pillTitle: 'बर्तन धो लो!',
    pillSub: 'GHAR ITNE',
    subQuote: 'Kaam ke saath thoda beat bhi.',
    themeColor: '#2dd4bf',
    theme: 'teal',
    bg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1920&q=85',
    tracks: [
      { id: 'P1fIdFRnfqw', title: 'What Jhumka? - Rocky Aur Rani', artist: 'Saregama Music' },
      { id: '9YhzTM-KHkM', title: 'Ilahi', artist: 'Arijit Singh' },
      { id: 'BmUe3-sfr7E', title: 'Kasoor', artist: 'Prateek Kuhad' },
      { id: '284Ov7ysmfA', title: 'Channa Mereya', artist: 'Arijit Singh' },
      { id: 'R0KlDFAFl0c', title: 'Aaj Bhi', artist: 'Vishal Mishra' },
      { id: 'BddP6PYo2gs', title: 'Kesariya', artist: 'Arijit Singh' },
      { id: 'T94PHkuydcw', title: 'Kun Faya Kun', artist: 'A.R. Rahman' },
    ],
    quotes: [
      { title: 'बर्तन धो लो!', sub: 'GHAR ITNE' },
      { title: 'झाड़ू-पोछा हो गया?', sub: 'MUMMY CALL' },
      { title: 'कढ़ाई पर ज़रा ज़ोर लगाओ!', sub: 'CHORE MOOD' },
      { title: 'काम खत्म, चाय शुरू!', sub: 'REWARD TIME' },
    ],
  },
  {
    id: 'deluxe_salon',
    name: 'Deluxe Salon',
    nameHindi: 'डीलक्स सैलून',
    subtitle: 'CUTTING, SHAVING AUR 90S GAANE',
    tagline: 'Cutting, shaving aur 90s gaane',
    pillTitle: 'उस्ताद जी, कटिंग कर दो!',
    pillSub: 'DELUXE SPECIAL',
    subQuote: 'Purani yaadein, naya haircut.',
    themeColor: '#fbbf24',
    theme: 'amber',
    bg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=85',
    tracks: [
      { id: 'QKfGl39ZJWI', title: 'Pardesi Pardesi', artist: 'Udit Narayan, Alka Yagnik' },
      { id: '7JnKVPtRqVE', title: 'Tujhe Dekha Toh', artist: 'Kumar Sanu, Lata Mangeshkar' },
      { id: 'bKZTnnFU9HA', title: 'Kuch Kuch Hota Hai', artist: 'Udit Narayan, Alka Yagnik' },
      { id: '3Z_x7vBqr6E', title: 'Tum Dil Ki Dhadkan Mein', artist: 'Kumar Sanu, Alka Yagnik' },
      { id: 'Yqj1_V90KJo', title: 'Chura Ke Dil Mera', artist: 'Kumar Sanu, Alka Yagnik' },
      { id: 'pKsD2GiQhOo', title: 'Dheere Dheere Se', artist: 'Kumar Sanu' },
    ],
    quotes: [
      { title: 'भैया पीछे से छोटे कर दूँ?', sub: 'USTAAD JI' },
      { title: 'दाढ़ी में फिटकरी लगाऊँ?', sub: 'SALON VIBES' },
      { title: 'नवरत्न तेल से चंपी कराओ!', sub: 'HEAD MASSAGE' },
    ],
  },
  {
    id: 'chai_tapri',
    name: 'Chai Tapri',
    nameHindi: 'चाय तपरी',
    subtitle: 'GARAM CHAI AUR PURANE GAANE',
    tagline: 'Garam chai aur purane gaane',
    pillTitle: 'एक कड़क चाय हो जाए!',
    pillSub: 'TAPRI SPECIAL',
    subQuote: 'Chai ke bina baat aage nahi badhti.',
    themeColor: '#f97316',
    theme: 'orange',
    bg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=85',
    tracks: [
      { id: '9EodaUmLhAI', title: 'Chaiyya Chaiyya', artist: 'Sukhwinder Singh, Sapna Awasthi' },
      { id: 'MRoKMPbAJ-o', title: 'O Mere Dil Ke Chain', artist: 'Kishore Kumar' },
      { id: 'Qa-uVqnv-No', title: 'Pal Pal Dil Ke Paas', artist: 'Kishore Kumar' },
      { id: 'E1xPY3OiuzI', title: 'Likhe Jo Khat Tujhe', artist: 'Mohammed Rafi' },
      { id: 'jHNNMj5bNQw', title: 'Kabira', artist: 'Tochi Raina, Rekha Bhardwaj' },
    ],
    quotes: [
      { title: 'एक चाय हो जाए!', sub: 'TAPRI VIBES' },
      { title: 'बिस्कुट डुबा के खाओ!', sub: 'CHAI LOVER' },
      { title: 'शाम की चाय, सुकून ही सुकून!', sub: 'DESI MOOD' },
    ],
  },
  {
    id: 'corporate_majdoor',
    name: 'Corporate Majdoor',
    nameHindi: 'कॉर्पोरेट मज़दूर',
    subtitle: 'EXCEL, EMAIL AUR GAANE',
    tagline: 'Excel, email aur gaane',
    pillTitle: 'लॉगिन हो गया भाई!',
    pillSub: '9 TO 5 SHIFT',
    subQuote: 'Deadline aati jaati rahegi, gaane chalte rahenge.',
    themeColor: '#38bdf8',
    theme: 'sky',
    bg: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=85',
    tracks: [
      { id: 'T94PHkuydcw', title: 'Kun Faya Kun', artist: 'A.R. Rahman' },
      { id: 'BddP6PYo2gs', title: 'Kesariya', artist: 'Arijit Singh' },
      { id: '9YhzTM-KHkM', title: 'Ilahi', artist: 'Arijit Singh' },
      { id: 'BmUe3-sfr7E', title: 'Kasoor', artist: 'Prateek Kuhad' },
      { id: '284Ov7ysmfA', title: 'Channa Mereya', artist: 'Arijit Singh' },
    ],
    quotes: [
      { title: 'चलो भाई, स्टैंडअप कॉल है!', sub: 'DAILY STANDUP' },
      { title: 'बस ये बग फिक्स हो जाए!', sub: 'BUG FIXING' },
      { title: 'कॉफी खत्म, फिर से बनाओ!', sub: 'CAFFEINE RUSH' },
    ],
  },
  {
    id: 'highway_dhaba',
    name: 'Highway Dhaba',
    nameHindi: 'हाईवे ढाबा',
    subtitle: 'LATE NIGHT HIGHWAY TRUCK RADIO',
    tagline: 'Late night highway truck radio',
    pillTitle: 'हॉर्न बजाओ, साइड लो!',
    pillSub: 'TRUCK RADIO',
    subQuote: 'Raat ka safar aur 90s ke dard bhare geet.',
    themeColor: '#ec4899',
    theme: 'pink',
    bg: 'https://images.unsplash.com/photo-1558981852-426c373d4a83?w=1920&q=85',
    tracks: [
      { id: 'H_e90zbRzpg', title: 'Kal Ho Naa Ho', artist: 'Sonu Nigam' },
      { id: 'v0_IRIFYC0k', title: 'Chitthi Aayi Hai', artist: 'Pankaj Udhas' },
      { id: 'QKfGl39ZJWI', title: 'Pardesi Pardesi', artist: 'Kumar Sanu, Alka Yagnik' },
      { id: '3Z_x7vBqr6E', title: 'Tum Dil Ki Dhadkan', artist: 'Kumar Sanu' },
      { id: 'pKsD2GiQhOo', title: 'Dheere Dheere Se', artist: 'Kumar Sanu' },
    ],
    quotes: [
      { title: 'रात का ढाबा, गरम परांठा!', sub: 'DHABA VIBES' },
      { title: 'गाड़ी 100 की स्पीड पर है!', sub: 'HIGHWAY NIGHT' },
      { title: 'पुराने नगमे, सीधा दिल पर!', sub: '90S DARD' },
    ],
  },
];

// Backwards compatibility aliases
export type World = ThemeWorld;
export const WORLDS = THEMES;
export const DEFAULT_WORLD_ID = 'bartan_time';
