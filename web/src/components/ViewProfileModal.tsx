import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Flame } from "lucide-react";
import type { User } from "@/types/user";
import { capitalize } from "@/utils/capitalize";

interface ViewProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function ViewProfileModal({
  open,
  onOpenChange,
  user,
}: ViewProfileModalProps) {
  const age = Math.floor(
    (new Date().getTime() - new Date(user.dateOfBirth).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl border border-border bg-gradient-to-b from-background via-background/95 to-muted/30 backdrop-blur-md shadow-xl gap-0">
        <DialogHeader className="text-center gap-0">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>

          {/* Name & Basic Info */}
          <DialogTitle className="mt-4 text-2xl font-semibold text-foreground flex items-center justify-center gap-1">
            {user.name}
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground space-y-1 my-0">
            <div className="flex flex-col justify-center items-center gap-2 text-muted-foreground">
              <div>{user.gender && `${capitalize(user.gender)}, ${age}`}</div>

              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{`${user.location.city}, ${user.location.state}`}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* About Section */}
        <div className="mt-5 text-center">
          {user.about ? (
            <p className="text-sm text-muted-foreground leading-relaxed px-4">
              {user.about}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic opacity-70">
              No bio added yet.
            </p>
          )}
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <div className="flex flex-wrap justify-center gap-2">
            {user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <Badge
                  key={skill._id}
                  className="flex items-center h-fit gap-1 bg-rose-600/20 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(225,29,72,0.4)] hover:bg-rose-600/30 transition"
                >
                  {skill.name}
                </Badge>
              ))
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No skills listed.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-1 text-xs mt-5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 opacity-70" />
          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
