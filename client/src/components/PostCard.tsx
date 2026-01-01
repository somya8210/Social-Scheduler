import { type Post } from "@shared/types";
import { format } from "date-fns";
import { Instagram, Linkedin, Clock, MoreVertical, Edit2, Trash2, ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CreatePostDialog } from "./CreatePostDialog";
import { useDeletePost } from "@/hooks/use-posts";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const deleteMutation = useDeletePost();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-700 border-green-200";
      case "failed": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published": return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case "failed": return <AlertCircle className="w-3 h-3 mr-1" />;
      default: return <Clock className="w-3 h-3 mr-1" />;
    }
  };

  return (
    <>
      <div className="bg-card rounded-2xl border border-border p-5 card-hover group flex flex-col h-full relative overflow-hidden">
        {/* Status Line */}
        <div className={cn("absolute top-0 left-0 w-1 h-full", 
          post.status === 'published' ? 'bg-green-500' :
          post.status === 'failed' ? 'bg-red-500' : 'bg-primary'
        )} />

        <div className="flex justify-between items-start mb-4 pl-2">
          <div className="flex gap-2">
            {post.platforms.includes("instagram") && (
              <div className="p-1.5 bg-pink-50 text-pink-600 rounded-lg">
                <Instagram className="w-4 h-4" />
              </div>
            )}
            {post.platforms.includes("linkedin") && (
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Linkedin className="w-4 h-4" />
              </div>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl shadow-lg border-border">
              <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="cursor-pointer">
                <Edit2 className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  if (confirm("Are you sure you want to delete this post?")) {
                    deleteMutation.mutate(post.id);
                  }
                }}
                className="text-red-600 focus:text-red-600 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 pl-2 space-y-4">
          <p className="text-foreground/80 font-medium line-clamp-3 leading-relaxed">
            {post.content}
          </p>
          
          {post.mediaUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/50 group-hover:border-primary/20 transition-colors">
              <img 
                src={post.mediaUrl} 
                alt="Post attachment" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ExternalLink className="text-white w-6 h-6" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between pl-2">
          <div className="text-xs text-muted-foreground font-medium flex items-center">
            <span className="text-primary/70 mr-1.5 bg-primary/10 p-1 rounded-md">
              {format(new Date(post.scheduledTime), "MMM d")}
            </span>
            {format(new Date(post.scheduledTime), "h:mm a")}
          </div>
          
          <Badge variant="outline" className={cn("rounded-md capitalize border-transparent", getStatusColor(post.status))}>
            {getStatusIcon(post.status)}
            {post.status}
          </Badge>
        </div>
      </div>

      <CreatePostDialog 
        post={post} 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
      />
    </>
  );
}
