import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLogoutMutation } from "@/services/authApi";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";
import { useSnackbar } from "notistack";
import { clearUser } from "@/store/slices/authSlice";
import { Gem, HeartHandshake, Home, Mail, User } from "lucide-react";
import { IconLogout } from "@tabler/icons-react";

const UserButton = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const { data, error } = await tryCatch(logout().unwrap());

    if (error) {
      handleApiError(error);
    }

    if (data) {
      enqueueSnackbar({ message: data.message, variant: "success" });
      dispatch(clearUser());
      navigate("/login");
    }
  };

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage src={user.profilePicture} alt="Profile image" />
            <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="min-w-xs mt-1 mr-4 rounded-xl"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/user/profile")}
            >
              <User className="size-4" aria-hidden="true" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/pricing")}
            >
              <Gem className="size-4" aria-hidden="true" />
              <span>Premium</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/user/connections")}
            >
              <HeartHandshake className="size-4" aria-hidden="true" />
              <span>Connections</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/user/requests")}
            >
              <Mail className="size-4" aria-hidden="true" />
              <span>Requests</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <IconLogout className="size-4" aria-hidden="true" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserButton;
