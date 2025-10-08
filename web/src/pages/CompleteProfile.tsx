import { useState, useEffect, useRef } from "react";
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
} from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Loader2 } from "lucide-react";
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
import { useGetAutocompleteSuggestionsMutation } from "@/services/placesApi";

interface LocationSuggestion {
  placeId: string;
  displayName: string;
  lat: number;
  lng: number;
  city: string | null | undefined;
  state: string | null | undefined;
  country: string | null;
}

const CompleteProfile = () => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationSuggestion | null>(null);

  const [getAutocompleteSuggestions, { isLoading: isLoadingSuggestions }] =
    useGetAutocompleteSuggestionsMutation();

  const form = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      name: "Aman Gupta",
      about: "",
      gender: "male",
      dateOfBirth: new Date(),
      location: "",
    },
  });

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await getAutocompleteSuggestions({
        input: query,
      }).unwrap();

      console.log("API Response:", response);

      const fetchedSuggestions = response.data || [];
      console.log("Fetched suggestions:", fetchedSuggestions);

      setSuggestions(fetchedSuggestions);
      setShowSuggestions(fetchedSuggestions.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    form.setValue("location", value);
    setSelectedLocation(null);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    const locationText = suggestion.displayName;
    setInputValue(locationText);
    form.setValue("location", locationText);
    setSelectedLocation(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);

    // Store the complete location data
    console.log("Selected location:", {
      name: suggestion.displayName,
      lat: suggestion.lat,
      lng: suggestion.lng,
      city: suggestion.city,
      state: suggestion.state,
      country: suggestion.country,
    });
  };

  const onSubmit = async (values: CompleteProfileFormValues) => {
    console.log("Form values:", values);

    // Include location details if available
    if (selectedLocation) {
      console.log("Location details:", {
        location: values.location,
        coordinates: {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        },
        city: selectedLocation.city,
        state: selectedLocation.state,
        country: selectedLocation.country,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 mt-24">
        <h1 className="text-4xl">Complete Profile</h1>

        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
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
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
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
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
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

                  {/* location with autocomplete */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Location</FormLabel>
                        <Popover
                          open={showSuggestions}
                          onOpenChange={setShowSuggestions}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="Enter your location"
                                  value={inputValue}
                                  onChange={(e) =>
                                    handleInputChange(e.target.value)
                                  }
                                  autoComplete="off"
                                />
                                {isLoadingSuggestions && (
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                  </div>
                                )}
                              </div>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full p-0"
                            align="start"
                            onOpenAutoFocus={(e) => e.preventDefault()}
                          >
                            <div className="max-h-60 overflow-auto">
                              {suggestions.map((suggestion) => (
                                <button
                                  key={suggestion.placeId}
                                  type="button"
                                  className="w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground flex items-start gap-2 border-b last:border-b-0"
                                  onClick={() => {
                                    handleSelectSuggestion(suggestion);
                                  }}
                                >
                                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">
                                    {suggestion.displayName}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  size="sm"
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  Submit
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
