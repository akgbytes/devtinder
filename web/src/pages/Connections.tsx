import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";
import { useGetConnectionsQuery } from "@/services/usersApi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { User } from "@/types/user";
import { ViewProfileModal } from "@/components/ViewProfileModal";
import AppLoader from "@/components/AppLoader";
import { useSnackbar } from "notistack";
import { useAppSelector } from "@/store/hooks";

const Connections = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, isLoading, isError } = useGetConnectionsQuery();

  const { enqueueSnackbar } = useSnackbar();

  if (isLoading) {
    return <AppLoader />;
  }

  if (isError || !data) {
    return <div>Error</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <HeartHandshake className="h-6 w-6" /> Connections
      </h1>
      <div className="mt-4 flex flex-col gap-3">
        {data.data.length === 0 && <p>No connections yet.</p>}
        {data.data.map((connection) => (
          <Card key={connection._id}>
            <CardContent className="flex flex-col sm:flex-row w-full justify-between items-center gap-3">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={connection.profilePicture}
                  alt={connection.name}
                  className="size-24 sm:size-10 rounded-full object-cover"
                  onClick={() => {
                    setSelectedUser(connection);
                  }}
                />
                <span className="font-medium">{connection.name}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* View Profile button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(connection);
                  }}
                >
                  View Profile
                </Button>

                {/* Only for premium users */}
                {currentUser?.isPremium && (
                  <Button
                    onClick={() =>
                      enqueueSnackbar("Chat feature will be available soon!", {
                        variant: "info",
                      })
                    }
                  >
                    Chat
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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

export default Connections;
