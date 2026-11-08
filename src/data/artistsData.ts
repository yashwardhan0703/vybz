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
        "id": "xwwAVRyNmgQ",
        "title": "Jai Ho",
        "album": "Slumdog Millionaire",
        "duration": "5:19"
      },
      {
        "id": "WY6IZKkVw0g",
        "title": "Tum Ho",
        "album": "Rockstar",
        "duration": "5:18"
      },
      {
        "id": "MDt-Wew5cz8",
        "title": "Nadaan Parinde",
        "album": "Rockstar",
        "duration": "6:26"
      },
      {
        "id": "xRb8hxwN5zc",
        "title": "Agar Tum Saath Ho",
        "album": "Tamasha",
        "duration": "5:41"
      },
      {
        "id": "a_ZPz_sxzY8",
        "title": "Masakali",
        "album": "Delhi-6",
        "duration": "4:50"
      },
      {
        "id": "0VwgpYJ4q38",
        "title": "Urvasi Urvasi",
        "album": "Humse Hai Muqabala",
        "duration": "5:38"
      },
      {
        "id": "qNnvL0ztJhA",
        "title": "Radha Kaise Na Jale",
        "album": "Lagaan",
        "duration": "5:34"
      },
      {
        "id": "A3q9X7VPdhg",
        "title": "Matargashti",
        "album": "Tamasha",
        "duration": "5:28"
      },
      {
        "id": "7mTDBsdfw88",
        "title": "Safarnama",
        "album": "Tamasha",
        "duration": "4:11"
      },
      {
        "id": "H_e90zbRzpg",
        "title": "Kal Ho Naa Ho",
        "album": "Kal Ho Naa Ho",
        "duration": "5:21"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "duration": "4:22"
      },
      {
        "id": "RLzC55ai0eo",
        "title": "Heeriye",
        "album": "Jasleen Royal feat. Arijit",
        "duration": "3:14"
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
        "id": "xRb8hxwN5zc",
        "title": "Agar Tum Saath Ho",
        "album": "Tamasha",
        "duration": "5:41"
      },
      {
        "id": "RLzC55ai0eo",
        "title": "Heeriye",
        "album": "Jasleen Royal feat. Arijit",
        "duration": "3:14"
      },
      {
        "id": "7zjGzEJQ7MA",
        "title": "Teri Baaton Mein Aisa Uljha Jiya",
        "album": "TBMAUJ",
        "duration": "2:32"
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
        "album": "Kalyug",
        "duration": "5:34"
      },
      {
        "id": "H_e90zbRzpg",
        "title": "Kuch Is Tarah",
        "album": "Doorie",
        "duration": "5:13"
      },
      {
        "id": "xRb8hxwN5zc",
        "title": "Piya O Re Piya",
        "album": "Tere Naal Love Ho Gaya",
        "duration": "4:52"
      },
      {
        "id": "A3q9X7VPdhg",
        "title": "Hum Kis Gali",
        "album": "Doorie",
        "duration": "5:01"
      },
      {
        "id": "7mTDBsdfw88",
        "title": "Paniyon Sa",
        "album": "Satyameva Jayate",
        "duration": "3:56"
      },
      {
        "id": "RLzC55ai0eo",
        "title": "Musafir",
        "album": "Sweetiee Weds NRI",
        "duration": "5:07"
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
        "title": "Hukum",
        "album": "Jailer",
        "duration": "3:27"
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
        "id": "Umqb9KENgmk",
        "title": "Lungi Dance",
        "album": "Chennai Express",
        "duration": "4:36"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Naagan",
        "album": "Honey 3.0",
        "duration": "3:19"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Satan",
        "album": "Single",
        "duration": "4:56"
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
        "id": "Umqb9KENgmk",
        "title": "Radha",
        "album": "Student of the Year",
        "duration": "5:41"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Samjhawan",
        "album": "Humpty Sharma Ki Dulhania",
        "duration": "4:25"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Hangover",
        "album": "Kick",
        "duration": "6:16"
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
        "id": "Umqb9KENgmk",
        "title": "Labon Ko",
        "album": "Bhool Bhulaiyaa",
        "duration": "5:42"
      },
      {
        "id": "Qa-uVqnv-No",
        "title": "Pyaar Ke Pal",
        "album": "Pal",
        "duration": "5:39"
      },
      {
        "id": "xRb8hxwN5zc",
        "title": "Haan Tu Hain",
        "album": "Jannat",
        "duration": "5:25"
      },
      {
        "id": "A3q9X7VPdhg",
        "title": "O Meri Jaan",
        "album": "Life in a... Metro",
        "duration": "5:05"
      },
      {
        "id": "7mTDBsdfw88",
        "title": "Tune Maari Entriyaan",
        "album": "Gunday",
        "duration": "5:12"
      },
      {
        "id": "hXh35CtnSyU",
        "title": "Tu Aashiqui Hai",
        "album": "Jhankaar Beats",
        "duration": "6:11"
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
        "id": "H_e90zbRzpg",
        "title": "Kal Ho Naa Ho",
        "album": "Title Track",
        "duration": "5:21"
      },
      {
        "id": "bKZTnnFU9HA",
        "title": "Abhi Mujh Mein Kahin",
        "album": "Agneepath",
        "duration": "6:04"
      },
      {
        "id": "3Z_x7vBqr6E",
        "title": "Suraj Hua Maddham",
        "album": "Kabhi Khushi Kabhie Gham",
        "duration": "7:08"
      },
      {
        "id": "Umqb9KENgmk",
        "title": "Tanhayee",
        "album": "Dil Chahta Hai",
        "duration": "6:10"
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
        "id": "Umqb9KENgmk",
        "title": "Peaches",
        "album": "Drive",
        "duration": "3:10"
      },
      {
        "id": "T94PHkuydcw",
        "title": "Panga",
        "album": "Honey Singh feat. Diljit",
        "duration": "4:24"
      },
      {
        "id": "9EodaUmLhAI",
        "title": "Goliyan",
        "album": "International Villager",
        "duration": "3:15"
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
      }
    ]
  }
];
