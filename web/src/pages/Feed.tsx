import AppLoader from "@/components/AppLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateConnectionMutation } from "@/services/connectionsApi";
import { useGetFeedQuery, usePrefetch } from "@/services/usersApi";
import type { User } from "@/types/user";
import { handleApiError } from "@/utils/error";
import { tryCatch } from "@/utils/try-catch";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, UserX, AlertTriangle } from "lucide-react";
import {
  IconAlertCircle,
  IconAlertHexagon,
  IconUserX,
} from "@tabler/icons-react";

const Feed = () => {
  const limit = 20;
  const [cursor, setCursor] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [createConnection] = useCreateConnectionMutation();

  const {
    data: feed,
    isError,
    isFetching,
  } = useGetFeedQuery({ cursor, limit });
  const prefetchFeed = usePrefetch("getFeed");

  useEffect(() => {
    if (feed) {
      setUsers((prev) => {
        const newUsers = feed.data.users.filter(
          (u) => !prev.some((p) => p._id === u._id)
        );

        return [...prev, ...newUsers];
      });
    }
  }, [feed]);

  useEffect(() => {
    if (users.length === 5 && !isFetching && feed?.data.pagination.hasMore) {
      setCursor(encodeURIComponent(feed.data.pagination.cursor!));
    }
  }, [users.length]);

  useEffect(() => {
    if (!cursor) {
      return;
    }

    if (
      feed?.data.pagination.hasMore &&
      !isFetching &&
      feed.data.pagination.cursor
    ) {
      prefetchFeed({ cursor, limit });
    }
  }, [cursor]);

  const handleAction = async (
    userId: string,
    status: "interested" | "ignored"
  ) => {
    const previousUsers = users;
    setUsers((prev) => prev.filter((u) => u._id !== userId));

    const { error } = await tryCatch(
      createConnection({ userId, status }).unwrap()
    );

    if (error) {
      setUsers(previousUsers);
      handleApiError(error);
    }
  };

  console.log("feed: ", feed);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-rose-400">
        <div>
          <IconAlertHexagon className="h-14 w-14 text-rose-500 drop-shadow-[0_0_12px_rgba(225,29,72,0.5)]" />
        </div>
        <h2>Oops! Something went wrong.</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Couldn't load your feed. Please try again.
        </p>
      </div>
    );
  }

  if (isFetching && users.length === 0) return <AppLoader />;

  if (users.length === 0 && !feed?.data.pagination.hasMore) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="relative">
          <div className="absolute inset-0 blur-xl rounded-full bg-rose-500/30" />
          <IconUserX className="h-14 w-14 text-rose-500 relative z-10 drop-shadow-[0_0_10px_rgba(225,29,72,0.4)]" />
        </div>

        <h2 className="text-lg font-semibold mt-4 text-foreground">
          No more devs nearby
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          You've seen everyone for now, check back later!
        </p>
      </div>
    );
  }

  if (users.length === 0) return <AppLoader />;

  return (
    <div className="mt-24 flex items-center justify-center">
      <Card className="max-w-sm">
        <CardContent className="flex items-center flex-col">
          <img
            src={users[0].profilePicture}
            alt="user-profile"
            height={250}
            width={250}
          />

          <div className="mt-3 mb-6 text-center">
            <div className="text-2xl">{users[0].name}</div>
            <p className="text-center line-clamp-1 text-sm">{users[0].about}</p>
          </div>

          <div className="flex gap-10">
            <Button
              onClick={() => handleAction(users[0]._id, "ignored")}
              className="cursor-pointer"
              variant={"secondary"}
            >
              Ignore
            </Button>
            <Button
              onClick={() => handleAction(users[0]._id, "interested")}
              className="cursor-pointer"
            >
              Interested
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feed;
