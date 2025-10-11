import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { HeartHandshake } from "lucide-react";

interface Connection {
  id: string;
  name: string;
  avatar: string;
}

const Connections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {}, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <HeartHandshake className="h-6 w-6" /> Connections
      </h1>
      <div className="mt-4 flex flex-col gap-3">
        {connections.length === 0 && <p>No connections yet.</p>}
        {connections.map((c) => (
          <Card key={c.id}>
            <CardContent className="flex items-center gap-3">
              <img
                src={c.avatar}
                alt={c.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-medium">{c.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Connections;
