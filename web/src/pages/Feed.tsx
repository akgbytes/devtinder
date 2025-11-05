import AppLoader from "@/components/AppLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateConnectionMutation } from "@/services/connectionsApi";
import { useGetFeedQuery, usePrefetch } from "@/services/usersApi";
import type { User } from "@/types/user";
import { handleApiError } from "@/utils/error";
import { tryCatch } from "@/utils/try-catch";
import { useEffect, useState } from "react";

import { IconAlertHexagon, IconUserX } from "@tabler/icons-react";
import { ViewProfileModal } from "@/components/ViewProfileModal";

const Feed = () => {
  const limit = 20;
  const [cursor, setCursor] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [createConnection] = useCreateConnectionMutation();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
    <div className="mt-20 flex items-center justify-center px-4">
      <Card className="max-w-sm w-full bg-card/50 border border-rose-500/10 backdrop-blur-md shadow-[0_0_25px_-8px_rgba(225,29,72,0.2)] rounded-2xl">
        <CardContent className="flex flex-col items-center p-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-rose-500/30 rounded-full scale-110" />
            <img
              src={users[0].profilePicture}
              alt={`${users[0].name}'s profile`}
              height={167}
              width={250}
              className="rounded-xl object-cover object-center shadow-lg relative z-10 h-[167px] w-[250px]"
              onClick={() => {
                setSelectedUser(users[0]);
              }}
            />
          </div>

          {/* Name & Bio */}
          <div className="mt-6 mb-8 text-center space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">
              {users[0].name}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2 max-w-[220px] mx-auto">
              {users[0].about || "No bio available"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6">
            <Button
              onClick={() => handleAction(users[0]._id, "ignored")}
              variant="secondary"
              className="w-24 h-10 text-sm rounded-full border border-neutral-700 hover:bg-neutral-800 transition-colors"
            >
              Ignore
            </Button>

            <Button
              onClick={() => handleAction(users[0]._id, "interested")}
              className="w-28 h-10 text-sm rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-[0_0_12px_rgba(225,29,72,0.3)] transition-all"
            >
              Interested
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedUser && (
        <ViewProfileModal
          open={!!selectedUser}
          onOpenChange={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default Feed;
