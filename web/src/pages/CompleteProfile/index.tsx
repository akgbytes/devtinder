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

import { Link, useNavigate } from "react-router";
import AppLogo from "@/components/AppLogo";
import { Uploader } from "@/components/Uploader";
import type { LocationSuggestion } from "@/services/placesApi";
import { useState } from "react";
import type { Skill } from "@/services/skillsApi";
import { useSnackbar } from "notistack";
import { useCompleteProfileMutation } from "@/services/userApi";
import { tryCatch } from "@/utils/try-catch";

const CompleteProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] =
    useState<LocationSuggestion | null>(null);

  const [skills, setSkills] = useState<Skill[]>([]);

  const form = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      name: "Aman Gupta",
      about: "",
      location: "",
    },
  });

  const [submitProfile, { isLoading }] = useCompleteProfileMutation();

  const onSubmit = async (values: CompleteProfileFormValues) => {
    console.log("Form values:", values);
    console.log("skills: ", skills);
    console.log("selected location: ", selectedLocation);

    // const today = new Date();
    // const age = today.getFullYear() - values.dateOfBirth.getFullYear();

    // maybe show a dialog with info terms n conditions -> with two button home and edit age
    // if (age < 18) {
    //   enqueueSnackbar({
    //     variant: "info",
    //     message:
    //       "We are sorry to say that you need to at least 18 years old to use our platform",
    //   });
    // }

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
      console.log("error from complete profile: ", error);
    }

    if (data) {
      console.log("response from complete profile: ", data);
    }
  };

  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-1 container mx-auto px-8 md:px-6 lg:px-24 mt-12 mb-12">
        <Link
          to="/"
          className="flex justify-center items-center gap-2 self-center font-medium mb-8"
        >
          <AppLogo />
          <span className="text-2xl">devtinder</span>
        </Link>
        <h1 className="text-3xl">Complete Profile</h1>

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
                              placeholder="Write a short intro mentioning who you are, what you build, what drives you 🔥"
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
                >
                  Save & Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default CompleteProfile;
