import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ViewProfileModal } from "@/components/ViewProfileModal";
import { useReviewConnectionMutation } from "@/services/connectionsApi";
import { useGetRequestsQuery } from "@/services/usersApi";
import type { User } from "@/types/user";
import { handleApiError } from "@/utils/error";
import { tryCatch } from "@/utils/try-catch";
import { Mail } from "lucide-react";
import { useSnackbar } from "notistack";
import { useState } from "react";

const Requests = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, isLoading, isError, refetch } = useGetRequestsQuery();
  const [reviewRequest] = useReviewConnectionMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error</div>;
  }

  console.log("requests: ", data);

  const handleSubmit = async (
    status: "accepted" | "rejected",
    requestId: string
  ) => {
    const { data, error } = await tryCatch(
      reviewRequest({ status, requestId }).unwrap()
    );

    if (error) {
      handleApiError(error);
    }

    if (data) {
      console.log("review response\n", data);
      enqueueSnackbar(data.message, { variant: "success" });
      refetch();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Mail className="h-6 w-6" /> Requests
      </h1>
      <div className="mt-4 flex flex-col gap-3">
        {data.data.length === 0 && <p>No requests yet.</p>}
        {data.data.map((request) => (
          <Card key={request.requestId}>
            <CardContent className="flex flex-col sm:flex-row w-full justify-between items-center gap-3">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={request.user.profilePicture}
                  alt={request.user.name}
                  className="size-24 sm:size-10 rounded-full object-cover"
                  onClick={() => {
                    setSelectedUser(request.user);
                  }}
                />
                <span className="font-medium">{request.user.name}</span>
              </div>

              <div className="space-x-4">
                <Button
                  onClick={() => {
                    handleSubmit("accepted", request.requestId);
                  }}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit("rejected", request.requestId);
                  }}
                >
                  Reject
                </Button>
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

export default Requests;
