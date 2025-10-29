import { Check, Award, Users, Globe } from "lucide-react";
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
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop"
                alt="Students studying together"
                className="w-full h-[400px] lg:h-[500px] object-cover"
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
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <highlight.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-base text-foreground pt-2">{highlight.text}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/about">
              <Button size="lg" className="font-medium" data-testid="button-learn-more">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
