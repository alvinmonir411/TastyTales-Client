import React from "react";
import { motion } from "framer-motion";
import {
  GiCook,
  GiNetworkBars,
  GiKnifeFork,
  GiMicrophone,
  GiGlobe,
  GiCpu,
  GiMoneyStack,
  GiShieldReflect,
  GiChart,

} from "react-icons/gi";

const sections = [
  {
    id: 1,
    title: "The Origins of Tasty Tales",
    icon: <GiCook className="inline text-3xl text-yellow-500 mr-2" />,
    content: (
      <>
        <p>
          Tasty Tales began as a passion project in a small family kitchen where
          the aroma of spices, fresh herbs, and sizzling pans filled the air
          every evening. It was in this humble setting that the founding members
          discovered their shared love for authentic, home-cooked meals and the
          stories behind them.
        </p>
        <p>
          The journey started with a simple desire: to preserve and share
          treasured family recipes handed down through generations. Many of
          these recipes had deep cultural roots, carrying with them histories of
          migration, celebration, and tradition. The initial challenge was how
          to bring these unique tastes to a wider audience in a way that felt
          personal, authentic, and accessible.
        </p>
        <p>
          Over countless late nights, the team sketched ideas on napkins and
          experimented with early prototypes. The vision was clear—to create an
          online space where home chefs, food lovers, and sellers could connect,
          exchange culinary stories, and discover new flavors. But beyond
          technology, Tasty Tales aimed to rekindle the joy and warmth of
          gathering around food.
        </p>
        <p>
          Early users were friends and family who provided invaluable feedback.
          Their enthusiasm fueled improvements in design, features, and
          community interaction. The core values of trust, inclusivity, and
          cultural respect were embedded deeply into the platform’s DNA from day
          one.
        </p>
        <p>
          Launching to the public was both thrilling and daunting. With limited
          resources, the team leaned on their network, shared stories on social
          media, and hosted virtual cooking events. Slowly, the Tasty Tales
          community began to grow, blossoming into a vibrant hub for food lovers
          around the globe.
        </p>
        <p>
          The emotional connection to food — memories of childhood,
          celebrations, comfort in tough times — remains the beating heart of
          Tasty Tales. Every recipe shared is more than ingredients; it is a
          story waiting to be told and tasted.
        </p>
        <p>
          This origin story is a testament to how passion, culture, and
          technology blend to create a platform that is not just about food but
          about people, stories, and connection.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "Building a Community of Food Lovers",
    icon: <GiNetworkBars className="inline text-3xl text-green-500 mr-2" />,
    content: (
      <>
        <p>
          From the start, building community has been central to Tasty Tales’
          mission. This chapter dives into how we forged connections, nurtured
          user relationships, and built trust across cultures.
        </p>
        <p>
          Early sign-ups sparked lively discussions and recipe exchanges. Social
          features like reviews, comments, and personalized feeds helped deepen
          connections. Our platform facilitated the global exchange of cuisines,
          allowing users to explore diverse culinary traditions without leaving
          home.
        </p>
        <p>
          We hosted community events—both virtual and in-person—such as cooking
          challenges, cultural food days, and live workshops. These initiatives
          encouraged active participation and created bonds between users from
          different backgrounds.
        </p>
        <p>
          User feedback has been a driving force in shaping our features and
          policies. We actively listen and iterate to foster a safe, welcoming
          space, emphasizing trust and safety measures.
        </p>
        <p>
          Looking forward, we plan to introduce more interactive features,
          enhanced social tools, and local community meetups to further enrich
          the Tasty Tales experience.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "Empowering Home Chefs and Sellers",
    icon: <GiKnifeFork className="inline text-3xl text-red-500 mr-2" />,
    content: (
      <>
        <p>
          A key part of Tasty Tales’ vision is giving home chefs and small-scale
          sellers a platform to grow their culinary passions into livelihoods.
        </p>
        <p>
          Sellers can easily sign up, create profiles, and manage their recipes
          with intuitive tools. Monetization options include selling recipe
          packages, hosting virtual cooking classes, and subscription models.
        </p>
        <p>
          Our community workshops and training resources empower sellers to
          improve their craft and business skills. Experienced sellers mentor
          newcomers, fostering a supportive ecosystem.
        </p>
        <p>
          Many success stories highlight how Tasty Tales has transformed hobbies
          into sustainable incomes, boosting confidence and financial
          independence.
        </p>
        <p>
          We remain committed to expanding seller support features, including
          marketing assistance and analytics dashboards.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "Role-Based Journeys: Users, Sellers, Admins",
    icon: <GiMicrophone className="inline text-3xl text-blue-500 mr-2" />,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-2">Users</h3>
        <p>
          When a food lover lands on Tasty Tales for the first time, the
          onboarding guides them through personalized recipe recommendations and
          community introductions, ensuring a welcoming start.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Sellers</h3>
        <p>
          New sellers upload their first recipes with step-by-step assistance,
          quickly gaining followers through featured spots and social sharing.
          As they grow, sellers access tools for managing orders, tracking
          feedback, and marketing.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Admins</h3>
        <p>
          Admins are the unseen heroes who moderate content, uphold quality
          standards, approve sellers, and ensure community well-being. They
          collaborate closely with users and sellers to maintain a safe, vibrant
          ecosystem.
        </p>

        <p>
          Together, these roles form a collaborative network that enriches the
          Tasty Tales platform, balancing freedom, creativity, and
          responsibility.
        </p>
      </>
    ),
  },
  {
    id: 5,
    title: "Discoveries and Global Recipes",
    icon: <GiGlobe className="inline text-3xl text-purple-500 mr-2" />,
    content: (
      <>
        <p>
          One of the magic moments on Tasty Tales is discovering recipes from
          cultures previously unknown to users.
        </p>
        <p>
          Our food mapping and search features make exploring regional dishes
          intuitive. Featured recipe series and spotlight campaigns celebrate
          diverse cuisines, encouraging cultural education and respect for
          authenticity.
        </p>
        <p>
          Users share stories of their culinary discoveries, enriching their
          palates and broadening their worldviews. Planned global events will
          further highlight the beauty of international food traditions.
        </p>
      </>
    ),
  },
  {
    id: 6,
    title: "Technology Behind The Taste",
    icon: <GiCpu className="inline text-3xl text-indigo-500 mr-2" />,
    content: (
      <>
        <p>Behind the scenes, our tech stack powers Tasty Tales:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Frontend: React, Tailwind CSS, Framer Motion, React Icons</li>
          <li>Backend: Node.js with Express.js</li>
          <li>Database: MongoDB</li>
          <li>Authentication: JWT-based authentication</li>
          <li>Email notifications via Nodemailer</li>
          <li>MERN stack logic for cost calculations</li>
          <li>
            Future plans: AI recipe suggestions, advanced search, mobile apps
          </li>
        </ul>
        <p>
          Our architecture is designed for scalability, security, and
          performance. We prioritize user privacy and responsive design to
          deliver a seamless experience across devices. Upcoming enhancements
          include AI-powered features to personalize recommendations and
          advanced search capabilities.
        </p>
      </>
    ),
  },
  {
    id: 7,
    title: "The Taste Economy: Sellers & Food Micro-Businesses",
    icon: <GiMoneyStack className="inline text-3xl text-yellow-600 mr-2" />,
    content: (
      <>
        <p>
          Tasty Tales supports micro-entrepreneurship through recipe packages,
          subscription models, promotional tools, analytics, and social
          responsibility initiatives.
        </p>
        <p>
          Our data-driven insights help sellers optimize their offerings, while
          impact reports showcase the platform’s role in fostering economic
          growth for small food businesses.
        </p>
        <p>
          We celebrate seller success stories and commit to future initiatives
          that further empower our vibrant marketplace.
        </p>
      </>
    ),
  },
  {
    id: 8,
    title: "Ensuring Quality & Safety",
    icon: <GiShieldReflect className="inline text-3xl text-red-600 mr-2" />,
    content: (
      <>
        <p>
          Quality control is a top priority at Tasty Tales. We maintain content
          standards through admin moderation workflows, community reporting
          tools, content guidelines, and seller verification processes.
        </p>
        <p>
          Our platform is transparent about food allergies, nutritional
          information, and includes disclaimers to protect users.
        </p>
        <p>
          Partnerships with nutrition professionals and plans for AI-assisted
          moderation help us build trust and educate the community.
        </p>
      </>
    ),
  },
  {
    id: 9,
    title: "Measuring Impact & Looking Ahead",
    icon: <GiChart className="inline text-3xl text-green-700 mr-2" />,
    content: (
      <>
        <p>
          Our growth metrics include registered users, recipes published,
          sellers onboarded, engagement rates, social reach, and delivery
          impact.
        </p>
        <p>
          Looking ahead, we plan to introduce AI cooking assistants, seller
          stores, in-app video streaming, meal planners, subscription features,
          and scale partnerships to expand our impact.
        </p>
      </>
    ),
  },
  {
    id: 10,
    title: "Joining the Tasty Tales Journey",
  
    content: (
      <>
        <p>Join us as a user, seller, or partner! Here’s how:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Signing up and onboarding</li>
          <li>Seller mentorship and growth paths</li>
          <li>Admin/mentor roles</li>
          <li>Community events and cooking challenges</li>
          <li>Collaborations for sustainability and education</li>
          <li>Contributing code, translations, or sponsorship</li>
        </ul>
        <p>
          Together, we can grow the Tasty Tales community into an even richer,
          more vibrant space for sharing stories and savoring flavors.
        </p>
      </>
    ),
  },
];

const BigBlog = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <header className="text-center mb-16 px-4">
        <h1 className="text-5xl font-extrabold text-yellow-600 mb-4">
          Tasty Tales Blog
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Dive deep into the story, technology, and community behind Tasty
          Tales, the platform that celebrates food lovers worldwide.
        </p>
      </header>

      {sections.map(({ id, title, icon, content }) => (
        <motion.section
          key={id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-20 px-6"
        >
          <h2 className="text-4xl font-semibold mb-6 flex items-center text-gray-900">
            {icon} {title}
          </h2>
          <article className="prose prose-lg max-w-none text-gray-800">
            {content}
          </article>
        </motion.section>
      ))}

      <footer className="text-center mt-20 mb-10 text-gray-600">
        <p>© 2025 Tasty Tales. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default BigBlog;
