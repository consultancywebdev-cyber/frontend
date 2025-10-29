import  Navbar  from "../Navbar";
import  Footer  from "../Footer";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Link } from "wouter";
import { useState } from "react";

// ---- Helper: Fetch Wrapper ----
async function fetchJSON(url) {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

// ---- Helper: Date Formatter ----
function formatDate(value) {
  const d = value ? new Date(value) : null;
  if (!d || Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(d); // e.g., Oct 29, 2025
}

// ---- Main Component ----
export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Proper JS Query (no <Blog[]>)
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["/api/blogs"],
    queryFn: () => fetchJSON("/api/blogs"),
  });

  // ---- Data Processing ----
  const publishedBlogs = blogs
    .filter((blog) => blog && blog.isPublished)
    .sort((a, b) => {
      const dateA = a?.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b?.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

  const q = (searchQuery || "").toLowerCase();
  const filteredBlogs = publishedBlogs.filter((blog) => {
    const title = (blog.title || "").toLowerCase();
    const excerpt = (blog.excerpt || "").toLowerCase();
    const category = (blog.category || "").toLowerCase();
    return title.includes(q) || excerpt.includes(q) || category.includes(q);
  });

  // ---- UI ----
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-destructive/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Our Blog
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8">
                Expert insights, tips, and guides to help you navigate your study abroad journey
              </p>

              {/* Search */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-12 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-blogs"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              // ---- Loading Skeleton ----
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="h-48 bg-muted" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-muted rounded-md" />
                      <div className="h-6 bg-muted rounded-md" />
                      <div className="h-4 bg-muted rounded-md" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredBlogs.length === 0 ? (
              // ---- No Results ----
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {searchQuery
                    ? "No articles found matching your search"
                    : "No articles available at the moment"}
                </p>
              </div>
            ) : (
              // ---- Blogs List ----
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredBlogs.map((blog) => {
                  const key = blog.id || blog._id || blog.slug || blog.title;
                  const displayDate = formatDate(blog.publishedAt);

                  return (
                    <Card
                      key={key}
                      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                      data-testid={`card-blog-${key}`}
                    >
                      {/* Blog Image */}
                      {blog.imageUrl ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={blog.imageUrl}
                            alt={blog.title || "Blog image"}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-primary/10 to-destructive/5" />
                      )}

                      {/* Blog Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Meta Info */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          {blog.category && (
                            <Badge variant="secondary" className="text-xs">
                              {blog.category}
                            </Badge>
                          )}
                          {displayDate && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{displayDate}</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        {blog.excerpt && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                            {blog.excerpt}
                          </p>
                        )}

                        {/* Author + Read More */}
                        <div className="flex items-center justify-between pt-4 border-t mt-auto">
                          {blog.author && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <User className="w-3 h-3" />
                              <span>{blog.author}</span>
                            </div>
                          )}
                          <Link
                            href={`/blogs/${blog.slug || key}`}
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
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
