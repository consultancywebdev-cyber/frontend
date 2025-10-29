import Navbar from "../Navbar";
import Footer from "../Footer";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { useState } from "react";

// Helper: fetch wrapper
async function fetchJSON(url) {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["/api/courses"],
    queryFn: () => fetchJSON("/api/courses"),
  });

  const activeCourses = (courses || []).filter(
    (course) => course && course.isActive
  );

  const q = (searchQuery || "").toLowerCase();
  const filteredCourses = activeCourses.filter((course) => {
    const name = (course.name || "").toLowerCase();
    const category = (course.category || "").toLowerCase();
    return name.includes(q) || category.includes(q);
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-destructive/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Explore Our Courses
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8">
                Discover a wide range of academic programs designed to match your
                career aspirations and academic goals
              </p>

              {/* Search */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-12 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-courses"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="h-48 bg-muted rounded-md mb-4" />
                    <div className="h-6 bg-muted rounded-md mb-2" />
                    <div className="h-4 bg-muted rounded-md" />
                  </Card>
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  {searchQuery
                    ? "No courses found matching your search"
                    : "No courses available at the moment"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredCourses.map((course, idx) => {
                  const key =
                    course.id ||
                    course._id ||
                    course.slug ||
                    `${course.name || "course"}-${idx}`;
                  const img = course.imageUrl || "";
                  const name = course.name || "Course";
                  const category = course.category || "";
                  const duration = course.duration || "";
                  const description = course.description || "";

                  return (
                    <Card
                      key={key}
                      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-1"
                      data-testid={`card-course-${key}`}
                    >
                      {img ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={img}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            data-testid={`img-course-${key}`}
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-primary/20 to-destructive/10 flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-primary" />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {category && (
                            <Badge
                              variant="secondary"
                              className="text-xs"
                              data-testid={`badge-category-${key}`}
                            >
                              {category}
                            </Badge>
                          )}
                          {duration && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{duration}</span>
                            </div>
                          )}
                        </div>

                        <h3
                          className="text-lg font-semibold text-foreground mb-3 line-clamp-2"
                          data-testid={`text-course-name-${key}`}
                        >
                          {name}
                        </h3>

                        {description && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                            {description}
                          </p>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          data-testid={`button-learn-more-${key}`}
                        >
                          Learn More
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
