import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreatePost, useUpdatePost } from "@/hooks/use-posts";
import { type Post, type InsertPost } from "@shared/types";
import { Loader2, Image as ImageIcon, Calendar, Linkedin, Instagram } from "lucide-react";
import { z } from "zod";

interface CreatePostDialogProps {
  post?: Post;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreatePostDialog({ post, trigger, open, onOpenChange }: CreatePostDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  // Form State
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [scheduledTime, setScheduledTime] = useState("");

  // Initialize form if editing
  useEffect(() => {
    if (post) {
      setContent(post.content);
      setMediaUrl(post.mediaUrl || "");
      setPlatforms(post.platforms);
      // Format date for datetime-local input (YYYY-MM-DDThh:mm)
      const date = new Date(post.scheduledTime);
      const isoString = date.toISOString().slice(0, 16);
      setScheduledTime(isoString);
    } else {
      // Reset for new post
      setContent("");
      setMediaUrl("");
      setPlatforms(["instagram"]);
      setScheduledTime("");
    }
  }, [post, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (platforms.length === 0) {
      alert("Please select at least one platform");
      return;
    }

    if (!scheduledTime) {
      alert("Please select a scheduled time");
      return;
    }

    const postData: InsertPost = {
      content,
      mediaUrl: mediaUrl || null,
      platforms,
      scheduledTime: new Date(scheduledTime), // Zod expects Date object
      status: "scheduled",
    };

    try {
      if (post) {
        await updateMutation.mutateAsync({ id: post.id, ...postData });
      } else {
        await createMutation.mutateAsync(postData);
      }
      setOpen(false);
    } catch (error) {
      // Error handled by hook
    }
  };

  const togglePlatform = (platform: string) => {
    setPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden border-none rounded-2xl shadow-2xl">
        <div className="p-6 bg-gradient-to-br from-white to-blue-50/50">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl text-blue-950">
              {post ? "Edit Post" : "Create New Post"}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Draft and schedule your content across platforms.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Content */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-blue-900/50 tracking-wider">Content</Label>
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[120px] resize-none border-blue-100 bg-white/80 focus:bg-white focus:border-blue-400 text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Media URL */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-blue-900/50 tracking-wider">Media (Optional)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                <Input
                  placeholder="https://images.unsplash.com/..."
                  className="pl-10 border-blue-100 bg-white/80 focus:bg-white focus:border-blue-400"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Platforms */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase text-blue-900/50 tracking-wider">Platforms</Label>
                <div className="flex gap-3">
                  <div 
                    onClick={() => togglePlatform("instagram")}
                    className={`
                      cursor-pointer p-3 rounded-xl border flex items-center justify-center transition-all duration-200
                      ${platforms.includes("instagram") 
                        ? "bg-pink-50 border-pink-200 text-pink-600 shadow-sm ring-1 ring-pink-200" 
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"}
                    `}
                  >
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div 
                    onClick={() => togglePlatform("linkedin")}
                    className={`
                      cursor-pointer p-3 rounded-xl border flex items-center justify-center transition-all duration-200
                      ${platforms.includes("linkedin") 
                        ? "bg-blue-50 border-blue-200 text-blue-600 shadow-sm ring-1 ring-blue-200" 
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"}
                    `}
                  >
                    <Linkedin className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Schedule Time */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-blue-900/50 tracking-wider">Schedule Time</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300 pointer-events-none" />
                  <input
                    type="datetime-local"
                    className="w-full h-11 rounded-xl border border-blue-100 bg-white/80 px-3 py-2 pl-10 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary/50"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="btn-primary"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {post ? "Save Changes" : "Schedule Post"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
