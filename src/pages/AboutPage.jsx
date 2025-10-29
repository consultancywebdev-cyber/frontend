import  Navbar  from ".././Navbar";
import  Footer  from ".././Footer";
import { Award, Users, Globe, Target, Heart, Lightbulb } from "lucide-react";
import { Card } from "../ui/card";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, ensuring quality service and support." },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Your success is our priority. We provide personalized guidance tailored to your unique goals." },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace modern approaches and technologies to make your journey smoother and more efficient." },
  ];

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "5000+", label: "Students Placed" },
    { number: "200+", label: "Partner Universities" },
    { number: "30+", label: "Countries Worldwide" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-destructive/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Empowering Students to Achieve Their Global Education Dreams
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                At Everest Worldwide Consultancy, we believe education knows no borders. Our mission is to guide aspiring students through every step of their international education journey with expertise, care, and commitment.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card border-y">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-5xl font-bold text-primary mb-2" data-testid={`stat-number-${index}`}>
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2008, Everest Worldwide Consultancy began with a simple yet powerful vision: to make quality international education accessible to students from all backgrounds.
                  </p>
                  <p>
                    Over the years, we've grown from a small team of education enthusiasts to a trusted consultancy with a global network of partnerships. Our success is measured not just in numbers, but in the thousands of lives we've helped transform through education.
                  </p>
                  <p>
                    Today, we continue to innovate and evolve, staying at the forefront of international education trends while maintaining the personal touch that has always been our hallmark.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop"
                  alt="Our team"
                  className="w-full h-[400px] object-cover rounded-md"
                  data-testid="img-our-story"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-8 text-center hover-elevate active-elevate-2 transition-all">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                "University Selection & Application Assistance",
                "Visa Guidance & Documentation Support",
                "Scholarship & Financial Aid Counseling",
                "Test Preparation (IELTS, TOEFL, GRE, GMAT)",
                "Pre-Departure Orientation & Support",
                "Career Counseling & Course Selection",
              ].map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-base text-foreground">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
