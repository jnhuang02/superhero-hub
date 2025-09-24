// superheroes.js

const giftData = [
  {
    id: 1,
    name: "Superman",
    powers: "Super strength, Flight, Heat vision, X-ray vision",
    universe: "DC Comics",
    age: "35",
    location: "Metropolis",
    story: "Born on the dying planet Krypton as Kal-El, he was sent to Earth as an infant by his parents. Raised by Martha and Jonathan Kent in Smallville, Kansas, he grew up to become Clark Kent, a mild-mannered reporter for the Daily Planet. When danger threatens, he transforms into Superman, Earth's greatest protector.",
    image: "https://pyxis.nymag.com/v1/imgs/082/9ba/6b13f7d7170ad4ee5c5cece24fa886019c-superman-review.1x.rsquare.w1400.jpg?auto=format&fit=crop&crop=faces,women",
    description: "The Last Son of Krypton, defender of truth, justice, and hope. Clark Kent protects Earth with his incredible alien abilities.",
    submittedBy: "DC Fan",
    submittedOn: "2025-09-22"
  },
  {
    id: 2,
    name: "Spider-Man",
    powers: "Wall-crawling, Web-slinging, Spider-sense, Super agility",
    universe: "Marvel Comics",
    age: "23",
    location: "New York City",
    story: "Peter Parker was a high school student when he was bitten by a radioactive spider during a science exhibition. Initially using his powers for personal gain, he learned that 'with great power comes great responsibility' after his Uncle Ben was killed. Now he protects New York City as the amazing Spider-Man.",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop",
    description: "Your friendly neighborhood Spider-Man! Peter Parker gained his powers from a radioactive spider bite.",
    submittedBy: "Marvel Fan",
    submittedOn: "2025-09-21"
  },
  {
    id: 3,
    name: "Batman",
    powers: "Genius intellect, Martial arts mastery, Advanced technology, Detective skills",
    universe: "DC Comics",
    age: "42",
    location: "Gotham City",
    story: "Bruce Wayne witnessed his parents' murder in Crime Alley as a child, which traumatized him and led to his vow to fight crime. After years of training around the world, he returned to Gotham City to become Batman, using fear as a weapon against criminals while maintaining his identity as billionaire philanthropist Bruce Wayne.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJV6uf9Vh4qiC3Ho-sfSx0HMlyX9jgLs9qpg&s",
    description: "The Dark Knight of Gotham City. Bruce Wayne uses his wealth and intellect to fight crime as Batman.",
    submittedBy: "Gotham Citizen",
    submittedOn: "2025-09-20"
  },
  {
    id: 4,
    name: "Wonder Woman",
    powers: "Super strength, Flight, Lasso of Truth, Bulletproof bracelets",
    universe: "DC Comics",
    age: "5000",
    location: "Themyscira / Washington D.C.",
    story: "Princess Diana was sculpted from clay by her mother Queen Hippolyta and brought to life by the gods on the hidden island of Themyscira. When pilot Steve Trevor crashed on their shores, Diana left her home to help fight in World War I, discovering her true heritage as the daughter of Zeus and becoming Wonder Woman, protector of both worlds.",
    image: "https://images4.alphacoders.com/884/thumb-1920-884840.jpg",
    description: "Princess Diana of Themyscira, an Amazonian warrior fighting for peace and justice in the world of man.",
    submittedBy: "Themyscira Ambassador",
    submittedOn: "2025-09-19"
  },
  {
    id: 5,
    name: "Iron Man",
    powers: "Genius intellect, Powered armor suit, Repulsors, Flight",
    universe: "Marvel Comics",
    age: "48",
    location: "Malibu / New York City",
    story: "Tony Stark was a brilliant but arrogant weapons manufacturer who was captured by terrorists and forced to build weapons. Instead, he created a suit of armor to escape. This experience changed his perspective on life, leading him to become Iron Man and eventually a founding member of the Avengers, using his technology to protect the world.",
    image: "https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg",
    description: "Tony Stark, billionaire genius inventor who created the Iron Man armor suit to protect the world.",
    submittedBy: "Stark Industries",
    submittedOn: "2025-09-18"
  },
  {
    id: 6,
    name: "The Flash",
    powers: "Super speed, Time travel, Speed Force manipulation, Vibration phasing",
    universe: "DC Comics",
    age: "29",
    location: "Central City",
    story: "Barry Allen was a forensic scientist for the Central City Police Department when he was struck by lightning during a particle accelerator explosion. The accident gave him super speed and connected him to the Speed Force, an energy field that grants him his powers. As The Flash, he protects Central City while working to master his abilities and prevent timeline disasters.",
    image: "https://claudewalrath.wordpress.com/wp-content/uploads/2015/05/4294206-7052663923-flash.jpeg",
    description: "Barry Allen, the fastest man alive. Connected to the Speed Force, he protects Central City at superhuman speeds.",
    submittedBy: "Central City PD",
    submittedOn: "2025-09-17"
  }
];

export default giftData;
