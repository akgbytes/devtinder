import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  completeProfileSchema,
  type CompleteProfileFormValues,
} from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/constants";
import { capitalize } from "@/utils/capitalize";

import LocationInput from "./components/LocationInput";
import SkillsInput from "./components/SkillsInput";

import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { Uploader } from "@/components/Uploader";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCompleteProfileMutation } from "@/services/usersApi";
import { tryCatch } from "@/utils/try-catch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LocationSuggestion, Skill } from "@/types/api";
import { handleApiError } from "@/utils/error";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { Spinner } from "@/components/ui/spinner";

const CompleteProfile = () => {
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const nameFromParams = searchParams.get("name");
  const emailFromParams = searchParams.get("email");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedLocation, setSelectedLocation] =
    useState<LocationSuggestion | null>(null);

  const [skills, setSkills] = useState<Skill[]>([]);

  const form = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      name: nameFromParams || "",
      about: "",
      location: "",
    },
  });

  const [submitProfile, { isLoading }] = useCompleteProfileMutation();

  if (!nameFromParams || !emailFromParams) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: CompleteProfileFormValues) => {
    console.log("Form values:", values);
    console.log("skills: ", skills);
    console.log("selected location: ", selectedLocation);

    const today = new Date();
    const birthDate = new Date(values.dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      setOpen(true);
      return;
    }

    console.log("Profile submitted:", values);

    const { data, error } = await tryCatch(
      submitProfile({
        email: "akgbytes@gmail.com",
        name: values.name,
        about: values.about,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
        profilePicture: values.profilePicture,
        skills,
        location: selectedLocation!,
      }).unwrap()
    );

    if (error) {
      handleApiError(error);
      console.log("error from complete profile\n ", error);
    }

    if (data) {
      console.log("response from complete profile \n ", data);
      enqueueSnackbar({ variant: "success", message: data.message });
      dispatch(setUser(data.data));
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-1 container mx-auto px-8 md:px-6 lg:px-24 mt-12 mb-12">
        <Link
          to="/"
          className="flex justify-center items-center gap-2 self-center font-medium mb-8"
        >
          <img src="/logo.svg" alt="logo" className="size-5" />
          <span className="text-xl">devtinder</span>
        </Link>
        <h1 className="text-2xl font-medium">Complete Your Profile</h1>

        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className="grid gap-4">
                    {/* name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* about */}
                    <FormField
                      control={form.control}
                      name="about"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write a short intro that clearly tells who you are, what you build, what drives you 🔥"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="sm:grid grid-cols-2 md:flex md:flex-col xl:grid gap-2 flex flex-col">
                      {/* dob */}
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick your birth date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  captionLayout="dropdown"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* gender */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(Gender).map((val) => (
                                  <SelectItem key={val} value={val}>
                                    {capitalize(val)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* location with autocomplete */}
                    <LocationInput
                      form={form}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                    />

                    {/* Skills */}

                    <SkillsInput
                      form={form}
                      skills={skills}
                      setSkills={setSkills}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="profilePicture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Picture</FormLabel>
                          <FormControl>
                            <Uploader
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  size="sm"
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Save & Continue"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Underage Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md text-center flex flex-col items-center justify-center space-y-4 py-6">
              <DialogHeader>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl">😔</div>
                  <DialogTitle className="text-2xl font-semibold">
                    You&apos;re Too Young
                  </DialogTitle>
                </div>

                <DialogDescription className="text-base leading-relaxed mt-2">
                  You must be at least{" "}
                  <span className="font-bold text-foreground">
                    18 years old{" "}
                  </span>
                  to join <span className="font-medium">Devtinder</span>. Please
                  double-check your date of birth or come back when you&apos;re
                  eligible.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex justify-center gap-3 mt-1 mb-0">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="min-w-[120px] cursor-pointer"
                >
                  Edit Age
                </Button>

                <Button
                  onClick={() => navigate("/")}
                  className="min-w-[120px] cursor-pointer"
                >
                  Go Home
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default CompleteProfile;
