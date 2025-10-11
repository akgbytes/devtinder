import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface Request {
  id: string;
  name: string;
  avatar: string;
}

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {}, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Mail className="h-6 w-6" /> Requests
      </h1>
      <div className="mt-4 flex flex-col gap-3">
        {requests.length === 0 && <p>No requests.</p>}
        {requests.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex items-center gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-medium">{r.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Requests;
