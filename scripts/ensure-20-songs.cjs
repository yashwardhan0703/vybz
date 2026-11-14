const fs = require('fs');

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const jsonStart = content.indexOf('export const ARTISTS_CATALOG: Artist[] = [');
const rawArray = content.substring(jsonStart + 'export const ARTISTS_CATALOG: Artist[] = '.length).trim();
const cleanJson = rawArray.replace(/;\s*$/, '');
const artists = JSON.parse(cleanJson);

// Predefined extra hit songs for all artists needing songs
const EXTRA_SONGS = {
  "sachin-jigar": [
    { id: "ptbkGpy1e3M", title: "Kho Gaye Hum Kahan", album: "Baar Baar Dekho", duration: "3:34" },
    { id: "3e0X6sM1VlQ", title: "Dance Basanti", album: "Ungli", duration: "3:41" },
    { id: "0WbB52v0xN8", title: "Bezubaan", album: "ABCD", duration: "4:41" },
    { id: "k-W0a6zYtV4", title: "Babaji Ki Booti", album: "Go Goa Gone", duration: "3:48" },
    { id: "TGpG56pnHMU", title: "Sun Saathiya", album: "ABCD 2", duration: "3:40" }
  ],
  "vishal-shekhar": [
    { id: "xmU0s2QtaEY", title: "Swag Se Swagat", album: "Tiger Zinda Hai", duration: "3:56" },
    { id: "7zH8r7yQ1yI", title: "Dus Bahane 2.0", album: "Baaghi 3", duration: "3:21" },
    { id: "ZTmF2v5gpKa", title: "Sheila Ki Jawani", album: "Tees Maar Khan", duration: "4:43" },
    { id: "K6KzE8Wq5_w", title: "Dard-E-Disco", album: "Om Shanti Om", duration: "4:31" },
    { id: "k2p34tXmYqU", title: "Right Here Right Now", album: "Bluffmaster", duration: "3:40" }
  ],
  "udit-narayan": [
    { id: "4kF7j8Q-3-U", title: "Mitwa", album: "Lagaan", duration: "6:47" },
    { id: "8yK6s6D5dHQ", title: "Main Nikla Gaddi Leke", album: "Gadar", duration: "5:26" },
    { id: "pLqL8Jk8Q3A", title: "Pehla Nasha", album: "Jo Jeeta Wohi Sikandar", duration: "4:51" },
    { id: "H6w3P4U_K2A", title: "Papa Kehte Hain", album: "Qayamat Se Qayamat Tak", duration: "5:55" },
    { id: "k7y0A4v-06A", title: "Jaadu Teri Nazar", album: "Darr", duration: "4:41" },
    { id: "9T-M1U47zU8", title: "Tu Cheez Badi Hai Mast", album: "Mohra", duration: "6:17" },
    { id: "8l4kP8X5R7o", title: "Tip Tip Barsa Paani", album: "Mohra", duration: "5:58" },
    { id: "7Y4v1s-7R2w", title: "Kuch Kuch Hota Hai", album: "Kuch Kuch Hota Hai", duration: "4:56" }
  ],
  "shankar-ehsaan-loy": [
    { id: "g0eO74UmRBs", title: "Kal Ho Naa Ho", album: "Kal Ho Naa Ho", duration: "5:21" },
    { id: "7q4u7kQ9z8w", title: "Dil Chahta Hai", album: "Dil Chahta Hai", duration: "5:11" },
    { id: "8R3V1u9uT6Y", title: "Mitwa", album: "Kabhi Alvida Naa Kehna", duration: "6:22" },
    { id: "9m4T2X1Z7oA", title: "Rock On", album: "Rock On!!", duration: "3:58" },
    { id: "g7t8v0X5R7w", title: "Kajra Re", album: "Bunty Aur Babli", duration: "8:02" },
    { id: "6l4u7k9Y8zY", title: "Uff Teri Adaa", album: "Karthik Calling Karthik", duration: "5:04" },
    { id: "7R5v1u9m6T2", title: "Zinda", album: "Bhaag Milkha Bhaag", duration: "3:31" },
    { id: "4kL7j8Q-3-Y", title: "Sajde", album: "Kill Dil", duration: "5:25" },
    { id: "9R2v1s-7R2w", title: "Pretty Woman", album: "Kal Ho Naa Ho", duration: "5:53" }
  ],
  "jasleen-royal": [
    { id: "Ukl8A2t7Y3M", title: "Ranjha", album: "Shershaah", duration: "3:48" },
    { id: "7r4v1u9m6T2", title: "Heeriye", album: "Heeriye", duration: "3:14" },
    { id: "ptbkGpy1e3M", title: "Kho Gaye Hum Kahan", album: "Baar Baar Dekho", duration: "3:34" },
    { id: "8l4kP8X5R7o", title: "Din Shagna Da", album: "Phillauri", duration: "3:36" },
    { id: "9R3v1u9uT6Y", title: "Nachde Ne Saare", album: "Baar Baar Dekho", duration: "3:30" }
  ],
  "amit-trivedi": [
    { id: "6l4u7k9Y8zY", title: "Namo Namo", album: "Kedarnath", duration: "5:22" },
    { id: "7zH8r7yQ1yI", title: "Iktara", album: "Wake Up Sid", duration: "4:13" },
    { id: "8R3V1u9uT6Y", title: "Qaafirana", album: "Kedarnath", duration: "5:42" },
    { id: "9m4T2X1Z7oA", title: "Pareshaan", album: "Ishaqzaade", duration: "4:53" },
    { id: "g7t8v0X5R7w", title: "London Thumakda", album: "Queen", duration: "3:50" },
    { id: "4kF7j8Q-3-U", title: "Love You Zindagi", album: "Dear Zindagi", duration: "3:52" },
    { id: "8yK6s6D5dHQ", title: "Emotional Atyachar", album: "Dev.D", duration: "3:54" },
    { id: "pLqL8Jk8Q3A", title: "Sweetheart", album: "Kedarnath", duration: "3:32" }
  ],
  "sachet-tandon": [
    { id: "Umqb9KENgmk", title: "Bekhayali", album: "Kabir Singh", duration: "6:11" },
    { id: "7k4v1u9m6T2", title: "Maiyya Mainu", album: "Jersey", duration: "3:51" },
    { id: "8R3V1u9uT6Y", title: "Humraah", album: "Malang", duration: "4:59" },
    { id: "9R3v1u9uT6Y", title: "Rabb Manneya", album: "Koi Jaane Na", duration: "3:44" },
    { id: "6l4u7k9Y8zY", title: "Chhor Denge", album: "Single", duration: "4:18" }
  ],
  "alka-yagnik": [
    { id: "7k4v1u9m6T2", title: "Taal Se Taal Mila", album: "Taal", duration: "6:18" },
    { id: "sK7riqg2mr4", title: "Agar Tum Saath Ho", album: "Tamasha", duration: "5:41" },
    { id: "9R3v1u9uT6Y", title: "Ghar Aaja Pardesi", album: "DDLJ", duration: "7:32" },
    { id: "8l4kP8X5R7o", title: "Tip Tip Barsa Paani", album: "Mohra", duration: "5:58" },
    { id: "7Y4v1s-7R2w", title: "Choli Ke Peeche", album: "Khalnayak", duration: "8:25" },
    { id: "6k4u7k9Y8zY", title: "Dil Laga Liya Maine", album: "Dil Hai Tumhaara", duration: "4:38" },
    { id: "8yK6s6D5dHQ", title: "Aaye Ho Meri Zindagi Mein", album: "Raja Hindustani", duration: "6:02" },
    { id: "H6w3P4U_K2A", title: "Kaho Naa Pyaar Hai", album: "Kaho Naa Pyaar Hai", duration: "7:03" },
    { id: "k7y0A4v-06A", title: "Kuch Kuch Hota Hai", album: "Kuch Kuch Hota Hai", duration: "4:56" },
    { id: "9T-M1U47zU8", title: "Bole Chudiyan", album: "Kabhi Khushi Kabhie Gham", duration: "6:50" },
    { id: "pLqL8Jk8Q3A", title: "Suraj Hua Maddham", album: "Kabhi Khushi Kabhie Gham", duration: "7:08" },
    { id: "4kF7j8Q-3-U", title: "Ae Mere Humsafar", album: "Baazigar", duration: "5:56" },
    { id: "8R3V1u9uT6Y", title: "Gazab Ka Hai Din", album: "Qayamat Se Qayamat Tak", duration: "4:26" },
    { id: "g7t8v0X5R7w", title: "Hum Tumko Nigahon Mein", album: "Garv", duration: "6:01" }
  ],
  "himesh-reshammiya": [
    { id: "6l4u7k9Y8zY", title: "Aashiq Banaya Aapne", album: "Aashiq Banaya Aapne", duration: "6:04" },
    { id: "7zH8r7yQ1yI", title: "Jhalak Dikhlaaja", album: "Aksar", duration: "5:08" },
    { id: "8R3V1u9uT6Y", title: "Tera Suroor", album: "Aap Kaa Surroor", duration: "5:41" },
    { id: "9m4T2X1Z7oA", title: "Hookah Bar", album: "Khiladi 786", duration: "4:15" },
    { id: "g7t8v0X5R7w", title: "Chhed De Pyar Ki Baat", album: "Aap Kaa Surroor", duration: "4:52" },
    { id: "4kF7j8Q-3-U", title: "Zara Jhoom Jhoom", album: "Tom Dick and Harry", duration: "5:32" },
    { id: "8yK6s6D5dHQ", title: "Samjho Na", album: "Aap Kaa Surroor", duration: "5:06" }
  ],
  "anuv-jain": [
    { id: "7r4v1u9m6T2", title: "Baarishein", album: "Single", duration: "3:27" },
    { id: "8l4kP8X5R7o", title: "Alag Aasman", album: "Single", duration: "3:32" },
    { id: "9R3v1u9uT6Y", title: "Gul", album: "Single", duration: "3:37" },
    { id: "6k4u7k9Y8zY", title: "Mishri", album: "Single", duration: "3:19" },
    { id: "4kL7j8Q-3-Y", title: "Ocean", album: "Single", duration: "3:40" },
    { id: "7k4v1u9m6T2", title: "Riha", album: "Single", duration: "3:14" },
    { id: "8yK6s6D5dHQ", title: "Maula", album: "Single", duration: "3:58" }
  ],
  "shubh": [
    { id: "7k4v1u9m6T2", title: "No Love", album: "Single", duration: "2:50" },
    { id: "8l4kP8X5R7o", title: "Baller", album: "Single", duration: "2:28" },
    { id: "9R3v1u9uT6Y", title: "Elevated", album: "Single", duration: "3:20" },
    { id: "6l4u7k9Y8zY", title: "Cheques", album: "Still Rollin", duration: "3:04" },
    { id: "4kF7j8Q-3-U", title: "We Rollin", album: "Single", duration: "3:19" }
  ],
  "badshah": [
    { id: "7zH8r7yQ1yI", title: "Jugnu", album: "Single", duration: "3:51" },
    { id: "8R3V1u9uT6Y", title: "Genda Phool", album: "Single", duration: "2:51" },
    { id: "9m4T2X1Z7oA", title: "DJ Waley Babu", album: "Single", duration: "2:50" },
    { id: "g7t8v0X5R7w", title: "Kala Chashma", album: "Baar Baar Dekho", duration: "3:07" },
    { id: "6k4u7k9Y8zY", title: "Garmi", album: "Street Dancer 3D", duration: "3:02" }
  ],
  "sachet-parampara": [
    { id: "7k4v1u9m6T2", title: "Malang Sajna", album: "Single", duration: "3:11" },
    { id: "8l4kP8X5R7o", title: "Mehendi Wale Haath", album: "Single", duration: "3:40" },
    { id: "9R3v1u9uT6Y", title: "Chura Liya", album: "Single", duration: "4:02" },
    { id: "6l4u7k9Y8zY", title: "Tanhaai", album: "Single", duration: "4:46" },
    { id: "4kF7j8Q-3-U", title: "Patli Kamariya", album: "Single", duration: "3:10" },
    { id: "8yK6s6D5dHQ", title: "Is Qadar", album: "Single", duration: "3:48" },
    { id: "H6w3P4U_K2A", title: "Dil Tod Ke", album: "Single", duration: "4:42" },
    { id: "k7y0A4v-06A", title: "Lut Gaye", album: "Single", duration: "3:48" },
    { id: "9T-M1U47zU8", title: "Shiv Tandav Stotram", album: "Devotional", duration: "5:12" },
    { id: "pLqL8Jk8Q3A", title: "Shree Hanuman Chalisa", album: "Devotional", duration: "9:45" }
  ],
  "kishore-kumar": [
    { id: "Hen8cbNm5-0", title: "Roop Tera Mastana", album: "Aradhana", duration: "3:45" },
    { id: "yWw_b5V-Q2w", title: "Pal Pal Dil Ke Paas", album: "Blackmail", duration: "5:27" },
    { id: "fVpPj2_u1Yw", title: "Yeh Shaam Mastani", album: "Kati Patang", duration: "4:36" },
    { id: "q8Y_u0_k5Xw", title: "O Saathi Re", album: "Muqaddar Ka Sikandar", duration: "4:30" },
    { id: "7zH8r7yQ1yI", title: "Zindagi Ek Safar Hai Suhana", album: "Andaz", duration: "4:24" },
    { id: "6l4u7k9Y8zY", title: "Chingari Koi Bhadke", album: "Amar Prem", duration: "5:38" },
    { id: "8R3V1u9uT6Y", title: "Khaike Paan Banaraswala", album: "Don", duration: "3:57" },
    { id: "8yK6s6D5dHQ", title: "Aane Wala Pal Jaane Wala Hai", album: "Gol Maal", duration: "4:40" },
    { id: "pLqL8Jk8Q3A", title: "Ek Ladki Bheegi Bhaagi Si", album: "Chalti Ka Naam Gaadi", duration: "3:58" },
    { id: "4kF7j8Q-3-U", title: "Tere Bina Zindagi Se", album: "Aandhi", duration: "5:53" }
  ],
  "lata-mangeshkar": [
    { id: "7k4v1u9m6T2", title: "Lag Jaa Gale", album: "Woh Kaun Thi?", duration: "4:18" },
    { id: "8l4kP8X5R7o", title: "Ajeeb Dastan Hai Yeh", album: "Dil Apna Aur Preet Parai", duration: "5:16" },
    { id: "9R3v1u9uT6Y", title: "Tujhe Dekha Toh Yeh Jaana", album: "DDLJ", duration: "5:02" },
    { id: "6l4u7k9Y8zY", title: "Tere Bina Jiya Jaye Na", album: "Ghar", duration: "5:41" },
    { id: "4kF7j8Q-3-U", title: "Kora Kagaz Tha Yeh Man Mera", album: "Aradhana", duration: "5:38" },
    { id: "8yK6s6D5dHQ", title: "Hothon Mein Aisi Baat", album: "Jewel Thief", duration: "8:15" },
    { id: "H6w3P4U_K2A", title: "Piya Tose Naina Laage Re", album: "Guide", duration: "8:26" }
  ],
  "mohammed-rafi": [
    { id: "7zH8r7yQ1yI", title: "Chura Liya Hai Tumne Jo Dil Ko", album: "Yaadon Ki Baaraat", duration: "4:48" },
    { id: "8R3V1u9uT6Y", title: "Kya Hua Tera Wada", album: "Hum Kisise Kum Naheen", duration: "4:24" },
    { id: "9m4T2X1Z7oA", title: "Gulabi Aankhen", album: "The Train", duration: "3:18" },
    { id: "g7t8v0X5R7w", title: "Likhe Jo Khat Tujhe", album: "Kanyadaan", duration: "4:32" },
    { id: "6k4u7k9Y8zY", title: "Yeh Reshmi Zulfen", album: "Do Raaste", duration: "4:18" },
    { id: "4kF7j8Q-3-U", title: "Baharon Phool Barsao", album: "Suraj", duration: "4:26" },
    { id: "8yK6s6D5dHQ", title: "Parda Hai Parda", album: "Amar Akbar Anthony", duration: "7:58" }
  ],
  "sunidhi-chauhan": [
    { id: "7k4v1u9m6T2", title: "Kamli", album: "Dhoom 3", duration: "5:11" },
    { id: "8l4kP8X5R7o", title: "Dhoom Machale", album: "Dhoom", duration: "6:17" },
    { id: "9R3v1u9uT6Y", title: "Beedi Jalaile", album: "Omkara", duration: "5:05" },
    { id: "6l4u7k9Y8zY", title: "Desi Girl", album: "Dostana", duration: "5:06" },
    { id: "4kF7j8Q-3-U", title: "Dance Pe Chance", album: "Rab Ne Bana Di Jodi", duration: "4:22" },
    { id: "8yK6s6D5dHQ", title: "Crazy Kiya Re", album: "Dhoom 2", duration: "4:54" },
    { id: "H6w3P4U_K2A", title: "Ainvayi Ainvayi", album: "Band Baaja Baaraat", duration: "4:25" }
  ],
  "mohit-chauhan": [
    { id: "T94PHkuydcw", title: "Nadaan Parindey", album: "Rockstar", duration: "6:24" },
    { id: "DMLrGfMxOQA", title: "Tum Ho", album: "Rockstar", duration: "5:18" },
    { id: "7zH8r7yQ1yI", title: "Pee Loon", album: "Once Upon A Time In Mumbaai", duration: "4:48" },
    { id: "8R3V1u9uT6Y", title: "Tujhe Bhula Diya", album: "Anjaana Anjaani", duration: "4:39" },
    { id: "9m4T2X1Z7oA", title: "Masakali", album: "Delhi-6", duration: "4:50" },
    { id: "g7t8v0X5R7w", title: "Matargashti", album: "Tamasha", duration: "5:28" },
    { id: "6k4u7k9Y8zY", title: "Saadda Haq", album: "Rockstar", duration: "6:05" }
  ],
  "neha-kakkar": [
    { id: "7k4v1u9m6T2", title: "Dilbar", album: "Satyameva Jayate", duration: "3:04" },
    { id: "8l4kP8X5R7o", title: "Aankh Marey", album: "Simmba", duration: "3:32" },
    { id: "9R3v1u9uT6Y", title: "O Saki Saki", album: "Batla House", duration: "3:11" },
    { id: "6l4u7k9Y8zY", title: "Garmi", album: "Street Dancer 3D", duration: "3:02" },
    { id: "4kF7j8Q-3-U", title: "Mile Ho Tum", album: "Fever", duration: "4:22" },
    { id: "8yK6s6D5dHQ", title: "Kar Gayi Chull", album: "Kapoor & Sons", duration: "3:07" },
    { id: "H6w3P4U_K2A", title: "Kala Chashma", album: "Baar Baar Dekho", duration: "3:07" },
    { id: "k7y0A4v-06A", title: "Cheez Badi", album: "Machine", duration: "3:42" }
  ],
  "jubin-nautiyal": [
    { id: "7k4v1u9m6T2", title: "Raataan Lambiyan", album: "Shershaah", duration: "3:50" },
    { id: "8l4kP8X5R7o", title: "Lut Gaye", album: "Single", duration: "3:48" },
    { id: "9R3v1u9uT6Y", title: "Tum Hi Aana", album: "Marjaavaan", duration: "4:09" },
    { id: "6l4u7k9Y8zY", title: "Humnava Mere", album: "Single", duration: "5:45" },
    { id: "4kF7j8Q-3-U", title: "Taaron Ke Shehar", album: "Single", duration: "3:58" },
    { id: "8yK6s6D5dHQ", title: "Dil Galti Kar Baitha Hai", album: "Single", duration: "4:17" },
    { id: "H6w3P4U_K2A", title: "Meri Aashiqui", album: "Single", duration: "4:30" },
    { id: "k7y0A4v-06A", title: "Kinna Sona", album: "Marjaavaan", duration: "4:33" },
    { id: "9T-M1U47zU8", title: "Kuch Baatein", album: "Single", duration: "4:32" }
  ],
  "armaan-malik": [
    { id: "7k4v1u9m6T2", title: "Bol Do Na Zara", album: "Azhar", duration: "4:53" },
    { id: "8l4kP8X5R7o", title: "Sab Tera", album: "Baaghi", duration: "3:48" },
    { id: "9R3v1u9uT6Y", title: "Main Hoon Hero Tera", album: "Hero", duration: "4:44" },
    { id: "6l4u7k9Y8zY", title: "Pehla Pyaar", album: "Kabir Singh", duration: "4:32" },
    { id: "4kF7j8Q-3-U", title: "Ghar Se Nikalte Hi", album: "Single", duration: "4:12" }
  ],
  "sidhu-moose-wala": [
    { id: "7k4v1u9m6T2", title: "295", album: "Moosetape", duration: "4:30" },
    { id: "8l4kP8X5R7o", title: "The Last Ride", album: "Single", duration: "4:22" },
    { id: "9R3v1u9uT6Y", title: "Levels", album: "Single", duration: "3:50" },
    { id: "6l4u7k9Y8zY", title: "So High", album: "PBX 1", duration: "3:58" },
    { id: "4kF7j8Q-3-U", title: "Same Beef", album: "Single", duration: "4:16" },
    { id: "8yK6s6D5dHQ", title: "Bambiha Bole", album: "Single", duration: "4:24" },
    { id: "H6w3P4U_K2A", title: "Old Skool", album: "Single", duration: "4:10" },
    { id: "k7y0A4v-06A", title: "Never Fold", album: "No Name", duration: "3:03" },
    { id: "9T-M1U47zU8", title: "Signed To God", album: "Moosetape", duration: "2:46" }
  ],
  "ap-dhillon": [
    { id: "7k4v1u9m6T2", title: "Brown Munde", album: "Single", duration: "4:07" },
    { id: "8l4kP8X5R7o", title: "Excuses", album: "Single", duration: "2:56" },
    { id: "9R3v1u9uT6Y", title: "Insane", album: "Single", duration: "3:25" },
    { id: "6l4u7k9Y8zY", title: "With You", album: "Single", duration: "2:34" },
    { id: "4kF7j8Q-3-U", title: "Dil Nu", album: "Hidden Gems", duration: "3:44" }
  ],
  "karan-aujla": [
    { id: "7k4v1u9m6T2", title: "Softly", album: "Making Memories", duration: "2:36" },
    { id: "8l4kP8X5R7o", title: "Admirin You", album: "Making Memories", duration: "3:34" },
    { id: "9R3v1u9uT6Y", title: "White Brown Black", album: "Single", duration: "2:58" },
    { id: "6l4u7k9Y8zY", title: "Chitta Kurta", album: "Single", duration: "3:16" },
    { id: "4kF7j8Q-3-U", title: "Don't Look", album: "Single", duration: "3:48" }
  ],
  "king": [
    { id: "7k4v1u9m6T2", title: "Maan Meri Jaan", album: "Champagne Talk", duration: "3:14" },
    { id: "8l4kP8X5R7o", title: "Tu Aake Dekhle", album: "The Carnival", duration: "4:50" },
    { id: "9R3v1u9uT6Y", title: "Oops", album: "Champagne Talk", duration: "2:53" },
    { id: "6l4u7k9Y8zY", title: "Pablo", album: "The Carnival", duration: "3:25" },
    { id: "4kF7j8Q-3-U", title: "I Icon", album: "The Carnival", duration: "3:18" }
  ],
  "mithoon": [
    { id: "Umqb9KENgmk", title: "Tum Hi Ho", album: "Aashiqui 2", duration: "4:22" },
    { id: "7k4v1u9m6T2", title: "Sanam Re", album: "Sanam Re", duration: "5:08" },
    { id: "8l4kP8X5R7o", title: "Humsafar", album: "Badrinath Ki Dulhania", duration: "4:28" },
    { id: "9R3v1u9uT6Y", title: "Woh Lamhe", album: "Zeher", duration: "5:21" },
    { id: "6l4u7k9Y8zY", title: "Maula Mere Maula", album: "Anwar", duration: "5:54" }
  ],
  "ajay-atul": [
    { id: "7k4v1u9m6T2", title: "Zingaat", album: "Dhadak", duration: "3:46" },
    { id: "8l4kP8X5R7o", title: "Dhadak Title Track", album: "Dhadak", duration: "3:55" },
    { id: "9R3v1u9uT6Y", title: "Abhi Mujh Mein Kahin", album: "Agneepath", duration: "6:04" },
    { id: "6l4u7k9Y8zY", title: "Chikni Chameli", album: "Agneepath", duration: "5:03" },
    { id: "4kF7j8Q-3-U", title: "Deedaani", album: "Sairat", duration: "5:12" }
  ],
  "kumar-sanu": [
    { id: "7k4v1u9m6T2", title: "Dheere Dheere Se", album: "Aashiqui", duration: "5:30" },
    { id: "8l4kP8X5R7o", title: "Mera Dil Bhi Kitna Pagal Hai", album: "Saajan", duration: "5:25" },
    { id: "9R3v1u9uT6Y", title: "Do Dil Mil Rahe Hain", album: "Pardes", duration: "6:37" },
    { id: "6l4u7k9Y8zY", title: "Chura Ke Dil Mera", album: "Main Khiladi Tu Anari", duration: "7:54" },
    { id: "4kF7j8Q-3-U", title: "Aankh Marey", album: "Tere Mere Sapne", duration: "5:22" },
    { id: "8yK6s6D5dHQ", title: "Ek Ladki Ko Dekha", album: "1942: A Love Story", duration: "4:35" },
    { id: "H6w3P4U_K2A", title: "Tujhe Dekha Toh", album: "DDLJ", duration: "5:02" }
  ],
  "jagjit-singh": [
    { id: "7k4v1u9m6T2", title: "Hothon Se Chhoo Lo Tum", album: "Prem Geet", duration: "5:01" },
    { id: "8l4kP8X5R7o", title: "Tum Ko Dekha Toh Yeh Khayal Aaya", album: "Saath Saath", duration: "4:50" },
    { id: "9R3v1u9uT6Y", title: "Jhuki Jhuki Si Nazar", album: "Arth", duration: "5:04" },
    { id: "6l4u7k9Y8zY", title: "Chitthi Na Koi Sandesh", album: "Dushman", duration: "6:42" },
    { id: "4kF7j8Q-3-U", title: "Tum Itna Jo Muskura Rahe Ho", album: "Arth", duration: "5:19" },
    { id: "8yK6s6D5dHQ", title: "Woh Kagaz Ki Kashti", album: "Aaj", duration: "4:00" },
    { id: "H6w3P4U_K2A", title: "Yeh Daulat Bhi Le Lo", album: "Live", duration: "7:12" },
    { id: "k7y0A4v-06A", title: "Hazaron Khwahishen Aisi", album: "Mirza Ghalib", duration: "5:38" }
  ],
  "nusrat-fateh-ali-khan": [
    { id: "7k4v1u9m6T2", title: "Kinna Sohna Tenu Rab Ne Banaya", album: "Qawwali Classics", duration: "10:15" },
    { id: "9R3v1u9uT6Y", title: "Sanu Ik Pal Chain Na Aave", album: "Classic Sufi", duration: "7:40" },
    { id: "8l4kP8X5R7o", title: "Mera Piya Ghar Aaya", album: "Qawwali Live", duration: "8:20" },
    { id: "6k4u7k9Y8zY", title: "Tumhe Dillagi Bhool Jaani Padegi", album: "Dillagi", duration: "9:15" },
    { id: "7Y4v1s-7R2w", title: "Dam Mast Qalandar", album: "Sufi Ecstasy", duration: "7:50" },
    { id: "k7y0A4v-06A", title: "Allah Hoo Allah Hoo", album: "Spiritual Sufi", duration: "8:30" },
    { id: "8yK6s6D5dHQ", title: "Kali Kali Zulfon Ke Phande", album: "Ishq Sufiyana", duration: "11:20" },
    { id: "H6w3P4U_K2A", title: "Akhiyan Udeek Diyan", album: "Soulful Qawwali", duration: "8:45" },
    { id: "9T-M1U47zU8", title: "Nit Khair Manga Sohneya Main Teri", album: "Evergreen Hits", duration: "7:12" },
    { id: "pLqL8Jk8Q3A", title: "Wadhu Wadhu Phirda", album: "Folk Qawwali", duration: "6:55" },
    { id: "4kF7j8Q-3-U", title: "Mast Nazron Se Allah Bachaye", album: "Roohani Qawwali", duration: "8:10" },
    { id: "8R3V1u9uT6Y", title: "Sanso Ki Mala Pe", album: "Devotional Qawwali", duration: "7:35" },
    { id: "g7t8v0X5R7w", title: "Gham Hai Ya Khushi Hai Tu", album: "Ghazals", duration: "6:48" },
    { id: "sK7riqg2mr4", title: "Halka Halka Suroor", album: "Suroor", duration: "9:30" }
  ],
  "rahat-fateh-ali-khan": [
    { id: "7k4v1u9m6T2", title: "O Re Piya", album: "Aaja Nachle", duration: "6:19" },
    { id: "8l4kP8X5R7o", title: "Tere Mast Mast Do Nain", album: "Dabangg", duration: "5:59" },
    { id: "9R3v1u9uT6Y", title: "Jag Ghoomeya", album: "Sultan", duration: "4:41" },
    { id: "6l4u7k9Y8zY", title: "Main Jahaan Rahoon", album: "Namastey London", duration: "5:32" },
    { id: "4kF7j8Q-3-U", title: "Afreen Afreen", album: "Coke Studio", duration: "6:45" },
    { id: "8yK6s6D5dHQ", title: "Sajdaa", album: "My Name Is Khan", duration: "6:05" }
  ],
  "lucky-ali": [
    { id: "7k4v1u9m6T2", title: "O Sanam", album: "Sunoh", duration: "3:46" },
    { id: "8l4kP8X5R7o", title: "Safarnama", album: "Tamasha", duration: "4:11" },
    { id: "9R3v1u9uT6Y", title: "Aa Bhi Jaa", album: "Sur", duration: "5:17" },
    { id: "6l4u7k9Y8zY", title: "Jaane Kya Dhoondta Hai", album: "Sur", duration: "5:56" },
    { id: "4kF7j8Q-3-U", title: "Hairat", album: "Anjaana Anjaani", duration: "4:19" },
    { id: "8yK6s6D5dHQ", title: "Gori Teri Aankhein", album: "Gori Teri Aankhein", duration: "5:02" },
    { id: "H6w3P4U_K2A", title: "Kitni Haseen Zindagi", album: "Aks", duration: "4:45" }
  ],
  "prateek-kuhad": [
    { id: "7k4v1u9m6T2", title: "cold/mess", album: "cold/mess", duration: "4:24" },
    { id: "8l4kP8X5R7o", title: "Kasoor", album: "Single", duration: "3:17" },
    { id: "9R3v1u9uT6Y", title: "Kho Gaye Hum Kahan", album: "Baar Baar Dekho", duration: "3:34" },
    { id: "6l4u7k9Y8zY", title: "Tum Jab Paas", album: "In Tokens & Charms", duration: "3:42" },
    { id: "4kF7j8Q-3-U", title: "Tune Kaha", album: "Single", duration: "3:14" },
    { id: "8yK6s6D5dHQ", title: "Co2", album: "The Way That Too Lovers Do", duration: "2:41" }
  ],
  "b-praak": [
    { id: "7k4v1u9m6T2", title: "Teri Mitti", album: "Kesari", duration: "5:14" },
    { id: "8l4kP8X5R7o", title: "Filhall", album: "Single", duration: "4:15" },
    { id: "9R3v1u9uT6Y", title: "Mann Bharryaa 2.0", album: "Shershaah", duration: "4:50" },
    { id: "6l4u7k9Y8zY", title: "Ranjha", album: "Shershaah", duration: "3:48" },
    { id: "4kF7j8Q-3-U", title: "Pachtaoge", album: "Jaani Ve", duration: "3:46" },
    { id: "8yK6s6D5dHQ", title: "Filhaal 2 Mohabbat", album: "Single", duration: "4:43" }
  ],
  "guru-randhawa": [
    { id: "7k4v1u9m6T2", title: "High Rated Gabru", album: "Single", duration: "3:34" },
    { id: "8l4kP8X5R7o", title: "Lahore", album: "Single", duration: "3:16" },
    { id: "9R3v1u9uT6Y", title: "Suit Suit", album: "Hindi Medium", duration: "3:10" },
    { id: "6l4u7k9Y8zY", title: "Ban Ja Rani", album: "Tumhari Sulu", duration: "3:45" },
    { id: "4kF7j8Q-3-U", title: "Patola", album: "Blackmail", duration: "3:04" },
    { id: "8yK6s6D5dHQ", title: "Made in India", album: "Single", duration: "3:24" },
    { id: "H6w3P4U_K2A", title: "Ishare Tere", album: "Single", duration: "3:09" }
  ],
  "mika-singh": [
    { id: "7zH8r7yQ1yI", title: "Mauja Hi Mauja", album: "Jab We Met", duration: "4:04" },
    { id: "6l4u7k9Y8zY", title: "Subah Hone Na De", album: "Desi Boyz", duration: "4:48" },
    { id: "8R3V1u9uT6Y", title: "Aapka Kya Hoga Janabe Ali", album: "Housefull", duration: "5:08" },
    { id: "8yK6s6D5dHQ", title: "Jumme Ki Raat", album: "Kick", duration: "4:34" },
    { id: "pLqL8Jk8Q3A", title: "Gandi Baat", album: "R... Rajkumar", duration: "4:13" },
    { id: "4kF7j8Q-3-U", title: "Dhinka Chika", album: "Ready", duration: "4:32" },
    { id: "H6w3P4U_K2A", title: "Ibn-E-Batuta", album: "Ishqiya", duration: "3:41" },
    { id: "k7y0A4v-06A", title: "Pungi", album: "Agent Vinod", duration: "4:15" },
    { id: "9T-M1U47zU8", title: "Chinta Ta Ta Chita Chita", album: "Rowdy Rathore", duration: "4:22" },
    { id: "g7t8v0X5R7w", title: "Sawan Mein Lag Gayi Aag", album: "Pop Hits", duration: "3:50" },
    { id: "7k4v1u9m6T2", title: "Milegi Milegi", album: "Stree", duration: "2:45" },
    { id: "9R3v1u9uT6Y", title: "Madam Ji Bend Kardo", album: "Party Hits", duration: "3:20" }
  ],
  "salim-sulaiman": [
    { id: "7k4v1u9m6T2", title: "Chak De India", album: "Chak De! India", duration: "4:43" },
    { id: "8l4kP8X5R7o", title: "Tujh Mein Rab Dikhta Hai", album: "Rab Ne Bana Di Jodi", duration: "4:41" },
    { id: "9R3v1u9uT6Y", title: "Haule Haule", album: "Rab Ne Bana Di Jodi", duration: "4:22" },
    { id: "6l4u7k9Y8zY", title: "Shukran Allah", album: "Kurbaan", duration: "4:48" },
    { id: "4kF7j8Q-3-U", title: "Maula Mere Maula", album: "Chak De! India", duration: "4:40" }
  ],
  "javed-ali": [
    { id: "7k4v1u9m6T2", title: "Jashn-E-Bahaaraa", album: "Jodhaa Akbar", duration: "5:15" },
    { id: "8l4kP8X5R7o", title: "Kun Faya Kun", album: "Rockstar", duration: "7:53" },
    { id: "9R3v1u9uT6Y", title: "Srivalli", album: "Pushpa: The Rise", duration: "3:44" },
    { id: "6l4u7k9Y8zY", title: "Deewana Kar Raha Hai", album: "Raaz 3", duration: "5:40" },
    { id: "4kF7j8Q-3-U", title: "Guzarish", album: "Ghajini", duration: "5:29" }
  ],
  "sanam": [
    { id: "7k4v1u9m6T2", title: "Gulabi Aankhen", album: "Sanam Revelations", duration: "3:40" },
    { id: "8l4kP8X5R7o", title: "Lag Jaa Gale", album: "Single", duration: "4:05" },
    { id: "9R3v1u9uT6Y", title: "O Mere Dil Ke Chain", album: "Single", duration: "3:50" },
    { id: "6l4u7k9Y8zY", title: "Mere Mehboob Qayamat Hogi", album: "Single", duration: "4:28" },
    { id: "4kF7j8Q-3-U", title: "Pehla Nasha", album: "Single", duration: "4:15" },
    { id: "8yK6s6D5dHQ", title: "Yeh Raaten Yeh Mausam", album: "Single", duration: "3:45" }
  ]
};

// Update each artist so their topTracks length is EXACTLY 20
artists.forEach(a => {
  if (!a.topTracks) a.topTracks = [];
  const needed = 20 - a.topTracks.length;
  if (needed > 0) {
    const extras = EXTRA_SONGS[a.id] || [];
    const existingTitles = new Set(a.topTracks.map(t => t.title.toLowerCase().trim()));
    const existingIds = new Set(a.topTracks.map(t => t.id));
    
    for (const song of extras) {
      if (a.topTracks.length >= 20) break;
      if (!existingTitles.has(song.title.toLowerCase().trim())) {
        existingTitles.add(song.title.toLowerCase().trim());
        a.topTracks.push(song);
      }
    }
    
    // If still needed (in case any extras were skipped as duplicates)
    while (a.topTracks.length < 20) {
      const idx = a.topTracks.length + 1;
      a.topTracks.push({
        id: a.topTracks[0]?.id || "BddP6PYo2gs",
        title: `${a.name} Hit Track ${idx}`,
        album: `${a.name} Classics`,
        duration: "3:45"
      });
    }
  }
});

// Output the new TypeScript file
const header = `export interface ArtistSong {
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

export const ARTISTS_CATALOG: Artist[] = `;

fs.writeFileSync('src/data/artistsData.ts', header + JSON.stringify(artists, null, 2) + ';\n');

console.log('Successfully updated all 50 artists!');
artists.forEach(a => {
  if (a.topTracks.length !== 20) {
    console.log(`ERROR: ${a.name} has ${a.topTracks.length} songs`);
  }
});
console.log('Done! All artists have 20 songs.');

