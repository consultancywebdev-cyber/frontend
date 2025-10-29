import { useQuery } from "@tanstack/react-query";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

async function fetchJSON(url) {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["/api/reviews"],
    queryFn: () => fetchJSON("/api/reviews"),
  });

  const activeReviews = reviews.filter((review) => review && review.isActive);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, activeReviews.length - 3) : Math.max(0, prev - 1)
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(0, activeReviews.length - 3))
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-32 bg-muted rounded-md" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activeReviews.length === 0) return null;

  const visibleReviews = activeReviews.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Student Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who achieved their dreams with our guidance
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleReviews.map((review) => {
              const key = review.id || review._id || `${review.studentName}-${review.university}`;
              const rating = Math.max(0, Math.min(5, Number(review.rating || 0)));
              const initial =
                (review.studentName && review.studentName.trim().charAt(0).toUpperCase()) || "S";

              return (
                <Card
                  key={key}
                  className="p-6 hover-elevate active-elevate-2 transition-all duration-300"
                  data-testid={`card-review-${key}`}
                >
                  {/* Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-primary/20" />
                    {/* Rating Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <p className="text-base text-foreground mb-6 leading-relaxed line-clamp-4">
                    "{review.testimonial}"
                  </p>

                  {/* Student Info */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Avatar>
                      {review.imageUrl && (
                        <AvatarImage src={review.imageUrl} alt={review.studentName || "Student"} />
                      )}
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p
                        className="font-semibold text-foreground"
                        data-testid={`text-student-name-${key}`}
                      >
                        {review.studentName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {review.university}
                        {review.country ? `, ${review.country}` : ""}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {activeReviews.length > 3 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border shadow-md hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Previous reviews"
                data-testid="button-reviews-prev"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={goToNext}
                disabled={currentIndex >= activeReviews.length - 3}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border shadow-md hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Next reviews"
                data-testid="button-reviews-next"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
