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
        "id": "D2iTQnJdHAA",
        "title": "Jai Hind | Lyrical Video | Udta Teer | Ayushmann Khurrana, Sara|Sachin-Jigar, Amitabh B.",
        "album": "Sachin-Jigar Hits",
        "duration": "3:14"
      },
      {
        "id": "PpbDiI03ZAY",
        "title": "Mileya Mileya - Lyrical Video | Saif Ali Khan | Ileana D'Cruz | Sachin-Jigar | Happy Ending",
        "album": "Sachin-Jigar Hits",
        "duration": "4:30"
      },
      {
        "id": "kQkH6Ch8Kbg",
        "title": "Saibo - Sachin-Jigar, Shreya Ghosha, Tochi Raina",
        "album": "Sachin-Jigar Hits",
        "duration": "3:16"
      },
      {
        "id": "-JMtKCqnkm0",
        "title": "Nazar Na Lag Jaaye With Lyrics | STREE | Rajkummar Rao, Shraddha Kapoor | Ash King & Sachin-Jigar",
        "album": "Sachin-Jigar Hits",
        "duration": "3:47"
      },
      {
        "id": "3EVCqRLf2Vo",
        "title": "Pardesiya (Film Version) Sidharth M, Janhvi K |Param Sundari|Sachin-Jigar, Sonu,Krishnakali,Amitabh",
        "album": "Sachin-Jigar Hits",
        "duration": "3:55"
      },
      {
        "id": "_wjtdQs0cqc",
        "title": "Pardesiya Lyrics - Param Sundari | Sachin-Jigar, Sonu Nigam, Krishnakali Saha",
        "album": "Sachin-Jigar Hits",
        "duration": "3:51"
      },
      {
        "id": "a7M4YuI-2yM",
        "title": "Khasiyat | Chand Mera Dil | Ananya Panday, Lakshya | Sachin Jigar, Raghav C, Jonita, Amitabh B",
        "album": "Sachin-Jigar Hits",
        "duration": "3:36"
      },
      {
        "id": "1ieSD44Yjyk",
        "title": "Bezubaan - Lyrical Video | ABCD | Dharmesh, Lauren, Punit, Salman Y | Prabhu Deva | Sachin Jigar",
        "album": "Sachin-Jigar Hits",
        "duration": "4:43"
      },
      {
        "id": "3B23vFrKmpw",
        "title": "Phir Ajnabi | Lyric Video | Chand Mera Dil | Ananya Panday, Lakshya | Sachin-Jigar, Junaid, Amitabh",
        "album": "Sachin-Jigar Hits",
        "duration": "4:57"
      },
      {
        "id": "u8P9hAvqp6Y",
        "title": "Lyrical | Afeemi Song with Lyrics | Meri Pyaari Bindu | Ayushmann, Parineeti | Sachin-Jigar | Kausar",
        "album": "Sachin-Jigar Hits",
        "duration": "4:10"
      },
      {
        "id": "yTE0e7_9l5U",
        "title": "Pardesiya Param Sundari | Sidharth M, Janhvi K |Sachin-Jigar, Sonu, Krishnakali, Amitabh B",
        "album": "Sachin-Jigar Hits",
        "duration": "3:49"
      },
      {
        "id": "S_uNRplC6QM",
        "title": "Sachin-Jigar, Faheem Abdullah - Chand Mera Dil",
        "album": "Sachin-Jigar Hits",
        "duration": "4:42"
      },
      {
        "id": "BMwWV9SXZHs",
        "title": "Aitbaar | Chand Mera Dil | Lakshya, Ananya Panday | Sachin-Jigar, Faheem Abdullah, Amitabh B.",
        "album": "Sachin-Jigar Hits",
        "duration": "3:27"
      },
      {
        "id": "xAMOJ2PNfNQ",
        "title": "Khasiyat | Lyric Video | Chand Mera Dil | Ananya Panday, Lakshya | Sachin Jigar, Raghav C, Jonita",
        "album": "Sachin-Jigar Hits",
        "duration": "4:09"
      },
      {
        "id": "BII6CBDnqgs",
        "title": "Aitbaar | Lyric Video | Chand Mera Dil | Lakshya, Ananya Panday | Sachin-Jigar, Faheem, Amitabh B.",
        "album": "Sachin-Jigar Hits",
        "duration": "3:55"
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
        "id": "pGuc4hPhiKw",
        "title": "Bin Tere - Lyrical Song | I Hate Luv Storys | Sonam Kapoor, Imran Khan | Vishal & Shekhar",
        "album": "Vishal-Shekhar Hits",
        "duration": "5:32"
      },
      {
        "id": "_51KXfwcPMs",
        "title": "Lyrical | Bulleya Song with Lyrics | Sultan | Salman, Anushka, Vishal & Shekhar, Irshad Kamil, Papon",
        "album": "Vishal-Shekhar Hits",
        "duration": "4:34"
      },
      {
        "id": "oAVhUAaVCVQ",
        "title": "Lyrical: Chammak Challo | Ra One | ShahRukh Khan | Kareena Kapoor",
        "album": "Vishal-Shekhar Hits",
        "duration": "4:06"
      },
      {
        "id": "_0nEaQRCtJ8",
        "title": "Chammak Challo Lyrics - Ra.One | Akon, Hamsika Iyer, Vishal-Shekhar",
        "album": "Vishal-Shekhar Hits",
        "duration": "3:47"
      },
      {
        "id": "1Na8nKEUjYI",
        "title": "Vishal & Shekhar, Shahid Mallya, Nisha Mascarenhas, Marianne D'cruz Aiman - Kukkad",
        "album": "Vishal-Shekhar Hits",
        "duration": "3:08"
      },
      {
        "id": "AEXBUXblnro",
        "title": "Kukkad - Vishal & Shekhar, Shahid Mallya, Nisha Mascarenhas, Marianne D'cruz Aiman",
        "album": "Vishal-Shekhar Hits",
        "duration": "3:08"
      },
      {
        "id": "H-TRCAS3ODU",
        "title": "Sadka - Lyrical Song | Sonam Kapoor | Imran Khan I Hate Luv Storys | Vishal & Shekhar",
        "album": "Vishal-Shekhar Hits",
        "duration": "5:48"
      },
      {
        "id": "_tEjIYtGBwc",
        "title": "Nashe Si Chadh Gayi Song Lyrics | Vishal and Shekhar | Arijit Singh | 🎧🎤 ❤️",
        "album": "Vishal-Shekhar Hits",
        "duration": "3:59"
      },
      {
        "id": "qOTiocnriYo",
        "title": "Ishq Wala Love - Vishal-Shekhar | 7clouds Hindi",
        "album": "Vishal-Shekhar Hits",
        "duration": "4:18"
      },
      {
        "id": "tPGKswBLGoM",
        "title": "Bin Tere - Shafqat Amanat Ali, Sunidhi Chauhan, and Vishal–Shekhar | 7clouds Hindi",
        "album": "Vishal-Shekhar Hits",
        "duration": "5:32"
      },
      {
        "id": "28Zsch1QjPI",
        "title": "Desi Girl Lyrics - Dostana | Vishal-Shekhar, Shankar Mahadevan, Sunidhi Chauhan, Vishal Dadlani",
        "album": "Vishal-Shekhar Hits",
        "duration": "5:08"
      },
      {
        "id": "kNlY7VKDdno",
        "title": "Vele Full Video - SOTY|Sidharth Malhotra,Varun Dhawan|Vishal Dadlani,Shekhar Ravjiani",
        "album": "Vishal-Shekhar Hits",
        "duration": "4:45"
      },
      {
        "id": "YcaUlwVVXmo",
        "title": "Vele Lyrics - Student of the Year | Shekhar Ravjiani, Vishal Dadlani • oh dil mein tope chalti hai",
        "album": "Vishal-Shekhar Hits",
        "duration": "3:51"
      },
      {
        "id": "QuDd9YBJTj8",
        "title": "I Hate Luv Storys - Vishal-Shekhar | 7clouds Hindi",
        "album": "Vishal-Shekhar Hits",
        "duration": "4:46"
      },
      {
        "id": "aHEbLVElUwY",
        "title": "Hairat Lyrical | Anjaana Anjaani | Ranbir Kapoor, Priyanka Chopra | Lucky Ali |Vishal - Shekhar",
        "album": "Vishal-Shekhar Hits",
        "duration": "4:29"
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
        "id": "ZG6zDWbp_6U",
        "title": "Kyaa Dil Ne Kahaa Title Song | Tusshar Kapoor | Esha | Udit Narayan | Alka Yagnik",
        "album": "Udit Narayan Hits",
        "duration": "5:02"
      },
      {
        "id": "n_oP9Onj0r0",
        "title": "Jaadu Teri Nazar Song | Darr | Shah Rukh Khan, Juhi Chawla | Udit Narayan | Shiv-Hari | Anand Bakshi",
        "album": "Udit Narayan Hits",
        "duration": "2:38"
      },
      {
        "id": "sGKKkb1MiKk",
        "title": "Achchi Lagti Ho - Udit Narayan, Kavita Krishnamurthy",
        "album": "Udit Narayan Hits",
        "duration": "6:19"
      },
      {
        "id": "lZ2C5w2jQHk",
        "title": "Dil Kya Kare - Alka Yagnik, Udit Narayan, Jatin-Lalit",
        "album": "Udit Narayan Hits",
        "duration": "4:28"
      },
      {
        "id": "B72_HsUR0Vc",
        "title": "Jo Bhi Kasmein Khai Thi Humne - Raaz | Bipasha Basu & Dino Morea | Alka Yagnik & Udit Narayan",
        "album": "Udit Narayan Hits",
        "duration": "5:36"
      },
      {
        "id": "siw7-MTgE4s",
        "title": "Lyrical: Hamein Tumse Hua Hai Pyar |Alka Y|Udit N|Anu Malik|Sameer|Akshay Kumar,Divya Khosla Kumar",
        "album": "Udit Narayan Hits",
        "duration": "6:02"
      },
      {
        "id": "x1liId8imhw",
        "title": "Oodhni | Tere Naam | Salman Khan | Bhoomika Chawla | Udit Narayan, Alka Yagnik | Himesh",
        "album": "Udit Narayan Hits",
        "duration": "7:11"
      },
      {
        "id": "m6Y8xEfyXTs",
        "title": "Main Yahaan Hoon | Full Song | Veer-Zaara | Shah Rukh Khan, Preity Zinta | Madan Mohan, Udit Narayan",
        "album": "Udit Narayan Hits",
        "duration": "4:57"
      },
      {
        "id": "MbIRbYjLdqM",
        "title": "Hum Tumko Nigahon Mein Lyrical Video | Garv-Pride & Honour | Udit N,Shreya G|Salman Khan, Shilpa S",
        "album": "Udit Narayan Hits",
        "duration": "5:58"
      },
      {
        "id": "tD8M2BpSnwc",
        "title": "Dekhne Walon Ne - Udit Narayan | Alka Yagnik | Best Hindi Song",
        "album": "Udit Narayan Hits",
        "duration": "7:24"
      },
      {
        "id": "cImjLnlytFU",
        "title": "Main Yahaan Hoon - Udit Narayan 🎶 | Janam dekh lo mit gayi dooriyan main yahan hun yahan ✨",
        "album": "Udit Narayan Hits",
        "duration": "5:56"
      },
      {
        "id": "vf0au_2CYYE",
        "title": "Jhuki Jhuki Nazar Teri Kamaal - Lyrical | Raja | Madhuri Dixit | Sanjay | Alka Yagnik | Udit Narayan",
        "album": "Udit Narayan Hits",
        "duration": "7:20"
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
        "id": "r5qAbExIh3w",
        "title": "Shankar-Ehsaan-Loy - Unnai Kaanadhu Naan ft. Shankar Mahadevan & Kamal Haasan",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "5:38"
      },
      {
        "id": "fyJvsb2cQy8",
        "title": "Kal Ho Naa Ho - | Sonu Nigam | Shankar Ehsaan Loy | Javed Akhtar",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "5:22"
      },
      {
        "id": "Suv5QfWKaaw",
        "title": "Shankar Ehsaan Loy, Shankar Mahadevan, Caralisa Monteiro - Mitwa",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "6:24"
      },
      {
        "id": "85QtgoDGiho",
        "title": "It's the Time to Disco - Lyrical Video | Shahrukh, Saif, Preity | Shankar Ehsaan Loy | Kal Ho Naa Ho",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "5:13"
      },
      {
        "id": "ru_5PA8cwkE",
        "title": "Mitwa - Full Video | Shahrukh Khan | Rani Mukherjee | Shafqat Amanat Ali | Shankar Mahadevan | KANK",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "6:01"
      },
      {
        "id": "XllMnMHdiLE",
        "title": "Mitwa - Lyrical Song | KANK | Shahrukh Khan, Rani Mukherjee | Shankar Ehsaan Loy | Romantic Song",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "6:21"
      },
      {
        "id": "oq5Ocx_rEv8",
        "title": "Kal Ho Naa Ho - Official Audio Song | Sonu Nigam | Shankar Ehsaan Loy | Javed Akhtar",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "5:23"
      },
      {
        "id": "9tXtv8XE6lU",
        "title": "breathless lyrics ll shankar mahadevan ll saregama lyrics ll",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "6:07"
      },
      {
        "id": "nWeax5joZFw",
        "title": "Breathless | Shankar Mahadevan | Javed Akhtar",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "2:55"
      },
      {
        "id": "M03GOY5eINg",
        "title": "It's the Time to Disco - Kal Ho Naa Ho | Shahrukh, Saif, Preity | Shankar Ehsaan Loy",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "5:10"
      },
      {
        "id": "jXwg9l9D51A",
        "title": "Bol Na Halke Halke | Full Song | Jhoom Barabar Jhoom | Abhishek, Preity | Shankar-Ehsaan-Loy, Gulzar",
        "album": "Shankar-Ehsaan-Loy Hits",
        "duration": "7:42"
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
        "id": "NW6Dgax2d6I",
        "title": "Sahiba Jasleen Royal |Vijay Deverakonda Radhikka Madan|Stebin| Priya|Aditya| Sudhanshu",
        "album": "Jasleen Royal Hits",
        "duration": "4:20"
      },
      {
        "id": "Npd94-t1Lv0",
        "title": "Jasleen Royal & Stebin Ben - Sahiba | Vijay Deverakonda | Radhika Madan",
        "album": "Jasleen Royal Hits",
        "duration": "3:37"
      },
      {
        "id": "cTM9npxzvhQ",
        "title": "Jasleen Royal, Ujjwal Kashyap - Sang Rahiyo",
        "album": "Jasleen Royal Hits",
        "duration": "3:34"
      },
      {
        "id": "8PTOkwze0Vw",
        "title": "Sang Rahiyo | Jasleen Royal ft. Ranveer Allahbadia | Ujjwal Kashyap,Neeraj Rajawat",
        "album": "Jasleen Royal Hits",
        "duration": "3:33"
      },
      {
        "id": "JP6lOO14-K4",
        "title": "Deh Shiva | Jasleen Royal | Kesari",
        "album": "Jasleen Royal Hits",
        "duration": "2:38"
      },
      {
        "id": "RLzC55ai0eo",
        "title": "Heeriye Jasleen Royal ft Arijit Singh| Dulquer Salmaan| Aditya Sharma |Taani Tanvir",
        "album": "Jasleen Royal Hits",
        "duration": "3:19"
      },
      {
        "id": "oP4eBWhyhY8",
        "title": "Koi Naam Jasleen Royal | Aditya Sharma | Thea Chingarova",
        "album": "Jasleen Royal Hits",
        "duration": "3:47"
      },
      {
        "id": "7YbfDiCC-qk",
        "title": "Nit Nit | Jasleen Royal | Punjabi Song | Ishtar Punjabi",
        "album": "Jasleen Royal Hits",
        "duration": "4:19"
      },
      {
        "id": "PWscHh2U5d4",
        "title": "Jasleen Royal, Ujjwal Kashyap, Neeraj Rajawat - Sang Rahiyo",
        "album": "Jasleen Royal Hits",
        "duration": "3:34"
      },
      {
        "id": "ObiCEWmYH5Y",
        "title": "Heeriye Jasleen Royal ft. Arijit Singh & Dulquer Salmaan",
        "album": "Jasleen Royal Hits",
        "duration": "3:15"
      },
      {
        "id": "1LVpuWpRs3I",
        "title": "Din Shagna Da Lyrical Video | Phillauri | Anushka Sharma, Diljit Dosanjh | Jasleen Royal",
        "album": "Jasleen Royal Hits",
        "duration": "3:36"
      },
      {
        "id": "6CXKtmRjOto",
        "title": "Inaam - Jasleen Royal Ft. Badshah | Ansh Chahal | Official Lyrical Video",
        "album": "Jasleen Royal Hits",
        "duration": "2:59"
      },
      {
        "id": "eg5sCr08kjE",
        "title": "Nit Nit | Jasleen Royal | Aditya Sharma | New Punjabi Song 2020",
        "album": "Jasleen Royal Hits",
        "duration": "4:06"
      },
      {
        "id": "V7LwfY5U5WI",
        "title": "Ranjha – Official Video | Shershaah | Sidharth–Kiara | B Praak | Jasleen Royal | Romy | Anvita Dutt",
        "album": "Jasleen Royal Hits",
        "duration": "3:14"
      },
      {
        "id": "heK-1nbZMCE",
        "title": "Sang Rahiyo - Jasleen Royal, Ujjwal Kashyap",
        "album": "Jasleen Royal Hits",
        "duration": "3:29"
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
        "id": "dx4Teh-nv3A",
        "title": "Namo Namo - Lyrical | Kedarnath | Sushant Rajput | Sara Ali Khan | Amit Trivedi | Amitabh B",
        "album": "Amit Trivedi Hits",
        "duration": "5:29"
      },
      {
        "id": "JKSoBqnQ5I4",
        "title": "Iktara - Amit Trivedi, Kavita Seth, Amitabh Bhattacharya",
        "album": "Amit Trivedi Hits",
        "duration": "4:14"
      },
      {
        "id": "LhBx4wBh7co",
        "title": "Amit Trivedi - Namo Namo Song",
        "album": "Amit Trivedi Hits",
        "duration": "5:23"
      },
      {
        "id": "WfDFWLZgQwE",
        "title": "Naina Da Kya Kasoor - Lyrical | AndhaDhun | Ayushmann Khurrana | Radhika Apte | Amit Trivedi",
        "album": "Amit Trivedi Hits",
        "duration": "3:38"
      },
      {
        "id": "yALvgZi-84o",
        "title": "Namo Namo - Lyrical | Kedarnath | Sushant Rajput | Sara Ali Khan | Amit Trivedi | Amitabh B",
        "album": "Amit Trivedi Hits",
        "duration": "5:29"
      },
      {
        "id": "akjdj6iHttY",
        "title": "Iktara - Lyric Video - Wake Up Sid | Ranbir Kapoor | Konkona Sen Sharma",
        "album": "Amit Trivedi Hits",
        "duration": "4:19"
      },
      {
        "id": "Z8BB-f2qa0g",
        "title": "Jaikal Mahakal - Lyrical | Goodbye | Amitabh Bachchan, Rashmika| Amit Trivedi| Mahashivratri Special",
        "album": "Amit Trivedi Hits",
        "duration": "4:19"
      },
      {
        "id": "w74c6Wnsz8g",
        "title": "Lagan Laagi Re | Amit Trivedi ft. Shreya Ghoshal, Kavita Seth | Shellee | Songs of Love | AT Azaad",
        "album": "Amit Trivedi Hits",
        "duration": "4:56"
      },
      {
        "id": "dPuvXj71KLo",
        "title": "Chaudhary Lyric Video - Mame Khan | Amit Trivedi",
        "album": "Amit Trivedi Hits",
        "duration": "7:06"
      },
      {
        "id": "AKurXFpabfQ",
        "title": "Naina Da Kya Kasoor - Lyrical | AndhaDhun | Ayushmann Khurrana | Radhika Apte | Amit Trivedi",
        "album": "Amit Trivedi Hits",
        "duration": "3:38"
      },
      {
        "id": "WfHTtP4OomY",
        "title": "Namo Namo - Lyrical | Kedarnath | Sushant Rajput | Sara Ali Khan | Amit Trivedi | Amitabh B",
        "album": "Amit Trivedi Hits",
        "duration": "5:29"
      },
      {
        "id": "1gukvtH_a3I",
        "title": "Chaudhary - Amit Trivedi feat Mame Khan, Coke Studio @ MTV Season 2",
        "album": "Amit Trivedi Hits",
        "duration": "7:01"
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
        "id": "ddCTgPE2LlA",
        "title": "Takdaa Rawaan Sachet Tandon, Parampara Tandon | Kumaar, Adil Shaikh | Bhushan Kumar",
        "album": "Sachet Tandon Hits",
        "duration": "3:01"
      },
      {
        "id": "FgfcZlyDUfQ",
        "title": "Saath : Sachet Tandon | Parampara Tandon | Kausar Munir",
        "album": "Sachet Tandon Hits",
        "duration": "3:15"
      },
      {
        "id": "Nl9iOvrsiCg",
        "title": "Lyrical | Humsafar Song | Saiyaara | Ahaan, Aneet | Sachet Tandon, Parampara Tandon, Irshad Kamil",
        "album": "Sachet Tandon Hits",
        "duration": "5:23"
      },
      {
        "id": "5CYM95HTiRw",
        "title": "Malang Sajna Sachet Tandon, Parampara Tandon | Adil Shaikh, Kumaar | Bhushan Kumar",
        "album": "Sachet Tandon Hits",
        "duration": "2:55"
      },
      {
        "id": "0NXnRmoILSs",
        "title": "Lyrical | Humsafar Song | Saiyaara | Ahaan, Aneet | Sachet Tandon, Parampara Tandon, Irshad Kamil",
        "album": "Sachet Tandon Hits",
        "duration": "5:22"
      },
      {
        "id": "KW6Qnip__fM",
        "title": "Saath : Sachet Tandon, Parampara Tandon | Kausar Munir",
        "album": "Sachet Tandon Hits",
        "duration": "3:05"
      },
      {
        "id": "UbMgcdmYC70",
        "title": "Malang Sajna Sachet Tandon, Parampara Tandon | Adil Shaikh, Kumaar | Bhushan Kumar",
        "album": "Sachet Tandon Hits",
        "duration": "2:38"
      },
      {
        "id": "BxBda5HsRmU",
        "title": "PROMISE : SACHET - PARAMPARA | BHUSHAN KUMAR",
        "album": "Sachet Tandon Hits",
        "duration": "3:12"
      },
      {
        "id": "u8_BoBDKOYk",
        "title": "MERI HO JA : SACHET TANDON | PARAMPARA TANDON | KUMAAR | BHUSHAN KUMAR",
        "album": "Sachet Tandon Hits",
        "duration": "3:19"
      },
      {
        "id": "RFOF7n5jjGg",
        "title": "Takdaa Rawaan Sachet Tandon, Parampara Tandon | Kumaar, Adil Shaikh | Bhushan Kumar",
        "album": "Sachet Tandon Hits",
        "duration": "2:53"
      },
      {
        "id": "vJQMhj6WYZA",
        "title": "Barbaadiyan | Shiddat |Sunny K,Radhika M |Sachet T,Nikhita G, Madhubanti B|Sachin -Jigar",
        "album": "Sachet Tandon Hits",
        "duration": "4:02"
      },
      {
        "id": "PkUccvBzzYE",
        "title": "Barbaadiyan - Sachet Tandon, Nikita Gandhi | Sunny K, Radhika M | Sachin-Jigar | TNGL",
        "album": "Sachet Tandon Hits",
        "duration": "3:57"
      },
      {
        "id": "BSK29-Hagsg",
        "title": "Deewani Sachet Tandon, Parampara Tandon | Kumaar | Adil Shaikh | Bhushan Kumar",
        "album": "Sachet Tandon Hits",
        "duration": "3:15"
      },
      {
        "id": "IWd9ZrzcvtE",
        "title": "Malang Sajna Sachet Parampara | Adil Shaikh, Kumaar | #347",
        "album": "Sachet Tandon Hits",
        "duration": "2:33"
      },
      {
        "id": "IgRI9sndhuk",
        "title": "Sachet Tandon - Bekhayali #sachettandon #bekhayali #bekhayalilyrics",
        "album": "Sachet Tandon Hits",
        "duration": "6:12"
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
        "id": "-yOmWknRVPA",
        "title": "Tune Zindagi Mein Alka Yagnik (Female Version)",
        "album": "Alka Yagnik Hits",
        "duration": "5:11"
      },
      {
        "id": "EP5A8TwE6CQ",
        "title": "Jo Haal Dil Ka | Kumar Sanu | Alka Yagnik | Sarfarosh | 1999 | Lyrics Fizz",
        "album": "Alka Yagnik Hits",
        "duration": "4:24"
      },
      {
        "id": "dbVYiSB58uo",
        "title": "Jab Haal E Dil Tumse Kehne Ko - Alka Yagnik | Nadeem Shravan | Salaami | Alka Yagnik Hits Songs",
        "album": "Alka Yagnik Hits",
        "duration": "6:16"
      },
      {
        "id": "lZ2C5w2jQHk",
        "title": "Dil Kya Kare - Alka Yagnik, Udit Narayan, Jatin-Lalit",
        "album": "Alka Yagnik Hits",
        "duration": "4:28"
      },
      {
        "id": "9iUOU8O8Fys",
        "title": "Qayamat Qayamat - Lyrical | Deewane | Ajay Devgn, Urmila | Sukhwinder Singh, Alka Yagnik |Hindi Hits",
        "album": "Alka Yagnik Hits",
        "duration": "6:18"
      },
      {
        "id": "x1liId8imhw",
        "title": "Oodhni | Tere Naam | Salman Khan | Bhoomika Chawla | Udit Narayan, Alka Yagnik | Himesh",
        "album": "Alka Yagnik Hits",
        "duration": "7:11"
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
        "id": "AWNGLm8jXhw",
        "title": "Jhalak Dikhla Ja - Himesh Reshammiya 🎶 | Karta rehta hoon main bas teri hi baatein ✨",
        "album": "Himesh Reshammiya Hits",
        "duration": "6:14"
      },
      {
        "id": "IMMN7_--N0s",
        "title": "Himesh Reshammiya, Jayesh Gandhi, Alisha Chinai - Annan Faanan",
        "album": "Himesh Reshammiya Hits",
        "duration": "6:08"
      },
      {
        "id": "DrwU9OgJjW8",
        "title": "Samjho Na Kuch To Samjho Na Video Song Himesh Reshammiya Feat. Sonal Chauhan | Aap Kaa Surroor",
        "album": "Himesh Reshammiya Hits",
        "duration": "5:53"
      },
      {
        "id": "snH8B-zf_EY",
        "title": "Samjho Na LyRics| Himesh Reshmiyaan| LyRics WriTes",
        "album": "Himesh Reshammiya Hits",
        "duration": "6:21"
      },
      {
        "id": "b4b1cMVZOUU",
        "title": "Full Video: Hookah Bar | Khiladi 786 | Akshay Kumar & Asin | Himesh Reshammiya",
        "album": "Himesh Reshammiya Hits",
        "duration": "2:55"
      },
      {
        "id": "EvMKzUCifiU",
        "title": "Hookah Bar Lyrics - Khiladi 786 | Himesh Reshammiya, Aaman Trikha, Vineet Singh",
        "album": "Himesh Reshammiya Hits",
        "duration": "4:14"
      },
      {
        "id": "NM2PqrVahY4",
        "title": "There Is Not A Single Day When I Don't Miss You | Himesh Reshammiya | Aap Ka Surroor",
        "album": "Himesh Reshammiya Hits",
        "duration": "5:54"
      },
      {
        "id": "muBujmnawqw",
        "title": "Lyrical: TERI YAAD (REPRISE) | TERAA SURROOR | Himesh Reshammiya, Farah Karimaee",
        "album": "Himesh Reshammiya Hits",
        "duration": "5:23"
      },
      {
        "id": "W8uFlXCv9yE",
        "title": "Naam Hai Tera | Himesh Reshammiya | Aap Kaa Surroor | Deepika Padukone",
        "album": "Himesh Reshammiya Hits",
        "duration": "5:04"
      },
      {
        "id": "onmfzWG_GRI",
        "title": "Tera Surroor : Himesh Reshammiya | Aap Kaa Surroor | Superhit Pop Song",
        "album": "Himesh Reshammiya Hits",
        "duration": "6:11"
      },
      {
        "id": "ia5CdcuqSWk",
        "title": "Terre Pyaar Mein | Surroor 2021 The Album | Himesh Reshammiya | Shivangi Verma",
        "album": "Himesh Reshammiya Hits",
        "duration": "5:03"
      },
      {
        "id": "vvlkm6JLq6Y",
        "title": "Terre Pyaar Mein - Himesh Reshammiya | Masroof Hai Dil Kitna | Surroor 2021| Shivangi Verma",
        "album": "Himesh Reshammiya Hits",
        "duration": "5:06"
      },
      {
        "id": "SfEk5W3zH98",
        "title": "BEKHUDI Full Video Song | TERAA SURROOR | Himesh Reshammiya, Farah Karimaee",
        "album": "Himesh Reshammiya Hits",
        "duration": "4:09"
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
        "id": "bP8ATWCvqzw",
        "title": "Anuv Jain X Lost Stories - Arz Kiya Hai | Coke Studio Bharat",
        "album": "Anuv Jain Hits",
        "duration": "5:06"
      },
      {
        "id": "0wlulIyVh0g",
        "title": "Arz Kiya Hai - Anuv Jain | Coke Studio",
        "album": "Anuv Jain Hits",
        "duration": "5:03"
      },
      {
        "id": "gJLVTKhTnog",
        "title": "Anuv Jain - HUSN",
        "album": "Anuv Jain Hits",
        "duration": "4:00"
      },
      {
        "id": "0IIJxkDtkHY",
        "title": "Anuv Jain - HUSN",
        "album": "Anuv Jain Hits",
        "duration": "3:38"
      },
      {
        "id": "Y2hnnM_tSWw",
        "title": "Anuv Jain - Arz Kiya Hai | Romantic Song",
        "album": "Anuv Jain Hits",
        "duration": "5:06"
      },
      {
        "id": "ilNt2bikxDI",
        "title": "Anuv Jain - JO TUM MERE HO",
        "album": "Anuv Jain Hits",
        "duration": "4:18"
      },
      {
        "id": "v8FWvQyCsd8",
        "title": "Anuv Jain - Arz Kiya Hai",
        "album": "Anuv Jain Hits",
        "duration": "5:03"
      },
      {
        "id": "wmUJwQNGK3k",
        "title": "Anuv Jain - JO TUM MERE HO",
        "album": "Anuv Jain Hits",
        "duration": "4:16"
      },
      {
        "id": "aFy3tn1R3WI",
        "title": "Anuv Jain - HUSN",
        "album": "Anuv Jain Hits",
        "duration": "3:38"
      },
      {
        "id": "PJWemSzExXs",
        "title": "BAARISHEIN (Studio) Anuv Jain",
        "album": "Anuv Jain Hits",
        "duration": "3:28"
      },
      {
        "id": "6fTilfKvxbo",
        "title": "Baarishein | Anuv Jain.",
        "album": "Anuv Jain Hits",
        "duration": "3:24"
      },
      {
        "id": "5wDYhMwCV34",
        "title": "Anuv Jain - JO TUM MERE HO",
        "album": "Anuv Jain Hits",
        "duration": "4:16"
      },
      {
        "id": "9fKQJcbd-jY",
        "title": "Anuv Jain - INAAM",
        "album": "Anuv Jain Hits",
        "duration": "4:31"
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
        "id": "9MDi9ecoXoI",
        "title": "Shubh - Cheques",
        "album": "Shubh Hits",
        "duration": "3:04"
      },
      {
        "id": "z1BxCnuT7eg",
        "title": "Shubh - Supreme",
        "album": "Shubh Hits",
        "duration": "2:59"
      },
      {
        "id": "4tywp83zkmk",
        "title": "Shubh - Cheques",
        "album": "Shubh Hits",
        "duration": "3:09"
      },
      {
        "id": "AX1zRInC_TA",
        "title": "Shubh - Supreme",
        "album": "Shubh Hits",
        "duration": "2:56"
      },
      {
        "id": "g1-npsjnyNA",
        "title": "Fell For You - Shubh",
        "album": "Shubh Hits",
        "duration": "2:34"
      },
      {
        "id": "SiKfBBoF51w",
        "title": "Shubh - Fell For You",
        "album": "Shubh Hits",
        "duration": "2:34"
      },
      {
        "id": "0pWsCiBvLOk",
        "title": "Shubh - One Love",
        "album": "Shubh Hits",
        "duration": "2:40"
      },
      {
        "id": "XfXgUZDCAoA",
        "title": "Shubh - One Love",
        "album": "Shubh Hits",
        "duration": "2:40"
      },
      {
        "id": "tlkb3cLfaOQ",
        "title": "Shubh - Moves",
        "album": "Shubh Hits",
        "duration": "2:40"
      },
      {
        "id": "xR3V5Ow2dTI",
        "title": "Shubh - Baller",
        "album": "Shubh Hits",
        "duration": "2:34"
      },
      {
        "id": "NSVUw0ydxBw",
        "title": "Shubh - Baller",
        "album": "Shubh Hits",
        "duration": "2:29"
      },
      {
        "id": "d2ofxg8pHfQ",
        "title": "Shubh - King Shit",
        "album": "Shubh Hits",
        "duration": "3:48"
      },
      {
        "id": "jUU0SRqjQRQ",
        "title": "Shubh - King Shit",
        "album": "Shubh Hits",
        "duration": "3:47"
      },
      {
        "id": "ch66vorSAeU",
        "title": "Moves - Shubh | Lyrics",
        "album": "Shubh Hits",
        "duration": "2:40"
      },
      {
        "id": "T_SupLnhMO4",
        "title": "You And Me - Shubh",
        "album": "Shubh Hits",
        "duration": "2:52"
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
        "id": "D0XfB0NPGjk",
        "title": "Baadshah O Baadshah - Lyrics | Abhijeet Bhattacharya | Baadshah | Shah Rukh Khan | Musical ImperiaL",
        "album": "Badshah Hits",
        "duration": "3:47"
      },
      {
        "id": "xUlnx2vBtcs",
        "title": "BANGER Badshah x Sharvi x Hiten ft Aveera Singh",
        "album": "Badshah Hits",
        "duration": "2:41"
      },
      {
        "id": "1XwYoWDvDLA",
        "title": "Baadshah O Baadshah - HD VIDEO | Shahrukh Khan & Twinkle Khanna | Baadshah | Ishtar Music",
        "album": "Badshah Hits",
        "duration": "4:27"
      },
      {
        "id": "sY45iA7PFS8",
        "title": "BANGER Badshah x Sharvi x Hiten ft Aveera Singh | #desihiphop #viralsong",
        "album": "Badshah Hits",
        "duration": "2:53"
      },
      {
        "id": "EgXkduRe9ZU",
        "title": "Mahiya Badshah x Shreya Ghoshal - Mahiya ft. Avneet Kaur",
        "album": "Badshah Hits",
        "duration": "2:35"
      },
      {
        "id": "RmB8RIA6GAs",
        "title": "Mahiya - Badshah x Shreya Ghoshal - Mahiya ft. Avneet Kaur | 7Alfaaz",
        "album": "Badshah Hits",
        "duration": "2:28"
      },
      {
        "id": "a_XqaDoWe8o",
        "title": "Dj Wale Babu - Badshah, Aastha Gill | 7clouds Hindi",
        "album": "Badshah Hits",
        "duration": "2:50"
      },
      {
        "id": "dUaCEs3HfdI",
        "title": "Aastha Gill - Buzz feat Badshah | Priyank Sharma | Official Music Video",
        "album": "Badshah Hits",
        "duration": "3:01"
      },
      {
        "id": "zK85b99xJ8w",
        "title": "Buzz - Aastha Gill, Badshah | 7clouds Hindi",
        "album": "Badshah Hits",
        "duration": "3:14"
      },
      {
        "id": "LfVgu6nxpos",
        "title": "Jugnu - Badshah ft. Nikita Gandhi | LyricsStore 04 | LS04",
        "album": "Badshah Hits",
        "duration": "3:46"
      },
      {
        "id": "gwGesFjbJlI",
        "title": "Mercy - Lyrical Song | Badshah Feat. Lauren Gottlieb | Aditya Dev | ONE Album",
        "album": "Badshah Hits",
        "duration": "2:49"
      },
      {
        "id": "CBPZVr1RoH4",
        "title": "QARAN ft Badshah - Tareefan Veere Di Wedding",
        "album": "Badshah Hits",
        "duration": "3:04"
      },
      {
        "id": "-lNJxBFjfnw",
        "title": "Kar Gayi Chull - Badshah | 7clouds Hindi",
        "album": "Badshah Hits",
        "duration": "3:08"
      },
      {
        "id": "6eGt3x849rI",
        "title": "Badshah o badshah lyrics",
        "album": "Badshah Hits",
        "duration": "6:38"
      },
      {
        "id": "Ci0WbaUH3no",
        "title": "She Move It Like - Official Video | Badshah | Warina Hussain | ONE Album",
        "album": "Badshah Hits",
        "duration": "3:06"
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
        "id": "5CYM95HTiRw",
        "title": "Malang Sajna Sachet Tandon, Parampara Tandon | Adil Shaikh, Kumaar | Bhushan Kumar",
        "album": "Sachet-Parampara Hits",
        "duration": "2:55"
      },
      {
        "id": "FgfcZlyDUfQ",
        "title": "Saath : Sachet Tandon | Parampara Tandon | Kausar Munir",
        "album": "Sachet-Parampara Hits",
        "duration": "3:15"
      },
      {
        "id": "UbMgcdmYC70",
        "title": "Malang Sajna Sachet Tandon, Parampara Tandon | Adil Shaikh, Kumaar | Bhushan Kumar",
        "album": "Sachet-Parampara Hits",
        "duration": "2:38"
      },
      {
        "id": "BSK29-Hagsg",
        "title": "Deewani Sachet Tandon, Parampara Tandon | Kumaar | Adil Shaikh | Bhushan Kumar",
        "album": "Sachet-Parampara Hits",
        "duration": "3:15"
      },
      {
        "id": "BxBda5HsRmU",
        "title": "PROMISE : SACHET - PARAMPARA | BHUSHAN KUMAR",
        "album": "Sachet-Parampara Hits",
        "duration": "3:12"
      },
      {
        "id": "RFOF7n5jjGg",
        "title": "Takdaa Rawaan Sachet Tandon, Parampara Tandon | Kumaar, Adil Shaikh | Bhushan Kumar",
        "album": "Sachet-Parampara Hits",
        "duration": "2:53"
      },
      {
        "id": "hGf8rOwFzvo",
        "title": "Chhor Denge: Parampara Tandon | Sachet-Parampara | Nora Fatehi, Ehan Bhat | Arvindr K, Bhushan Kumar",
        "album": "Sachet-Parampara Hits",
        "duration": "4:29"
      },
      {
        "id": "CPHFu4oUpo0",
        "title": "Deewani | Sachet Tandon, Parampara Tandon | Kumaar | Adil Shaikh | Bhushan Kumar",
        "album": "Sachet-Parampara Hits",
        "duration": "2:53"
      },
      {
        "id": "uSb0M_UQE1o",
        "title": "Har Har Mahadev Sachet Tandon, Parampara Tandon | DJ Shadow Dubai | Bhushan Kumar",
        "album": "Sachet-Parampara Hits",
        "duration": "3:12"
      },
      {
        "id": "9Twe02EdG4w",
        "title": "MERI HO JA : SACHET TANDON | PARAMPARA TANDON | KUMAAR | BHUSHAN KUMAR",
        "album": "Sachet-Parampara Hits",
        "duration": "3:06"
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
        "id": "Vabo2KVaEwA",
        "title": "Pal Pal Dil Ke Paas | Blackmail | Kishore Kumar | Dharmendra & Rakhee | Lyrical Music",
        "album": "Kishore Kumar Hits",
        "duration": "5:23"
      },
      {
        "id": "cvQWzlNIjt8",
        "title": "Pal Pal Dil Ke Paas | Dharmendra | Rakhee | Black Mail (1973) | Kishore Kumar Hit Songs",
        "album": "Kishore Kumar Hits",
        "duration": "5:17"
      },
      {
        "id": "h78lTicDMSo",
        "title": "Yeh Shaam Mastani - Kishore Kumar | Rajesh Khanna | Kati Patang",
        "album": "Kishore Kumar Hits",
        "duration": "4:06"
      },
      {
        "id": "E0PBNCDACCU",
        "title": "Kiska Rasta Dekhe | Kishore Kumar | Dev Anand,Hema Malini,Raakhee | Joshila",
        "album": "Kishore Kumar Hits",
        "duration": "4:14"
      },
      {
        "id": "7RV4oty_0qw",
        "title": "Zindagi Ke Safar Mein Guzar Jate Hain Jo Makam | Kishore Kumar | Lyrical song | #shayarkishore",
        "album": "Kishore Kumar Hits",
        "duration": "6:22"
      },
      {
        "id": "smBX9WxLJho",
        "title": "Chhu Kar Mere Manko - Kishore Kumar | Amitabh Bachchan, Rajesh Roshan | Yaarana",
        "album": "Kishore Kumar Hits",
        "duration": "3:51"
      },
      {
        "id": "4w9FBmbCfws",
        "title": "Chhu Kar Mere Manko | Kishore Kumar | Rajesh Roshan | Revibe | Hindi Songs",
        "album": "Kishore Kumar Hits",
        "duration": "4:14"
      },
      {
        "id": "HpLIPK48a-c",
        "title": "Saagar Jaisi Aankhon Wali | Kishore Kumar | R. D. Burman | Revibe | Hindi Songs",
        "album": "Kishore Kumar Hits",
        "duration": "5:03"
      },
      {
        "id": "_w14bUcxl1c",
        "title": "O Mere Dil Ke Chain | Full Lyrics Video | Kishore Kumar | Rajesh Khanna | Eternal Romantic Classic",
        "album": "Kishore Kumar Hits",
        "duration": "4:34"
      },
      {
        "id": "sXdG1SbRd3A",
        "title": "Neele Neele Ambar Par - Kishore Kumar, Kalyanji-Anandji",
        "album": "Kishore Kumar Hits",
        "duration": "5:22"
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
        "id": "_mZ0VuqRh2c",
        "title": "Lata Mangeshkar - Ajib Dastan Hai Yeh",
        "album": "Lata Mangeshkar Hits",
        "duration": "5:16"
      },
      {
        "id": "A8-IhZ627Fo",
        "title": "Hum Tere Pyaar Mein - Lata Mangeshkar | | Dil Ek Mandir 1963",
        "album": "Lata Mangeshkar Hits",
        "duration": "4:47"
      },
      {
        "id": "1n13FVRtVxs",
        "title": "Hum Tere Pyar Mein - Lyrical Video | Dil Ek Mandir | Lata Mangeshkar, Meena Kumari | Old Hindi Songs",
        "album": "Lata Mangeshkar Hits",
        "duration": "4:52"
      },
      {
        "id": "ltIvlvgEmkA",
        "title": "Ek Pyar Ka Naghma Hai - Lyrical Video | Shor | Lata Mangeshkar | Manoj Kumar | Jaya Bhaduri",
        "album": "Lata Mangeshkar Hits",
        "duration": "6:20"
      },
      {
        "id": "qOkE3ekdaco",
        "title": "Ek Pyar Ka Nagma Hai - Lata Mangeshkar #RIP , Mukesh | Laxmikant Pyarelal | Santosh Anand",
        "album": "Lata Mangeshkar Hits",
        "duration": "6:18"
      },
      {
        "id": "9u-DCn0wDVI",
        "title": "Tujhse Naraz Nahi Zindagi - | Lata Mangeshkar #RIP | R.D. Burman, Gulzar | Masoom 1983",
        "album": "Lata Mangeshkar Hits",
        "duration": "3:57"
      },
      {
        "id": "P4ofSL-n3s0",
        "title": "Lag Ja Gale Se Phir | Lata Mangeshkar Hits | Woh Kaun Thi? (1964)",
        "album": "Lata Mangeshkar Hits",
        "duration": "4:33"
      },
      {
        "id": "vB1qh0eUv78",
        "title": "Lag Ja Gale - Lata Mangeshkar #RIP | Manoj Kumar, Helen, Prem Chopra | Woh Kaun Thi",
        "album": "Lata Mangeshkar Hits",
        "duration": "4:40"
      },
      {
        "id": "gsTWKkxDGos",
        "title": "O Mere Dil Ke Chayan - Lata Mangeshkar #RIP | Rajesh Khanna | 90's Hits Love Romantic Songs",
        "album": "Lata Mangeshkar Hits",
        "duration": "4:44"
      },
      {
        "id": "fmn3CLn7Pv4",
        "title": "Lata Mangeshkar - Agar Tum Na Hote | Audio Lyrical | Rajesh Khanna, Rekha | R. D. Burman",
        "album": "Lata Mangeshkar Hits",
        "duration": "4:19"
      },
      {
        "id": "ZHyacj5SrLE",
        "title": "Lag Jaa Gale -lyrics || Lata Mangeshkar || Woh Kaun Thi || @LYRICS🖤",
        "album": "Lata Mangeshkar Hits",
        "duration": "4:16"
      },
      {
        "id": "DBoljd1XtpM",
        "title": "Bahon Mein Chale Aao - Lata Mangeshkar | English Translation | Anamika 1973",
        "album": "Lata Mangeshkar Hits",
        "duration": "4:00"
      },
      {
        "id": "F10aeM9V1Ho",
        "title": "Dil Hoom Hoom Kare-Female Version Video - Rudaali|Dimple Kapadia|Lata Mangeshkar|Gulzar",
        "album": "Lata Mangeshkar Hits",
        "duration": "3:35"
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
        "id": "E1xPY3OiuzI",
        "title": "Likhe Jo Khat Tujhe with lyrics | लिखे जो खत तुझे | Kanyadaan| Mohammed Rafi | Asha P, Shashi Kapoor",
        "album": "Mohammed Rafi Hits",
        "duration": "4:54"
      },
      {
        "id": "pp4udOzbLRU",
        "title": "Pukarta Chala Hoon Main with lyrics | पुकारता चला हूँ मैं | Mohammed Rafi | Mere Sanam",
        "album": "Mohammed Rafi Hits",
        "duration": "4:13"
      },
      {
        "id": "jCbrlknVUJ4",
        "title": "Tum Bin Jaun Kaha | तुम बिन जाऊं कहा | Mohammed Rafi | Pyar ka Mousam | Sashi Kapoor | Romantic Song",
        "album": "Mohammed Rafi Hits",
        "duration": "3:44"
      },
      {
        "id": "-FBnDXgIyA4",
        "title": "Chahoonga Main Tujhe with lyrics | चाहूंगा में तुझे गाने के बोल | Dosti | Sanjay Khan, Uma",
        "album": "Mohammed Rafi Hits",
        "duration": "5:20"
      },
      {
        "id": "1qwCSdwBHsg",
        "title": "Likhe Jo Khat Tujhe with lyrics | Mohammad Rafi | Shashi Kapoor | Asha Parekh | Hindi Song",
        "album": "Mohammed Rafi Hits",
        "duration": "4:29"
      },
      {
        "id": "qnqwYQSqOIM",
        "title": "Chahunga Main Tujhe Saanjh Savere - Hindi Lyrics | Dosti | Mohammad Rafi Hits | Laxmikant Pyarelal",
        "album": "Mohammed Rafi Hits",
        "duration": "4:25"
      },
      {
        "id": "13AaATy46YU",
        "title": "Kya Hua Tera Wada | Mohammad Rafi | Old song",
        "album": "Mohammed Rafi Hits",
        "duration": "4:16"
      },
      {
        "id": "DSLom3aTgZ8",
        "title": "Ek Haseen Sham Ko Dil Mera Kho Gaya with lyrics | एक हसीं शाम को दिल | Mohd Rafi | Dulhan Ek Raat Ki",
        "album": "Mohammed Rafi Hits",
        "duration": "4:05"
      },
      {
        "id": "8xLGdI9_jak",
        "title": "Main Zindagi Ka Saath Nibhata Chala with lyrics | मैं ज़िन्दगी का साथ निभाता के बोल | Mohammed Rafi",
        "album": "Mohammed Rafi Hits",
        "duration": "4:15"
      },
      {
        "id": "6Nb3VdaF2VE",
        "title": "Maine Poochha Chand Se | Mohammed Rafi, R. D. Burman | Zeenat Aman | Hindi Love Song",
        "album": "Mohammed Rafi Hits",
        "duration": "4:44"
      },
      {
        "id": "_3M_D6OTD1Q",
        "title": "Maine Poochha Chand Se | Mohammed Rafi | R. D. Burman | Hindi Love Song | Revibe",
        "album": "Mohammed Rafi Hits",
        "duration": "5:10"
      },
      {
        "id": "sTRje7FQwf8",
        "title": "Tum Jo Mil Gaye Ho with Lyric | तुम जो मिल गए हो के बोल | Mohammed Rafi",
        "album": "Mohammed Rafi Hits",
        "duration": "8:32"
      },
      {
        "id": "_Xvb3MiOfNg",
        "title": "Tumne Mujhe Dekha Hokar Meherban with lyrics | Teesri Manzil | Mohammed Rafi",
        "album": "Mohammed Rafi Hits",
        "duration": "4:08"
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
        "id": "bAzQHBKqbrA",
        "title": "Anu Malik, Sunidhi Chauhan - Babli Badmaash",
        "album": "Sunidhi Chauhan Hits",
        "duration": "4:28"
      },
      {
        "id": "j8lBY0XP_2c",
        "title": "Sunidhi Chauhan, Pritam, Amitabh Bhattacharya - Kamli",
        "album": "Sunidhi Chauhan Hits",
        "duration": "3:58"
      },
      {
        "id": "C5HZW2klz7U",
        "title": "Beedi - Vishal Bhardwaj, Sunidhi Chauhan | 7clouds Hindi",
        "album": "Sunidhi Chauhan Hits",
        "duration": "5:51"
      },
      {
        "id": "AJcBZxeOeZI",
        "title": "Crazy Kiya Re lyrical song | Dhoom 2 movie | Sunidhi Chauhan | Hrithik Roshan, Aishwarya Rai",
        "album": "Sunidhi Chauhan Hits",
        "duration": "4:56"
      },
      {
        "id": "aRSoh_9bgRA",
        "title": "Aa Zara - Murder 2 - Lyrical",
        "album": "Sunidhi Chauhan Hits",
        "duration": "5:00"
      },
      {
        "id": "9s-nPNdWNkM",
        "title": "Pritam, Sunidhi Chauhan, Rana Mazumder - Parda",
        "album": "Sunidhi Chauhan Hits",
        "duration": "5:22"
      },
      {
        "id": "28Zsch1QjPI",
        "title": "Desi Girl Lyrics - Dostana | Vishal-Shekhar, Shankar Mahadevan, Sunidhi Chauhan, Vishal Dadlani",
        "album": "Sunidhi Chauhan Hits",
        "duration": "5:08"
      },
      {
        "id": "HSune8VUbY4",
        "title": "Tu Zaroori Lyrics - ZiD | Sunidhi Chauhan, Sharib Sabri • tu zaruri sa hai mujhko zinda rehne k liye",
        "album": "Sunidhi Chauhan Hits",
        "duration": "4:50"
      },
      {
        "id": "UvMJV534U_E",
        "title": "Sunidhi Chauhan - AANKH Ft. Rusha & Blizza",
        "album": "Sunidhi Chauhan Hits",
        "duration": "3:09"
      },
      {
        "id": "FwSp9uzq91A",
        "title": "Parda | Once upon a time in Mumbaai | Sunidhi Chauhan",
        "album": "Sunidhi Chauhan Hits",
        "duration": "5:20"
      },
      {
        "id": "fICbObLgOB8",
        "title": "Halka Halka - Sunidhi Chauhan , Divya Kumar",
        "album": "Sunidhi Chauhan Hits",
        "duration": "4:47"
      },
      {
        "id": "dcf1M6gg3YE",
        "title": "Bhage Re Mann -lyrics || Sunidhi Chauhan || Chameli || @LYRICS🖤",
        "album": "Sunidhi Chauhan Hits",
        "duration": "5:32"
      },
      {
        "id": "fx6aVLcmaXY",
        "title": "Aa zara _sunidhi chauhan",
        "album": "Sunidhi Chauhan Hits",
        "duration": "4:58"
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
        "id": "SriqJuz2PWU",
        "title": "Abhi Kuch Dino Se l Lyrics video l Mohit Chauhan l Pritam Chakraborty l Dil Toh Baccha Hai Ji",
        "album": "Mohit Chauhan Hits",
        "duration": "4:39"
      },
      {
        "id": "2JBWjIe9jQY",
        "title": "Bheegi Si Bhaagi Si - Pritam | Mohit Chauhan | Antara M",
        "album": "Mohit Chauhan Hits",
        "duration": "4:39"
      },
      {
        "id": "WCTro3qabjE",
        "title": "\"Pee Loon\" Lyrical Song | Once Upon A Time in Mumbai | Pritam | Emraan Hashmi, Prachi Desai",
        "album": "Mohit Chauhan Hits",
        "duration": "5:06"
      },
      {
        "id": "Nbr_KJT0TIc",
        "title": "Pee Loon | Once Upon A Time in Mumbai |Mohit Chauhan | Pritam | Emraan Hashmi, Prachi Desai",
        "album": "Mohit Chauhan Hits",
        "duration": "4:45"
      },
      {
        "id": "ZyCazQV9hls",
        "title": "Mohit Chauhan - Tum Se Hi #mohitchauhan #tumsehi #tumsehilyrics",
        "album": "Mohit Chauhan Hits",
        "duration": "5:24"
      },
      {
        "id": "bCZ8F-QweM8",
        "title": "Is This Love Lyrical - Kismat Konnection | Shahid Kapoor, Vidya Balan | Mohit C, Shreya G | Pritam",
        "album": "Mohit Chauhan Hits",
        "duration": "5:50"
      },
      {
        "id": "3RcTsSuVxng",
        "title": "Is This Love l Lyrics video l Shreya Goshal l pritam Mohit Chauhan l",
        "album": "Mohit Chauhan Hits",
        "duration": "5:41"
      },
      {
        "id": "gkCKTuR-ECI",
        "title": "Rockstar: Tum Ho Song | Ranbir Kapoor | Nargis | A R Rahman, Mohit Chauhan",
        "album": "Mohit Chauhan Hits",
        "duration": "5:22"
      },
      {
        "id": "3mTCOmVehkE",
        "title": "Rockstar - Tum ho - Mohit Chauhan",
        "album": "Mohit Chauhan Hits",
        "duration": "5:10"
      },
      {
        "id": "zjnDDyyxQVc",
        "title": "Lyrical: Dil Ye Bekarar Kyun Hai | Players | Abhishek B, Sonam Kapoor | Pritam | Mohit C, Shreya G",
        "album": "Mohit Chauhan Hits",
        "duration": "4:34"
      },
      {
        "id": "3U6f31CHPzQ",
        "title": "Dil Ye Bekarar Kyun Hai | Lyrical Video | Mohit Chauhan | Players | Bollywood Love Song",
        "album": "Mohit Chauhan Hits",
        "duration": "4:37"
      },
      {
        "id": "0zLmVokqsoI",
        "title": "Rab Ka Shukrana - | Emraan Hashmi | Esha Gupta | Mohit Chauhan | Pritam",
        "album": "Mohit Chauhan Hits",
        "duration": "5:01"
      },
      {
        "id": "Pkv-h5NfThU",
        "title": "LYRICS: Rab Ka Shukrana - Mohit Chauhan | Pritam | Emraan Hashmi , Esha Gupta , Randeep H |Sanjay M",
        "album": "Mohit Chauhan Hits",
        "duration": "5:32"
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
        "id": "UBOHA9a5NIQ",
        "title": "12 Ladke - Tony Kakkar , Neha Kakkar | Official Music Video",
        "album": "Neha Kakkar Hits",
        "duration": "2:23"
      },
      {
        "id": "C-33pdc8dUA",
        "title": "12 Ladke - Tony Kakkar , Neha Kakkar !",
        "album": "Neha Kakkar Hits",
        "duration": "2:26"
      },
      {
        "id": "jXw8z34fmmo",
        "title": "Maahi Ve - Neha Kakkar | Amit Gupta | Kumaar | Gaurav Roshin | Wajah Tum Ho",
        "album": "Neha Kakkar Hits",
        "duration": "3:58"
      },
      {
        "id": "xtgC88yFXeM",
        "title": "PUCHDA HI NAHIN - Neha Kakkar | Rohit Khandelwal | Babbu | Maninder B | MixSingh",
        "album": "Neha Kakkar Hits",
        "duration": "3:16"
      },
      {
        "id": "mn8ywyrgPwQ",
        "title": "DIL KO KARRAR AAYA Reprise - Neha Kakkar | Rajat Nagpal | Rana | Anshul Garg | Hindi Song 2021",
        "album": "Neha Kakkar Hits",
        "duration": "4:05"
      },
      {
        "id": "Um4GE7mhKD0",
        "title": "UP Wali Laiki 2.0 | Neha Kakkar x Nishant Mukta | I-Popstar Hindi Vol.2 | EP 20 |Alright TV, Netflix",
        "album": "Neha Kakkar Hits",
        "duration": "3:08"
      },
      {
        "id": "RvXHz48mmV0",
        "title": "Gal Naal | Neha Kakkar x Chetanya Vaish | I-Popstar Hindi Vol.2 | EP 13 | Alright TV | Netflix",
        "album": "Neha Kakkar Hits",
        "duration": "3:52"
      },
      {
        "id": "FmphinKI_nI",
        "title": "Baarish Mein Tum (Nehu-Rohu Version) Neha K, Rohanpreet | Showkidd, Harsh, Samay, Navjit | Bhushan K",
        "album": "Neha Kakkar Hits",
        "duration": "4:20"
      },
      {
        "id": "3bFOs6Xbjho",
        "title": "DO GALLAN - Neha Kakkar & Rohanpreet Singh | Garry Sandhu | Anshul Garg | Punjabi Song 2021",
        "album": "Neha Kakkar Hits",
        "duration": "4:18"
      },
      {
        "id": "MCij6FLW7jI",
        "title": "Oh Humsafar - Neha Kakkar, Tony Kakkar | Manoj Muntashir | Himansh Kohli",
        "album": "Neha Kakkar Hits",
        "duration": "5:31"
      },
      {
        "id": "AmXRYGI9sRI",
        "title": "Tera Ghata - Neha Kakkar",
        "album": "Neha Kakkar Hits",
        "duration": "2:48"
      },
      {
        "id": "N2-HsIYd0Go",
        "title": "Mile Ho Tum - Reprise Version | Neha Kakkar | Tony Kakkar | Fever | Gaurav Jang",
        "album": "Neha Kakkar Hits",
        "duration": "4:01"
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
        "id": "YTE6LWAlAcE",
        "title": "Barbaad Lyrics - Saiyaara | The Rish, Jubin Nautiyal • ke ho na jaaye pyaar tumse",
        "album": "Jubin Nautiyal Hits",
        "duration": "5:57"
      },
      {
        "id": "W1y8blwMLxY",
        "title": "Lyrical | Barbaad Song | Saiyaara | Ahaan Panday, Aneet Padda | The Rish | Jubin Nautiyal",
        "album": "Jubin Nautiyal Hits",
        "duration": "5:55"
      },
      {
        "id": "JmiMhrETIhE",
        "title": "Lut Gaye - Jubin Nautiyal 🎵",
        "album": "Jubin Nautiyal Hits",
        "duration": "4:03"
      },
      {
        "id": "TqR_jWfHW4g",
        "title": "Humnava Mere Lyrical Video | Jubin Nautiyal | Manoj Muntashir | Rocky - Shiv | Bhushan Kumar",
        "album": "Jubin Nautiyal Hits",
        "duration": "5:50"
      },
      {
        "id": "aNot3gt_WJM",
        "title": "Humnava Mere | Jubin Nautiyal",
        "album": "Jubin Nautiyal Hits",
        "duration": "5:29"
      },
      {
        "id": "X02BuyRhhvo",
        "title": "Main Jis Din Bhulaa Du - Jubin Nautiyal, Tulsi Kumar",
        "album": "Jubin Nautiyal Hits",
        "duration": "4:56"
      },
      {
        "id": "kAgAQ24_Jso",
        "title": "Samandar | jubin nautiyal | shriya ghosal | Lifetime music",
        "album": "Jubin Nautiyal Hits",
        "duration": "5:22"
      },
      {
        "id": "d0mZ0ToH5qw",
        "title": "Tum Hi Aana -Marjaavan | Jubin Nautiyal | Ritesh D | Sidharth M | Payal Dev|SubhamMix Lyrics",
        "album": "Jubin Nautiyal Hits",
        "duration": "4:10"
      },
      {
        "id": "S2BOXJG71FY",
        "title": "Raataan Lambiyan | Jubin Nautiyal | Asees Kaur | Tanishk Bagchi",
        "album": "Jubin Nautiyal Hits",
        "duration": "3:51"
      },
      {
        "id": "eKacgRwFbxU",
        "title": "Kal Jo Na Tujhse Mila Main Hota - Jubin Nautiyal",
        "album": "Jubin Nautiyal Hits",
        "duration": "5:34"
      },
      {
        "id": "Dsi5RfscYi8",
        "title": "Bewafa Tera Masoom Chehra | Jubin Nautiyal | Rochak K , Rashmi V | New Song 2020",
        "album": "Jubin Nautiyal Hits",
        "duration": "4:03"
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
        "id": "f9_C8J4gqzQ",
        "title": "Bol Do Na Zara Lyrics | Armaan Malik",
        "album": "Armaan Malik Hits",
        "duration": "5:29"
      },
      {
        "id": "fZR38PR3lw4",
        "title": "Armaan Malik | Dil Mein Chhupa Loonga | Wajah Tum Ho | Tulsi Kumar | Meet Bros",
        "album": "Armaan Malik Hits",
        "duration": "5:44"
      },
      {
        "id": "YN3enhDqHis",
        "title": "Chale Aana Lyrics | Armaan Malik | Amaal mallik | Ajay Devgan | Rakul Preeti | RB Lyrics",
        "album": "Armaan Malik Hits",
        "duration": "4:31"
      },
      {
        "id": "Gg3Xz89Q2UU",
        "title": "Hua Hain Aaj Pehli Baar",
        "album": "Armaan Malik Hits",
        "duration": "5:10"
      },
      {
        "id": "VCqWjVJxp2s",
        "title": "Hua Hain Aaj Pehli Baar Song | Armaan Malik | Palak Muchhal",
        "album": "Armaan Malik Hits",
        "duration": "5:01"
      },
      {
        "id": "-blY9R4b2KU",
        "title": "Wajah Tum Ho | Armaan Malik",
        "album": "Armaan Malik Hits",
        "duration": "5:27"
      },
      {
        "id": "B7jaxPv9fK4",
        "title": "Tumhe Apna Banane Ka Lyrics | Armaan Malik | Neeti M | Amaal Malik | Hate Story 3 Song | RB Lyrics",
        "album": "Armaan Malik Hits",
        "duration": "5:09"
      },
      {
        "id": "byitAI7kkOM",
        "title": "Lyrical: Dil Mein Ho Tum| WHY CHEAT INDIA | Emraan H, Shreya D|Rochak K, Armaan M, Bappi L, Manoj M",
        "album": "Armaan Malik Hits",
        "duration": "5:46"
      },
      {
        "id": "YL4_cwdKZBU",
        "title": "DIL MEIN HO TUM FULL SONG LYRICS - ARMAAN MALIK |CHEAT INDIA",
        "album": "Armaan Malik Hits",
        "duration": "5:28"
      },
      {
        "id": "Jis04VOZyEU",
        "title": "Kuch To Hai Lyrical Video Song | DO LAFZON KI KAHANI | Randeep Hooda, Kajal Aggarwal",
        "album": "Armaan Malik Hits",
        "duration": "4:09"
      },
      {
        "id": "LwEEqLgMjMM",
        "title": "Hua Hain Aaj Pehli Baar - Armaan Mallik, Palak Muchhal",
        "album": "Armaan Malik Hits",
        "duration": "5:10"
      },
      {
        "id": "c8FRk7ca5tY",
        "title": "Kuch Toh Hain Armaan Malik || Do Lafzon Ki Kahaani || Manoj Muntashir",
        "album": "Armaan Malik Hits",
        "duration": "3:41"
      },
      {
        "id": "q21aUQyFde8",
        "title": "Mujhko Barsaat Bana Lo | Junooniyat | Armaan Malik | Rashmi Virag | Yami Gautam | Pulkit",
        "album": "Armaan Malik Hits",
        "duration": "4:26"
      },
      {
        "id": "XyO0vnidCGY",
        "title": "Armaan Malik - Main Rahoon Ya Na Rahoon #armaanmalik #mainrahoonyanarahoon",
        "album": "Armaan Malik Hits",
        "duration": "5:10"
      },
      {
        "id": "Rt_uO094CR4",
        "title": "SAB TERA Lyrical | BAAGHI | Tiger Shroff, Shraddha Kapoor | Armaan Malik | Amaal Mallik",
        "album": "Armaan Malik Hits",
        "duration": "3:54"
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
        "id": "n_FCrCQ6-bA",
        "title": "295 | Sidhu Moose Wala | The Kidd | Moosetape",
        "album": "Sidhu Moose Wala Hits",
        "duration": "4:33"
      },
      {
        "id": "M8vDwlHigJA",
        "title": "GOAT Sidhu Moose Wala | Wazir Patar | Sukh Sanghera | Moosetape",
        "album": "Sidhu Moose Wala Hits",
        "duration": "4:06"
      },
      {
        "id": "-zvixJnZuUU",
        "title": "KAALI HOODIE SIDHU MOOSE WALA FT BOHEMIA | THE KIDD",
        "album": "Sidhu Moose Wala Hits",
        "duration": "2:50"
      },
      {
        "id": "GFUJ5mG_4NI",
        "title": "MOOSEDRILLA SIDHU MOOSE WALA | DIVINE | THE KIDD | MOOSETAPE",
        "album": "Sidhu Moose Wala Hits",
        "duration": "3:56"
      },
      {
        "id": "GgmFC8y8q3k",
        "title": "So High | Official Music Video | Sidhu Moose Wala ft. BYG BYRD | Humble Music",
        "album": "Sidhu Moose Wala Hits",
        "duration": "3:54"
      },
      {
        "id": "xck0xnrqDKo",
        "title": "FAMOUS ~ SIDHU MOOSE WALA~ ~ Latest Punjabi Songs 2018 ~ Lavish Squad",
        "album": "Sidhu Moose Wala Hits",
        "duration": "4:15"
      },
      {
        "id": "6-ahcYZGlU0",
        "title": "295 Lyrics Sidhu Moose Wala | New Punjabi song | Sidhu New song Lyrics",
        "album": "Sidhu Moose Wala Hits",
        "duration": "4:32"
      },
      {
        "id": "Pq7UxbWeRU0",
        "title": "GHOSTFACE KILLAH | Sidhu Moose Wala | Navkaran Brar",
        "album": "Sidhu Moose Wala Hits",
        "duration": "2:18"
      },
      {
        "id": "77-izdRn81Q",
        "title": "Dawood Lyrical Video | PBX 1 | Sidhu Moose Wala | Byg Byrd | Latest Punjabi Songs 2018",
        "album": "Sidhu Moose Wala Hits",
        "duration": "3:35"
      },
      {
        "id": "vyttfWKrhwM",
        "title": "Homicide - Ft Sidhu Moose Wala Big Boi Deep | Sunny Malton",
        "album": "Sidhu Moose Wala Hits",
        "duration": "3:33"
      },
      {
        "id": "6xoB4ZiKKn0",
        "title": "THE LAST RIDE - Offical Video | Sidhu Moose Wala | Wazir Patar",
        "album": "Sidhu Moose Wala Hits",
        "duration": "4:36"
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
        "id": "fe9udc210tM",
        "title": "Ap Dhillon - With You",
        "album": "AP Dhillon Hits",
        "duration": "2:35"
      },
      {
        "id": "V_w2o98zHU8",
        "title": "Ap Dhillon ft. Shinda Kahlon - Dil Nu \"kol hi ee tu tavi lage meinu door\"",
        "album": "AP Dhillon Hits",
        "duration": "3:54"
      },
      {
        "id": "mZQH8CPQ-wo",
        "title": "With You - AP Dhillon",
        "album": "AP Dhillon Hits",
        "duration": "2:35"
      },
      {
        "id": "nqUN530Rgtw",
        "title": "SUMMER HIGH - AP DHILLON",
        "album": "AP Dhillon Hits",
        "duration": "3:26"
      },
      {
        "id": "yXuc2dKA85s",
        "title": "Ap Dhillon - Summer High",
        "album": "AP Dhillon Hits",
        "duration": "2:58"
      },
      {
        "id": "q9zX5-V5ljI",
        "title": "Anuv Jain - AFSOS ft. AP Dhillon",
        "album": "AP Dhillon Hits",
        "duration": "3:12"
      },
      {
        "id": "OxOQSy1FXU4",
        "title": "Anuv Jain - AFSOS ft. AP Dhillon",
        "album": "AP Dhillon Hits",
        "duration": "3:11"
      },
      {
        "id": "vX2cDW8LUWk",
        "title": "Excuses | AP Dhillon | Gurinder Gill | Intense",
        "album": "AP Dhillon Hits",
        "duration": "2:57"
      },
      {
        "id": "EIN3TFCjVko",
        "title": "Excuses - AP Dhillon, Gurinder Gill & Intense Music by RMN NATÎ0N",
        "album": "AP Dhillon Hits",
        "duration": "2:57"
      },
      {
        "id": "cqP8I5aaud8",
        "title": "INSANE - AP DHILLON | GURINDER GILL | SHINDA KAHLON",
        "album": "AP Dhillon Hits",
        "duration": "3:24"
      },
      {
        "id": "LkqVkPgCv5o",
        "title": "INSANE Ap Dhillon & Gurinder Gill - ft. Shinda Kahlo",
        "album": "AP Dhillon Hits",
        "duration": "3:27"
      },
      {
        "id": "CbvjhmFVMvA",
        "title": "Thinking Of You (Full Performance) | AP Dhillon",
        "album": "AP Dhillon Hits",
        "duration": "3:01"
      },
      {
        "id": "pZ9lS19tkto",
        "title": "Ap Dhillon - Desires",
        "album": "AP Dhillon Hits",
        "duration": "2:49"
      },
      {
        "id": "N8dexd1PqEw",
        "title": "AP Dhillon & Shinda Kahlon - By My Side",
        "album": "AP Dhillon Hits",
        "duration": "2:57"
      },
      {
        "id": "JzAy3Ep-F4g",
        "title": "By My Side - AP Dhillon Ft. Shinda Kahlon | Lyrics",
        "album": "AP Dhillon Hits",
        "duration": "2:57"
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
        "id": "zEIYKXitZPg",
        "title": "Karan Aujla, Ikky - Boyfriend",
        "album": "Karan Aujla Hits",
        "duration": "2:41"
      },
      {
        "id": "wfVwF1E5WJk",
        "title": "Karan Aujla, Ikky - For A Reason",
        "album": "Karan Aujla Hits",
        "duration": "3:00"
      },
      {
        "id": "5GCfYLguTIs",
        "title": "BOYFRIEND KARAN AUJLA| SUNANDA | IKKY | Latest Punjabi Songs 2025",
        "album": "Karan Aujla Hits",
        "duration": "2:42"
      },
      {
        "id": "k85UB5b6pJU",
        "title": "Admirin' You Karan Aujla | Ikky | Making Memories | Latest Punjabi Songs 2023",
        "album": "Karan Aujla Hits",
        "duration": "3:31"
      },
      {
        "id": "V44Gq2tdGac",
        "title": "Karan Aujla - Admirin' You",
        "album": "Karan Aujla Hits",
        "duration": "3:31"
      },
      {
        "id": "iCYVzNobGqU",
        "title": "Karan Aujla - For A Reason",
        "album": "Karan Aujla Hits",
        "duration": "3:00"
      },
      {
        "id": "Pd1yGW_g2T8",
        "title": "Ashke Karan Aujla | Mxrci | Aujla Szn 1",
        "album": "Karan Aujla Hits",
        "duration": "3:38"
      },
      {
        "id": "W0Wj6MvOxg4",
        "title": "Ashke - Karan Aujla | Aujla Szn 1 | Karan Aujla New Song | Latest Punjabi Songs 2026",
        "album": "Karan Aujla Hits",
        "duration": "3:06"
      },
      {
        "id": "cWMxCE2HTag",
        "title": "SOFTLY KARAN AUJLA | IKKY | LATEST PUNJABI SONGS 2023",
        "album": "Karan Aujla Hits",
        "duration": "2:51"
      },
      {
        "id": "-Chif1XK2e8",
        "title": "Karan Aujla - Softly",
        "album": "Karan Aujla Hits",
        "duration": "2:35"
      },
      {
        "id": "EQYGA92P70Y",
        "title": "Karan Aujla - Jee Ni Lagda",
        "album": "Karan Aujla Hits",
        "duration": "2:20"
      },
      {
        "id": "4DfVxVeqk2o",
        "title": "52 Bars Karan Aujla | Ikky | Four You EP | First Song | Latest Punjabi Songs 2023",
        "album": "Karan Aujla Hits",
        "duration": "3:42"
      },
      {
        "id": "KFsvbVVzkYg",
        "title": "52 Bars Karan Aujla | Ikky | Four You EP | First Song | Latest Punjabi Songs 2023",
        "album": "Karan Aujla Hits",
        "duration": "3:35"
      },
      {
        "id": "k_eYWdgKfIQ",
        "title": "Karan Aujla - Bachke Bachke | (ft. Yarah) Making Memories | Album",
        "album": "Karan Aujla Hits",
        "duration": "3:31"
      },
      {
        "id": "iCGdF4YMvFY",
        "title": "Winning Speech - Karan Aujla",
        "album": "Karan Aujla Hits",
        "duration": "3:58"
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
        "id": "q6LhCim5y_Y",
        "title": "Ava Max - Kings & Queens",
        "album": "King Hits",
        "duration": "2:41"
      },
      {
        "id": "lQVgR7KcNm0",
        "title": "Years & Years - King",
        "album": "King Hits",
        "duration": "3:35"
      },
      {
        "id": "g_uoH6hJilc",
        "title": "Years & Years - King",
        "album": "King Hits",
        "duration": "3:55"
      },
      {
        "id": "qwulfURVWD8",
        "title": "ZAYDE WOLF - \"KING\" - Official Lyric Video - WB Dynasty - The Royals - NFL NETWORK - Windows DirectX",
        "album": "King Hits",
        "duration": "3:19"
      },
      {
        "id": "BPZkZpGMpXA",
        "title": "KING: Tu Mil Jaaye | Shah Rukh Khan, Deepika | Sachin-Jigar, Arijit, Ed Sheeran, Madhubanti, Kumaar",
        "album": "King Hits",
        "duration": "3:43"
      },
      {
        "id": "dS5GfL9F7L4",
        "title": "Lauren Aquilina - King",
        "album": "King Hits",
        "duration": "3:58"
      },
      {
        "id": "_5ffBkb_hIY",
        "title": "Think like a King! - by Get into Zone",
        "album": "King Hits",
        "duration": "3:31"
      },
      {
        "id": "A66TYFdz8YA",
        "title": "King - Tu Aake Dekhle | The Carnival | The Last Ride | Prod. by Shahbeatz | Latest Hit Songs 2020",
        "album": "King Hits",
        "duration": "5:24"
      },
      {
        "id": "nvH8Ary1TS0",
        "title": "Years & Years - King",
        "album": "King Hits",
        "duration": "4:06"
      },
      {
        "id": "QGvgGtmEv64",
        "title": "EKTARFA | Official Music Video | King | KHWABEEDA",
        "album": "King Hits",
        "duration": "4:02"
      },
      {
        "id": "8g-sDLrmzPA",
        "title": "KING - Let Me Fly",
        "album": "King Hits",
        "duration": "4:17"
      },
      {
        "id": "Ls7i4PqmRSU",
        "title": "Tu aake dekh le - King | Carnival | Shahbeats | New Rap song 2020",
        "album": "King Hits",
        "duration": "4:25"
      },
      {
        "id": "dNDiJZ1bvZ4",
        "title": "Sad Song - We The Kings 🎵",
        "album": "King Hits",
        "duration": "3:44"
      },
      {
        "id": "cO4N3wTrHCk",
        "title": "TWOPILOTS - King",
        "album": "King Hits",
        "duration": "3:29"
      },
      {
        "id": "hIHUeuw2yj8",
        "title": "Ala Bolelo - Lyric Video | Jailer 2 | Superstar Rajinikanth | Sun Pictures | Nelson | Anirudh",
        "album": "King Hits",
        "duration": "4:02"
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
        "id": "xH4daEJvaZY",
        "title": "Lyrical | Dhun Song | Saiyaara | Ahaan Panday, Aneet Padda | Mithoon | Arijit Singh",
        "album": "Mithoon Hits",
        "duration": "4:32"
      },
      {
        "id": "qcC1i4ENMMs",
        "title": "Kitni Haseen Hogi - HIT: The First Case | Rajkummar, Sanya | Mithoon, Arijit S, Sayeed Q",
        "album": "Mithoon Hits",
        "duration": "5:51"
      },
      {
        "id": "fVZuAgPJuW4",
        "title": "Mar Jaayen - Lyrical Vídeo | Loveshhuda | Girish, Navneet | Atif, Mithoon",
        "album": "Mithoon Hits",
        "duration": "4:27"
      },
      {
        "id": "pP12RCC6Nss",
        "title": "Humnava - Lyrical Video | Emraan Hashmi, Vidya Balan | Hamari Adhuri Kahani | Papon",
        "album": "Mithoon Hits",
        "duration": "5:30"
      },
      {
        "id": "_wHJNT0-OEQ",
        "title": "Jaan Ban Gaye - Lyrical | Khuda Haafiz | Vidyut J | Shivaleeka O | Mithoon Ft. Vishal M, Asees Kaur",
        "album": "Mithoon Hits",
        "duration": "3:44"
      },
      {
        "id": "VMEXKJbsUmE",
        "title": "Zaroorat Full Video Song | Ek Villain | Mithoon | Mustafa Zahid",
        "album": "Mithoon Hits",
        "duration": "4:50"
      },
      {
        "id": "AnRgjlktyR0",
        "title": "Tu Hi Mera : Mithoon,Meghana | Divya Khossla | Sayeed Q | Tu Hi Mere Rab Ki Tarha Hai",
        "album": "Mithoon Hits",
        "duration": "6:48"
      },
      {
        "id": "i_NmPv5WQ0U",
        "title": "LYRICAL: Chal Ghar Chalen | Malang | Aditya R K, Disha P | Mithoon ft. Arijit Singh, Sayeed Quadri",
        "album": "Mithoon Hits",
        "duration": "5:58"
      },
      {
        "id": "cUmUOb7j3dc",
        "title": "Dhun Song | Saiyaara | Ahaan Panday, Aneet Padda | Mithoon | Arijit Singh",
        "album": "Mithoon Hits",
        "duration": "3:33"
      },
      {
        "id": "7yd-XJYy3HI",
        "title": "Neki Ki Raah - Lyrical | Arijit Singh & Mithoon | Manoj Bajpayee & Divya Dutta | Traffic",
        "album": "Mithoon Hits",
        "duration": "5:00"
      },
      {
        "id": "_iktURk0X-A",
        "title": "𝐏𝐡𝐢𝐫 𝐁𝐡𝐢 𝐓𝐮𝐦𝐤𝐨 𝐂𝐡𝐚𝐚𝐡𝐮𝐧𝐠𝐚💖 – 𝐅𝐮𝐥𝐥 𝐒𝐨𝐧𝐠 | Arijit Singh | Arjun Kapoor & Shraddha K | Mithoon | Manoj M",
        "album": "Mithoon Hits",
        "duration": "6:02"
      },
      {
        "id": "Z4iGUBgdCzE",
        "title": "Full Video: Tu Hi Mera | Mithoon, Meghana | Sayeed Quadri | Tu Hi Mere Rab Ki Tarha Hai",
        "album": "Mithoon Hits",
        "duration": "4:15"
      },
      {
        "id": "LMnJp_dSdnw",
        "title": "DARKHAAST Full Video Song | SHIVAAY | Arijit Singh & Sunidhi Chauhan | Ajay Devgn",
        "album": "Mithoon Hits",
        "duration": "7:12"
      },
      {
        "id": "COuGgctJ91A",
        "title": "Dhun Song Lyrics –Arijit Singh | (Saiyaara ) Tere iss dil ko churaane ke liye 💘🎶Hai yahi, ek dhun 🎼💞",
        "album": "Mithoon Hits",
        "duration": "3:31"
      },
      {
        "id": "FJ55SHCzt88",
        "title": "Humdard Full Video Song | Ek Villain | Arijit Singh | Mithoon",
        "album": "Mithoon Hits",
        "duration": "4:19"
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
        "id": "usSA3mPzOJY",
        "title": "Abhi Mujh Mein Kahin Lyric Video | Agneepath | Hrithik Roshan, Priyanka C | Sonu Nigam | Ajay-Atul",
        "album": "Ajay-Atul Hits",
        "duration": "6:06"
      },
      {
        "id": "HY8Y_uqnVzU",
        "title": "Khel Mandala | Natarang | Ajay-Atul | Atul Kulkarni | Guru Thakur | Lyrical",
        "album": "Ajay-Atul Hits",
        "duration": "4:59"
      },
      {
        "id": "4boWV-Ba4Vw",
        "title": "Apsara Aali - Lyrical | Natarang | Komal Kaaya Ki Mohamaaya | Sonalee Kulkarni, Ajay Atul",
        "album": "Ajay-Atul Hits",
        "duration": "3:43"
      },
      {
        "id": "9ek6LEGh3rg",
        "title": "Dhadak - Title Track | Dhadak | Ishaan & Janhvi |Ajay Gogavale & Shreya Ghoshal, Ajay-Atul | Lyrical",
        "album": "Ajay-Atul Hits",
        "duration": "4:13"
      },
      {
        "id": "2JZTIVd4XN0",
        "title": "Man Udhan Varyache Song | Shankar Mahadevan | Ajay Atul | Lyric video",
        "album": "Ajay-Atul Hits",
        "duration": "4:37"
      },
      {
        "id": "6qwOQe2BiYY",
        "title": "Lallati Bhandar, Full Video - Jogwa | Ajay-Atul | Mukta Barve | Upendra Limaye | Kishor Kadam",
        "album": "Ajay-Atul Hits",
        "duration": "5:02"
      },
      {
        "id": "UPR1DzpWwZM",
        "title": "Khel Mandala | Natarang | Ajay-Atul | Atul Kulkarni | Guru Thakur | Lyrical",
        "album": "Ajay-Atul Hits",
        "duration": "4:59"
      },
      {
        "id": "kKIWYILo3CA",
        "title": "Yek Number: Jahir Jhala Jagala Ajay Atul, Shreya Ghoshal | Dhairya, Sayli | Sahyadri Films",
        "album": "Ajay-Atul Hits",
        "duration": "5:14"
      },
      {
        "id": "oWKgpB2zpgw",
        "title": "Ajay-Atul - Abhi Mujh Mein Kahin Best Lyric|Agneepath|Priyanka Chopra,Hrithik|Sonu Nigam",
        "album": "Ajay-Atul Hits",
        "duration": "4:15"
      },
      {
        "id": "iPSleUWh428",
        "title": "Sapna Jahan - Ajay-Atul, Sonu Nigam, Neeti Mohan",
        "album": "Ajay-Atul Hits",
        "duration": "5:42"
      },
      {
        "id": "tF6m9cNH894",
        "title": "Lallati Bhandar - Lyrical Video | Jogwa | Ajay-Atul | Mukta Barve | Upendra Limaye | Kishor Kadam",
        "album": "Ajay-Atul Hits",
        "duration": "5:05"
      },
      {
        "id": "fab0xhjUKwo",
        "title": "Adhir Man Jhale | Lyrical Video | Nilkanth Master | Shreya Ghoshal | Ajay-Atul",
        "album": "Ajay-Atul Hits",
        "duration": "2:35"
      },
      {
        "id": "uoiiZPOHqvU",
        "title": "Shah Ka Rutba - Lyrical Video | Agneepath | Hrithik Roshan | Rishi Kapoor | Ajay Atul",
        "album": "Ajay-Atul Hits",
        "duration": "5:25"
      },
      {
        "id": "Nz80z4lNUJw",
        "title": "Ajay-Atul - O Saiyyan ft. Roop Kumar Rathod",
        "album": "Ajay-Atul Hits",
        "duration": "4:39"
      },
      {
        "id": "gOt4QFTQpBU",
        "title": "Deva Shree Ganesha - Ajay - Atul | Agneepath Full Song #AjayAtul",
        "album": "Ajay-Atul Hits",
        "duration": "5:58"
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
        "id": "Ui5lR_YxNTM",
        "title": "SOCHENGE TUMHE PYAAR - KUMAR SANU || LYRICS |",
        "album": "Kumar Sanu Hits",
        "duration": "6:25"
      },
      {
        "id": "Sl8tK6PLmmQ",
        "title": "CHAND SE PARDA KIJIYE - KUMAR SANU || LYRICS |",
        "album": "Kumar Sanu Hits",
        "duration": "6:38"
      },
      {
        "id": "eC5riDNidOg",
        "title": "Sochenge Tumhe Pyar",
        "album": "Kumar Sanu Hits",
        "duration": "6:03"
      },
      {
        "id": "WBzG-Mcn4Ko",
        "title": "Tumhari Nazron Mein Humne Dekha With Lyrics | Kal Ki Awaz | Asha Bhosle, Kumar Sanu | Romantic Songs",
        "album": "Kumar Sanu Hits",
        "duration": "5:02"
      },
      {
        "id": "EP5A8TwE6CQ",
        "title": "Jo Haal Dil Ka | Kumar Sanu | Alka Yagnik | Sarfarosh | 1999 | Lyrics Fizz",
        "album": "Kumar Sanu Hits",
        "duration": "4:24"
      },
      {
        "id": "f7F06cUMWFY",
        "title": "Chura Ke Dil Mera | FULL LYRICS | Kumar Sanu | Alka Yagnik | Heart Touching Song | End Muzic",
        "album": "Kumar Sanu Hits",
        "duration": "7:42"
      },
      {
        "id": "DeSa4z6rV9c",
        "title": "Mera Chand Mujhe Aaya Hai Nazar with lyrics | Mr. Aashiq | Kumar Sanu |Saif Ali Khan |Twinkle Khanna",
        "album": "Kumar Sanu Hits",
        "duration": "6:06"
      },
      {
        "id": "6Ma7xfGTAhc",
        "title": "Tumhein Apna Banane Ki Kasam Khai Hai - Kumar Sanu | Sanjay Dutt | 90's Hits Love Songs",
        "album": "Kumar Sanu Hits",
        "duration": "6:49"
      },
      {
        "id": "GHFJt1tlJSA",
        "title": "\"Badi Udas Hai Zindagi\" with lyrics| \"बड़ी उदास है ज़िन्दगी\" गाने के बोल | Kasoor | Aftab | Liza",
        "album": "Kumar Sanu Hits",
        "duration": "5:55"
      },
      {
        "id": "UQVbGgDAa3k",
        "title": "Bahut Khoobsurat Ghazal Likh Raha Hun Lyrical Video | Kumar Sanu | Shikari | Govinda, Karishma",
        "album": "Kumar Sanu Hits",
        "duration": "6:39"
      },
      {
        "id": "fBylcT-TWZw",
        "title": "\"Bas Ek Sanam Chahiye Aashiqui Ke Liye\" Lyrical Video | Aashiqui | Kumar Sanu | Rahul R, Anu Agarwal",
        "album": "Kumar Sanu Hits",
        "duration": "6:11"
      },
      {
        "id": "k7fPoKUXaWM",
        "title": "Kumar Sanu - Tera Mera Pyar | Prem & Hardeep | 2000s Hit Love Song",
        "album": "Kumar Sanu Hits",
        "duration": "6:13"
      },
      {
        "id": "jD3SGW0NHY0",
        "title": "Kumar Sanu 90's Hits | Chand Se Parda Kijiye | Aao Pyar Karen [1994] | Saif Ali Khan & Shilpa Shetty",
        "album": "Kumar Sanu Hits",
        "duration": "6:13"
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
        "id": "B77UXAuKUm4",
        "title": "Jagjit Singh - Hoshwalon Ko Khabar Kya | | Sarfarosh - 1999",
        "album": "Jagjit Singh Hits",
        "duration": "5:05"
      },
      {
        "id": "FH1IkSLGZ48",
        "title": "Ek Pyar Ka Nagma Hai | Lyrical Video | Jagjit Singh Ghazals | Sad Ghazals | Old Ghazals",
        "album": "Jagjit Singh Hits",
        "duration": "4:57"
      },
      {
        "id": "mBZBK09dlyk",
        "title": "Jagjit Singh - Hothon Se Chhu Lo Tum | Ghazal Ka Khazana",
        "album": "Jagjit Singh Hits",
        "duration": "4:58"
      },
      {
        "id": "GAHlAcsLlJY",
        "title": "Hoshwalon Ko Khabar Kya",
        "album": "Jagjit Singh Hits",
        "duration": "5:07"
      },
      {
        "id": "1GdJS6J-fx8",
        "title": "Hothon Se Chhu Lo Tum | Jagjit Singh | Indivar | Prem Geet | Revibe | Hindi Songs",
        "album": "Jagjit Singh Hits",
        "duration": "4:55"
      },
      {
        "id": "KslV0BcpVNg",
        "title": "Us Mod Se Shuroo Karen - Jagjit Singh & Chitra Singh | Gazal | Lyrics | 1982",
        "album": "Jagjit Singh Hits",
        "duration": "5:40"
      },
      {
        "id": "l-Yj2ev-fUA",
        "title": "Us Mod Se Shuroo Karen - The Latest | Jagjit Singh & Chitra Singh | Official Song",
        "album": "Jagjit Singh Hits",
        "duration": "5:41"
      },
      {
        "id": "HbOCFkEdrbI",
        "title": "चिट्ठी ना कोई संदेश | Chithi Na Koi Sandesh - Lyrical Video | Jagjit Singh Ghazals | Old Ghazals",
        "album": "Jagjit Singh Hits",
        "duration": "6:54"
      },
      {
        "id": "fmu4Bc3SqL8",
        "title": "Us Mod Se Shuroo Karen - Audio lyrical | Jagjit Singh & Chitra Singh | Love Ghazal | Ghazal Classic",
        "album": "Jagjit Singh Hits",
        "duration": "5:40"
      },
      {
        "id": "78qVwD7Kbb0",
        "title": "Tujhko Dariya Dili Ki Kasam - Jagjit Singh & Chitra Singh | | Gazal | 1999",
        "album": "Jagjit Singh Hits",
        "duration": "4:55"
      },
      {
        "id": "lfQR8fW43YU",
        "title": "Tum Itna Jo Muskura Rahe Ho | Lyrical Video | Jagjit Singh Ghazals | Arth | Kaifi Azmi",
        "album": "Jagjit Singh Hits",
        "duration": "5:36"
      },
      {
        "id": "trTyJN_iF6k",
        "title": "PYAR MUJH SE JO KIYA-Lyrical | प्यार मुझसे जो किया | Jagjit Singh Ghazals | Old Ghazals | Sad Songs",
        "album": "Jagjit Singh Hits",
        "duration": "4:46"
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
        "id": "Jpy1ri7NdEA",
        "title": "Mere Rashke Qamar - Nusrat Fateh Ali Khan, Rahat Fateh Ali Khan",
        "album": "Nusrat Fateh Ali Khan Hits",
        "duration": "3:41"
      },
      {
        "id": "fMQTxR8bBeM",
        "title": "Sochta Hun Lyrical Song By Nusrat Fateh Ali Khan || Nusrat Fateh Ali Remix Song Sochta Hoon",
        "album": "Nusrat Fateh Ali Khan Hits",
        "duration": "4:36"
      },
      {
        "id": "yc8t-FqIQzY",
        "title": "Nusrat Fateh Ali Khan || Sochta Houn || A1Melodymaster || Hi-Tech Music",
        "album": "Nusrat Fateh Ali Khan Hits",
        "duration": "4:39"
      },
      {
        "id": "dSZzr0EqVXI",
        "title": "Sochta hoon - Nusrat Fateh Ali Khan | Album 🩷 | Qawwali | Rhythm hub",
        "album": "Nusrat Fateh Ali Khan Hits",
        "duration": "4:34"
      },
      {
        "id": "2F7G9bOIwlk",
        "title": "Afreen Afreen with lyrics ▶ Nusrat Fateh Ali Khan |आफरीन आफरीन\" गानो के बोल | नुसरत फ़तेह अली खान",
        "album": "Nusrat Fateh Ali Khan Hits",
        "duration": "6:01"
      },
      {
        "id": "D8l3fLJ1Klw",
        "title": "Yeh Jo Halka Halka Suroor Hai | Nusrat Fateh Ali Khan - OSA",
        "album": "Nusrat Fateh Ali Khan Hits",
        "duration": "7:15"
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
        "id": "Jpy1ri7NdEA",
        "title": "Mere Rashke Qamar - Nusrat Fateh Ali Khan, Rahat Fateh Ali Khan",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "3:41"
      },
      {
        "id": "K-vw9BTApec",
        "title": "Sanu Ek Pal Chain | Lyrics | Rahat Fateh Ali Khan | Raid",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "3:37"
      },
      {
        "id": "f24ciYW_Q1o",
        "title": "Lyrics:Main Jahan Rahoon Full Song | Rahat Fateh Ali Khan, Krishna Beura | Javed Akhtar Mega Music",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "7:14"
      },
      {
        "id": "1VIOqToq8tY",
        "title": "Isq Risk /Mere Btlrother Ki Dulhan/Rahat fateh ali khan.",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "4:35"
      },
      {
        "id": "1N7E_jPzmJ8",
        "title": "Bol Na Halke Halke -Shankar-Ehsaan-Loy, Rahat Fateh Ali Khan, Mahalakshmi Iyer|7clouds Hindi",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "5:05"
      },
      {
        "id": "ySYHcfvrmyw",
        "title": "O Re Piya | Rahat Fateh Ali Khan | Lyrics |Aaja nachle | Creative Vibes Music",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "6:20"
      },
      {
        "id": "6vEvbvzFtXs",
        "title": "Nit Khair Manga - Rahat Fateh Ali Khan 🎶 | Umar me usko ginta nahi mai ✨",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "4:48"
      },
      {
        "id": "tgtLnxBNS2s",
        "title": "Main Tenu Samjhawan Ki | Rahat fateh ali khan | Lyrics | VJ-Vikas Jain",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "4:48"
      },
      {
        "id": "gq2E3LcAJBg",
        "title": "Sajdaa - Shankar Mahadevan, Rahat Fateh Ali Khan | 7clouds Hindi",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "6:06"
      },
      {
        "id": "qwh1ZXByTAI",
        "title": "Isq Risk - Rahat Fateh Ali Khan | 7Alfaaz",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "4:34"
      },
      {
        "id": "d1oobMg0iZI",
        "title": "Ajj Din Chadheya full song with lyrics| Rahat Fateh Ali Khan| saifali khan| Deepika Padukone",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "5:18"
      },
      {
        "id": "kq19ZFnmze8",
        "title": "Akhiyan | Rahat Fateh Ali Khan | Punjabi Song Collection",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "4:07"
      },
      {
        "id": "nZETYJmwDH0",
        "title": "Tum Jo Aaye - Rahat Fateh Ali Khan, Tulsi Kumar • Tum Jo Aaye Zindagi Mein",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "4:47"
      },
      {
        "id": "yk8w6vOW2BQ",
        "title": "Surili Akhiyon Wale - Rahat Fateh Ali Khan, Suzanne D'Mello",
        "album": "Rahat Fateh Ali Khan Hits",
        "duration": "5:32"
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
        "id": "2OssKfYvVys",
        "title": "Aa Bhi Ja Aa Bhi Ja | Lucky Ali, Sunidhi Chauhan | Sur The Melody Of Life",
        "album": "Lucky Ali Hits",
        "duration": "5:54"
      },
      {
        "id": "_KOVzFV2QjM",
        "title": "Lucky Ali - Dekha Hai Aise Bhi | Official Lyrical Video | Sifar | Best of 90s Hit Hindi Songs",
        "album": "Lucky Ali Hits",
        "duration": "4:00"
      },
      {
        "id": "7U84JOhHFpE",
        "title": "Lucky Ali - Dekha Hai Aise Bhi",
        "album": "Lucky Ali Hits",
        "duration": "4:21"
      },
      {
        "id": "wOGKW1IL8IU",
        "title": "Lucky Ali - O Sanam",
        "album": "Lucky Ali Hits",
        "duration": "3:44"
      },
      {
        "id": "GL49u_5rYPM",
        "title": "Lucky Ali - Jaane Kya Dhoondta Hai | Lucky Ali, Gauri Karnik | Sur The Melody Of Life",
        "album": "Lucky Ali Hits",
        "duration": "6:18"
      },
      {
        "id": "4p9JmZiMbRU",
        "title": "Lucky Ali - Dekha Hai Aise Bhi with lyrics | Sifar",
        "album": "Lucky Ali Hits",
        "duration": "4:00"
      },
      {
        "id": "kPufn1grFCQ",
        "title": "Lucky Ali - Kitni Haseen Zindagi",
        "album": "Lucky Ali Hits",
        "duration": "4:22"
      },
      {
        "id": "KgoJ1aK1AgY",
        "title": "Lucky Ali | Kitni Haseen Zindagi | कितनी हसीं जिंदगी | Malaika Arora | Best of 90s Songs",
        "album": "Lucky Ali Hits",
        "duration": "4:17"
      },
      {
        "id": "sc4-3M_NVdA",
        "title": "Gori Teri Aankhen - Lucky Ali & Kavitha Krishnamurthy| 90's Album hits",
        "album": "Lucky Ali Hits",
        "duration": "4:45"
      },
      {
        "id": "Bjp7loOqeh0",
        "title": "kitni haseen zindagi hai LYRICS. by Lucky Ali.",
        "album": "Lucky Ali Hits",
        "duration": "4:17"
      },
      {
        "id": "8vsUumMAwGU",
        "title": "Lucky Ali - O Sanam",
        "album": "Lucky Ali Hits",
        "duration": "3:44"
      },
      {
        "id": "hkcM8tqqvWE",
        "title": "Lucky Ali | Kitni Haseen Zindagi | कितनी हसीं जिंदगी | Malaika Arora | Best of 90s Songs",
        "album": "Lucky Ali Hits",
        "duration": "4:17"
      },
      {
        "id": "CrUxKV_c9Mo",
        "title": "Tere Mere Saath - Lucky Ali |Akki |Amol |Mohammed Aslam |Mehboob |Tanvir Shah",
        "album": "Lucky Ali Hits",
        "duration": "5:02"
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
        "id": "iOIF74Hk80A",
        "title": "Kasoor (Acoustic) - Prateek Kuhad | Official Lyric Video 🌻✨",
        "album": "Prateek Kuhad Hits",
        "duration": "3:33"
      },
      {
        "id": "rrCYMsV7A-c",
        "title": "Prateek Kuhad - Co2",
        "album": "Prateek Kuhad Hits",
        "duration": "3:15"
      },
      {
        "id": "1NEEJjTZknY",
        "title": "Prateek Kuhad - Co2 Live Across TWTLD Tour 2022",
        "album": "Prateek Kuhad Hits",
        "duration": "3:10"
      },
      {
        "id": "-BpDVIv_860",
        "title": "Prateek Kuhad - Tum Jab Paas | Artist Originals",
        "album": "Prateek Kuhad Hits",
        "duration": "3:56"
      },
      {
        "id": "WPi1xgc-iGo",
        "title": "Tum Jab Paas - Prateek Kuhad",
        "album": "Prateek Kuhad Hits",
        "duration": "3:56"
      },
      {
        "id": "Il7Nv270zNk",
        "title": "Prateek Kuhad - cold/mess",
        "album": "Prateek Kuhad Hits",
        "duration": "6:08"
      },
      {
        "id": "5cAyu5am4Fk",
        "title": "Prateek Kuhad - cold/mess",
        "album": "Prateek Kuhad Hits",
        "duration": "4:42"
      },
      {
        "id": "YFf3G1g8ns8",
        "title": "Dil Beparvah - Ankur Tewari & Prateek Kuhad",
        "album": "Prateek Kuhad Hits",
        "duration": "4:14"
      },
      {
        "id": "cTwsW54rM3A",
        "title": "Tere Hi Hum - Prateek Kuhad | Official Lyric Video ✨🚀",
        "album": "Prateek Kuhad Hits",
        "duration": "2:57"
      },
      {
        "id": "zrxQkZfbSlE",
        "title": "Prateek Kuhad - All I Need | Official Lyric Video",
        "album": "Prateek Kuhad Hits",
        "duration": "2:34"
      },
      {
        "id": "U2SVCCENLjE",
        "title": "Prateek Kuhad - Co2",
        "album": "Prateek Kuhad Hits",
        "duration": "2:44"
      },
      {
        "id": "pRLOXUlIUG0",
        "title": "Prateek Kuhad - Mulaqat | Tara Sutaria",
        "album": "Prateek Kuhad Hits",
        "duration": "4:16"
      },
      {
        "id": "keE5PlKc-qM",
        "title": "Khone Do - Prateek Kuhad | Official Lyric Video 🧩✨",
        "album": "Prateek Kuhad Hits",
        "duration": "3:59"
      },
      {
        "id": "eU3ir--p1vQ",
        "title": "Prateek Kuhad - with you/for you",
        "album": "Prateek Kuhad Hits",
        "duration": "3:52"
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
        "id": "mYRV_B_QVGw",
        "title": "B Praak x Jaani - Dil Kaat Ke | Sakshi | Rajniesh | Piyush Shazia | Bunny | Desi Melodies",
        "album": "B Praak Hits",
        "duration": "4:54"
      },
      {
        "id": "MjV8bplGvnA",
        "title": "ZINDAGI CH KOI AAYE NA RABBA B PRAAK & JAANI |KUMAAR , ROCHAK KOHLI",
        "album": "B Praak Hits",
        "duration": "4:45"
      },
      {
        "id": "mlb5yBGTTRI",
        "title": "Narak | Jai Randhhawa | Shehnaaz Gill | Ishqnama | Arvvindr Khaira | B Praak | 24th July",
        "album": "B Praak Hits",
        "duration": "4:24"
      },
      {
        "id": "1KuUCChROJs",
        "title": "Tujhe Yaad Na Meri Ayee 2 - B Praak, Jaani | Kuch Kuch Hota Hai | Shah Rukh K | Kajol |Rani",
        "album": "B Praak Hits",
        "duration": "4:55"
      },
      {
        "id": "l9k6cImhJ24",
        "title": "EK BAAT BATAO TOH | FILHAAL 2 MOHABBAT B Praak |Jaani|Akshay K, Nurpur S, Ammy V",
        "album": "B Praak Hits",
        "duration": "5:08"
      },
      {
        "id": "8yAqOqHvugY",
        "title": "B Praak - Aate Rehte Hain | Kangna Sharma | Rohit Khandelwal | Jaani | Zohrajabeen",
        "album": "B Praak Hits",
        "duration": "3:41"
      },
      {
        "id": "x5nd2acYjXg",
        "title": "Parindey | B Praak | Gippy Grewal, Sargun Mehta & Roopi Gill | Avvy Sra | Jatt Nuu Chudail Takri",
        "album": "B Praak Hits",
        "duration": "3:29"
      },
      {
        "id": "lAwVwOtTyes",
        "title": "Narak (Reprise Version) | Ishqnama | Jai Randhhawa | Shehnaaz Gill | Bunny | B Praak | Jaani",
        "album": "B Praak Hits",
        "duration": "4:17"
      },
      {
        "id": "UU-eUEt-tPg",
        "title": "Ranjha | Shershaah | Sidharth–Kiara | B Praak | Jasleen Royal | Romy | Anvita Dutt",
        "album": "B Praak Hits",
        "duration": "3:50"
      },
      {
        "id": "B2qpvYuBgnM",
        "title": "Qismat | Jaani | B Praak | Punjabi Songs",
        "album": "B Praak Hits",
        "duration": "3:55"
      },
      {
        "id": "YrUqw7uspKg",
        "title": "Mann Bharrya | B Praak | Jaani | Himanshi Khurana | Arvindr Khaira | Punjabi Songs",
        "album": "B Praak Hits",
        "duration": "4:37"
      },
      {
        "id": "cAMHx-m9oh8",
        "title": "Kya Loge Tum | Akshay Kumar | Amyra Dastur | BPraak | Jaani | Arvindr Khaira | Zohrajabeen",
        "album": "B Praak Hits",
        "duration": "4:01"
      },
      {
        "id": "WDaBO8gL_7U",
        "title": "Saari Duniya Jalaa Denge - B Praak | Jaani | Animal | Ranbir Kapoor | Rashmika Mandanna",
        "album": "B Praak Hits",
        "duration": "3:03"
      },
      {
        "id": "pxQyPsw3ro8",
        "title": "KYON - Official Lyrical Video | B Praak | Payal Dev | Kunaal Vermaa | Aditya Dev | Sad Song",
        "album": "B Praak Hits",
        "duration": "4:38"
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
        "id": "c-FKlE3_kHo",
        "title": "Guru Randhawa - QATAL -",
        "album": "Guru Randhawa Hits",
        "duration": "2:54"
      },
      {
        "id": "7-PzIkoE1vM",
        "title": "Guru Randhawa, Sanjoy, Gill Machhrai - Qatal",
        "album": "Guru Randhawa Hits",
        "duration": "2:52"
      },
      {
        "id": "knGCfzm4jWs",
        "title": "Guru Randhawa - SIRRA",
        "album": "Guru Randhawa Hits",
        "duration": "2:34"
      },
      {
        "id": "zWGLC-YVcv4",
        "title": "Guru Randhawa - SIRRA",
        "album": "Guru Randhawa Hits",
        "duration": "2:27"
      },
      {
        "id": "vB0V3iCSzQw",
        "title": "GURU RANDHAWA - \"AZUL\" MV",
        "album": "Guru Randhawa Hits",
        "duration": "2:32"
      },
      {
        "id": "0XGkn7oFNkM",
        "title": "Guru Randhawa - Azul",
        "album": "Guru Randhawa Hits",
        "duration": "2:34"
      },
      {
        "id": "lR8SPiif7Hg",
        "title": "Guru Randhawa - AZUL",
        "album": "Guru Randhawa Hits",
        "duration": "2:19"
      },
      {
        "id": "y3RhoAQXJ8I",
        "title": "Moon Rise Guru Randhawa, Shehnaaz Gill | Man of The Moon | Sanjoy | Gifty | Bhushan Kumar",
        "album": "Guru Randhawa Hits",
        "duration": "2:58"
      },
      {
        "id": "siv9rrz6uGo",
        "title": "Guru Randhawa: Moon Rise Man of The Moon | Bhushan Kumar | Song 2023 | Lyrical punjab",
        "album": "Guru Randhawa Hits",
        "duration": "2:55"
      },
      {
        "id": "9wG4C42JhN4",
        "title": "GURU RANDHAWA - “FINE SHYT” MV",
        "album": "Guru Randhawa Hits",
        "duration": "2:22"
      },
      {
        "id": "4RSxIX2I6Ic",
        "title": "GURU RANDHAWA - “SHKINI“ MV",
        "album": "Guru Randhawa Hits",
        "duration": "2:31"
      },
      {
        "id": "0PjAw9YPBLA",
        "title": "Shkini - Guru Randhawa ft. Kiran Bajwa | Lyrics",
        "album": "Guru Randhawa Hits",
        "duration": "2:31"
      },
      {
        "id": "0Cm8SXKAPE4",
        "title": "Guru Randhawa - PERFECT",
        "album": "Guru Randhawa Hits",
        "duration": "2:23"
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
        "id": "eK0IIyBlYew",
        "title": "Tera Zikr",
        "album": "Darshan Raval Top Hits",
        "duration": "3:44"
      },
      {
        "id": "D1G_jrSSEe4",
        "title": "Mahiye Jinna Sohna",
        "album": "Darshan Raval Top Hits",
        "duration": "3:06"
      },
      {
        "id": "QCXaa1mEUK0",
        "title": "Hawa Banke",
        "album": "Darshan Raval Top Hits",
        "duration": "3:44"
      },
      {
        "id": "HYUpNJJELeE",
        "title": "Mehrama",
        "album": "Darshan Raval Top Hits",
        "duration": "3:15"
      },
      {
        "id": "beqprrnaKFc",
        "title": "Asal Mein",
        "album": "Darshan Raval Top Hits",
        "duration": "3:57"
      },
      {
        "id": "3fSlGG_qnzs",
        "title": "Bhula Dunga",
        "album": "Darshan Raval Top Hits",
        "duration": "3:25"
      },
      {
        "id": "asYxxtiWUyw",
        "title": "Chogada",
        "album": "Darshan Raval Top Hits",
        "duration": "4:17"
      },
      {
        "id": "i0_m90T04uw",
        "title": "Kamariya",
        "album": "Darshan Raval Top Hits",
        "duration": "3:07"
      },
      {
        "id": "TBlixHMv_GQ",
        "title": "Is Qadar",
        "album": "Darshan Raval Top Hits",
        "duration": "3:50"
      },
      {
        "id": "LLF3GMfNEYU",
        "title": "Jannat Ve",
        "album": "Darshan Raval Top Hits",
        "duration": "3:56"
      },
      {
        "id": "7zEx0AJguSM",
        "title": "Rabba Mehar Kari",
        "album": "Darshan Raval Top Hits",
        "duration": "5:15"
      },
      {
        "id": "R4mCK5P7WZE",
        "title": "Do Din",
        "album": "Darshan Raval Top Hits",
        "duration": "3:20"
      },
      {
        "id": "S2RYBkcAkVQ",
        "title": "Kaash Aisa Hota",
        "album": "Darshan Raval Top Hits",
        "duration": "3:34"
      },
      {
        "id": "gQgjnpeQDZU",
        "title": "Ek Ladki Ko Dekha Toh Aisa Laga",
        "album": "Darshan Raval Top Hits",
        "duration": "3:11"
      },
      {
        "id": "3qStEVyUrwc",
        "title": "Saari Ki Saari 2.0",
        "album": "Darshan Raval Top Hits",
        "duration": "3:35"
      },
      {
        "id": "7xNcMwyHQ6c",
        "title": "Dhol Bajaa",
        "album": "Darshan Raval Top Hits",
        "duration": "4:08"
      },
      {
        "id": "hUQ6kVhoM88",
        "title": "Judaiyaan",
        "album": "Darshan Raval Top Hits",
        "duration": "4:16"
      },
      {
        "id": "tOXMlseYc7E",
        "title": "Mujhe Peene Do",
        "album": "Darshan Raval Top Hits",
        "duration": "3:36"
      },
      {
        "id": "EFqkHIMbhQg",
        "title": "Baarish Lete Aana",
        "album": "Darshan Raval Top Hits",
        "duration": "3:45"
      },
      {
        "id": "gEV_Po7PeIY",
        "title": "Tu Mileya",
        "album": "Darshan Raval Top Hits",
        "duration": "3:31"
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
        "id": "_Wg1UwuyfZ8",
        "title": "Ishqam | Official Video | Mika Singh Ft. Ali Quli Mirza | Himansh Verma | Navrattan Music | 2020",
        "album": "Mika Singh Hits",
        "duration": "3:15"
      },
      {
        "id": "7iAmXLrLizM",
        "title": "Sawan Mein Lag Gayi Aag - Ginny Weds Sunny | Yami, Vikrant | Mika, Neha & Badshah | Payal D, Mohsin",
        "album": "Mika Singh Hits",
        "duration": "2:56"
      },
      {
        "id": "Pv0_n9hdCbI",
        "title": "Something Something Lyrical Video - Something Something | Mika Singh & Bella | Urvashi Sharrma",
        "album": "Mika Singh Hits",
        "duration": "5:11"
      },
      {
        "id": "jKHj2n6yb-0",
        "title": "Mast Kalander | Full Audio | Mika Singh | Yo Yo Honey Singh | Latest Punjabi Song 2020",
        "album": "Mika Singh Hits",
        "duration": "4:27"
      },
      {
        "id": "bryAmFYcFOY",
        "title": "Sawan Mein Lag Gayi Aag Mika | Badshah | Neha K | Vikrant M, Yami G | Party Songs",
        "album": "Mika Singh Hits",
        "duration": "3:48"
      },
      {
        "id": "kNvJ_XSXHpE",
        "title": "Something Something - Video Song | Feat. Urvashi Sharma | Mika Singh, Bella | Blockbuster Hindi Song",
        "album": "Mika Singh Hits",
        "duration": "3:19"
      },
      {
        "id": "55GvtopAEdc",
        "title": "BUNGLA | Official 4K Music Video | Mika Singh, Addy Gill, Gourov Dasgupta | Latest Punjabi Song 2026",
        "album": "Mika Singh Hits",
        "duration": "2:55"
      },
      {
        "id": "Y7G-tYRzwYY",
        "title": "\"Subha Hone Na De Full Song\"| Desi Boyz | Akshay Kumar ,John Abraham | Pritam | Mika Singh, Kumaar",
        "album": "Mika Singh Hits",
        "duration": "4:32"
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
        "id": "SN2HJQaOJKI",
        "title": "Ali Maula - Salim-Sulaiman, Salim Merchant",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:41"
      },
      {
        "id": "HbHpNpIGI7Q",
        "title": "Salim-Sulaiman, Sonu Nigam, Shreya Ghoshal, Salim Sadruddin Merchant - Shukran Allah",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:49"
      },
      {
        "id": "YhUAM0oNWB0",
        "title": "Mar Jawaan Lyrical | Fashion | Priyanka Chopra, Kangna Ranawat | Shruti Pathak, Salim Merchant",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:16"
      },
      {
        "id": "62h7x1t4jpw",
        "title": "Kurbaan Hua - Salim–Sulaiman | 7clouds Hindi",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:22"
      },
      {
        "id": "Vq-iZG8RUFU",
        "title": "Shukran Allah Live in Mumbai | Salim Sulaiman, Sonu Nigam | GoDaddy presents Zariya | #SSLive",
        "album": "Salim-Sulaiman Hits",
        "duration": "5:18"
      },
      {
        "id": "XrPd5xLpSuU",
        "title": "Sukoon 2.0 | Arijit Singh | Salim Sulaiman | Shraddha Pandit | Anshuman Sharma | Hindi Song 2026",
        "album": "Salim-Sulaiman Hits",
        "duration": "5:50"
      },
      {
        "id": "6hjJZv_68vI",
        "title": "Saaiyaan Lyrical | Kareen Kapoor | Rahat Fateh Ali Khan | Salim-Sulaiman | Bollywood Songs",
        "album": "Salim-Sulaiman Hits",
        "duration": "3:29"
      },
      {
        "id": "h13x6Dr6u78",
        "title": "Nuksaan | McDonald's Bhoomi 2026 | Salim Sulaiman | Afsana Khan | Saida Begum | Happy Raikoti",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:12"
      },
      {
        "id": "tg92bEgrM7A",
        "title": "Sonu nigam & Shreya Ghoshal - Shukran Allah | Kurbaan",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:48"
      },
      {
        "id": "XgdY_s1LsZc",
        "title": "Haule Haule - Full Song | Rab Ne Bana Di Jodi | Shah Rukh Khan | Anushka Sharma | Sukhwinder Singh",
        "album": "Salim-Sulaiman Hits",
        "duration": "5:26"
      },
      {
        "id": "qoq8B8ThgEM",
        "title": "Tujh Mein Rab Dikhta Hai Song | Rab Ne Bana Di Jodi | Shah Rukh Khan, Anushka Sharma | Roop Kumar",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:42"
      },
      {
        "id": "yqqFCUB8YzA",
        "title": "Mar Jawaan | 360 Degree Video | Sukriti Kakar | Salim Sulaiman Live | Jubilee Concert Toronto",
        "album": "Salim-Sulaiman Hits",
        "duration": "3:59"
      },
      {
        "id": "jDErhADhhmg",
        "title": "Phir Milenge Chalte Chalte - Full Song | Rab Ne Bana Di Jodi | Shah Rukh Khan | Sonu Nigam",
        "album": "Salim-Sulaiman Hits",
        "duration": "6:36"
      },
      {
        "id": "0eSVgD2V2AQ",
        "title": "Shukran Allah - Audio Lyrical | Sonu Nigam | Shreya Ghoshal | Salim-Sulaiman | Kurbaan",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:49"
      },
      {
        "id": "9DQepVxVdgg",
        "title": "Tu Hi Wajah | McDonald's Bhoomi 2026 | Salim Sulaiman | Shreya Ghoshal | Shraddha Pandit | Kumaar",
        "album": "Salim-Sulaiman Hits",
        "duration": "4:34"
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
        "id": "7ROF6a1_hfY",
        "title": "Ek Din Teri Raahon - Javed Ali, Pritam",
        "album": "Javed Ali Hits",
        "duration": "4:53"
      },
      {
        "id": "icReENFVXYY",
        "title": "Saude bazi full song | Javed Ali | movie Aakrosh",
        "album": "Javed Ali Hits",
        "duration": "5:57"
      },
      {
        "id": "W4sHmzMCo8s",
        "title": "Saudebazi (Encore)",
        "album": "Javed Ali Hits",
        "duration": "5:55"
      },
      {
        "id": "zXfjNcucTm4",
        "title": "Deewana Kar Raha Hai Lyrics - Raaz 3 | Javed Ali, Rashid Khan • deewana kar raha hai tera roop suneh",
        "album": "Javed Ali Hits",
        "duration": "5:38"
      },
      {
        "id": "rrRfRaonkiE",
        "title": "Gale Lag Ja - Javed Ali & Banjyotsna",
        "album": "Javed Ali Hits",
        "duration": "4:13"
      },
      {
        "id": "CSfJEi7uDXo",
        "title": "Tu Hi Haqeeqat Full Song With Lyrics by Javed Ali",
        "album": "Javed Ali Hits",
        "duration": "5:06"
      },
      {
        "id": "3QhajVg6SjE",
        "title": "Tu Hi Haqeeqat - Lyrical Song | Tum Mile | Emraan Hashmi | Soha Ali Khan | Javed Ali | Pritam",
        "album": "Javed Ali Hits",
        "duration": "5:06"
      },
      {
        "id": "-_fKCIzJlUQ",
        "title": "Saudebaazi - | Lyrical Bam Hindi",
        "album": "Javed Ali Hits",
        "duration": "5:44"
      },
      {
        "id": "N4Fl1e0crik",
        "title": "Guzarish Lyrics - Ghajini | A. R. Rahman, Javed Ali, Sonu Nigam",
        "album": "Javed Ali Hits",
        "duration": "5:28"
      },
      {
        "id": "k232IRh2tEE",
        "title": "Tu Hi Haqeeqat - Pritam, Javed Ali, Irshan Ashraf, Shadab",
        "album": "Javed Ali Hits",
        "duration": "5:03"
      },
      {
        "id": "XqCH06Sa9uw",
        "title": "Ek Din Teri Raahon Lyrics - Pritam, Javed Ali • ye dil toh na keh saka",
        "album": "Javed Ali Hits",
        "duration": "4:51"
      },
      {
        "id": "ViRbzRtnc10",
        "title": "Tu Hi Haqeeqat - Javed Ali, Irshan Ashraf, Shadab 🎶 | Aa tujhe in bahon mein bhar ke ✨",
        "album": "Javed Ali Hits",
        "duration": "6:03"
      },
      {
        "id": "8JbEH5rs18Q",
        "title": "Pritam , Javed Ali - Tum Mile - Love Reprise",
        "album": "Javed Ali Hits",
        "duration": "5:04"
      },
      {
        "id": "N-0tsPZmaGg",
        "title": "Jaavedaan Hai | KK, Suzanne D'Mello",
        "album": "Javed Ali Hits",
        "duration": "4:56"
      },
      {
        "id": "SNfDuGO_zhE",
        "title": "Aa jao meri tamanna | ajab Prem ki gajab kahani| ranveer kapoor, Katrina Kaif|@vaani-i",
        "album": "Javed Ali Hits",
        "duration": "4:06"
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
        "id": "3wGLsjgTx4c",
        "title": "SANAM - Likhe Jo Khat Tujhe",
        "album": "Sanam Hits",
        "duration": "3:32"
      },
      {
        "id": "SrMLFxMlflA",
        "title": "SANAM - Dil Kya Kare",
        "album": "Sanam Hits",
        "duration": "3:40"
      },
      {
        "id": "4HRC6c5-2lQ",
        "title": "SANAM - Yeh Raaten Yeh Mausam - Ft. Simran Sehgal",
        "album": "Sanam Hits",
        "duration": "3:40"
      },
      {
        "id": "JlgkMXex2DI",
        "title": "SANAM - Hai Apna Dil To Awara - Ft. Soogum Sookha",
        "album": "Sanam Hits",
        "duration": "3:26"
      },
      {
        "id": "7Ib33wy6OT4",
        "title": "Mere Sapnon Ki Rani - SANAM | Lyrical Video",
        "album": "Sanam Hits",
        "duration": "4:15"
      },
      {
        "id": "w--g30WTfBs",
        "title": "SANAM - O Mere Dil Ke Chain",
        "album": "Sanam Hits",
        "duration": "3:49"
      },
      {
        "id": "M6Ul3ASaFLU",
        "title": "SANAM - Mere Mehboob Qayamat Hogi",
        "album": "Sanam Hits",
        "duration": "4:24"
      },
      {
        "id": "qwvn-heOJVw",
        "title": "SANAM - Yeh Vaada Raha - Ft. Mira",
        "album": "Sanam Hits",
        "duration": "3:32"
      },
      {
        "id": "hgi2MYAFgE8",
        "title": "SANAM - Gulabi Aankhen",
        "album": "Sanam Hits",
        "duration": "3:49"
      },
      {
        "id": "uyzUJwWg9yM",
        "title": "SANAM - Tujhse Naraz Nahi Zindagi",
        "album": "Sanam Hits",
        "duration": "4:13"
      },
      {
        "id": "XKbiIahG6ok",
        "title": "SANAM - Ek Ladki Ko Dekha - Acoustic",
        "album": "Sanam Hits",
        "duration": "4:03"
      },
      {
        "id": "BWLYFc9MDFI",
        "title": "SANAM - Aap Ki Nazron Ne Samjha",
        "album": "Sanam Hits",
        "duration": "3:34"
      },
      {
        "id": "GGErfAmSK9I",
        "title": "SANAM - Duaa #Acoustic - Ft. Sanah Moidutty",
        "album": "Sanam Hits",
        "duration": "3:29"
      },
      {
        "id": "3A1LgFkIPfA",
        "title": "SANAM - Kuch Na Kaho - Ft. Shirley Setia",
        "album": "Sanam Hits",
        "duration": "4:24"
      }
    ]
  }
];
