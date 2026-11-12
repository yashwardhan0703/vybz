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
    id: 'sufi_ghazal',
    name: 'Sufi & Sukoon',
    nameHindi: 'सूफी और सुकून',
    subtitle: 'ROOHANI SUKOON AUR DIL SE GHAZAL',
    tagline: 'Roohani sukoon aur dil se ghazal',
    pillTitle: 'रूह को छू ले!',
    pillSub: 'SUFI NIGHT',
    subQuote: 'Shor se door, bas ek khamosh sukoon.',
    themeColor: '#a855f7',
    theme: 'purple',
    bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=85',
    tracks: [
      { id: 'UIPXHsUXVH0', title: 'Ye Jo Halka Halka Suroor Hai', artist: 'Nusrat Fateh Ali Khan' },
      { id: '2F7G9bOIwlk', title: 'Afreen Afreen', artist: 'Nusrat Fateh Ali Khan' },
      { id: 'q4NVp-aFZSw', title: 'Tumhein Dillagi', artist: 'Nusrat Fateh Ali Khan' },
      { id: 'neqk34rPJfU', title: 'Sanu Ik Pal Chain Na Aave', artist: 'Nusrat Fateh Ali Khan' },
      { id: 'ocMEmQ3s8qE', title: 'Kise Da Yaar Na Vichre', artist: 'Nusrat Fateh Ali Khan' },
      { id: 'GkejOgSZ8qw', title: 'Mast Nazron Se Allah Bachaye', artist: 'Nusrat Fateh Ali Khan' },
      { id: 'Nqwmh4WXMmo', title: 'Allah Hoo', artist: 'Nusrat Fateh Ali Khan' },
      { id: '0gPGyTvkUus', title: 'Tere Bin Nahi Lagda', artist: 'Nusrat Fateh Ali Khan' },
      { id: 'qoqlJGOQtuQ', title: 'Mera Piya Ghar Aaya', artist: 'Nusrat Fateh Ali Khan' },
      { id: 'a18py61_F_w', title: 'Tajdar-e-Haram', artist: 'Atif Aslam' },
      { id: 'iv7lcUkFVSc', title: 'O Re Piya', artist: 'Rahat Fateh Ali Khan' },
      { id: 'iasxMdSu7Jo', title: 'Jiya Dhadak Dhadak Jaye', artist: 'Rahat Fateh Ali Khan' },
      { id: 'CWfCp96-yck', title: 'Teri Ore', artist: 'Rahat Fateh Ali Khan, Shreya Ghoshal' },
      { id: 'T94PHkuydcw', title: 'Kun Faya Kun', artist: 'A.R. Rahman, Javed Ali, Mohit Chauhan' },
      { id: '4YbAaRFk70o', title: 'Khwaja Mere Khwaja', artist: 'A.R. Rahman' },
      { id: 'dXdD1_AGBZg', title: 'Arziyan', artist: 'Javed Ali, Kailash Kher' },
      { id: 'T2kwiAC3nkg', title: 'Piya Haji Ali', artist: 'A.R. Rahman' },
      { id: 'TuUVVKVdZm4', title: 'Saiyyan', artist: 'Kailash Kher' },
      { id: 'zZasH6qkn8M', title: 'Teri Deewani', artist: 'Kailash Kher' },
      { id: '3281U9o9J3g', title: 'Chaandan Mein', artist: 'Kailash Kher' },
      { id: 'xY2P6IAd0MI', title: 'Jhuki Jhuki Si Nazar', artist: 'Jagjit Singh' },
      { id: 'ag3ENMEV89o', title: 'Hoshwalon Ko Khabar Kya', artist: 'Jagjit Singh' },
      { id: 'sBBzwoSngGg', title: 'Chitthi Na Koi Sandesh', artist: 'Jagjit Singh' },
      { id: '8MN2bxMiB9A', title: 'Koi Fariyaad', artist: 'Jagjit Singh' },
      { id: 'Ee5sDeaNCnw', title: 'Hothon Se Chhu Lo Tum', artist: 'Jagjit Singh' },
    ],
    quotes: [
      { title: 'रूह को छूने वाली धुन!', sub: 'ROOHANI' },
      { title: 'दिलों का कारवां!', sub: 'SUKOON' },
      { title: 'रात की तन्हाई और सूफी नगमे!', sub: 'LATE NIGHT' },
    ],
  },
  {
    id: 'chai_tapri',
    name: 'Chai Tapri',
    nameHindi: 'चाय टपरी',
    subtitle: 'GARAM CHAI AUR PURANE GAANE',
    tagline: 'Garam chai aur purane gaane',
    pillTitle: 'एक कड़क चाय हो जाए!',
    pillSub: 'TAPRI SPECIAL',
    subQuote: 'Chai ke bina baat aage nahi badhti.',
    themeColor: '#f97316',
    theme: 'orange',
    bg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=85',
    tracks: [
      { id: 'YwcRJbaQkFU', title: 'O Mere Dil Ke Chain', artist: 'Kishore Kumar' },
      { id: 'AMuRRXCuy-4', title: 'Pal Pal Dil Ke Paas', artist: 'Kishore Kumar' },
      { id: 'L4_b0ulPqdo', title: 'Likhe Jo Khat Tujhe', artist: 'Mohammed Rafi' },
      { id: 'vS_JXshiu68', title: 'Ek Ajnabee Haseena Se', artist: 'Kishore Kumar' },
      { id: 'wtfRQ76-I7k', title: 'Pyaar Deewana Hota Hai', artist: 'Kishore Kumar' },
      { id: 'cIVkYSm7Orw', title: 'Kya Hua Tera Wada', artist: 'Mohammed Rafi' },
      { id: '1DwROkoAAcI', title: 'Musafir Hoon Yaaron', artist: 'Kishore Kumar' },
      { id: 'W65lyLhUpNw', title: 'Aane Wala Pal', artist: 'Kishore Kumar' },
      { id: 'eVnG_Rqfgg4', title: 'Neele Neele Ambar Par', artist: 'Kishore Kumar' },
      { id: '6Z3DO-OFIjQ', title: 'Gulabi Aankhen', artist: 'Mohammed Rafi' },
      { id: 'dkqU7aq82XQ', title: 'Chura Liya Hai Tumne', artist: 'Asha Bhosle, Mohammed Rafi' },
      { id: 'dWqb-WqbGh8', title: 'O Sanam', artist: 'Lucky Ali' },
      { id: 'ecPMVO7JuTo', title: 'Dooba Dooba', artist: 'Silk Route' },
      { id: 'sOhESxhibAM', title: 'Safarnama', artist: 'Lucky Ali' },
      { id: '64KSVbMDr0c', title: 'Tanha Dil', artist: 'Shaan' },
      { id: 'lwLVJ0E8gN4', title: 'Kabira (Encore)', artist: 'Arijit Singh, Harshdeep Kaur' },
      { id: '2mWaqsC3U7k', title: 'Phir Se Ud Chala', artist: 'Mohit Chauhan' },
      { id: 'R0XjwtP_iTY', title: 'Khaabon Ke Parinday', artist: 'Alyssa Mendonsa, Mohit Chauhan' },
      { id: 'e44meSqTkH0', title: 'Ghar', artist: 'Mohit Chauhan, Niran Jan Pathak' },
      { id: 'HbQud4yWoog', title: 'Aahista', artist: 'Pankaj Udhas' },
      { id: '_d2Yux449ds', title: 'Tu Jaane Na', artist: 'Atif Aslam' },
      { id: 'jI7FFN4wW5E', title: 'Tu Bin Bataye', artist: 'Madhushree, Naresh Iyer' },
      { id: 'mzxHflxI-es', title: 'Zindagi Ek Safar Hai Suhana', artist: 'Kishore Kumar' },
      { id: 'HoDgYV1NzAI', title: 'Dil Chahta Hai', artist: 'Shankar Mahadevan' },
      { id: '7KKVb0_IdD4', title: 'Aankhon Mein Teri', artist: 'KK' },
    ],
    quotes: [
      { title: 'एक चाय हो जाए!', sub: 'TAPRI VIBES' },
      { title: 'बिस्कुट डुबा के खाओ!', sub: 'CHAI LOVER' },
      { title: 'शाम की चाय, सुकून ही सुकून!', sub: 'DESI MOOD' },
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
      { id: 'cNV5hLSa9H8', title: 'Tujhe Dekha Toh', artist: 'Kumar Sanu, Lata Mangeshkar' },
      { id: 'G4404nb2CNY', title: 'Pehla Nasha', artist: 'Udit Narayan, Sadhana Sargam' },
      { id: 'KeyfUuXPOcY', title: 'Dheere Dheere Se Meri Zindagi', artist: 'Kumar Sanu, Anuradha Paudwal' },
      { id: 'y5QM3rIygjw', title: 'Mera Dil Bhi Kitna Pagal Hai', artist: 'Kumar Sanu, Alka Yagnik' },
      { id: 'DkW47igiJtw', title: 'Tum Dil Ki Dhadkan Mein', artist: 'Abhijeet, Alka Yagnik' },
      { id: 'Swlik5Hfu-A', title: 'Pardesi Pardesi', artist: 'Udit Narayan, Alka Yagnik' },
      { id: 'Yqj1_V90KJo', title: 'Chura Ke Dil Mera', artist: 'Kumar Sanu, Alka Yagnik' },
      { id: 'rqEjOLu105I', title: 'Bahut Pyar Karte Hain', artist: 'S. P. Balasubrahmanyam' },
      { id: 'OgocnLh9P1M', title: 'Aankh Hai Bhari Bhari', artist: 'Kumar Sanu' },
      { id: 'htMvfOfixuM', title: 'Ek Ladki Ko Dekha', artist: 'Kumar Sanu' },
      { id: 'HgYiNVNsHwE', title: 'Gazab Ka Hai Din', artist: 'Udit Narayan, Alka Yagnik' },
      { id: '2hpBJd-YcpI', title: 'Aankhon Ki Gustakhiyan', artist: 'Kumar Sanu, Kavita Krishnamurthy' },
      { id: 'hw_HpTI_Wkw', title: 'Ho Gaya Hai Tujhko', artist: 'Udit Narayan, Lata Mangeshkar' },
      { id: 'LfLu4-jMsjU', title: 'Kuch Kuch Hota Hai', artist: 'Udit Narayan, Alka Yagnik' },
      { id: 'Foh01tG09Nk', title: 'Koi Mil Gaya', artist: 'Udit Narayan, Kavita Krishnamurthy' },
      { id: '3IorF5bX270', title: 'Ae Mere Humsafar', artist: 'Udit Narayan, Alka Yagnik' },
      { id: '3C4sUKbEKrw', title: 'Raja Ko Rani Se', artist: 'Udit Narayan, Alka Yagnik' },
      { id: '-NCdeldQLFc', title: 'Dil To Pagal Hai', artist: 'Udit Narayan, Lata Mangeshkar' },
      { id: 'IsPOtygII-Q', title: 'Bholi Si Surat', artist: 'Udit Narayan, Lata Mangeshkar' },
      { id: 'vzlXfZlH5dk', title: 'Main Koi Aisa Geet Gaoon', artist: 'Abhijeet, Alka Yagnik' },
      { id: 'VMsn5-a45-s', title: 'Tip Tip Barsa Paani', artist: 'Udit Narayan, Alka Yagnik' },
      { id: 'qeOfhT44XWg', title: 'Tan Tana Tan Tan', artist: 'Abhijeet, Poornima' },
      { id: 'kE5BGrVcPok', title: 'O O Jaane Jaana', artist: 'Kamaal Khan' },
      { id: 'fN7YPMwlT6Y', title: 'Chaiyya Chaiyya', artist: 'Sukhwinder Singh, Sapna Awasthi' },
      { id: 'rY_0SOlmrdY', title: 'Ankhiyon Se Goli Maare', artist: 'Sonu Nigam, Jaspinder Narula' },
    ],
    quotes: [
      { title: 'भैया पीछे से छोटे कर दूँ?', sub: 'USTAAD JI' },
      { title: 'दाढ़ी में फिटकरी लगाऊँ?', sub: 'SALON VIBES' },
      { title: 'नवरत्न तेल से चंपी कराओ!', sub: 'HEAD MASSAGE' },
    ],
  },
  {
    id: 'monsoon_barish',
    name: 'Monsoon Baarish',
    nameHindi: 'रिमझिम बारिश',
    subtitle: 'BARKHA, CHAI AUR ROMANTIC GEET',
    tagline: 'Barkha, chai aur romantic geet',
    pillTitle: 'रिमझिम फुहारें!',
    pillSub: 'RAINY VIBES',
    subQuote: 'Khidki par barish ki boondein aur purane gaane.',
    themeColor: '#38bdf8',
    theme: 'sky',
    bg: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1920&q=85',
    tracks: [
      { id: 'JQoSSJDZxOo', title: 'Rimjhim Gire Sawan', artist: 'Kishore Kumar' },
      { id: 'PJWemSzExXs', title: 'Baarishein', artist: 'Anuv Jain' },
      { id: 'asw-wTDzGUQ', title: 'Barso Re', artist: 'Shreya Ghoshal' },
      { id: 'GmCn31pq8i0', title: 'Ghanan Ghanan', artist: 'A.R. Rahman, Alka Yagnik' },
      { id: 'pkV4VbjIcCo', title: 'Bhaage Re Mann', artist: 'Sunidhi Chauhan' },
      { id: 'BVDqS_UxWz0', title: 'Kabhi Jo Baadal Barse', artist: 'Arijit Singh' },
      { id: 'f6vY6tYvKGA', title: 'Cham Cham', artist: 'Monali Thakur' },
      { id: 'shHcbTJHlKU', title: 'Sawan Barse', artist: 'Hariharan, Sadhana Sargam' },
      { id: 'JiXOWlEM0-o', title: 'Aaj Rapat Jaayen', artist: 'Kishore Kumar, Asha Bhosle' },
      { id: 'aSJ_jcEPOu0', title: 'Aaj Mausam Bada Beimaan Hai', artist: 'Mohammed Rafi' },
      { id: 'nYdHqEyZpdk', title: 'Rim Jhim Rim Jhim', artist: 'Kumar Sanu, Kavita Krishnamurthy' },
      { id: 'FPsDQUboH8M', title: 'Zoobi Doobi', artist: 'Sonu Nigam, Shreya Ghoshal' },
      { id: 'Umqb9KENgmk', title: 'Tum Hi Ho', artist: 'Arijit Singh' },
      { id: 'XBr11cQDg-E', title: 'Kaisi Hai Yeh Rut', artist: 'Srinivas' },
      { id: 'B5_6jfGsyjA', title: 'Sawan Aaya Hai', artist: 'Arijit Singh' },
      { id: 'WLzDlKSMKY0', title: 'Ab Ke Sawan', artist: 'Shubha Mudgal' },
      { id: 'v4h5iPlxj0c', title: 'Dekho Na', artist: 'Sonu Nigam, Sunidhi Chauhan' },
      { id: 'EiItLWWxgOI', title: 'Paani Da Rang', artist: 'Ayushmann Khurrana' },
      { id: 'cmMiyZaSELo', title: 'Khuda Jaane', artist: 'KK, Shilpa Rao' },
      { id: '8SYPKQMW_2Q', title: 'Tu Hai Toh', artist: 'Vishal Mishra' },
      { id: 'BNfAf4To73c', title: 'Baarish', artist: 'Ash King, Shashaa Tirupati' },
      { id: 'QCXaa1mEUK0', title: 'Hawa Banke', artist: 'Darshan Raval' },
      { id: 'nrqKoe7Moe8', title: 'Shaam Bhi Khoob Hai', artist: 'Kumar Sanu, Udit Narayan' },
      { id: 'Cw6icm3-mvA', title: 'Sawaar Loon', artist: 'Monali Thakur' },
      { id: '-RAsJ6dAF68', title: 'Phir Le Aya Dil (Reprise)', artist: 'Arijit Singh' },
    ],
    quotes: [
      { title: 'गरमा-गरम पकौड़े और चाय!', sub: 'BARISH SPECIAL' },
      { title: 'मिट्टी की सोंधी खुशबू!', sub: 'PETRICHOR' },
      { title: 'बारिश और बेहिसाब यादें!', sub: 'NOSTALGIA' },
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
    subQuote: 'Raat ka safar aur desi Punjabi energy.',
    themeColor: '#ec4899',
    theme: 'pink',
    bg: 'https://images.unsplash.com/photo-1558981852-426c373d4a83?w=1920&q=85',
    tracks: [
      { id: '92ydUdqWE1g', title: 'Tunak Tunak Tun', artist: 'Daler Mehndi' },
      { id: 'lhVceZE1lf4', title: 'Bolo Ta Ra Ra', artist: 'Daler Mehndi' },
      { id: 'vDolreuYdhA', title: 'Na Na Na Re', artist: 'Daler Mehndi' },
      { id: '-99Z8E1pOrs', title: 'Ishq Tera Tadpave', artist: 'Sukhbir' },
      { id: '-99Z8E1pOrs', title: 'Oh Ho Ho Ho', artist: 'Sukhbir' },
      { id: 'x9WO2ieJMYk', title: 'Mundian To Bach Ke', artist: 'Panjabi MC' },
      { id: 'CtJNQFKyZJ0', title: 'Khao Piyo Aish Karo', artist: 'Mika Singh' },
      { id: 'OPLHEkHXRwg', title: 'Dum Mast Kalandar', artist: 'Runa Laila' },
      { id: 'RRzmNAksTDQ', title: 'Gaddi Modange', artist: 'Amrinder Gill' },
      { id: 'LYEqeUr-158', title: 'Sauda Khara Khara', artist: 'Diljit Dosanjh, Sukhbir' },
      { id: 'w_HaezV0DqI', title: 'Sadi Gali', artist: 'Lehmber Hussainpuri' },
      { id: 'GVhmynWOPoM', title: 'Proper Patola', artist: 'Diljit Dosanjh, Badshah' },
      { id: 'hzTg4zPBtDU', title: '3 Peg', artist: 'Sharry Mann' },
      { id: 'VNs_cCtdbPc', title: 'Brown Munde', artist: 'AP Dhillon, Gurinder Gill' },
      { id: 'vX2cDW8LUWk', title: 'Excuses', artist: 'AP Dhillon, Gurinder Gill' },
      { id: 'dCmp56tSSmA', title: 'Born To Shine', artist: 'Diljit Dosanjh' },
      { id: 'cl0a3i2wFcc', title: 'GOAT', artist: 'Diljit Dosanjh' },
      { id: 'uuCFRaFWjwY', title: 'Amplifier', artist: 'Imran Khan' },
      { id: 'YEf_hnXBbyI', title: 'Angreji Beat', artist: 'Yo Yo Honey Singh, Gippy Grewal' },
      { id: 'fbwCgt1hMD4', title: 'Lungi Dance', artist: 'Yo Yo Honey Singh' },
      { id: 'KhnVcAC5bIM', title: 'Desi Kalakaar', artist: 'Yo Yo Honey Singh' },
      { id: 'M3UDnXE8m3A', title: 'Dardi Rab Rab Kardi', artist: 'Daler Mehndi' },
      { id: '_2XqcdqTaFo', title: 'Nagada Nagada', artist: 'Sonu Nigam, Javed Ali' },
      { id: 'xWi8nDUjHGA', title: 'Dil Chori', artist: 'Yo Yo Honey Singh, Simar Kaur' },
      { id: 'h7My5XUfXXk', title: 'Goli Maar Bheje Mein', artist: 'Vinod Rathod' },
    ],
    quotes: [
      { title: 'रात का ढाबा, गरम परांठा!', sub: 'DHABA VIBES' },
      { title: 'गाड़ी 100 की स्पीड पर है!', sub: 'HIGHWAY NIGHT' },
      { title: 'पुराने नगमे, सीधा दिल पर!', sub: 'DESI BEATS' },
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
      { id: 'BmUe3-sfr7E', title: 'Kasoor', artist: 'Prateek Kuhad' },
      { id: 'vA86QFrXoho', title: 'Alag Aasmaan', artist: 'Anuv Jain' },
      { id: 'D_qjmHvD8m8', title: 'Waqt Ki Baatein', artist: 'Dream Note' },
      { id: 'vt4jX0iRgCg', title: 'Kho Gaye Hum Kahan', artist: 'Jasleen Royal, Prateek Kuhad' },
      { id: 'gJLVTKhTnog', title: 'Husn', artist: 'Anuv Jain' },
      { id: 'SmaY7RfBgas', title: 'Gul', artist: 'Anuv Jain' },
      { id: '9et5qzuzbQM', title: 'Riha', artist: 'Anuv Jain' },
      { id: 'Il7Nv270zNk', title: 'cold/mess', artist: 'Prateek Kuhad' },
      { id: 'sFMRqxCexDk', title: 'Choo Lo', artist: 'The Local Train' },
      { id: 'U77d9912lrw', title: 'Aaftaab', artist: 'The Local Train' },
      { id: 'qLCLvzTGFVM', title: 'Dil Mere', artist: 'The Local Train' },
      { id: 'GqagMyq2hGQ', title: 'Tune Kaha', artist: 'Prateek Kuhad' },
      { id: 'tL8Z4s4mO4c', title: 'Iktara', artist: 'Kavita Seth, Amit Trivedi' },
      { id: 'fFyXcX-s0C8', title: 'Shaam', artist: 'Amit Trivedi, Nikhil D\'Souza' },
      { id: '-P7M0Y635eg', title: 'Aahatein', artist: 'Agnee' },
      { id: 'zpf8hrbT2d0', title: 'Tu Kisi Rail Si', artist: 'Swanand Kirkire' },
      { id: 'QGinK1vaK5M', title: 'Kahin Toh', artist: 'Rashid Ali, Vasundhara Das' },
      { id: '4r6k2ms9AHg', title: 'Phir Wahi', artist: 'Arijit Singh' },
      { id: 'jh66Pjtqr4k', title: 'Aabaad Barbaad', artist: 'Arijit Singh' },
      { id: 'ZJfT5W9gFPU', title: 'Kasam Se', artist: 'The Yellow Diary' },
      { id: '2zjboLjIt8w', title: 'Marz', artist: 'The Yellow Diary' },
      { id: 'A_dfcNg2MOg', title: 'Buniyaad', artist: 'The Yellow Diary' },
      { id: '1e9B31FLT-s', title: 'Experience', artist: 'Ludovico Einaudi' },
      { id: '7maJOI3QMu0', title: 'River Flows in You', artist: 'Yiruma' },
      { id: 'UfcAVejslrU', title: 'Weightless', artist: 'Marconi Union' },
    ],
    quotes: [
      { title: 'चलो भाई, स्टैंडअप कॉल है!', sub: 'DAILY STANDUP' },
      { title: 'बस ये बग फिक्स हो जाए!', sub: 'BUG FIXING' },
      { title: 'कॉफी खत्म, फिर से बनाओ!', sub: 'CAFFEINE RUSH' },
    ],
  },
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
      { id: '2gcsgfzqN8k', title: 'Zingaat', artist: 'Ajay-Atul' },
      { id: 'udra3Mfw2oo', title: 'London Thumakda', artist: 'Labh Janjua, Sonu Kakkar' },
      { id: 'k4yXQkG2s1E', title: 'Kala Chashma', artist: 'Amar Arshi, Badshah' },
      { id: 'jCEdTq3j-0U', title: 'Gallan Goodiyaan', artist: 'Yashita Sharma, Shankar Mahadevan' },
      { id: 'PaDaoNnOQaM', title: 'Mauja Hi Mauja', artist: 'Mika Singh' },
      { id: 'II2EO3Nw4m0', title: 'Badtameez Dil', artist: 'Benny Dayal' },
      { id: 'P1fIdFRnfqw', title: 'What Jhumka?', artist: 'Arijit Singh, Jonita Gandhi' },
      { id: 'aHSyRPBYTc4', title: 'Gulaabo', artist: 'Vishal Dadlani, Amit Trivedi' },
      { id: 'Bea019pOw5w', title: 'Kar Gayi Chull', artist: 'Badshah, Fazilpuria' },
      { id: '6t5N7TjP-gg', title: 'Abhi Toh Party Shuru Hui Hai', artist: 'Badshah, Aastha Gill' },
      { id: 'vP_KFm4ho6M', title: 'Nachde Ne Saare', artist: 'Jasleen Royal, Harshdeep Kaur' },
      { id: '_KhQT-LGb-4', title: 'Aankh Marey', artist: 'Neha Kakkar, Mika Singh' },
      { id: 'wDIrpvH8MzE', title: 'Desi Girl', artist: 'Shankar Mahadevan, Sunidhi Chauhan' },
      { id: '0fXlZ3vnQd0', title: 'Saturday Saturday', artist: 'Indeep Bakshi, Badshah' },
      { id: 'pElk1ShPrcE', title: 'Ainvayi Ainvayi', artist: 'Salim Merchant, Sunidhi Chauhan' },
      { id: 'zE7Pwgl6sLA', title: 'Fevicol Se', artist: 'Mamta Sharma, Wajid' },
      { id: 'ZTmF2v59CtI', title: 'Sheila Ki Jawani', artist: 'Sunidhi Chauhan' },
      { id: 'H0uL9-8nUCk', title: 'Chikni Chameli', artist: 'Shreya Ghoshal' },
      { id: '1j5aaDOA9XQ', title: 'Dhating Naach', artist: 'Nakkash Aziz, Neha Kakkar' },
      { id: 'HyHDyw71cqw', title: 'The Disco Song', artist: 'Benny Dayal, Sunidhi Chauhan' },
      { id: 'dv_Qjzca56k', title: 'Jumme Ki Raat', artist: 'Mika Singh, Salman Khan' },
      { id: 'TLnwqAarPkM', title: 'Let\'s Nacho', artist: 'Badshah, Benny Dayal' },
      { id: '7TRFf7uUfhQ', title: 'Swag Se Swagat', artist: 'Vishal Dadlani, Neha Bhasin' },
      { id: 'EEX_XM6SxmY', title: 'Tamma Tamma Again', artist: 'Bappi Lahiri, Anuradha Paudwal' },
      { id: '_tEjIYtGBwc', title: 'Nashe Si Chadh Gayi', artist: 'Arijit Singh' },
    ],
    quotes: [
      { title: 'बर्तन धो लो!', sub: 'GHAR ITNE' },
      { title: 'झाड़ू-पोछा हो गया?', sub: 'MUMMY CALL' },
      { title: 'कढ़ाई पर ज़रा ज़ोर लगाओ!', sub: 'CHORE MOOD' },
      { title: 'काम खत्म, चाय शुरू!', sub: 'REWARD TIME' },
    ],
  },
  {
  "id": "alfaaz_ehsaas",
  "name": "Alfaaz & Ehsaas",
  "nameHindi": "अल्फ़ाज़ और अहसास",
  "subtitle": "URDU INDIE, MELLOW ACOUSTIC & POETIC VIBES",
  "tagline": "Deep Urdu poetry, viral indie melodies aur late night ehsaas",
  "pillTitle": "अल्फ़ाज़ जो दिल छू लें!",
  "pillSub": "URDU INDIE",
  "subQuote": "Kuch baatein jo sirf shayari aur dhun me bayaan hoti hain.",
  "themeColor": "#38bdf8",
  "theme": "sky",
  "bg": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=85",
  "tracks": [
    {
      "id": "cQq6iLF66Gc",
      "title": "Alfaaz",
      "artist": "Hamza Malik x Zain Zohaib"
    },
    {
      "id": "-2RAq5o5pwc",
      "title": "Jhol",
      "artist": "Maanu x Annural Khalid"
    },
    {
      "id": "-EhOs3Ol-v4",
      "title": "Khasara",
      "artist": "Abdul Hannan & Samar Jafri"
    },
    {
      "id": "EiiOYwqk3A0",
      "title": "Faasle",
      "artist": "Aditya Rikhari"
    },
    {
      "id": "_XBVWlI8TsQ",
      "title": "Kahani Suno 2.0",
      "artist": "Kaifi Khalil"
    },
    {
      "id": "Qwm6BSGrOq0",
      "title": "Iraaday",
      "artist": "Abdul Hannan x Rovalio"
    },
    {
      "id": "aRzbHxJZSTo",
      "title": "Bikhra",
      "artist": "Abdul Hannan x Rovalio"
    },
    {
      "id": "A7NDb0iDZd0",
      "title": "Tu Hai Kahan",
      "artist": "AUR"
    },
    {
      "id": "SmaY7RfBgas",
      "title": "Gul",
      "artist": "Anuv Jain"
    },
    {
      "id": "gJLVTKhTnog",
      "title": "Husn",
      "artist": "Anuv Jain"
    },
    {
      "id": "5Eqb_-j3FDA",
      "title": "Pasoori",
      "artist": "Ali Sethi x Shae Gill"
    },
    {
      "id": "jIQ0Dx-4peE",
      "title": "Gumaan",
      "artist": "Young Stunners"
    },
    {
      "id": "ijE2MMtzkHg",
      "title": "Afsanay",
      "artist": "Young Stunners"
    },
    {
      "id": "9-Vc4xmTZKk",
      "title": "Downers At Dusk",
      "artist": "Talha Anjum"
    },
    {
      "id": "PJWemSzExXs",
      "title": "Baarishein",
      "artist": "Anuv Jain"
    },
    {
      "id": "6DtPF9W3ejI",
      "title": "Jo Tu Na Mila",
      "artist": "Asim Azhar"
    },
    {
      "id": "wS7wz14Q4Yg",
      "title": "Aisy Kaisay",
      "artist": "Hasan Raheem"
    },
    {
      "id": "dB0AFSUl2Vk",
      "title": "Peechay Hutt",
      "artist": "Hasan Raheem x Justin Bibis"
    },
    {
      "id": "zQDAi8tI-cU",
      "title": "Kana Yaari",
      "artist": "Kaifi Khalil x Eva B"
    },
    {
      "id": "LZymeRtax3Q",
      "title": "Gal Sun",
      "artist": "Shamoon Ismail"
    },
    {
      "id": "vA86QFrXoho",
      "title": "Alag Aasmaan",
      "artist": "Anuv Jain"
    },
    {
      "id": "zx0YGEi32r0",
      "title": "Mazaak",
      "artist": "Anuv Jain"
    },
    {
      "id": "b-K4oDRk04M",
      "title": "Waqt Ki Baatein",
      "artist": "Dream Note"
    },
    {
      "id": "sFMRqxCexDk",
      "title": "Choo Lo",
      "artist": "The Local Train"
    },
    {
      "id": "bu0ffB9uPuw",
      "title": "Tajdar-e-Haram",
      "artist": "Atif Aslam"
    }
  ],
  "quotes": [
    {
      "title": "दिलों के अनकहे अल्फ़ाज़!",
      "sub": "EHSAAS"
    },
    {
      "title": "गहरी शायरी और मद्धम धुन!",
      "sub": "SHAYARI"
    },
    {
      "title": "रात का सन्नाटा और सुकून!",
      "sub": "MIDNIGHT"
    }
  ]
},
  {
  "id": "hostel_ki_raat",
  "name": "Hostel Ki Raat",
  "nameHindi": "होस्टल की रात",
  "subtitle": "MAGGI, GUITAR JAMS & COLLEGE NOSTALGIA",
  "tagline": "Late night assignments, 2 AM maggi aur hostel room guitar jamming",
  "pillTitle": "होस्टल की यादें!",
  "pillSub": "MAGGI JAM",
  "subQuote": "Doston ki mehfil, ek cup chai aur yaadon ka silsila.",
  "themeColor": "#f97316",
  "theme": "orange",
  "bg": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=85",
  "tracks": [
    {
      "id": "dWqb-WqbGh8",
      "title": "O Sanam",
      "artist": "Lucky Ali"
    },
    {
      "id": "sOhESxhibAM",
      "title": "Safarnama",
      "artist": "Lucky Ali"
    },
    {
      "id": "sFMRqxCexDk",
      "title": "Choo Lo",
      "artist": "The Local Train"
    },
    {
      "id": "i96UO8-GFvw",
      "title": "Aaoge Tum Kabhi",
      "artist": "The Local Train"
    },
    {
      "id": "U77d9912lrw",
      "title": "Aaftaab",
      "artist": "The Local Train"
    },
    {
      "id": "Il7Nv270zNk",
      "title": "Cold/Mess",
      "artist": "Prateek Kuhad"
    },
    {
      "id": "BmUe3-sfr7E",
      "title": "Kasoor",
      "artist": "Prateek Kuhad"
    },
    {
      "id": "vt4jX0iRgCg",
      "title": "Kho Gaye Hum Kahan",
      "artist": "Jasleen Royal & Prateek Kuhad"
    },
    {
      "id": "fdubeMFwuGs",
      "title": "Ilahi",
      "artist": "Arijit Singh"
    },
    {
      "id": "6vKucgAeF_Q",
      "title": "Matargashti",
      "artist": "Mohit Chauhan"
    },
    {
      "id": "SS3lIQdKP-A",
      "title": "Masakali",
      "artist": "Mohit Chauhan"
    },
    {
      "id": "aHEbLVElUwY",
      "title": "Hairat",
      "artist": "Lucky Ali"
    },
    {
      "id": "L3QrecTSn5A",
      "title": "Na Tum Jano Na Hum",
      "artist": "Lucky Ali"
    },
    {
      "id": "e44meSqTkH0",
      "title": "Ghar",
      "artist": "Bharat Chauhan"
    },
    {
      "id": "LCfvYo3ILG0",
      "title": "Yaaron",
      "artist": "KK"
    },
    {
      "id": "NUqlCJTYu6I",
      "title": "Pal",
      "artist": "KK"
    },
    {
      "id": "lbCRtrrMvSw",
      "title": "Give Me Some Sunshine",
      "artist": "Suraj Jagan & Sharman Joshi"
    },
    {
      "id": "ewvddSUEONQ",
      "title": "Behti Hawa Sa Tha Woh",
      "artist": "Shaan"
    },
    {
      "id": "mgF6SGtEr6g",
      "title": "Dil Chahta Hai",
      "artist": "Shankar Mahadevan"
    },
    {
      "id": "50XjXNsK0Dc",
      "title": "Jaane Kyun",
      "artist": "Vishal Dadlani"
    },
    {
      "id": "poYtscS7bto",
      "title": "Tum Ho Toh",
      "artist": "Farhan Akhtar"
    },
    {
      "id": "dnXGxMlV-rU",
      "title": "Socha Hai",
      "artist": "Farhan Akhtar"
    },
    {
      "id": "vNSwdLu_ieI",
      "title": "Sham",
      "artist": "Amit Trivedi"
    },
    {
      "id": "ZlOZktsODpA",
      "title": "Iktara",
      "artist": "Kavita Seth"
    },
    {
      "id": "R0XjwtP_iTY",
      "title": "Khaabon Ke Parindey",
      "artist": "Mohit Chauhan"
    }
  ],
  "quotes": [
    {
      "title": "2 AM मैगी और गिटार!",
      "sub": "MAGGI JAM"
    },
    {
      "title": "दोस्ती और पुराने अफ़साने!",
      "sub": "YAARI"
    },
    {
      "title": "होस्टल का वो पुराना कमरा!",
      "sub": "NOSTALGIA"
    }
  ]
},
  {
  "id": "train_ki_khidki",
  "name": "Train Ki Khidki",
  "nameHindi": "ट्रेन की खिड़की",
  "subtitle": "WINDOW SEAT, MOVING TREES & SAFAR NOSTALGIA",
  "tagline": "Sleeper coach ki window seat, thandi hawa aur safar ke purane gaane",
  "pillTitle": "खिड़की वाली सीट!",
  "pillSub": "WINDOW SEAT",
  "subQuote": "Manzil se zyada khoobsurat yeh safar hai.",
  "themeColor": "#10b981",
  "theme": "emerald",
  "bg": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=85",
  "tracks": [
    {
      "id": "9MX-QejdVaQ",
      "title": "Chaiyya Chaiyya",
      "artist": "Sukhwinder Singh"
    },
    {
      "id": "deTVgOf2cWs",
      "title": "Kasto Mazza",
      "artist": "Sonu Nigam & Shreya Ghoshal"
    },
    {
      "id": "eEeX2QMlSlo",
      "title": "Yun Hi Chala Chal",
      "artist": "Udit Narayan & Hariharan"
    },
    {
      "id": "mZRJfQluJTM",
      "title": "Phoolon Ke Rang Se",
      "artist": "Kishore Kumar"
    },
    {
      "id": "cHLgOcsngTI",
      "title": "Musafir Hoon Yaaron",
      "artist": "Kishore Kumar"
    },
    {
      "id": "LlvoY4v5zm0",
      "title": "Zindagi Ek Safar Hai Suhana",
      "artist": "Kishore Kumar"
    },
    {
      "id": "m4o0jUEVtoQ",
      "title": "Gaadi Bula Rahi Hai",
      "artist": "Kishore Kumar"
    },
    {
      "id": "UlWAjd9bcKw",
      "title": "Mere Sapnon Ki Rani",
      "artist": "Kishore Kumar"
    },
    {
      "id": "lbfWsIpXsCA",
      "title": "Yeh Shaam Mastani",
      "artist": "Kishore Kumar"
    },
    {
      "id": "fdubeMFwuGs",
      "title": "Ilahi",
      "artist": "Arijit Singh"
    },
    {
      "id": "y0O1Rt7AnPY",
      "title": "Safarnama",
      "artist": "Lucky Ali"
    },
    {
      "id": "64KSVbMDr0c",
      "title": "Tanha Dil",
      "artist": "Shaan"
    },
    {
      "id": "ZkwaiIGoyT4",
      "title": "Tanhaayee",
      "artist": "Sonu Nigam"
    },
    {
      "id": "8HDTS80dlr4",
      "title": "Patakha Guddi",
      "artist": "Nooran Sisters"
    },
    {
      "id": "xHLnZMjJ8bY",
      "title": "Maahi Ve",
      "artist": "A.R. Rahman"
    },
    {
      "id": "Isb7WV4d17I",
      "title": "Sooraj Ki Baahon Mein",
      "artist": "Clinton Cerejo"
    },
    {
      "id": "2apfulo5uqc",
      "title": "Der Lagi Lekin",
      "artist": "Shankar Mahadevan"
    },
    {
      "id": "u7hfwX81bY4",
      "title": "Aao Milo Chalo",
      "artist": "Shaan & Ustad Sultan Khan"
    },
    {
      "id": "dXpG0kavjUo",
      "title": "Yeh Ishq Hai",
      "artist": "Shreya Ghoshal"
    },
    {
      "id": "Cb6wuzOurPc",
      "title": "Tum Se Hi",
      "artist": "Mohit Chauhan"
    },
    {
      "id": "oZ7PnR_ZKRE",
      "title": "Journey Song",
      "artist": "Anupam Roy & Shreya Ghoshal"
    },
    {
      "id": "QYO6AlxiRE4",
      "title": "Subhanallah",
      "artist": "Sreerama Chandra"
    },
    {
      "id": "cYOB941gyXI",
      "title": "Hawaayein",
      "artist": "Arijit Singh"
    },
    {
      "id": "UNjhqT_hlbg",
      "title": "Chala Jata Hoon",
      "artist": "Kishore Kumar"
    },
    {
      "id": "uPR7qUMNV0k",
      "title": "Rahi Manwa Dukh Ki Chinta",
      "artist": "Mohammed Rafi"
    }
  ],
  "quotes": [
    {
      "title": "खिड़की से दिखता हिंदुस्तान!",
      "sub": "SAFAR"
    },
    {
      "title": "छूटते स्टेशन और मीठी यादें!",
      "sub": "WANDERLUST"
    },
    {
      "title": "पटरी की आवाज़ और पुराने सुर!",
      "sub": "JOURNEY"
    }
  ]
}
];

// Backwards compatibility aliases
export type World = ThemeWorld;
export const WORLDS = THEMES;
export const DEFAULT_WORLD_ID = 'bartan_time';
