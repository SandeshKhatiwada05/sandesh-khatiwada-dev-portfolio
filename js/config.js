/* ============================
   CONFIGURATION DATA
   Easy to edit and extend!
   ============================ */

const CONFIG = {
    games: [
        {
            id: 'royal-battletown',
            title: 'Royal Battletown: GTA Game',
            description: 'Open-world action chaos, GTA style',
            embedUrl: 'https://www.madkidgames.com/full/royal-battletown-gta-game',
            image: 'https://www.madkidgames.com/games/royal-battletown-gta-game/thumb_2.jpg'
        },
        {
            id: 'granny',
            title: 'Granny',
            description: 'Survival horror puzzle adventure',
            embedUrl: 'https://www.madkidgames.com/full/granny',
            image: 'https://play-lh.googleusercontent.com/WsUsst7uXYvpXzaL1XF7wRDpE1ZvF0XqRRgj0Dvti5VPRnHfFhQLuVKl2p2Zun-oyQ=w526-h296-rw'
        },
        {
            id: 'motorcycle-simulator',
            title: 'Ultimate Motorcycle Simulator',
            description: 'Realistic bike riding experience',
            embedUrl: 'https://www.madkidgames.com/full/ultimate-motorcycle-simulator',
            image: 'https://i.ytimg.com/vi/ASxRCrGDtH4/hq720.jpg'
        },
        {
            id: 'bike-race',
            title: 'Bike Race: Racing Game',
            description: 'Fast-paced competitive racing',
            embedUrl: 'https://www.madkidgames.com/full/bike-race-racing-game',
            image: 'https://play-lh.googleusercontent.com/8Ja0GjI9j7FOlkrbyMzeol15yMPTfJ-vjnx4Ko2lilRA08qvza14UTfDceJInp7nIA=w526-h296-rw'
        },
        {
            id: 'ninja-samurai',
            title: 'Ninja Samurai: Action RPG Survival',
            description: 'Combat-driven action adventure',
            embedUrl: 'https://www.madkidgames.com/full/ninja-samurai-action-rpg-survival',
            image: 'https://play-lh.googleusercontent.com/2Mq1BNAcgJhbIB2GeZ9WBeqQ1MH-CvrOouGXDCcS4pnH1deVdfqmqXHVdt6XrJ51tQ=w526-h296-rw'
        },
        {
            id: 'temple-rider',
            title: 'Temple Rider: BMX Racing 3D',
            description: 'Extreme BMX stunts and racing',
            embedUrl: 'https://www.madkidgames.com/full/temple-rider-bmx-racing-3d',
            image: 'https://www.madkidgames.com/games/temple-rider-bmx-racing-3d/thumb_2.jpg'
        },
        {
            id: 'tower-crush',
            title: 'Tower Crush – Defense TD',
            description: 'Strategic tower defense gameplay',
            embedUrl: 'https://www.madkidgames.com/full/tower-crush-defense-td',
            image: 'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=314,height=314,fit=cover,f=auto/9f86e9ed37b14b4227b9a18c6d087c91/tower-crush.png'
        },
        {
            id: 'hill-climb-racing-2-adventure-game',
            title: 'Hill Climb Racing 2: Adventure Game',
            description: 'Off-road hill racing and stunts',
            embedUrl: 'https://www.madkidgames.com/full/hill-climb-racing-2-adventure-game',
            image: 'https://www.madkidgames.com/games/hill-climb-racing-2-adventure-game/thumb_2.jpg'
        },
        {
            id: 'gta-car-stunt-mega-ramp',
            title: 'GTA Car Stunt: Mega Ramp',
            description: 'High-speed mega ramp car stunts',
            embedUrl: 'https://www.madkidgames.com/full/gta-car-stunt-mega-ramp',
            image: 'https://www.madkidgames.com/games/gta-car-stunt-mega-ramp/thumb_2.jpg'
        },
        {
            id: 'world-cricket-championship-lte',
            title: 'World Cricket Championship Lte',
            description: 'Cricket matches with quick gameplay',
            embedUrl: 'https://www.madkidgames.com/full/world-cricket-championship-lte',
            image: 'https://www.madkidgames.com/games/world-cricket-championship-lte/thumb_2.jpg'
        }
    ],
    skills: {
        'Languages': ['Java', 'Python', 'C++', 'C#', 'JavaScript', 'PHP'],
        'Backend & Frameworks': ['Spring Boot', 'Django', 'Flask', '.NET', 'Node.js'],
        'Databases': ['MySQL', 'PostgreSQL', 'MongoDB', 'CockroachDB'],
        'Cloud & DevOps': ['Microsoft Azure', 'Git', 'Maven', 'Docker', 'Linux'],
        'Big Data & ML': ['Apache Hadoop', 'Jupyter Notebook', 'n8n', 'Python ML'],
        'Tools & Testing': ['JUnit', 'SonarQube', 'Figma', 'VS Code']
    },
    projects: [
        {
            title: 'Dev Notes',
            description: 'Comprehensive development notes and documentation covering various programming concepts, best practices, and technical references.',
            tags: ['Documentation', 'Learning', 'Reference'],
            github: 'https://github.com/SandeshKhatiwada05/sandesh-khatiwada-dev-notes'
        },
        {
            title: 'Spring Boot Hospital Management System',
            description: 'Full-featured hospital management system built with Spring Boot and Spring Data JPA, handling patient records, appointments, and staff management.',
            tags: ['Spring Boot', 'Java', 'JPA', 'PostgreSQL'],
            github: 'https://github.com/SandeshKhatiwada05/Hospital-Management-System-using-Spring-Boot-and-Spring-Data-JPA'
        },
        {
            title: 'n8n College Info Chatbot',
            description: 'Intelligent chatbot powered by n8n with web scraping capabilities to provide automated college information and assistance.',
            tags: ['n8n', 'Automation', 'Web Scraping', 'Chatbot'],
            github: 'https://github.com/SandeshKhatiwada05/N8N-Powered-College-Info-Chatbot-with-WebScaping'
        },
        {
            title: 'Advanced Database Work',
            description: 'Comprehensive database projects using OracleDB, MongoDB, CockroachDB, Hadoop, and Docker for distributed data management.',
            tags: ['Database', 'Hadoop', 'Docker', 'Big Data'],
            github: 'https://github.com/SandeshKhatiwada05/Advanced-Database-with-OracleDB-MongoDB-cockroachDB-Hadoop-Docker'
        },
        {
            title: 'More Projects',
            description: 'Explore all my repositories including web development, automation, and machine learning projects.',
            tags: ['Portfolio', 'GitHub'],
            github: 'https://github.com/SandeshKhatiwada05?tab=repositories',
            isMore: true
        }
    ],
    timeline: [
        {
            year: '2026',
            title: 'Graduation & Professional Growth',
            description: 'Graduating with comprehensive experience in backend development, ML automation, cloud services, and modern full-stack applications. Ready to make an impact.'
        },
        {
            year: '2025',
            title: 'Full-Stack & Advanced Systems',
            description: 'Expanded to full-stack development with React, .NET, and advanced cloud infrastructure. Built production-ready applications with CI/CD pipelines.'
        },
        {
            year: '2024',
            title: 'ML & Cloud Technologies',
            description: 'Explored machine learning with Python, Jupyter Notebook, and Apache Hadoop. Started working with Microsoft Azure cloud services and automation tools like n8n.'
        },
        {
            year: '2023',
            title: 'Java & Backend Development',
            description: 'Mastered Java programming, Spring Boot framework, and began building scalable backend systems with PostgreSQL and microservices architecture.'
        },
        {
            year: '2022',
            title: 'Started University Journey',
            description: 'Began Bachelor of Science in Computer Science and Information Technology at Orchid University, diving deep into programming fundamentals and software development.'
        }
    ]
};
