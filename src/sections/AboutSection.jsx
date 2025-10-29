import { Award, Users, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "wouter";

export function AboutSection() {
  const highlights = [
    { icon: Award, text: "15+ Years of Excellence in Education Consultancy" },
    { icon: Users, text: "5000+ Students Successfully Placed Worldwide" },
    { icon: Globe, text: "Partner with 200+ Top Universities Globally" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-md overflow-hidden">
              <img
                src="https://studentconnect.org/uploads/media/1160x1160/03/813-STUDY%20ABROAD%20copy.png?v=1-0"
                alt="Students collaborating while planning their study abroad journey"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
                decoding="async"
                data-testid="img-about"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Your Trusted Partner in Global Education
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At Everest Worldwide Consultancy, we are dedicated to transforming dreams into reality. Our expert team provides personalized guidance to help you navigate the complex journey of studying abroad.
            </p>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              From university selection to visa assistance, we're with you every step of the way. Our comprehensive services ensure a smooth transition to your academic future.
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {highlights.map(({ icon: Icon, text }, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-base text-foreground pt-2">{text}</p>
                </div>
              ))}
            </div>

            {/* CTA (valid HTML: Button renders <a> via asChild) */}
            <Button size="lg" className="font-medium" data-testid="button-learn-more" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
