import { Card, CardContent } from "@/components/ui/card";
import { useGetRequestsQuery } from "@/services/usersApi";
import { Mail } from "lucide-react";

const Requests = () => {
  const { data, isLoading, isError } = useGetRequestsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error</div>;
  }

  console.log("requests: ", data);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Mail className="h-6 w-6" /> Requests
      </h1>
      <div className="mt-4 flex flex-col gap-3">
        {data.data.length === 0 && <p>No requestss yet.</p>}
        {data.data.map((requests) => (
          <Card key={requests._id}>
            <CardContent className="flex items-center gap-3">
              <img
                src={requests.profilePicture}
                alt={requests.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-medium">{requests.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Requests;
