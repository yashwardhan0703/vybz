export interface ArtistSong {
  id: string;
  title: string;
  album?: string;
  duration?: string;
  plays?: string;
}

export interface Artist {
  id: string;
  name: string;
  tagline: string;
  avatar: string;
  banner?: string;
  monthlyListeners?: string;
  bgColor?: string;
  topTracks: ArtistSong[];
}

export const ARTISTS_CATALOG: Artist[] = [
  {
    "id": "pritam",
    "name": "Pritam",
    "tagline": "Master Composer of Modern Bollywood Hits",
    "avatar": "/artists/pritam.jpg",
    "bgColor": "#1e293b",
    "topTracks": [
      {
        "id": "BddP6PYo2gs",
        "title": "Kesariya",
        "album": "Brahmāstra",
        "duration": "4:28"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "What Jhumka?",
        "album": "Rocky Aur Rani",
        "duration": "3:33"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Channa Mereya",
        "album": "Ae Dil Hai Mushkil",
        "duration": "4:49"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Ilahi",
        "album": "Yeh Jawaani Hai Deewani",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "I Am In Love",
        "album": "Once Upon A Time In Mumbaai",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Gerua",
        "album": "Dilwale",
        "duration": "5:45"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Kabira",
        "album": "Yeh Jawaani Hai Deewani",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Badtameez Dil",
        "album": "Yeh Jawaani Hai Deewani",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Balam Pichkari",
        "album": "Yeh Jawaani Hai Deewani",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Subhanallah",
        "album": "Yeh Jawaani Hai Deewani",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Dilliwaali Girlfriend",
        "album": "Yeh Jawaani Hai Deewani",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Hawayein",
        "album": "Jab Harry Met Sejal",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Tum Mile",
        "album": "Tum Mile",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Pee Loon",
        "album": "Once Upon A Time In Mumbaai",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Tu Jaane Na",
        "album": "Ajab Prem Ki Ghazab Kahani",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Kalank Title Track",
        "album": "Kalank",
        "duration": "5:11"
      },
      {
        "id": "5uY3z5U_ayY",
        "title": "O Maahi",
        "album": "Dunki",
        "duration": "3:53"
      },
      {
        "id": "wa2NC4lOZYI",
        "title": "Lutt Putt Gaya",
        "album": "Dunki",
        "duration": "3:45"
      },
      {
        "id": "6FURuLYrR_Q",
        "title": "Ae Dil Hai Mushkil",
        "album": "Ae Dil Hai Mushkil",
        "duration": "4:29"
      },
      {
        "id": "kd5KqlmcHNo",
        "title": "The Breakup Song",
        "album": "Ae Dil Hai Mushkil",
        "duration": "4:12"
      }
    ]
  },
  {
    "id": "ar-rahman",
    "name": "A.R. Rahman",
    "tagline": "The Mozart of Madras & Academy Award Legend",
    "avatar": "/artists/ar-rahman.jpg",
    "bgColor": "#0369a1",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "c-W01X6Zz6M",
        "title": "Jai Ho",
        "album": "Slumdog Millionaire",
        "duration": "5:19"
      },
      {
        "id": "sK7riqg2mr4",
        "title": "Agar Tum Saath Ho",
        "album": "Tamasha",
        "duration": "5:41"
      },
      {
        "id": "xNqU2zPkWL8",
        "title": "Maa Tujhe Salaam",
        "album": "Vande Mataram",
        "duration": "6:12"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Tum Ho",
        "album": "Rockstar",
        "duration": "5:18"
      },
      {
        "id": "8rZ6a5B_UoI",
        "title": "Dil Se Re",
        "album": "Dil Se",
        "duration": "6:44"
      },
      {
        "id": "2Vv-BfVoq4g",
        "title": "Tere Bina",
        "album": "Guru",
        "duration": "5:09"
      },
      {
        "id": "f6vUSs4pjDY",
        "title": "Enna Sona",
        "album": "OK Jaanu",
        "duration": "3:33"
      },
      {
        "id": "O-zfZ3Uf_c8",
        "title": "Jashn-E-Bahaara",
        "album": "Jodhaa Akbar",
        "duration": "5:15"
      },
      {
        "id": "6vYn_kY-Z1Y",
        "title": "Tu Hi Re",
        "album": "Bombay",
        "duration": "7:14"
      },
      {
        "id": "Y7B0T_ZfC98",
        "title": "Khwaja Mere Khwaja",
        "album": "Jodhaa Akbar",
        "duration": "6:58"
      },
      {
        "id": "qfZ3rM7oKxQ",
        "title": "Nadaan Parinde",
        "album": "Rockstar",
        "duration": "6:26"
      },
      {
        "id": "3vK9pL_Z0aM",
        "title": "Patakha Guddi",
        "album": "Highway",
        "duration": "4:44"
      },
      {
        "id": "jR6v0Y_L7m8",
        "title": "Rehna Tu",
        "album": "Delhi-6",
        "duration": "6:51"
      },
      {
        "id": "dK_6Z9mX0aY",
        "title": "Urvashi Urvashi",
        "album": "Humse Hai Muqabla",
        "duration": "5:39"
      },
      {
        "id": "vK_0Y_7mZ9o",
        "title": "Roja Janeman",
        "album": "Roja",
        "duration": "5:06"
      },
      {
        "id": "8Z_0mX_K7aM",
        "title": "Radha Kaise Na Jale",
        "album": "Lagaan",
        "duration": "5:34"
      },
      {
        "id": "mK_7Z9mX0aY",
        "title": "Chupke Se",
        "album": "Saathiya",
        "duration": "6:04"
      },
      {
        "id": "aK_0Y_7mZ9o",
        "title": "Luka Chuppi",
        "album": "Rang De Basanti",
        "duration": "6:37"
      }
    ]
  },
  {
    "id": "arijit-singh",
    "name": "Arijit Singh",
    "tagline": "The Undisputed Voice of Indian Romance",
    "avatar": "/artists/arijit-singh.jpg",
    "bgColor": "#854d0e",
    "topTracks": [
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Channa Mereya",
        "album": "Ae Dil Hai Mushkil",
        "duration": "4:49"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Kesariya",
        "album": "Brahmāstra",
        "duration": "4:28"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Hawayein",
        "album": "Jab Harry Met Sejal",
        "duration": "4:50"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Gerua",
        "album": "Dilwale",
        "duration": "5:45"
      },
      {
        "id": "sK7riqg2mr4",
        "title": "Agar Tum Saath Ho",
        "album": "Tamasha",
        "duration": "5:41"
      },
      {
        "id": "vMv3vK6V0j4",
        "title": "Shayad",
        "album": "Love Aaj Kal",
        "duration": "4:07"
      },
      {
        "id": "6FURuLYrR_Q",
        "title": "Ae Dil Hai Mushkil",
        "album": "Ae Dil Hai Mushkil",
        "duration": "4:29"
      },
      {
        "id": "hoNb6HuNmU0",
        "title": "Khairiyat",
        "album": "Chhichhore",
        "duration": "4:40"
      },
      {
        "id": "f6vUSs4pjDY",
        "title": "Enna Sona",
        "album": "OK Jaanu",
        "duration": "3:33"
      },
      {
        "id": "VAdGW7QDJUI",
        "title": "Chaleya",
        "album": "Jawan",
        "duration": "3:20"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "O Maahi",
        "album": "Dunki",
        "duration": "3:53"
      },
      {
        "id": "sazKnskXoQ4",
        "title": "Satranga",
        "album": "Animal",
        "duration": "4:31"
      },
      {
        "id": "ElZfdU54Cp8",
        "title": "Apna Bana Le",
        "album": "Bhediya",
        "duration": "4:21"
      },
      {
        "id": "z-diRlyUj9Y",
        "title": "Raabta (Kehte Hain Khuda)",
        "album": "Agent Vinod",
        "duration": "4:04"
      },
      {
        "id": "8iU8LPEa4o0",
        "title": "Mast Magan",
        "album": "2 States",
        "duration": "4:40"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Ilahi",
        "album": "Yeh Jawaani Hai Deewani",
        "duration": "3:50"
      },
      {
        "id": "H2f7MZUsvVE",
        "title": "Samjhawan",
        "album": "Humpty Sharma Ki Dulhania",
        "duration": "4:25"
      },
      {
        "id": "Wd2abR5ZqjM",
        "title": "Phir Bhi Tumko Chahunga",
        "album": "Half Girlfriend",
        "duration": "5:51"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "What Jhumka?",
        "album": "Rocky Aur Rani Kii Prem Kahaani",
        "duration": "3:33"
      }
    ]
  },
  {
    "id": "sachin-jigar",
    "name": "Sachin-Jigar",
    "tagline": "Hit Music Director Duo",
    "avatar": "/artists/sachin-jigar.jpg",
    "bgColor": "#475569",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Sachin-Jigar Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Sachin-Jigar Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Sachin-Jigar Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Sachin-Jigar Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Sachin-Jigar Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Sachin-Jigar Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Sachin-Jigar Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Sachin-Jigar Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Sachin-Jigar Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Sachin-Jigar Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Sachin-Jigar Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Sachin-Jigar Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Sachin-Jigar Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Sachin-Jigar Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Sachin-Jigar Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Sachin-Jigar Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Sachin-Jigar Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "vishal-shekhar",
    "name": "Vishal-Shekhar",
    "tagline": "Party Anthems & Electrifying Soundtracks",
    "avatar": "/artists/vishal-shekhar.jpg",
    "bgColor": "#334155",
    "topTracks": [
      {
        "id": "H_e90zbRzpg",
        "title": "Besharam Rang",
        "album": "Pathaan",
        "duration": "4:18"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Vishal-Shekhar Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Vishal-Shekhar Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Vishal-Shekhar Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Vishal-Shekhar Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Vishal-Shekhar Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Vishal-Shekhar Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Vishal-Shekhar Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Vishal-Shekhar Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Vishal-Shekhar Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Vishal-Shekhar Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Vishal-Shekhar Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Vishal-Shekhar Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Vishal-Shekhar Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Vishal-Shekhar Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Vishal-Shekhar Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Vishal-Shekhar Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      }
    ]
  },
  {
    "id": "atif-aslam",
    "name": "Atif Aslam",
    "tagline": "Soulful Ballads & Timeless Romantic Anthems",
    "avatar": "/artists/atif-aslam.jpg",
    "bgColor": "#155e75",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Tajdar-e-Haram",
        "album": "Coke Studio",
        "duration": "10:15"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Aadat",
        "album": "Kalyug / Jal",
        "duration": "5:34"
      },
      {
        "id": "H_e90zbRzpg",
        "title": "Kuch Is Tarah",
        "album": "Doorie",
        "duration": "5:13"
      },
      {
        "id": "BadBAMnPX0I",
        "title": "Pehli Nazar Mein",
        "album": "Race",
        "duration": "5:12"
      },
      {
        "id": "rTuxUAu311k",
        "title": "Tera Hone Laga Hoon",
        "album": "Ajab Prem Ki Ghazab Kahani",
        "duration": "4:59"
      },
      {
        "id": "SAcpESN_Fk4",
        "title": "Dil Diyan Gallan",
        "album": "Tiger Zinda Hai",
        "duration": "4:20"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Tu Jaane Na",
        "album": "Ajab Prem Ki Ghazab Kahani",
        "duration": "5:38"
      },
      {
        "id": "w6q8H1Kk_Q4",
        "title": "Jeene Laga Hoon",
        "album": "Ramaiya Vastavaiya",
        "duration": "3:56"
      },
      {
        "id": "7bE4W2w-MhY",
        "title": "Woh Lamhe Woh Baatein",
        "album": "Zeher",
        "duration": "5:18"
      },
      {
        "id": "ilNt2S5oN4Q",
        "title": "Tere Sang Yaara",
        "album": "Rustom",
        "duration": "4:50"
      },
      {
        "id": "YuXLN23ZGQo",
        "title": "O Saathi",
        "album": "Baaghi 2",
        "duration": "4:11"
      },
      {
        "id": "xRb8hxwN5zc",
        "title": "Piya O Re Piya",
        "album": "Tere Naal Love Ho Gaya",
        "duration": "4:52"
      },
      {
        "id": "0Z0gP2w76Kk",
        "title": "Bakhuda Tumhi Ho",
        "album": "Kismat Konnection",
        "duration": "4:53"
      },
      {
        "id": "r6SireSgH7Q",
        "title": "Main Rang Sharbaton Ka",
        "album": "Phata Poster Nikhla Hero",
        "duration": "4:23"
      },
      {
        "id": "7mTDBsdfw88",
        "title": "Paniyon Sa",
        "album": "Satyameva Jayate",
        "duration": "3:56"
      },
      {
        "id": "C_A9iYn9c6M",
        "title": "Be Intehaan",
        "album": "Race 2",
        "duration": "4:51"
      },
      {
        "id": "RLzC55ai0eo",
        "title": "Musafir",
        "album": "Sweetiee Weds NRI",
        "duration": "5:07"
      },
      {
        "id": "A3q9X7VPdhg",
        "title": "Hum Kis Gali Jaa Rahe Hai",
        "album": "Doorie",
        "duration": "5:01"
      },
      {
        "id": "jBQpGiubj0c",
        "title": "Dekhte Dekhte",
        "album": "Batti Gul Meter Chalu",
        "duration": "4:16"
      },
      {
        "id": "EbzR9N9i5nU",
        "title": "Baarishein",
        "album": "Single",
        "duration": "4:35"
      }
    ]
  },
  {
    "id": "anirudh-ravichander",
    "name": "Anirudh Ravichander",
    "tagline": "Rockstar of Modern South & Pan-Indian Beats",
    "avatar": "/artists/anirudh-ravichander.jpg",
    "bgColor": "#1e1b4b",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Hukum - Thalaivar Alappara",
        "album": "Jailer",
        "duration": "3:27"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Why This Kolaveri Di",
        "album": "3",
        "duration": "4:08"
      },
      {
        "id": "VAdGW7QDJUI",
        "title": "Chaleya",
        "album": "Jawan",
        "duration": "3:20"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Arabic Kuthu - Halamithi Habibo",
        "album": "Beast",
        "duration": "4:38"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Badass",
        "album": "Leo",
        "duration": "3:49"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Naa Ready",
        "album": "Leo",
        "duration": "4:08"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Vaathi Coming",
        "album": "Master",
        "duration": "3:50"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Kaavaalaa",
        "album": "Jailer",
        "duration": "3:10"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Master Coming",
        "album": "Master",
        "duration": "3:48"
      },
      {
        "id": "sK7riqg2mr4",
        "title": "Hayyoda",
        "album": "Jawan",
        "duration": "3:19"
      },
      {
        "id": "vMv3vK6V0j4",
        "title": "Dippam Dappam",
        "album": "KRK",
        "duration": "3:37"
      },
      {
        "id": "6FURuLYrR_Q",
        "title": "Two Two Two",
        "album": "KRK",
        "duration": "2:55"
      },
      {
        "id": "hoNb6HuNmU0",
        "title": "Jalabulanjangu",
        "album": "Don",
        "duration": "3:24"
      },
      {
        "id": "f6vUSs4pjDY",
        "title": "Once Upon a Time",
        "album": "Vikram",
        "duration": "2:24"
      },
      {
        "id": "sazKnskXoQ4",
        "title": "Beast Mode",
        "album": "Beast",
        "duration": "3:39"
      },
      {
        "id": "ElZfdU54Cp8",
        "title": "Private Party",
        "album": "Don",
        "duration": "3:36"
      },
      {
        "id": "z-diRlyUj9Y",
        "title": "Sirikkadhey",
        "album": "Remo",
        "duration": "3:58"
      },
      {
        "id": "8iU8LPEa4o0",
        "title": "Kanave Kanave",
        "album": "David",
        "duration": "4:45"
      },
      {
        "id": "H2f7MZUsvVE",
        "title": "Marana Mass",
        "album": "Petta",
        "duration": "3:36"
      },
      {
        "id": "Wd2abR5ZqjM",
        "title": "VIP Title Track",
        "album": "Velaiilla Pattadhari",
        "duration": "3:42"
      }
    ]
  },
  {
    "id": "udit-narayan",
    "name": "Udit Narayan",
    "tagline": "The Legendary Sweet Voice of 90s & 2000s Bollywood",
    "avatar": "/artists/udit-narayan.jpg",
    "bgColor": "#581c87",
    "topTracks": [
      {
        "id": "QKfGl39ZJWI",
        "title": "Pardesi Pardesi",
        "album": "Raja Hindustani",
        "duration": "7:30"
      },
      {
        "id": "bKZTnnFU9HA",
        "title": "Kuch Kuch Hota Hai",
        "album": "Title Track",
        "duration": "4:56"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Tip Tip Barsa Paani",
        "album": "Mohra",
        "duration": "5:55"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Udit Narayan Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Udit Narayan Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Udit Narayan Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Udit Narayan Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Udit Narayan Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Udit Narayan Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Udit Narayan Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Udit Narayan Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Udit Narayan Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Udit Narayan Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Udit Narayan Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Udit Narayan Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Udit Narayan Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Udit Narayan Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      }
    ]
  },
  {
    "id": "honey-singh",
    "name": "Yo Yo Honey Singh",
    "tagline": "The Revolutionary Desi Hip-Hop Pioneer",
    "avatar": "/artists/honey-singh.jpg",
    "bgColor": "#78350f",
    "topTracks": [
      {
        "id": "vRjaGgDsWSo",
        "title": "Casa Tupka Anthemo",
        "album": "GLORY",
        "duration": "3:15"
      },
      {
        "id": "NbyHNASFi6U",
        "title": "Brown Rang",
        "album": "International Villager",
        "duration": "2:59"
      },
      {
        "id": "k4yXQkGLeAA",
        "title": "Blue Eyes",
        "album": "Single",
        "duration": "3:40"
      },
      {
        "id": "klMW8_9R_6M",
        "title": "Dope Shope",
        "album": "International Villager",
        "duration": "3:09"
      },
      {
        "id": "TvNG6yqG2qA",
        "title": "Love Dose",
        "album": "Desi Kalakaar",
        "duration": "3:48"
      },
      {
        "id": "gV_R9_kX0aM",
        "title": "Desi Kalakaar",
        "album": "Desi Kalakaar",
        "duration": "4:19"
      },
      {
        "id": "7vK9_mX0aZ8",
        "title": "Dheere Dheere",
        "album": "Single",
        "duration": "3:32"
      },
      {
        "id": "bK_0Y_7mZ9o",
        "title": "Angreji Beat",
        "album": "International Villager",
        "duration": "3:30"
      },
      {
        "id": "mK_8Z9mX0aY",
        "title": "Makhna",
        "album": "Single",
        "duration": "3:03"
      },
      {
        "id": "vK_9mX0aZ7o",
        "title": "Chaar Botal Vodka",
        "album": "Ragini MMS 2",
        "duration": "3:45"
      },
      {
        "id": "8K_0Y_7mZ9o",
        "title": "Lungi Dance",
        "album": "Chennai Express",
        "duration": "4:36"
      },
      {
        "id": "jK_9mX0aZ7o",
        "title": "Sunny Sunny",
        "album": "Yaariyan",
        "duration": "3:58"
      },
      {
        "id": "xK_0Y_7mZ9o",
        "title": "Party All Night",
        "album": "Boss",
        "duration": "4:42"
      },
      {
        "id": "yK_9mX0aZ7o",
        "title": "High Heels",
        "album": "Ki & Ka",
        "duration": "3:32"
      },
      {
        "id": "aK_8Z9mX0aY",
        "title": "Yaar Naa Miley",
        "album": "Kick",
        "duration": "4:03"
      },
      {
        "id": "dK_0Y_7mZ9o",
        "title": "Birthday Bash",
        "album": "Dilliwaali Zaalim Girlfriend",
        "duration": "4:06"
      },
      {
        "id": "pK_9mX0aZ7o",
        "title": "Kuley Kuley",
        "album": "Honey 3.0",
        "duration": "3:20"
      },
      {
        "id": "qK_0Y_7mZ9o",
        "title": "Kalaastar",
        "album": "Honey 3.0",
        "duration": "3:35"
      },
      {
        "id": "rK_9mX0aZ7o",
        "title": "Millionaire",
        "album": "GLORY",
        "duration": "3:18"
      },
      {
        "id": "sK_0Y_7mZ9o",
        "title": "Gatividhi",
        "album": "Single",
        "duration": "3:41"
      }
    ]
  },
  {
    "id": "shankar-ehsaan-loy",
    "name": "Shankar-Ehsaan-Loy",
    "tagline": "Iconic Trio of Soulful Indian Music",
    "avatar": "/artists/shankar-ehsaan-loy.jpg",
    "bgColor": "#164e63",
    "topTracks": [
      {
        "id": "H_e90zbRzpg",
        "title": "Kal Ho Naa Ho",
        "album": "Title Track",
        "duration": "5:21"
      },
      {
        "id": "7zjGzEJQ7MA",
        "title": "Maahi Ve",
        "album": "Kal Ho Naa Ho",
        "duration": "6:06"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Shankar-Ehsaan-Loy Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Shankar-Ehsaan-Loy Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Shankar-Ehsaan-Loy Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Shankar-Ehsaan-Loy Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Shankar-Ehsaan-Loy Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Shankar-Ehsaan-Loy Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Shankar-Ehsaan-Loy Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Shankar-Ehsaan-Loy Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Shankar-Ehsaan-Loy Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Shankar-Ehsaan-Loy Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Shankar-Ehsaan-Loy Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Shankar-Ehsaan-Loy Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Shankar-Ehsaan-Loy Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Shankar-Ehsaan-Loy Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Shankar-Ehsaan-Loy Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      }
    ]
  },
  {
    "id": "shreya-ghoshal",
    "name": "Shreya Ghoshal",
    "tagline": "Nightingale of Bollywood & 5-time National Awardee",
    "avatar": "/artists/shreya-ghoshal.jpg",
    "bgColor": "#701a75",
    "topTracks": [
      {
        "id": "8Z0mX_K7aM1",
        "title": "Sunn Raha Hai Na Tu",
        "album": "Aashiqui 2",
        "duration": "6:30"
      },
      {
        "id": "9Z0mX_K7aM2",
        "title": "Deewani Mastani",
        "album": "Bajirao Mastani",
        "duration": "5:40"
      },
      {
        "id": "aZ0mX_K7aM3",
        "title": "Teri Ore",
        "album": "Singh Is Kinng",
        "duration": "5:39"
      },
      {
        "id": "bZ0mX_K7aM4",
        "title": "Barso Re",
        "album": "Guru",
        "duration": "5:29"
      },
      {
        "id": "cZ0mX_K7aM5",
        "title": "Chikni Chameli",
        "album": "Agneepath",
        "duration": "5:03"
      },
      {
        "id": "dZ0mX_K7aM6",
        "title": "Kar Har Maidaan Fateh",
        "album": "Sanju",
        "duration": "5:11"
      },
      {
        "id": "eZ0mX_K7aM7",
        "title": "Saans Mein Teri",
        "album": "Jab Tak Hai Jaan",
        "duration": "5:28"
      },
      {
        "id": "fZ0mX_K7aM8",
        "title": "Nagada Sang Dhol",
        "album": "Goliyon Ki Raasleela Ram-Leela",
        "duration": "4:33"
      },
      {
        "id": "gZ0mX_K7aM9",
        "title": "Ghoomar",
        "album": "Padmaavat",
        "duration": "4:42"
      },
      {
        "id": "hZ0mX_K7aM0",
        "title": "Yeh Ishq Hai",
        "album": "Jab We Met",
        "duration": "4:44"
      },
      {
        "id": "iZ0mX_K7aM1",
        "title": "Agar Tum Mil Jao",
        "album": "Zeher",
        "duration": "6:00"
      },
      {
        "id": "jZ0mX_K7aM2",
        "title": "Zoobi Doobi",
        "album": "3 Idiots",
        "duration": "4:08"
      },
      {
        "id": "kZ0mX_K7aM3",
        "title": "Bahaara",
        "album": "I Hate Luv Storys",
        "duration": "5:25"
      },
      {
        "id": "lZ0mX_K7aM4",
        "title": "Manwa Laage",
        "album": "Happy New Year",
        "duration": "4:31"
      },
      {
        "id": "mZ0mX_K7aM5",
        "title": "Dola Re Dola",
        "album": "Devdas",
        "duration": "6:35"
      },
      {
        "id": "nZ0mX_K7aM6",
        "title": "Param Sundari",
        "album": "Mimi",
        "duration": "3:20"
      },
      {
        "id": "oZ0mX_K7aM7",
        "title": "Ghar More Pardesiya",
        "album": "Kalank",
        "duration": "5:19"
      },
      {
        "id": "pZ0mX_K7aM8",
        "title": "Thoda Thoda Pyaar",
        "album": "Single",
        "duration": "4:04"
      },
      {
        "id": "qZ0mX_K7aM9",
        "title": "Ami Je Tomar",
        "album": "Bhool Bhulaiyaa 2",
        "duration": "6:12"
      },
      {
        "id": "rZ0mX_K7aM0",
        "title": "Radha",
        "album": "Student of the Year",
        "duration": "5:41"
      }
    ]
  },
  {
    "id": "jasleen-royal",
    "name": "Jasleen Royal",
    "tagline": "Soulful Singer, Composer & Hitmaker",
    "avatar": "/artists/jasleen-royal.jpg",
    "bgColor": "#1c1917",
    "topTracks": [
      {
        "id": "BmUe3-sfr7E",
        "title": "Heeriye",
        "album": "Single",
        "duration": "3:15"
      },
      {
        "id": "R0KlDFAFl0c",
        "title": "Ranjha",
        "album": "Shershaah",
        "duration": "3:48"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Jasleen Royal Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Jasleen Royal Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Jasleen Royal Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Jasleen Royal Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Jasleen Royal Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Jasleen Royal Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Jasleen Royal Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Jasleen Royal Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Jasleen Royal Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Jasleen Royal Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Jasleen Royal Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Jasleen Royal Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Jasleen Royal Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Jasleen Royal Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Jasleen Royal Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      }
    ]
  },
  {
    "id": "amit-trivedi",
    "name": "Amit Trivedi",
    "tagline": "Folk, Indie & Experimental Bollywood Maestro",
    "avatar": "/artists/amit-trivedi.jpg",
    "bgColor": "#7f1d1d",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Iktara",
        "album": "Wake Up Sid",
        "duration": "4:13"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Amit Trivedi Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Amit Trivedi Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Amit Trivedi Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Amit Trivedi Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Amit Trivedi Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Amit Trivedi Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Amit Trivedi Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Amit Trivedi Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Amit Trivedi Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Amit Trivedi Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Amit Trivedi Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Amit Trivedi Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Amit Trivedi Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Amit Trivedi Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Amit Trivedi Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Amit Trivedi Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Amit Trivedi Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "sachet-tandon",
    "name": "Sachet Tandon",
    "tagline": "The Voice Behind Intense Romantic Hits",
    "avatar": "/artists/sachet-tandon.jpg",
    "bgColor": "#713f12",
    "topTracks": [
      {
        "id": "R0KlDFAFl0c",
        "title": "Malang Sajna",
        "album": "Single",
        "duration": "3:40"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Sachet Tandon Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Sachet Tandon Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Sachet Tandon Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Sachet Tandon Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Sachet Tandon Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Sachet Tandon Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Sachet Tandon Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Sachet Tandon Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Sachet Tandon Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Sachet Tandon Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Sachet Tandon Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Sachet Tandon Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Sachet Tandon Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Sachet Tandon Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Sachet Tandon Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Sachet Tandon Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      }
    ]
  },
  {
    "id": "alka-yagnik",
    "name": "Alka Yagnik",
    "tagline": "The Melody Queen with 20+ Thousand Songs",
    "avatar": "/artists/alka-yagnik.jpg",
    "bgColor": "#831843",
    "topTracks": [
      {
        "id": "7JnKVPtRqVE",
        "title": "Tujhe Dekha Toh",
        "album": "DDLJ",
        "duration": "5:02"
      },
      {
        "id": "QKfGl39ZJWI",
        "title": "Pardesi Pardesi",
        "album": "Raja Hindustani",
        "duration": "7:30"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Tum Dil Ki Dhadkan Mein",
        "album": "Dhadkan",
        "duration": "5:10"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Alka Yagnik Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Alka Yagnik Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Alka Yagnik Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Alka Yagnik Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Alka Yagnik Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Alka Yagnik Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Alka Yagnik Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Alka Yagnik Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Alka Yagnik Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Alka Yagnik Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Alka Yagnik Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Alka Yagnik Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Alka Yagnik Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Alka Yagnik Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      }
    ]
  },
  {
    "id": "himesh-reshammiya",
    "name": "Himesh Reshammiya",
    "tagline": "The High-Pitch Hit Machine of Indian Pop",
    "avatar": "/artists/himesh-reshammiya.jpg",
    "bgColor": "#451a03",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Aashiq Banaya Aapne",
        "album": "Title Track",
        "duration": "6:04"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Himesh Reshammiya Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Himesh Reshammiya Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Himesh Reshammiya Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Himesh Reshammiya Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Himesh Reshammiya Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Himesh Reshammiya Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Himesh Reshammiya Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Himesh Reshammiya Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Himesh Reshammiya Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Himesh Reshammiya Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Himesh Reshammiya Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Himesh Reshammiya Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Himesh Reshammiya Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Himesh Reshammiya Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Himesh Reshammiya Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Himesh Reshammiya Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Himesh Reshammiya Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "anuv-jain",
    "name": "Anuv Jain",
    "tagline": "The Poetic Heartbeat of Indie Indian Music",
    "avatar": "/artists/anuv-jain.jpg",
    "bgColor": "#262626",
    "topTracks": [
      {
        "id": "BmUe3-sfr7E",
        "title": "Baarishein",
        "album": "Single",
        "duration": "3:27"
      },
      {
        "id": "R0KlDFAFl0c",
        "title": "Husn",
        "album": "Single",
        "duration": "3:38"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Maula",
        "album": "Single",
        "duration": "3:58"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Dil Mere",
        "album": "Acoustic Sessions",
        "duration": "3:30"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Choo Lo",
        "album": "The Local Train Tribute",
        "duration": "3:53"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Anuv Jain Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Anuv Jain Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Anuv Jain Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Anuv Jain Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Anuv Jain Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Anuv Jain Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Anuv Jain Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Anuv Jain Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Anuv Jain Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Anuv Jain Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Anuv Jain Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Anuv Jain Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Anuv Jain Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Anuv Jain Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Anuv Jain Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      }
    ]
  },
  {
    "id": "shubh",
    "name": "Shubh",
    "tagline": "Global Punjabi Hip-Hop Chart-Topper",
    "avatar": "/artists/shubh.jpg",
    "bgColor": "#0f172a",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Cheques",
        "album": "Still Rollin",
        "duration": "3:03"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Shubh Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Shubh Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Shubh Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Shubh Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Shubh Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Shubh Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Shubh Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Shubh Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Shubh Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Shubh Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Shubh Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Shubh Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Shubh Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Shubh Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Shubh Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Shubh Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Shubh Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "badshah",
    "name": "Badshah",
    "tagline": "India’s Biggest Commercial Rap & Pop Star",
    "avatar": "/artists/badshah.jpg",
    "bgColor": "#171717",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Genda Phool",
        "album": "Single",
        "duration": "2:50"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Badshah Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Badshah Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Badshah Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Badshah Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Badshah Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Badshah Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Badshah Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Badshah Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Badshah Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Badshah Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Badshah Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Badshah Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Badshah Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Badshah Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Badshah Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Badshah Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Badshah Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "sachet-parampara",
    "name": "Sachet-Parampara",
    "tagline": "Dynamic Singing & Composing Bollywood Couple",
    "avatar": "/artists/sachet-parampara.jpg",
    "bgColor": "#3b0764",
    "topTracks": [
      {
        "id": "R0KlDFAFl0c",
        "title": "Malang Sajna",
        "album": "Single",
        "duration": "3:40"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Sachet-Parampara Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Sachet-Parampara Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Sachet-Parampara Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Sachet-Parampara Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Sachet-Parampara Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Sachet-Parampara Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Sachet-Parampara Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Sachet-Parampara Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Sachet-Parampara Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Sachet-Parampara Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Sachet-Parampara Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Sachet-Parampara Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Sachet-Parampara Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Sachet-Parampara Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Sachet-Parampara Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Sachet-Parampara Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      }
    ]
  },
  {
    "id": "kk",
    "name": "KK",
    "tagline": "The Voice of Pure Emotion & Nostalgia",
    "avatar": "/artists/kk.jpg",
    "bgColor": "#1e3a8a",
    "topTracks": [
      {
        "id": "DMLrGfMxOQA",
        "title": "I Am In Love",
        "album": "Once Upon A Time In Mumbaai",
        "duration": "5:06"
      },
      {
        "id": "7j3Z0u6e6kM",
        "title": "Zara Sa",
        "album": "Jannat",
        "duration": "5:04"
      },
      {
        "id": "gV_R9_kX0aM",
        "title": "Dil Ibaadat",
        "album": "Tum Mile",
        "duration": "5:29"
      },
      {
        "id": "8rZ6a5B_UoI",
        "title": "Kya Mujhe Pyaar Hai",
        "album": "Woh Lamhe",
        "duration": "4:40"
      },
      {
        "id": "2Vv-BfVoq4g",
        "title": "Alvida",
        "album": "Life in a... Metro",
        "duration": "5:41"
      },
      {
        "id": "xNqU2zPkWL8",
        "title": "Tu Hi Meri Shab Hai",
        "album": "Gangster",
        "duration": "6:28"
      },
      {
        "id": "f6vUSs4pjDY",
        "title": "Beete Lamhein",
        "album": "The Train",
        "duration": "5:33"
      },
      {
        "id": "O-zfZ3Uf_c8",
        "title": "Labon Ko",
        "album": "Bhool Bhulaiyaa",
        "duration": "5:43"
      },
      {
        "id": "6vYn_kY-Z1Y",
        "title": "Aankhon Mein Teri",
        "album": "Om Shanti Om",
        "duration": "4:03"
      },
      {
        "id": "Y7B0T_ZfC98",
        "title": "Tadap Tadap",
        "album": "Hum Dil De Chuke Sanam",
        "duration": "6:37"
      },
      {
        "id": "qfZ3rM7oKxQ",
        "title": "Yaaron",
        "album": "Pal",
        "duration": "4:40"
      },
      {
        "id": "3vK9pL_Z0aM",
        "title": "Pyaar Ke Pal",
        "album": "Pal",
        "duration": "5:40"
      },
      {
        "id": "jR6v0Y_L7m8",
        "title": "Tu Aashiqui Hai",
        "album": "Jhankaar Beats",
        "duration": "6:12"
      },
      {
        "id": "dK_6Z9mX0aY",
        "title": "Sach Keh Raha Hai Deewana",
        "album": "Rehnaa Hai Terre Dil Mein",
        "duration": "5:28"
      },
      {
        "id": "vK_0Y_7mZ9o",
        "title": "Dus Bahane",
        "album": "Dus",
        "duration": "3:25"
      },
      {
        "id": "8Z_0mX_K7aM",
        "title": "O Meri Jaan",
        "album": "Life in a... Metro",
        "duration": "5:05"
      },
      {
        "id": "mK_7Z9mX0aY",
        "title": "Mat Aazma Re",
        "album": "Murder 3",
        "duration": "4:11"
      },
      {
        "id": "aK_0Y_7mZ9o",
        "title": "Haan Tu Hain",
        "album": "Jannat",
        "duration": "5:25"
      },
      {
        "id": "bK_9mX0aZ7o",
        "title": "Zindagi Do Pal Ki",
        "album": "Kites",
        "duration": "4:15"
      },
      {
        "id": "cK_0Y_7mZ9o",
        "title": "Tu Jo Mila",
        "album": "Bajrangi Bhaijaan",
        "duration": "4:02"
      }
    ]
  },
  {
    "id": "sonu-nigam",
    "name": "Sonu Nigam",
    "tagline": "Modern Rafi & Master of Indian Playback",
    "avatar": "/artists/sonu-nigam.jpg",
    "bgColor": "#7c2d12",
    "topTracks": [
      {
        "id": "g0eO74AkPS8",
        "title": "Kal Ho Naa Ho",
        "album": "Kal Ho Naa Ho",
        "duration": "5:21"
      },
      {
        "id": "k_0Y_7mZ911",
        "title": "Abhi Mujh Mein Kahin",
        "album": "Agneepath",
        "duration": "6:04"
      },
      {
        "id": "l_9mX0aZ711",
        "title": "Sandese Aate Hai",
        "album": "Border",
        "duration": "10:33"
      },
      {
        "id": "m_0Y_7mZ911",
        "title": "Suraj Hua Maddham",
        "album": "Kabhi Khushi Kabhie Gham",
        "duration": "7:08"
      },
      {
        "id": "n_9mX0aZ711",
        "title": "Main Agar Kahoon",
        "album": "Om Shanti Om",
        "duration": "5:10"
      },
      {
        "id": "o_0Y_7mZ911",
        "title": "Saathiya Title Track",
        "album": "Saathiya",
        "duration": "5:58"
      },
      {
        "id": "p_9mX0aZ711",
        "title": "Soniyo",
        "album": "Raaz: The Mystery Continues",
        "duration": "5:30"
      },
      {
        "id": "q_0Y_7mZ911",
        "title": "Bole Chudiyan",
        "album": "Kabhi Khushi Kabhie Gham",
        "duration": "6:50"
      },
      {
        "id": "r_9mX0aZ711",
        "title": "Tumse Milke Dil Ka",
        "album": "Main Hoon Na",
        "duration": "6:02"
      },
      {
        "id": "s_0Y_7mZ911",
        "title": "Yeh Dil Deewana",
        "album": "Pardes",
        "duration": "7:04"
      },
      {
        "id": "t_9mX0aZ711",
        "title": "Dil Ne Yeh Kaha Hai Dil Se",
        "album": "Dhadkan",
        "duration": "7:05"
      },
      {
        "id": "u_0Y_7mZ911",
        "title": "Mere Haath Mein",
        "album": "Fanaa",
        "duration": "4:48"
      },
      {
        "id": "v_9mX0aZ711",
        "title": "Kabhi Khushi Kabhie Gham",
        "album": "K3G",
        "duration": "7:33"
      },
      {
        "id": "w_0Y_7mZ911",
        "title": "Tenu Leke",
        "album": "Salaam-E-Ishq",
        "duration": "4:36"
      },
      {
        "id": "x_9mX0aZ711",
        "title": "Deewana Tera",
        "album": "Deewana",
        "duration": "5:25"
      },
      {
        "id": "y_0Y_7mZ911",
        "title": "Bijuria",
        "album": "Mausam",
        "duration": "4:52"
      },
      {
        "id": "z_9mX0aZ711",
        "title": "Guzaarish",
        "album": "Ghajini",
        "duration": "5:29"
      },
      {
        "id": "1_0Y_7mZ911",
        "title": "Zoobi Doobi",
        "album": "3 Idiots",
        "duration": "4:08"
      },
      {
        "id": "2_9mX0aZ711",
        "title": "Do Pal",
        "album": "Veer-Zaara",
        "duration": "4:27"
      },
      {
        "id": "3_0Y_7mZ911",
        "title": "Shukran Allah",
        "album": "Kurbaan",
        "duration": "4:49"
      }
    ]
  },
  {
    "id": "kishore-kumar",
    "name": "Kishore Kumar",
    "tagline": "The Eternal Musical Genius of India",
    "avatar": "/artists/kishore-kumar.jpg",
    "bgColor": "#701a75",
    "topTracks": [
      {
        "id": "QKfGl39ZJWI",
        "title": "O Mere Dil Ke Chain",
        "album": "Mere Jeevan Saathi",
        "duration": "4:35"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Roop Tera Mastana",
        "album": "Aradhana",
        "duration": "3:45"
      },
      {
        "id": "7JnKVPtRqVE",
        "title": "Pal Pal Dil Ke Paas",
        "album": "Blackmail",
        "duration": "5:28"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Kishore Kumar Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Kishore Kumar Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Kishore Kumar Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Kishore Kumar Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Kishore Kumar Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Kishore Kumar Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Kishore Kumar Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Kishore Kumar Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Kishore Kumar Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Kishore Kumar Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Kishore Kumar Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Kishore Kumar Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Kishore Kumar Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Kishore Kumar Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      }
    ]
  },
  {
    "id": "lata-mangeshkar",
    "name": "Lata Mangeshkar",
    "tagline": "The Nightingale of India & Cultural Treasure",
    "avatar": "/artists/lata-mangeshkar.jpg",
    "bgColor": "#831843",
    "topTracks": [
      {
        "id": "7JnKVPtRqVE",
        "title": "Lag Ja Gale",
        "album": "Woh Kaun Thi?",
        "duration": "4:15"
      },
      {
        "id": "QKfGl39ZJWI",
        "title": "Ajeeb Dastan Hai Yeh",
        "album": "Dil Apna Aur Preet Parai",
        "duration": "5:15"
      },
      {
        "id": "bKZTnnFU9HA",
        "title": "Tere Liye",
        "album": "Veer-Zaara",
        "duration": "5:34"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Lata Mangeshkar Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Lata Mangeshkar Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Lata Mangeshkar Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Lata Mangeshkar Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Lata Mangeshkar Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Lata Mangeshkar Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Lata Mangeshkar Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Lata Mangeshkar Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Lata Mangeshkar Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Lata Mangeshkar Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Lata Mangeshkar Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Lata Mangeshkar Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Lata Mangeshkar Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Lata Mangeshkar Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      }
    ]
  },
  {
    "id": "mohammed-rafi",
    "name": "Mohammed Rafi",
    "tagline": "The Golden Soulful Voice of Indian Cinema",
    "avatar": "/artists/mohammed-rafi.jpg",
    "bgColor": "#14532d",
    "topTracks": [
      {
        "id": "QKfGl39ZJWI",
        "title": "Likhe Jo Khat Tujhe",
        "album": "Kanyadaan",
        "duration": "4:33"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Chura Liya Hai Tumne",
        "album": "Yaadon Ki Baaraat",
        "duration": "4:48"
      },
      {
        "id": "7JnKVPtRqVE",
        "title": "Yeh Reshmi Zulfen",
        "album": "Do Raaste",
        "duration": "4:20"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Mohammed Rafi Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Mohammed Rafi Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Mohammed Rafi Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Mohammed Rafi Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Mohammed Rafi Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Mohammed Rafi Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Mohammed Rafi Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Mohammed Rafi Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Mohammed Rafi Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Mohammed Rafi Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Mohammed Rafi Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Mohammed Rafi Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Mohammed Rafi Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Mohammed Rafi Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      }
    ]
  },
  {
    "id": "sunidhi-chauhan",
    "name": "Sunidhi Chauhan",
    "tagline": "High-Energy Powerhouse & Vocal Dynamo",
    "avatar": "/artists/sunidhi-chauhan.jpg",
    "bgColor": "#be123c",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Sheila Ki Jawani",
        "album": "Tees Maar Khan",
        "duration": "4:43"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Sunidhi Chauhan Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Sunidhi Chauhan Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Sunidhi Chauhan Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Sunidhi Chauhan Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Sunidhi Chauhan Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Sunidhi Chauhan Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Sunidhi Chauhan Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Sunidhi Chauhan Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Sunidhi Chauhan Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Sunidhi Chauhan Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Sunidhi Chauhan Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Sunidhi Chauhan Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Sunidhi Chauhan Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Sunidhi Chauhan Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Sunidhi Chauhan Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Sunidhi Chauhan Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Sunidhi Chauhan Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "mohit-chauhan",
    "name": "Mohit Chauhan",
    "tagline": "Rustic, Earthy & Soul-Stirring Voice",
    "avatar": "/artists/mohit-chauhan.jpg",
    "bgColor": "#166534",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Mohit Chauhan Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Mohit Chauhan Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Mohit Chauhan Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Mohit Chauhan Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Mohit Chauhan Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Mohit Chauhan Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Mohit Chauhan Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Mohit Chauhan Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Mohit Chauhan Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Mohit Chauhan Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Mohit Chauhan Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Mohit Chauhan Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Mohit Chauhan Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Mohit Chauhan Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Mohit Chauhan Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Mohit Chauhan Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Mohit Chauhan Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "neha-kakkar",
    "name": "Neha Kakkar",
    "tagline": "Party Anthem Queen & Social Media Sensation",
    "avatar": "/artists/neha-kakkar.jpg",
    "bgColor": "#9d174d",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Garmi",
        "album": "Street Dancer 3D",
        "duration": "3:04"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Neha Kakkar Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Neha Kakkar Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Neha Kakkar Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Neha Kakkar Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Neha Kakkar Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Neha Kakkar Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Neha Kakkar Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Neha Kakkar Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Neha Kakkar Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Neha Kakkar Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Neha Kakkar Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Neha Kakkar Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Neha Kakkar Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Neha Kakkar Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Neha Kakkar Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Neha Kakkar Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Neha Kakkar Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "jubin-nautiyal",
    "name": "Jubin Nautiyal",
    "tagline": "Melodious Ballads & Romantic Chart-Toppers",
    "avatar": "/artists/jubin-nautiyal.jpg",
    "bgColor": "#1e40af",
    "topTracks": [
      {
        "id": "R0KlDFAFl0c",
        "title": "Raataan Lambiyan",
        "album": "Shershaah",
        "duration": "3:50"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Jubin Nautiyal Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Jubin Nautiyal Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Jubin Nautiyal Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Jubin Nautiyal Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Jubin Nautiyal Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Jubin Nautiyal Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Jubin Nautiyal Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Jubin Nautiyal Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Jubin Nautiyal Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Jubin Nautiyal Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Jubin Nautiyal Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Jubin Nautiyal Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Jubin Nautiyal Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Jubin Nautiyal Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Jubin Nautiyal Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Jubin Nautiyal Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      }
    ]
  },
  {
    "id": "armaan-malik",
    "name": "Armaan Malik",
    "tagline": "Global Pop Prince & Smooth Romantic Crooner",
    "avatar": "/artists/armaan-malik.jpg",
    "bgColor": "#0284c7",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Armaan Malik Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Armaan Malik Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Armaan Malik Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Armaan Malik Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Armaan Malik Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Armaan Malik Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Armaan Malik Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Armaan Malik Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Armaan Malik Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Armaan Malik Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Armaan Malik Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Armaan Malik Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Armaan Malik Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Armaan Malik Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Armaan Malik Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Armaan Malik Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Armaan Malik Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "diljit-dosanjh",
    "name": "Diljit Dosanjh",
    "tagline": "Global Punjabi Icon & Coachella Trailblazer",
    "avatar": "/artists/diljit-dosanjh.jpg",
    "bgColor": "#b45309",
    "topTracks": [
      {
        "id": "Hq0N7X1hN1g",
        "title": "Lover",
        "album": "MoonChild Era",
        "duration": "3:08"
      },
      {
        "id": "cl0a3iPTo4Y",
        "title": "G.O.A.T.",
        "album": "G.O.A.T.",
        "duration": "3:43"
      },
      {
        "id": "mK7Z9mX0aY1",
        "title": "POKITO",
        "album": "Single",
        "duration": "2:56"
      },
      {
        "id": "mK_7Z9mX0a1",
        "title": "Do You Know",
        "album": "Single",
        "duration": "3:37"
      },
      {
        "id": "aK_0Y_7mZ91",
        "title": "Born to Shine",
        "album": "G.O.A.T.",
        "duration": "3:34"
      },
      {
        "id": "bK_9mX0aZ71",
        "title": "Lemonade",
        "album": "Drive Thru",
        "duration": "3:12"
      },
      {
        "id": "cK_0Y_7mZ91",
        "title": "Clash",
        "album": "G.O.A.T.",
        "duration": "3:10"
      },
      {
        "id": "dK_9mX0aZ71",
        "title": "Proper Patola",
        "album": "Single",
        "duration": "4:06"
      },
      {
        "id": "eK_0Y_7mZ91",
        "title": "Peaches",
        "album": "Drive Thru",
        "duration": "3:05"
      },
      {
        "id": "fK_9mX0aZ71",
        "title": "Naina",
        "album": "Crew",
        "duration": "3:00"
      },
      {
        "id": "gK_0Y_7mZ91",
        "title": "Hass Hass",
        "album": "Single ft. Sia",
        "duration": "2:34"
      },
      {
        "id": "hK_9mX0aZ71",
        "title": "Kinni Kinni",
        "album": "Ghost",
        "duration": "3:14"
      },
      {
        "id": "iK_0Y_7mZ91",
        "title": "Case",
        "album": "Ghost",
        "duration": "3:02"
      },
      {
        "id": "jK_9mX0aZ71",
        "title": "Laembadgini",
        "album": "Single",
        "duration": "3:45"
      },
      {
        "id": "kK_0Y_7mZ91",
        "title": "Raat Di Gedi",
        "album": "Single",
        "duration": "4:15"
      },
      {
        "id": "lK_9mX0aZ71",
        "title": "Vibe",
        "album": "MoonChild Era",
        "duration": "2:38"
      },
      {
        "id": "mK_0Y_7mZ91",
        "title": "5 Taara",
        "album": "Single",
        "duration": "3:39"
      },
      {
        "id": "nK_9mX0aZ71",
        "title": "Patiala Peg",
        "album": "Single",
        "duration": "4:02"
      },
      {
        "id": "oK_0Y_7mZ91",
        "title": "Ikk Kudi",
        "album": "Udta Punjab",
        "duration": "4:35"
      },
      {
        "id": "pK_9mX0aZ71",
        "title": "Ishq Di Baajiyaan",
        "album": "Soorma",
        "duration": "4:44"
      }
    ]
  },
  {
    "id": "sidhu-moose-wala",
    "name": "Sidhu Moose Wala",
    "tagline": "The Legendary Voice of Raw Punjabi Culture",
    "avatar": "/artists/sidhu-moose-wala.jpg",
    "bgColor": "#292524",
    "topTracks": [
      {
        "id": "Umqb9KENgmk",
        "title": "Never Fold",
        "album": "No Name",
        "duration": "3:03"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Vaar",
        "album": "Single",
        "duration": "2:46"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chorni",
        "album": "Divine feat. Sidhu",
        "duration": "3:04"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Sidhu Moose Wala Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Sidhu Moose Wala Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Sidhu Moose Wala Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Sidhu Moose Wala Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Sidhu Moose Wala Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Sidhu Moose Wala Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Sidhu Moose Wala Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Sidhu Moose Wala Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Sidhu Moose Wala Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Sidhu Moose Wala Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Sidhu Moose Wala Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Sidhu Moose Wala Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Sidhu Moose Wala Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Sidhu Moose Wala Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Sidhu Moose Wala Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Sidhu Moose Wala Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Sidhu Moose Wala Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "ap-dhillon",
    "name": "AP Dhillon",
    "tagline": "Modern Brown Pop & Global Wavemaker",
    "avatar": "/artists/ap-dhillon.jpg",
    "bgColor": "#431407",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Brown Munde",
        "album": "Single",
        "duration": "4:28"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "AP Dhillon Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "AP Dhillon Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "AP Dhillon Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "AP Dhillon Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "AP Dhillon Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "AP Dhillon Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "AP Dhillon Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "AP Dhillon Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "AP Dhillon Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "AP Dhillon Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "AP Dhillon Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "AP Dhillon Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "AP Dhillon Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "AP Dhillon Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "AP Dhillon Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "AP Dhillon Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "AP Dhillon Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "karan-aujla",
    "name": "Karan Aujla",
    "tagline": "Geetan Di Machine & Chartbuster Lyricist",
    "avatar": "/artists/karan-aujla.jpg",
    "bgColor": "#064e3b",
    "topTracks": [
      {
        "id": "Umqb9KENgmk",
        "title": "Jee Ni Lagda",
        "album": "Single",
        "duration": "3:45"
      },
      {
        "id": "T94PHkuydcw",
        "title": "WYTB",
        "album": "Four Me",
        "duration": "3:14"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Take It Easy",
        "album": "Four Me",
        "duration": "3:26"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Karan Aujla Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Karan Aujla Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Karan Aujla Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Karan Aujla Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Karan Aujla Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Karan Aujla Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Karan Aujla Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Karan Aujla Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Karan Aujla Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Karan Aujla Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Karan Aujla Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Karan Aujla Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Karan Aujla Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Karan Aujla Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Karan Aujla Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Karan Aujla Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Karan Aujla Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "king",
    "name": "King",
    "tagline": "The New-Age Romantic Rap Sensation",
    "avatar": "/artists/king.jpg",
    "bgColor": "#881337",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Maan Meri Jaan",
        "album": "Champagne Talk",
        "duration": "3:14"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "King Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "King Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "King Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "King Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "King Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "King Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "King Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "King Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "King Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "King Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "King Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "King Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "King Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "King Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "King Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "King Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "King Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "mithoon",
    "name": "Mithoon",
    "tagline": "Architect of Heart-Wrenching Romantic Melodies",
    "avatar": "/artists/mithoon.jpg",
    "bgColor": "#312e81",
    "topTracks": [
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Mithoon Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Mithoon Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Mithoon Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Mithoon Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Mithoon Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Mithoon Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Mithoon Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Mithoon Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Mithoon Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Mithoon Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Mithoon Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Mithoon Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Mithoon Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Mithoon Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Mithoon Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Mithoon Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Mithoon Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "ajay-atul",
    "name": "Ajay-Atul",
    "tagline": "Grand Symphonic Indian Music Visionaries",
    "avatar": "/artists/ajay-atul.jpg",
    "bgColor": "#7f1d1d",
    "topTracks": [
      {
        "id": "bKZTnnFU9HA",
        "title": "Abhi Mujh Mein Kahin",
        "album": "Agneepath",
        "duration": "6:04"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Ajay-Atul Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Ajay-Atul Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Ajay-Atul Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Ajay-Atul Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Ajay-Atul Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Ajay-Atul Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Ajay-Atul Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Ajay-Atul Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Ajay-Atul Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Ajay-Atul Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Ajay-Atul Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Ajay-Atul Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Ajay-Atul Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Ajay-Atul Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Ajay-Atul Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Ajay-Atul Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      }
    ]
  },
  {
    "id": "kumar-sanu",
    "name": "Kumar Sanu",
    "tagline": "King of 90s Romance & Guinness World Record Holder",
    "avatar": "/artists/kumar-sanu.jpg",
    "bgColor": "#581c87",
    "topTracks": [
      {
        "id": "7JnKVPtRqVE",
        "title": "Tujhe Dekha Toh",
        "album": "DDLJ",
        "duration": "5:02"
      },
      {
        "id": "QKfGl39ZJWI",
        "title": "Dheere Dheere Se",
        "album": "Aashiqui",
        "duration": "5:32"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Yeh Kaali Kaali Aankhen",
        "album": "Baazigar",
        "duration": "7:50"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Kumar Sanu Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Kumar Sanu Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Kumar Sanu Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Kumar Sanu Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Kumar Sanu Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Kumar Sanu Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Kumar Sanu Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Kumar Sanu Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Kumar Sanu Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Kumar Sanu Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Kumar Sanu Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Kumar Sanu Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Kumar Sanu Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Kumar Sanu Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      }
    ]
  },
  {
    "id": "jagjit-singh",
    "name": "Jagjit Singh",
    "tagline": "The Undisputed Ghazal King of India",
    "avatar": "/artists/jagjit-singh.jpg",
    "bgColor": "#451a03",
    "topTracks": [
      {
        "id": "QKfGl39ZJWI",
        "title": "Hothon Se Chhoo Lo Tum",
        "album": "Prem Geet",
        "duration": "5:00"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Tum Itna Jo Muskura Rahe Ho",
        "album": "Arth",
        "duration": "5:18"
      },
      {
        "id": "7JnKVPtRqVE",
        "title": "Woh Kagaz Ki Kashti",
        "album": "The Unforgettables",
        "duration": "4:52"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Jagjit Singh Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Jagjit Singh Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Jagjit Singh Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Jagjit Singh Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Jagjit Singh Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Jagjit Singh Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Jagjit Singh Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Jagjit Singh Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Jagjit Singh Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Jagjit Singh Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Jagjit Singh Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Jagjit Singh Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Jagjit Singh Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Jagjit Singh Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      }
    ]
  },
  {
    "id": "nusrat-fateh-ali-khan",
    "name": "Nusrat Fateh Ali Khan",
    "tagline": "Shahenshah-e-Qawwali & Spiritual Music Titan",
    "avatar": "/artists/nusrat-fateh-ali-khan.jpg",
    "bgColor": "#3f3f46",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Afreen Afreen",
        "album": "Sangam",
        "duration": "10:00"
      },
      {
        "id": "QKfGl39ZJWI",
        "title": "Yeh Jo Halka Halka Suroor Hai",
        "album": "Qawwali",
        "duration": "9:30"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Mere Rashke Qamar",
        "album": "Classic",
        "duration": "7:20"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Nusrat Fateh Ali Khan Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Nusrat Fateh Ali Khan Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Nusrat Fateh Ali Khan Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Nusrat Fateh Ali Khan Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Nusrat Fateh Ali Khan Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Nusrat Fateh Ali Khan Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Nusrat Fateh Ali Khan Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Nusrat Fateh Ali Khan Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Nusrat Fateh Ali Khan Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Nusrat Fateh Ali Khan Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Nusrat Fateh Ali Khan Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Nusrat Fateh Ali Khan Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Nusrat Fateh Ali Khan Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Nusrat Fateh Ali Khan Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Nusrat Fateh Ali Khan Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      }
    ]
  },
  {
    "id": "rahat-fateh-ali-khan",
    "name": "Rahat Fateh Ali Khan",
    "tagline": "High-Pitch Sufi & Bollywood Romance Maestro",
    "avatar": "/artists/rahat-fateh-ali-khan.jpg",
    "bgColor": "#78350f",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "O Re Piya",
        "album": "Aaja Nachle",
        "duration": "6:19"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Rahat Fateh Ali Khan Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Rahat Fateh Ali Khan Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Rahat Fateh Ali Khan Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Rahat Fateh Ali Khan Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Rahat Fateh Ali Khan Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Rahat Fateh Ali Khan Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Rahat Fateh Ali Khan Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Rahat Fateh Ali Khan Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Rahat Fateh Ali Khan Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Rahat Fateh Ali Khan Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Rahat Fateh Ali Khan Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Rahat Fateh Ali Khan Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Rahat Fateh Ali Khan Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Rahat Fateh Ali Khan Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Rahat Fateh Ali Khan Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Rahat Fateh Ali Khan Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Rahat Fateh Ali Khan Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "lucky-ali",
    "name": "Lucky Ali",
    "tagline": "The Soulful Nomad of Indian Pop",
    "avatar": "/artists/lucky-ali.jpg",
    "bgColor": "#065f46",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "O Sanam",
        "album": "Sunoh",
        "duration": "4:40"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Lucky Ali Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Lucky Ali Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Lucky Ali Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Lucky Ali Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Lucky Ali Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Lucky Ali Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Lucky Ali Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Lucky Ali Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Lucky Ali Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Lucky Ali Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Lucky Ali Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Lucky Ali Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Lucky Ali Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Lucky Ali Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Lucky Ali Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Lucky Ali Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Lucky Ali Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "prateek-kuhad",
    "name": "Prateek Kuhad",
    "tagline": "Global Indie-Acoustic Heartthrob",
    "avatar": "/artists/prateek-kuhad.jpg",
    "bgColor": "#27272a",
    "topTracks": [
      {
        "id": "BmUe3-sfr7E",
        "title": "Cold/mess",
        "album": "Cold/mess EP",
        "duration": "4:24"
      },
      {
        "id": "R0KlDFAFl0c",
        "title": "Kasoor",
        "album": "Single",
        "duration": "3:17"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Prateek Kuhad Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Prateek Kuhad Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Prateek Kuhad Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Prateek Kuhad Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Prateek Kuhad Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Prateek Kuhad Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Prateek Kuhad Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Prateek Kuhad Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Prateek Kuhad Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Prateek Kuhad Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Prateek Kuhad Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Prateek Kuhad Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Prateek Kuhad Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Prateek Kuhad Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Prateek Kuhad Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      }
    ]
  },
  {
    "id": "b-praak",
    "name": "B Praak",
    "tagline": "Intense Emotional Vocals & Punjabi Anthems",
    "avatar": "/artists/b-praak.jpg",
    "bgColor": "#991b1b",
    "topTracks": [
      {
        "id": "R0KlDFAFl0c",
        "title": "Filhall",
        "album": "Single",
        "duration": "4:15"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "B Praak Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "B Praak Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "B Praak Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "B Praak Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "B Praak Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "B Praak Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "B Praak Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "B Praak Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "B Praak Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "B Praak Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "B Praak Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "B Praak Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "B Praak Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "B Praak Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "B Praak Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "B Praak Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      }
    ]
  },
  {
    "id": "guru-randhawa",
    "name": "Guru Randhawa",
    "tagline": "High Rated Pop & International Collaborator",
    "avatar": "/artists/guru-randhawa.jpg",
    "bgColor": "#0f766e",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "High Rated Gabru",
        "album": "Single",
        "duration": "3:35"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Guru Randhawa Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Guru Randhawa Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Guru Randhawa Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Guru Randhawa Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Guru Randhawa Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Guru Randhawa Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Guru Randhawa Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Guru Randhawa Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Guru Randhawa Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Guru Randhawa Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Guru Randhawa Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Guru Randhawa Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Guru Randhawa Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Guru Randhawa Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Guru Randhawa Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Guru Randhawa Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Guru Randhawa Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "darshan-raval",
    "name": "Darshan Raval",
    "tagline": "The Monsoon Romance & Melodic Pop Star",
    "avatar": "/artists/darshan-raval.jpg",
    "bgColor": "#1d4ed8",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Darshan Raval Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Darshan Raval Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Darshan Raval Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Darshan Raval Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Darshan Raval Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Darshan Raval Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Darshan Raval Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Darshan Raval Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Darshan Raval Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Darshan Raval Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Darshan Raval Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Darshan Raval Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Darshan Raval Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Darshan Raval Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Darshan Raval Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Darshan Raval Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Darshan Raval Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "mika-singh",
    "name": "Mika Singh",
    "tagline": "The Unstoppable Bollywood Party King",
    "avatar": "/artists/mika-singh.jpg",
    "bgColor": "#854d0e",
    "topTracks": [
      {
        "id": "9EodaUmLhAI",
        "title": "Subha Hone Na De",
        "album": "Desi Boyz",
        "duration": "4:48"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Mika Singh Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Mika Singh Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Mika Singh Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Mika Singh Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Mika Singh Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Mika Singh Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Mika Singh Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Mika Singh Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Mika Singh Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Mika Singh Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Mika Singh Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Mika Singh Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Mika Singh Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Mika Singh Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Mika Singh Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Mika Singh Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Mika Singh Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "salim-sulaiman",
    "name": "Salim-Sulaiman",
    "tagline": "Sufi-Infused Bollywood Master Composers",
    "avatar": "/artists/salim-sulaiman.jpg",
    "bgColor": "#164e63",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Chak De! India",
        "album": "Title Track",
        "duration": "4:43"
      },
      {
        "id": "QKfGl39ZJWI",
        "title": "Kurbaan Hua",
        "album": "Kurbaan",
        "duration": "4:20"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Salim-Sulaiman Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Salim-Sulaiman Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Salim-Sulaiman Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Salim-Sulaiman Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Salim-Sulaiman Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Salim-Sulaiman Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Salim-Sulaiman Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Salim-Sulaiman Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Salim-Sulaiman Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Salim-Sulaiman Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Salim-Sulaiman Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Salim-Sulaiman Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Salim-Sulaiman Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Salim-Sulaiman Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Salim-Sulaiman Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Salim-Sulaiman Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      }
    ]
  },
  {
    "id": "javed-ali",
    "name": "Javed Ali",
    "tagline": "Soulful Sufi Crooner with Silky Pitch",
    "avatar": "/artists/javed-ali.jpg",
    "bgColor": "#4a044e",
    "topTracks": [
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Javed Ali Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Javed Ali Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Javed Ali Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Javed Ali Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Javed Ali Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Javed Ali Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Javed Ali Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Javed Ali Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Javed Ali Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Javed Ali Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Javed Ali Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Javed Ali Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Javed Ali Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Javed Ali Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      },
      {
        "id": "P-V3n5_Qy5k",
        "title": "Javed Ali Hit 15",
        "album": "Essential Hits",
        "duration": "5:38"
      },
      {
        "id": "Grr0Exhy-lQ",
        "title": "Javed Ali Hit 16",
        "album": "Essential Hits",
        "duration": "5:11"
      },
      {
        "id": "Etkd-07gnxM",
        "title": "Javed Ali Hit 17",
        "album": "Essential Hits",
        "duration": "3:53"
      }
    ]
  },
  {
    "id": "sanam",
    "name": "Sanam",
    "tagline": "India’s Favorite Pop-Rock Revival Band",
    "avatar": "/artists/sanam.jpg",
    "bgColor": "#0c4a6e",
    "topTracks": [
      {
        "id": "QKfGl39ZJWI",
        "title": "Gulabi Aankhen",
        "album": "Single",
        "duration": "3:50"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Mere Mehboob Qayamat Hogi",
        "album": "Single",
        "duration": "4:10"
      },
      {
        "id": "7JnKVPtRqVE",
        "title": "Yeh Raaten Yeh Mausam",
        "album": "Single",
        "duration": "3:45"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "duration": "7:53"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Chaiyya Chaiyya",
        "album": "Dil Se",
        "duration": "6:54"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "BddP6PYo2gs",
        "title": "Sanam Hit 1",
        "album": "Essential Hits",
        "duration": "4:15"
      },
      {
        "id": "P1fIdFRnfqw",
        "title": "Sanam Hit 2",
        "album": "Essential Hits",
        "duration": "3:45"
      },
      {
        "id": "284Ov7ysmfA",
        "title": "Sanam Hit 3",
        "album": "Essential Hits",
        "duration": "4:30"
      },
      {
        "id": "9YhzTM-KHkM",
        "title": "Sanam Hit 4",
        "album": "Essential Hits",
        "duration": "3:50"
      },
      {
        "id": "DMLrGfMxOQA",
        "title": "Sanam Hit 5",
        "album": "Essential Hits",
        "duration": "5:06"
      },
      {
        "id": "AEIVhBS6baE",
        "title": "Sanam Hit 6",
        "album": "Essential Hits",
        "duration": "4:55"
      },
      {
        "id": "jHNNMj5bNQw",
        "title": "Sanam Hit 7",
        "album": "Essential Hits",
        "duration": "3:43"
      },
      {
        "id": "VJCoDjStos0",
        "title": "Sanam Hit 8",
        "album": "Essential Hits",
        "duration": "4:12"
      },
      {
        "id": "4coEYCvx-qk",
        "title": "Sanam Hit 9",
        "album": "Essential Hits",
        "duration": "4:49"
      },
      {
        "id": "R6g_k5xq1GM",
        "title": "Sanam Hit 10",
        "album": "Essential Hits",
        "duration": "4:09"
      },
      {
        "id": "J_DWkWqANyU",
        "title": "Sanam Hit 11",
        "album": "Essential Hits",
        "duration": "4:20"
      },
      {
        "id": "cYOB941gyXI",
        "title": "Sanam Hit 12",
        "album": "Essential Hits",
        "duration": "4:50"
      },
      {
        "id": "odVptmgIcD0",
        "title": "Sanam Hit 13",
        "album": "Essential Hits",
        "duration": "5:44"
      },
      {
        "id": "p4fxIdy7ndw",
        "title": "Sanam Hit 14",
        "album": "Essential Hits",
        "duration": "4:47"
      }
    ]
  }
];
