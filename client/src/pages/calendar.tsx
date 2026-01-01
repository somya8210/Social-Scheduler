import { Sidebar, MobileHeader } from "@/components/Sidebar";
import { usePosts } from "@/hooks/use-posts";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreatePostDialog } from "@/components/CreatePostDialog";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const { data: posts } = usePosts();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const today = () => setCurrentDate(new Date());

  const getPostsForDay = (date: Date) => {
    return posts?.filter(post => isSameDay(new Date(post.scheduledTime), date)) || [];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col h-screen">
        <MobileHeader />
        
        <main className="flex-1 p-4 md:p-8 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">Calendar</h1>
              <p className="text-muted-foreground text-sm">Visualize your content schedule</p>
            </div>
            
            <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-xl shadow-sm">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-lg">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="px-4 font-semibold min-w-[140px] text-center">
                {format(currentDate, "MMMM yyyy")}
              </div>
              <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-lg">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="hidden md:block">
              <Button variant="outline" onClick={today} className="mr-2">Today</Button>
              <CreatePostDialog trigger={
                <Button className="btn-primary h-9">
                  <Plus className="w-4 h-4 mr-2" /> New Post
                </Button>
              } />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-border bg-muted/30">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="py-3 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Days */}
            <div className="flex-1 grid grid-cols-7 grid-rows-5 md:grid-rows-6">
              {days.map((day, dayIdx) => {
                const dayPosts = getPostsForDay(day);
                const isSelectedMonth = isSameMonth(day, monthStart);
                const isToday = isSameDay(day, new Date());

                return (
                  <div 
                    key={day.toString()} 
                    className={cn(
                      "border-r border-b border-border/50 p-2 min-h-[100px] relative transition-colors hover:bg-muted/20",
                      !isSelectedMonth && "bg-muted/10 text-muted-foreground"
                    )}
                  >
                    <div className={cn(
                      "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1",
                      isToday ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "text-foreground"
                    )}>
                      {format(day, "d")}
                    </div>
                    
                    <div className="space-y-1.5 overflow-y-auto max-h-[80px] custom-scrollbar">
                      {dayPosts.map(post => (
                        <div 
                          key={post.id}
                          className={cn(
                            "text-[10px] px-2 py-1 rounded-md border truncate font-medium flex items-center gap-1",
                            post.status === 'published' ? "bg-green-50 text-green-700 border-green-100" :
                            post.status === 'failed' ? "bg-red-50 text-red-700 border-red-100" :
                            "bg-blue-50 text-blue-700 border-blue-100"
                          )}
                        >
                          <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", 
                             post.status === 'published' ? "bg-green-500" :
                             post.status === 'failed' ? "bg-red-500" : "bg-blue-500"
                          )} />
                          {format(new Date(post.scheduledTime), "h:mm a")}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
