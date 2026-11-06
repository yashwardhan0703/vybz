import fs from 'fs';
import path from 'path';

const ARTISTS_CONFIG = [
  {
    id: 'pritam',
    name: 'Pritam',
    wikiTitle: 'Pritam Chakraborty',
    tagline: 'Master Composer of Modern Bollywood Hits',
    bgColor: '#1e293b',
    topTracks: [
      { id: 'P1fIdFRnfqw', title: 'What Jhumka?', album: 'Rocky Aur Rani', duration: '3:33' },
      { id: 'BddP6PYo2gs', title: 'Kesariya', album: 'Brahmāstra', duration: '4:28' },
      { id: '284Ov7ysmfA', title: 'Channa Mereya', album: 'Ae Dil Hai Mushkil', duration: '4:49' },
      { id: '9YhzTM-KHkM', title: 'Ilahi', album: 'Yeh Jawaani Hai Deewani', duration: '3:50' },
      { id: 'DMLrGfMxOQA', title: 'I Am In Love', album: 'Once Upon A Time In Mumbaai', duration: '5:06' },
    ],
  },
  {
    id: 'ar-rahman',
    name: 'A.R. Rahman',
    wikiTitle: 'A. R. Rahman',
    tagline: 'The Mozart of Madras & Academy Award Legend',
    bgColor: '#0369a1',
    topTracks: [
      { id: 'T94PHkuydcw', title: 'Kun Faya Kun', album: 'Rockstar', duration: '7:53' },
      { id: '9EodaUmLhAI', title: 'Chaiyya Chaiyya', album: 'Dil Se', duration: '6:54' },
      { id: 'c-W01X6Zz6M', title: 'Jai Ho', album: 'Slumdog Millionaire', duration: '5:19' },
      { id: 'DMLrGfMxOQA', title: 'Tum Ho', album: 'Rockstar', duration: '5:18' },
    ],
  },
  {
    id: 'arijit-singh',
    name: 'Arijit Singh',
    wikiTitle: 'Arijit Singh',
    tagline: 'The Undisputed Voice of Indian Romance',
    bgColor: '#854d0e',
    topTracks: [
      { id: 'BddP6PYo2gs', title: 'Kesariya', album: 'Brahmāstra', duration: '4:28' },
      { id: '284Ov7ysmfA', title: 'Channa Mereya', album: 'Ae Dil Hai Mushkil', duration: '4:49' },
      { id: '9YhzTM-KHkM', title: 'Ilahi', album: 'Yeh Jawaani Hai Deewani', duration: '3:50' },
      { id: 'P1fIdFRnfqw', title: 'What Jhumka?', album: 'Rocky Aur Rani', duration: '3:33' },
      { id: 'Umqb9KENgmk', title: 'Tum Hi Ho', album: 'Aashiqui 2', duration: '4:22' },
    ],
  },
  {
    id: 'sachin-jigar',
    name: 'Sachin-Jigar',
    wikiTitle: 'Sachin–Jigar',
    tagline: 'Hit Music Director Duo',
    bgColor: '#475569',
    topTracks: [
      { id: 'BddP6PYo2gs', title: 'Apna Bana Le', album: 'Bhediya', duration: '4:21' },
      { id: 'P1fIdFRnfqw', title: 'Tere Vaaste', album: 'Zara Hatke Zara Bachke', duration: '3:10' },
      { id: '9YhzTM-KHkM', title: 'Saibo', album: 'Shor in the City', duration: '3:16' },
    ],
  },
  {
    id: 'vishal-shekhar',
    name: 'Vishal-Shekhar',
    wikiTitle: 'Vishal–Shekhar',
    tagline: 'Party Anthems & Electrifying Soundtracks',
    bgColor: '#334155',
    topTracks: [
      { id: 'H_e90zbRzpg', title: 'Besharam Rang', album: 'Pathaan', duration: '4:18' },
      { id: '9YhzTM-KHkM', title: 'Ghungroo', album: 'War', duration: '5:02' },
      { id: '284Ov7ysmfA', title: 'Nashe Si Chadh Gayi', album: 'Befikre', duration: '3:57' },
    ],
  },
  {
    id: 'atif-aslam',
    name: 'Atif Aslam',
    wikiTitle: 'Atif Aslam',
    tagline: 'Soulful Ballads & Timeless Romantic Anthems',
    bgColor: '#155e75',
    topTracks: [
      { id: 'DMLrGfMxOQA', title: 'Jeena Jeena', album: 'Badlapur', duration: '3:50' },
      { id: 'T94PHkuydcw', title: 'Tajdar-e-Haram', album: 'Coke Studio', duration: '10:15' },
      { id: 'BddP6PYo2gs', title: 'Tera Hone Laga Hoon', album: 'Ajab Prem Ki Ghazab Kahani', duration: '4:58' },
    ],
  },
  {
    id: 'anirudh-ravichander',
    name: 'Anirudh Ravichander',
    wikiTitle: 'Anirudh Ravichander',
    tagline: 'Rockstar of Modern South & Pan-Indian Beats',
    bgColor: '#1e1b4b',
    topTracks: [
      { id: 'P1fIdFRnfqw', title: 'Chaleya', album: 'Jawan', duration: '3:20' },
      { id: '9EodaUmLhAI', title: 'Hukum', album: 'Jailer', duration: '3:27' },
      { id: '284Ov7ysmfA', title: 'Badass', album: 'Leo', duration: '3:49' },
    ],
  },
  {
    id: 'udit-narayan',
    name: 'Udit Narayan',
    wikiTitle: 'Udit Narayan',
    tagline: 'The Legendary Sweet Voice of 90s & 2000s Bollywood',
    bgColor: '#581c87',
    topTracks: [
      { id: 'QKfGl39ZJWI', title: 'Pardesi Pardesi', album: 'Raja Hindustani', duration: '7:30' },
      { id: 'bKZTnnFU9HA', title: 'Kuch Kuch Hota Hai', album: 'Title Track', duration: '4:56' },
      { id: '3Z_x7vBqr6E', title: 'Tip Tip Barsa Paani', album: 'Mohra', duration: '5:55' },
    ],
  },
  {
    id: 'honey-singh',
    name: 'Yo Yo Honey Singh',
    wikiTitle: 'Yo Yo Honey Singh',
    tagline: 'The Revolutionary Desi Hip-Hop Pioneer',
    bgColor: '#78350f',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'Blue Eyes', album: 'Single', duration: '3:40' },
      { id: 'P1fIdFRnfqw', title: 'Dope Shope', album: 'International Villager', duration: '3:05' },
      { id: '284Ov7ysmfA', title: 'Brown Rang', album: 'International Villager', duration: '2:59' },
    ],
  },
  {
    id: 'shankar-ehsaan-loy',
    name: 'Shankar-Ehsaan-Loy',
    wikiTitle: 'Shankar–Ehsaan–Loy',
    tagline: 'Iconic Trio of Soulful Indian Music',
    bgColor: '#164e63',
    topTracks: [
      { id: 'H_e90zbRzpg', title: 'Kal Ho Naa Ho', album: 'Title Track', duration: '5:21' },
      { id: '7zjGzEJQ7MA', title: 'Maahi Ve', album: 'Kal Ho Naa Ho', duration: '6:06' },
      { id: '9YhzTM-KHkM', title: 'Dil Chahta Hai', album: 'Title Track', duration: '5:11' },
    ],
  },
  {
    id: 'shreya-ghoshal',
    name: 'Shreya Ghoshal',
    wikiTitle: 'Shreya Ghoshal',
    tagline: 'Nightingale of Bollywood & 5-time National Awardee',
    bgColor: '#701a75',
    topTracks: [
      { id: 'BddP6PYo2gs', title: 'Teri Ore', album: 'Singh Is Kinng', duration: '5:39' },
      { id: '284Ov7ysmfA', title: 'Sunn Raha Hai Na Tu', album: 'Aashiqui 2', duration: '5:14' },
      { id: 'P1fIdFRnfqw', title: 'Deewani Mastani', album: 'Bajirao Mastani', duration: '5:40' },
    ],
  },
  {
    id: 'jasleen-royal',
    name: 'Jasleen Royal',
    wikiTitle: 'Jasleen Royal',
    tagline: 'Soulful Singer, Composer & Hitmaker',
    bgColor: '#1c1917',
    topTracks: [
      { id: 'BmUe3-sfr7E', title: 'Heeriye', album: 'Single', duration: '3:15' },
      { id: 'R0KlDFAFl0c', title: 'Ranjha', album: 'Shershaah', duration: '3:48' },
      { id: '9YhzTM-KHkM', title: 'Din Shagna Da', album: 'Phillauri', duration: '3:36' },
    ],
  },
  {
    id: 'amit-trivedi',
    name: 'Amit Trivedi',
    wikiTitle: 'Amit Trivedi',
    tagline: 'Folk, Indie & Experimental Bollywood Maestro',
    bgColor: '#7f1d1d',
    topTracks: [
      { id: 'T94PHkuydcw', title: 'Iktara', album: 'Wake Up Sid', duration: '4:13' },
      { id: '284Ov7ysmfA', title: 'Namo Namo', album: 'Kedarnath', duration: '5:22' },
      { id: 'BddP6PYo2gs', title: 'Love You Zindagi', album: 'Dear Zindagi', duration: '3:50' },
    ],
  },
  {
    id: 'sachet-tandon',
    name: 'Sachet Tandon',
    wikiTitle: 'Sachet Tandon',
    tagline: 'The Voice Behind Intense Romantic Hits',
    bgColor: '#713f12',
    topTracks: [
      { id: '284Ov7ysmfA', title: 'Bekhayali', album: 'Kabir Singh', duration: '6:11' },
      { id: 'R0KlDFAFl0c', title: 'Malang Sajna', album: 'Single', duration: '3:40' },
      { id: 'BddP6PYo2gs', title: 'Maiyya Mainu', album: 'Jersey', duration: '3:51' },
    ],
  },
  {
    id: 'alka-yagnik',
    name: 'Alka Yagnik',
    wikiTitle: 'Alka Yagnik',
    tagline: 'The Melody Queen with 20+ Thousand Songs',
    bgColor: '#831843',
    topTracks: [
      { id: '7JnKVPtRqVE', title: 'Tujhe Dekha Toh', album: 'DDLJ', duration: '5:02' },
      { id: 'QKfGl39ZJWI', title: 'Pardesi Pardesi', album: 'Raja Hindustani', duration: '7:30' },
      { id: '3Z_x7vBqr6E', title: 'Tum Dil Ki Dhadkan Mein', album: 'Dhadkan', duration: '5:10' },
    ],
  },
  {
    id: 'himesh-reshammiya',
    name: 'Himesh Reshammiya',
    wikiTitle: 'Himesh Reshammiya',
    tagline: 'The High-Pitch Hit Machine of Indian Pop',
    bgColor: '#451a03',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'Aashiq Banaya Aapne', album: 'Title Track', duration: '6:04' },
      { id: 'P1fIdFRnfqw', title: 'Jhalak Dikhlaaja', album: 'Aksar', duration: '5:10' },
      { id: '284Ov7ysmfA', title: 'Tera Suroor', album: 'Aap Kaa Surroor', duration: '5:59' },
    ],
  },
  {
    id: 'anuv-jain',
    name: 'Anuv Jain',
    wikiTitle: 'Anuv Jain',
    tagline: 'The Poetic Heartbeat of Indie Indian Music',
    bgColor: '#262626',
    topTracks: [
      { id: 'BmUe3-sfr7E', title: 'Baarishein', album: 'Single', duration: '3:27' },
      { id: 'R0KlDFAFl0c', title: 'Husn', album: 'Single', duration: '3:38' },
      { id: '9YhzTM-KHkM', title: 'Alag Aasmaan', album: 'Single', duration: '3:32' },
    ],
  },
  {
    id: 'shubh',
    name: 'Shubh',
    wikiTitle: 'Shubh (singer)',
    tagline: 'Global Punjabi Hip-Hop Chart-Topper',
    bgColor: '#0f172a',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'Cheques', album: 'Still Rollin', duration: '3:03' },
      { id: 'P1fIdFRnfqw', title: 'No Love', album: 'Single', duration: '2:50' },
      { id: '284Ov7ysmfA', title: 'Baller', album: 'Single', duration: '2:30' },
    ],
  },
  {
    id: 'badshah',
    name: 'Badshah',
    wikiTitle: 'Badshah (rapper)',
    tagline: 'India’s Biggest Commercial Rap & Pop Star',
    bgColor: '#171717',
    topTracks: [
      { id: 'P1fIdFRnfqw', title: 'Jugnu', album: 'Single', duration: '3:50' },
      { id: '9EodaUmLhAI', title: 'Genda Phool', album: 'Single', duration: '2:50' },
      { id: '284Ov7ysmfA', title: 'DJ Waley Babu', album: 'Single', duration: '2:58' },
    ],
  },
  {
    id: 'sachet-parampara',
    name: 'Sachet-Parampara',
    wikiTitle: 'Parampara Tandon',
    tagline: 'Dynamic Singing & Composing Bollywood Couple',
    bgColor: '#3b0764',
    topTracks: [
      { id: '284Ov7ysmfA', title: 'Bekhayali', album: 'Kabir Singh', duration: '6:11' },
      { id: 'R0KlDFAFl0c', title: 'Malang Sajna', album: 'Single', duration: '3:40' },
      { id: 'BddP6PYo2gs', title: 'Ram Siya Ram', album: 'Adipurush', duration: '3:50' },
    ],
  },
  // 21 - 50: EXPANDED LEGENDS & MODERN ICONS
  {
    id: 'kk',
    name: 'KK',
    wikiTitle: 'KK (singer)',
    tagline: 'The Voice of Pure Emotion & Nostalgia',
    bgColor: '#1e3a8a',
    topTracks: [
      { id: 'DMLrGfMxOQA', title: 'I Am In Love', album: 'Once Upon A Time In Mumbaai', duration: '5:06' },
      { id: 'bKZTnnFU9HA', title: 'Yaaron', album: 'Pal', duration: '4:40' },
      { id: '284Ov7ysmfA', title: 'Zara Sa', album: 'Jannat', duration: '5:04' },
      { id: '9YhzTM-KHkM', title: 'Kya Mujhe Pyar Hai', album: 'Woh Lamhe', duration: '4:45' },
    ],
  },
  {
    id: 'sonu-nigam',
    name: 'Sonu Nigam',
    wikiTitle: 'Sonu Nigam',
    tagline: 'Modern Rafi & Master of Indian Playback',
    bgColor: '#7c2d12',
    topTracks: [
      { id: 'H_e90zbRzpg', title: 'Kal Ho Naa Ho', album: 'Title Track', duration: '5:21' },
      { id: 'bKZTnnFU9HA', title: 'Abhi Mujh Mein Kahin', album: 'Agneepath', duration: '6:04' },
      { id: '3Z_x7vBqr6E', title: 'Suraj Hua Maddham', album: 'Kabhi Khushi Kabhie Gham', duration: '7:08' },
    ],
  },
  {
    id: 'kishore-kumar',
    name: 'Kishore Kumar',
    wikiTitle: 'Kishore Kumar',
    tagline: 'The Eternal Musical Genius of India',
    bgColor: '#701a75',
    topTracks: [
      { id: 'QKfGl39ZJWI', title: 'O Mere Dil Ke Chain', album: 'Mere Jeevan Saathi', duration: '4:35' },
      { id: '3Z_x7vBqr6E', title: 'Roop Tera Mastana', album: 'Aradhana', duration: '3:45' },
      { id: '7JnKVPtRqVE', title: 'Pal Pal Dil Ke Paas', album: 'Blackmail', duration: '5:28' },
    ],
  },
  {
    id: 'lata-mangeshkar',
    name: 'Lata Mangeshkar',
    wikiTitle: 'Lata Mangeshkar',
    tagline: 'The Nightingale of India & Cultural Treasure',
    bgColor: '#831843',
    topTracks: [
      { id: '7JnKVPtRqVE', title: 'Lag Ja Gale', album: 'Woh Kaun Thi?', duration: '4:15' },
      { id: 'QKfGl39ZJWI', title: 'Ajeeb Dastan Hai Yeh', album: 'Dil Apna Aur Preet Parai', duration: '5:15' },
      { id: 'bKZTnnFU9HA', title: 'Tere Liye', album: 'Veer-Zaara', duration: '5:34' },
    ],
  },
  {
    id: 'mohammed-rafi',
    name: 'Mohammed Rafi',
    wikiTitle: 'Mohammed Rafi',
    tagline: 'The Golden Soulful Voice of Indian Cinema',
    bgColor: '#14532d',
    topTracks: [
      { id: 'QKfGl39ZJWI', title: 'Likhe Jo Khat Tujhe', album: 'Kanyadaan', duration: '4:33' },
      { id: '3Z_x7vBqr6E', title: 'Chura Liya Hai Tumne', album: 'Yaadon Ki Baaraat', duration: '4:48' },
      { id: '7JnKVPtRqVE', title: 'Yeh Reshmi Zulfen', album: 'Do Raaste', duration: '4:20' },
    ],
  },
  {
    id: 'sunidhi-chauhan',
    name: 'Sunidhi Chauhan',
    wikiTitle: 'Sunidhi Chauhan',
    tagline: 'High-Energy Powerhouse & Vocal Dynamo',
    bgColor: '#be123c',
    topTracks: [
      { id: 'P1fIdFRnfqw', title: 'Kamli', album: 'Dhoom 3', duration: '3:55' },
      { id: '9EodaUmLhAI', title: 'Sheila Ki Jawani', album: 'Tees Maar Khan', duration: '4:43' },
      { id: '284Ov7ysmfA', title: 'Beedi', album: 'Omkara', duration: '5:05' },
    ],
  },
  {
    id: 'mohit-chauhan',
    name: 'Mohit Chauhan',
    wikiTitle: 'Mohit Chauhan',
    tagline: 'Rustic, Earthy & Soul-Stirring Voice',
    bgColor: '#166534',
    topTracks: [
      { id: 'T94PHkuydcw', title: 'Kun Faya Kun', album: 'Rockstar', duration: '7:53' },
      { id: '284Ov7ysmfA', title: 'Tum Se Hi', album: 'Jab We Met', duration: '5:23' },
      { id: '9YhzTM-KHkM', title: 'Pee Loon', album: 'Once Upon A Time In Mumbaai', duration: '4:48' },
    ],
  },
  {
    id: 'neha-kakkar',
    name: 'Neha Kakkar',
    wikiTitle: 'Neha Kakkar',
    tagline: 'Party Anthem Queen & Social Media Sensation',
    bgColor: '#9d174d',
    topTracks: [
      { id: 'P1fIdFRnfqw', title: 'Aankh Marey', album: 'Simmba', duration: '3:32' },
      { id: '9EodaUmLhAI', title: 'Garmi', album: 'Street Dancer 3D', duration: '3:04' },
      { id: '284Ov7ysmfA', title: 'Dilbar', album: 'Satyameva Jayate', duration: '3:04' },
    ],
  },
  {
    id: 'jubin-nautiyal',
    name: 'Jubin Nautiyal',
    wikiTitle: 'Jubin Nautiyal',
    tagline: 'Melodious Ballads & Romantic Chart-Toppers',
    bgColor: '#1e40af',
    topTracks: [
      { id: 'R0KlDFAFl0c', title: 'Raataan Lambiyan', album: 'Shershaah', duration: '3:50' },
      { id: 'BddP6PYo2gs', title: 'Lut Gaye', album: 'Single', duration: '3:48' },
      { id: '284Ov7ysmfA', title: 'Tum Hi Aana', album: 'Marjaavaan', duration: '4:09' },
    ],
  },
  {
    id: 'armaan-malik',
    name: 'Armaan Malik',
    wikiTitle: 'Armaan Malik',
    tagline: 'Global Pop Prince & Smooth Romantic Crooner',
    bgColor: '#0284c7',
    topTracks: [
      { id: 'BddP6PYo2gs', title: 'Bol Do Na Zara', album: 'Azhar', duration: '4:53' },
      { id: 'P1fIdFRnfqw', title: 'Main Hoon Hero Tera', album: 'Hero', duration: '4:45' },
      { id: '284Ov7ysmfA', title: 'Pehla Pyaar', album: 'Kabir Singh', duration: '4:32' },
    ],
  },
  {
    id: 'diljit-dosanjh',
    name: 'Diljit Dosanjh',
    wikiTitle: 'Diljit Dosanjh',
    tagline: 'Global Punjabi Icon & Coachella Trailblazer',
    bgColor: '#b45309',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'Lover', album: 'MoonChild Era', duration: '3:10' },
      { id: 'P1fIdFRnfqw', title: 'Born to Shine', album: 'G.O.A.T.', duration: '3:33' },
      { id: '284Ov7ysmfA', title: 'Naina', album: 'Crew', duration: '3:00' },
    ],
  },
  {
    id: 'sidhu-moose-wala',
    name: 'Sidhu Moose Wala',
    wikiTitle: 'Sidhu Moose Wala',
    tagline: 'The Legendary Voice of Raw Punjabi Culture',
    bgColor: '#292524',
    topTracks: [
      { id: '9EodaUmLhAI', title: '295', album: 'Moosetape', duration: '4:30' },
      { id: 'P1fIdFRnfqw', title: 'So High', album: 'PBX 1', duration: '3:55' },
      { id: '284Ov7ysmfA', title: 'The Last Ride', album: 'Single', duration: '4:20' },
    ],
  },
  {
    id: 'ap-dhillon',
    name: 'AP Dhillon',
    wikiTitle: 'AP Dhillon',
    tagline: 'Modern Brown Pop & Global Wavemaker',
    bgColor: '#431407',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'Brown Munde', album: 'Single', duration: '4:28' },
      { id: 'P1fIdFRnfqw', title: 'Excuses', album: 'Single', duration: '3:00' },
      { id: '284Ov7ysmfA', title: 'With You', album: 'Single', duration: '2:34' },
    ],
  },
  {
    id: 'karan-aujla',
    name: 'Karan Aujla',
    wikiTitle: 'Karan Aujla',
    tagline: 'Geetan Di Machine & Chartbuster Lyricist',
    bgColor: '#064e3b',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'Tauba Tauba', album: 'Bad Newz', duration: '3:27' },
      { id: 'P1fIdFRnfqw', title: 'Softly', album: 'Making Memories', duration: '2:35' },
      { id: '284Ov7ysmfA', title: 'Winning Speech', album: 'Street Dreams', duration: '3:15' },
    ],
  },
  {
    id: 'king',
    name: 'King',
    wikiTitle: 'King (Indian singer)',
    tagline: 'The New-Age Romantic Rap Sensation',
    bgColor: '#881337',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'Maan Meri Jaan', album: 'Champagne Talk', duration: '3:14' },
      { id: 'P1fIdFRnfqw', title: 'Tu Aake Dekhle', album: 'The Carnival', duration: '4:45' },
      { id: '284Ov7ysmfA', title: 'Oops', album: 'Champagne Talk', duration: '2:50' },
    ],
  },
  {
    id: 'mithoon',
    name: 'Mithoon',
    wikiTitle: 'Mithoon',
    tagline: 'Architect of Heart-Wrenching Romantic Melodies',
    bgColor: '#312e81',
    topTracks: [
      { id: 'Umqb9KENgmk', title: 'Tum Hi Ho', album: 'Aashiqui 2', duration: '4:22' },
      { id: '284Ov7ysmfA', title: 'Sanam Re', album: 'Title Track', duration: '5:08' },
      { id: 'BddP6PYo2gs', title: 'Dil Sambhal Ja Zara', album: 'Murder 2', duration: '4:45' },
    ],
  },
  {
    id: 'ajay-atul',
    name: 'Ajay-Atul',
    wikiTitle: 'Ajay–Atul',
    tagline: 'Grand Symphonic Indian Music Visionaries',
    bgColor: '#7f1d1d',
    topTracks: [
      { id: 'P1fIdFRnfqw', title: 'Zingaat', album: 'Sairat', duration: '3:46' },
      { id: 'bKZTnnFU9HA', title: 'Abhi Mujh Mein Kahin', album: 'Agneepath', duration: '6:04' },
      { id: '284Ov7ysmfA', title: 'Deva Shree Ganesha', album: 'Agneepath', duration: '5:56' },
    ],
  },
  {
    id: 'kumar-sanu',
    name: 'Kumar Sanu',
    wikiTitle: 'Kumar Sanu',
    tagline: 'King of 90s Romance & Guinness World Record Holder',
    bgColor: '#581c87',
    topTracks: [
      { id: '7JnKVPtRqVE', title: 'Tujhe Dekha Toh', album: 'DDLJ', duration: '5:02' },
      { id: 'QKfGl39ZJWI', title: 'Dheere Dheere Se', album: 'Aashiqui', duration: '5:32' },
      { id: '3Z_x7vBqr6E', title: 'Yeh Kaali Kaali Aankhen', album: 'Baazigar', duration: '7:50' },
    ],
  },
  {
    id: 'jagjit-singh',
    name: 'Jagjit Singh',
    wikiTitle: 'Jagjit Singh',
    tagline: 'The Undisputed Ghazal King of India',
    bgColor: '#451a03',
    topTracks: [
      { id: 'QKfGl39ZJWI', title: 'Hothon Se Chhoo Lo Tum', album: 'Prem Geet', duration: '5:00' },
      { id: '3Z_x7vBqr6E', title: 'Tum Itna Jo Muskura Rahe Ho', album: 'Arth', duration: '5:18' },
      { id: '7JnKVPtRqVE', title: 'Woh Kagaz Ki Kashti', album: 'The Unforgettables', duration: '4:52' },
    ],
  },
  {
    id: 'nusrat-fateh-ali-khan',
    name: 'Nusrat Fateh Ali Khan',
    wikiTitle: 'Nusrat Fateh Ali Khan',
    tagline: 'Shahenshah-e-Qawwali & Spiritual Music Titan',
    bgColor: '#3f3f46',
    topTracks: [
      { id: 'T94PHkuydcw', title: 'Afreen Afreen', album: 'Sangam', duration: '10:00' },
      { id: 'QKfGl39ZJWI', title: 'Yeh Jo Halka Halka Suroor Hai', album: 'Qawwali', duration: '9:30' },
      { id: '3Z_x7vBqr6E', title: 'Mere Rashke Qamar', album: 'Classic', duration: '7:20' },
    ],
  },
  {
    id: 'rahat-fateh-ali-khan',
    name: 'Rahat Fateh Ali Khan',
    wikiTitle: 'Rahat Fateh Ali Khan',
    tagline: 'High-Pitch Sufi & Bollywood Romance Maestro',
    bgColor: '#78350f',
    topTracks: [
      { id: 'T94PHkuydcw', title: 'O Re Piya', album: 'Aaja Nachle', duration: '6:19' },
      { id: 'BddP6PYo2gs', title: 'Tere Mast Mast Do Nain', album: 'Dabangg', duration: '5:59' },
      { id: '284Ov7ysmfA', title: 'Jiya Dhadak Dhadak Jaye', album: 'Kalyug', duration: '5:24' },
    ],
  },
  {
    id: 'lucky-ali',
    name: 'Lucky Ali',
    wikiTitle: 'Lucky Ali',
    tagline: 'The Soulful Nomad of Indian Pop',
    bgColor: '#065f46',
    topTracks: [
      { id: 'T94PHkuydcw', title: 'O Sanam', album: 'Sunoh', duration: '4:40' },
      { id: '284Ov7ysmfA', title: 'Safarnama', album: 'Tamasha', duration: '4:11' },
      { id: '9YhzTM-KHkM', title: 'Hairat', album: 'Anjaana Anjaani', duration: '4:06' },
    ],
  },
  {
    id: 'prateek-kuhad',
    name: 'Prateek Kuhad',
    wikiTitle: 'Prateek Kuhad',
    tagline: 'Global Indie-Acoustic Heartthrob',
    bgColor: '#27272a',
    topTracks: [
      { id: 'BmUe3-sfr7E', title: 'Cold/mess', album: 'Cold/mess EP', duration: '4:24' },
      { id: 'R0KlDFAFl0c', title: 'Kasoor', album: 'Single', duration: '3:17' },
      { id: '9YhzTM-KHkM', title: 'Kho Gaye Hum Kahan', album: 'Baar Baar Dekho', duration: '3:33' },
    ],
  },
  {
    id: 'b-praak',
    name: 'B Praak',
    wikiTitle: 'B Praak',
    tagline: 'Intense Emotional Vocals & Punjabi Anthems',
    bgColor: '#991b1b',
    topTracks: [
      { id: '284Ov7ysmfA', title: 'Teri Mitti', album: 'Kesari', duration: '5:14' },
      { id: 'R0KlDFAFl0c', title: 'Filhall', album: 'Single', duration: '4:15' },
      { id: 'BddP6PYo2gs', title: 'Mann Bharryaa', album: 'Shershaah', duration: '4:50' },
    ],
  },
  {
    id: 'guru-randhawa',
    name: 'Guru Randhawa',
    wikiTitle: 'Guru Randhawa',
    tagline: 'High Rated Pop & International Collaborator',
    bgColor: '#0f766e',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'High Rated Gabru', album: 'Single', duration: '3:35' },
      { id: 'P1fIdFRnfqw', title: 'Lahore', album: 'Single', duration: '3:17' },
      { id: '284Ov7ysmfA', title: 'Suit Suit', album: 'Hindi Medium', duration: '3:10' },
    ],
  },
  {
    id: 'darshan-raval',
    name: 'Darshan Raval',
    wikiTitle: 'Darshan Raval',
    tagline: 'The Monsoon Romance & Melodic Pop Star',
    bgColor: '#1d4ed8',
    topTracks: [
      { id: 'BddP6PYo2gs', title: 'Chogada', album: 'Loveyatri', duration: '4:09' },
      { id: 'P1fIdFRnfqw', title: 'Kamariya', album: 'Mitron', duration: '3:10' },
      { id: '284Ov7ysmfA', title: 'Tera Zikr', album: 'Single', duration: '3:38' },
    ],
  },
  {
    id: 'mika-singh',
    name: 'Mika Singh',
    wikiTitle: 'Mika Singh',
    tagline: 'The Unstoppable Bollywood Party King',
    bgColor: '#854d0e',
    topTracks: [
      { id: '9EodaUmLhAI', title: 'Subha Hone Na De', album: 'Desi Boyz', duration: '4:48' },
      { id: 'P1fIdFRnfqw', title: 'Mauja Hi Mauja', album: 'Jab We Met', duration: '4:05' },
      { id: '284Ov7ysmfA', title: 'Aankh Marey', album: 'Simmba', duration: '3:32' },
    ],
  },
  {
    id: 'salim-sulaiman',
    name: 'Salim-Sulaiman',
    wikiTitle: 'Salim–Sulaiman',
    tagline: 'Sufi-Infused Bollywood Master Composers',
    bgColor: '#164e63',
    topTracks: [
      { id: 'T94PHkuydcw', title: 'Chak De! India', album: 'Title Track', duration: '4:43' },
      { id: 'QKfGl39ZJWI', title: 'Kurbaan Hua', album: 'Kurbaan', duration: '4:20' },
      { id: '284Ov7ysmfA', title: 'Ainvayi Ainvayi', album: 'Band Baaja Baaraat', duration: '4:25' },
    ],
  },
  {
    id: 'javed-ali',
    name: 'Javed Ali',
    wikiTitle: 'Javed Ali',
    tagline: 'Soulful Sufi Crooner with Silky Pitch',
    bgColor: '#4a044e',
    topTracks: [
      { id: 'T94PHkuydcw', title: 'Kun Faya Kun', album: 'Rockstar', duration: '7:53' },
      { id: 'BddP6PYo2gs', title: 'Srivalli', album: 'Pushpa', duration: '3:44' },
      { id: '284Ov7ysmfA', title: 'Jashn-E-Bahaara', album: 'Jodhaa Akbar', duration: '5:15' },
    ],
  },
  {
    id: 'sanam',
    name: 'Sanam',
    wikiTitle: 'Sanam (band)',
    tagline: 'India’s Favorite Pop-Rock Revival Band',
    bgColor: '#0c4a6e',
    topTracks: [
      { id: 'QKfGl39ZJWI', title: 'Gulabi Aankhen', album: 'Single', duration: '3:50' },
      { id: '3Z_x7vBqr6E', title: 'Mere Mehboob Qayamat Hogi', album: 'Single', duration: '4:10' },
      { id: '7JnKVPtRqVE', title: 'Yeh Raaten Yeh Mausam', album: 'Single', duration: '3:45' },
    ],
  },
];

async function fetchWikiImage(wikiTitle) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'VybzMusicApp/1.0 (https://vybz.in; contact@vybz.in) Mozilla/5.0',
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.thumbnail?.source || json.originalimage?.source || null;
  } catch {
    return null;
  }
}

async function downloadFile(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'VybzMusicApp/1.0 (https://vybz.in; contact@vybz.in) Mozilla/5.0',
    },
  });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return true;
}

async function main() {
  const dir = path.resolve('public', 'artists');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log(`Starting processing for ${ARTISTS_CONFIG.length} artists...`);

  const processedArtists = [];

  for (let i = 0; i < ARTISTS_CONFIG.length; i++) {
    const a = ARTISTS_CONFIG[i];
    const targetFile = path.join(dir, `${a.id}.jpg`);
    const publicPath = `/artists/${a.id}.jpg`;

    let hasImage = fs.existsSync(targetFile) && fs.statSync(targetFile).size > 1000;

    if (!hasImage) {
      console.log(`[${i + 1}/${ARTISTS_CONFIG.length}] Fetching ${a.name} (${a.wikiTitle})...`);
      let imgUrl = await fetchWikiImage(a.wikiTitle);
      if (!imgUrl && a.name !== a.wikiTitle) {
        imgUrl = await fetchWikiImage(a.name);
      }

      if (imgUrl) {
        const ok = await downloadFile(imgUrl, targetFile);
        if (ok) {
          console.log(`  ✓ Saved ${a.id}.jpg (${fs.statSync(targetFile).size} bytes)`);
          hasImage = true;
        } else {
          console.log(`  ✗ Download failed for ${a.id} from ${imgUrl}`);
        }
      } else {
        console.log(`  ⚠ No wiki image found for ${a.name}`);
      }
    } else {
      console.log(`[${i + 1}/${ARTISTS_CONFIG.length}] Already cached: ${a.id}.jpg`);
    }

    processedArtists.push({
      id: a.id,
      name: a.name,
      tagline: a.tagline,
      avatar: publicPath,
      bgColor: a.bgColor,
      topTracks: a.topTracks,
    });
  }

  // Generate src/data/artistsData.ts
  const tsContent = `export interface ArtistSong {
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

export const ARTISTS_CATALOG: Artist[] = ${JSON.stringify(processedArtists, null, 2)};
`;

  fs.writeFileSync('src/data/artistsData.ts', tsContent, 'utf-8');
  console.log('\nSuccessfully generated src/data/artistsData.ts with 50 artists!');
}

main().catch(console.error);
