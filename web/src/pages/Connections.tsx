import { Card, CardContent } from "@/components/ui/card";

import { HeartHandshake } from "lucide-react";
import { useGetConnectionsQuery } from "@/services/usersApi";
import { Button } from "@/components/ui/button";

const Connections = () => {
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
            <CardContent className="flex justify-between">
              <div className="flex items-center gap-3">
                {" "}
                <img
                  src={connection.profilePicture}
                  alt={connection.name}
                  className="h-10 w-10 rounded-full object-cover"
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
    </div>
  );
};

export default Connections;
