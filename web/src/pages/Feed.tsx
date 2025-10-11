import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRequiredUser } from "@/routes/ProtectedRoutes";

const Feed = () => {
  const user = useRequiredUser();
  return (
    <div>
      <h1>Feed page</h1>

      <div className="mt-24 flex items-center justify-center">
        <Card className="max-w-sm">
          <CardContent className="flex items-center flex-col">
            <img
              src={user.profilePicture}
              alt="user-profile"
              height={250}
              width={250}
            />

            <div className="mt-3 mb-6 text-center">
              <div className="text-2xl">{user.name}</div>
              <p className="text-center line-clamp-3 text-sm">{user.about}</p>
            </div>

            <div className="flex gap-10">
              <Button className="cursor-pointer" variant={"secondary"}>
                Ignore
              </Button>
              <Button className="cursor-pointer">Interested</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feed;
