import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";
import { useGetConnectionsQuery } from "@/services/usersApi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { User } from "@/types/user";
import { ViewProfileModal } from "@/components/ViewProfileModal";

const Connections = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, isLoading, isError } = useGetConnectionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error</div>;
  }

  console.log("connections: ", data);

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

              <div>
                <Button>Chat</Button>
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
