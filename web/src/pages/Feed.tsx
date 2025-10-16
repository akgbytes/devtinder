import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateConnectionMutation } from "@/services/connectionsApi";
import { useGetFeedQuery, usePrefetch } from "@/services/usersApi";
import type { User } from "@/types/user";
import { handleApiError } from "@/utils/error";
import { tryCatch } from "@/utils/try-catch";
import { useEffect, useState } from "react";

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
  if (isError) return <p>Error loading feed</p>;

  if (isFetching && users.length === 0) return <p>Loading...</p>;
  if (users.length === 0 && !feed?.data.pagination.hasMore) {
    return <p>No more users left</p>;
  }
  if (users.length === 0) return <p>Loading...</p>;

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
