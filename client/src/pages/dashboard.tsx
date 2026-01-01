import { Sidebar, MobileHeader } from "@/components/Sidebar";
import { usePosts } from "@/hooks/use-posts";
import { PostCard } from "@/components/PostCard";
import { CreatePostDialog } from "@/components/CreatePostDialog";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Clock, CheckCircle2, AlertOctagon, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: posts, isLoading } = usePosts();
  const [search, setSearch] = useState("");

  const stats = [
    { label: "Scheduled", value: posts?.filter(p => p.status === 'scheduled').length || 0, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Published", value: posts?.filter(p => p.status === 'published').length || 0, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "Failed", value: posts?.filter(p => p.status === 'failed').length || 0, icon: AlertOctagon, color: "text-red-600", bg: "bg-red-50" },
  ];

  const filteredPosts = posts 
    ?.filter(p => p.content.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <MobileHeader />
        
        <main className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your social media presence from one place.
              </p>
            </div>
            
            <CreatePostDialog trigger={
              <Button className="btn-primary gap-2 h-12 text-md px-6">
                <Plus className="w-5 h-5" /> Create Post
              </Button>
            } />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">+12%</span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <h3 className="text-3xl font-bold font-display">{posts?.length || 0}</h3>
              </div>
            </div>

            {stats.map((stat, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-3xl font-bold font-display">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search posts..." 
                className="pl-10 h-11 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-11 gap-2 bg-white text-muted-foreground hover:text-primary">
              <Filter className="w-4 h-4" /> Filter Status
            </Button>
          </div>

          {/* Content Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 rounded-2xl border border-border bg-card p-6 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-32 w-full rounded-xl mt-4" />
                </div>
              ))}
            </div>
          ) : filteredPosts?.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                {search ? "Try adjusting your search terms." : "Get started by creating your first scheduled post."}
              </p>
              {!search && (
                <CreatePostDialog trigger={
                  <Button className="btn-primary">Create Post</Button>
                } />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts?.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
