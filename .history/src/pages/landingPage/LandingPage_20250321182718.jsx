
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import "./FeatureCards.css"; 

const features = [
  {
    id: 1,
    title: "Interactive Learning",
    description: "Engage with interactive lessons designed to make learning fun and effective.",
    icon: "📚"
  },
  {
    id: 2,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience in their fields.",
    icon: "👨‍🏫"
  },
  {
    id: 3,
    title: "Flexible Schedule",
    description: "Study at your own pace with 24/7 access to all course materials.",
    icon: "🕒"
  },
  {
    id: 4,
    title: "Community Support",
    description: "Join a thriving community of learners and educators for support and collaboration.",
    icon: "👥"
  }
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar/>
      <Body/>

      <section className="features-section">
        <h2 className="features-title">Why Choose EduVerse?</h2>
        <div className="feature-cards">
          {features.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <Footer/>
    </div>
  );
};

export default LandingPage;
