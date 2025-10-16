import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useReviewConnectionMutation } from "@/services/connectionsApi";
import { useGetRequestsQuery } from "@/services/usersApi";
import { handleApiError } from "@/utils/error";
import { tryCatch } from "@/utils/try-catch";
import { Mail } from "lucide-react";
import { useSnackbar } from "notistack";
import { use } from "react";

const Requests = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isError, refetch } = useGetRequestsQuery();
  const [reviewRequest, { isLoading: reviewLoading }] =
    useReviewConnectionMutation();

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
            <CardContent className="flex w-full justify-between items-center gap-3">
              <div className="flex gap-4">
                <img
                  src={request.user.profilePicture}
                  alt={request.user.name}
                  className="h-10 w-10 rounded-full object-cover"
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
    </div>
  );
};

export default Requests;
