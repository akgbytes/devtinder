import { useLogoutMutation } from "@/services/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser } from "@/store/slices/authSlice";
import { handleApiError } from "@/utils/error";
import { toast } from "@/utils/toast";
import { tryCatch } from "@/utils/try-catch";
import {
  Navbar as NavbarFromHeroUI,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useNavigate } from "react-router";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const { data, error } = await tryCatch(logout().unwrap());

    if (error) {
      handleApiError(error);
    }

    if (data) {
      toast(data.message, "success");
      dispatch(clearUser());
      navigate("/login");
    }
  };

  return (
    <NavbarFromHeroUI
      classNames={{
        wrapper: "max-w-full mx-auto px-4 md:px-6 lg:px-8",
      }}
    >
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">devtinder</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform cursor-pointer"
                color="secondary"
                name={user.firstname + " " + user.lastname}
                size="md"
                src={user.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>

              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : null}
      </NavbarContent>
    </NavbarFromHeroUI>
  );
}
