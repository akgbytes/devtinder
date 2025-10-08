import {
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
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAutocompleteSuggestionsMutation } from "@/services/placesApi";
import type { CompleteProfileFormValues } from "@/utils/validations";
import { Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

interface LocationSuggestion {
  placeId: string;
  displayName: string;
  lat: number;
  lng: number;
  city: string | null | undefined;
  state: string | null | undefined;
  country: string | null;
}

interface LocationInputProps {
  form: UseFormReturn<CompleteProfileFormValues>;
}

const LocationInput = ({ form }: LocationInputProps) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [inputLocationValue, setInputLocationValue] = useState("");
  const debouncedInputLocation = useDebounce(inputLocationValue);

  const [getAutocompleteSuggestions, { isLoading: isLoadingSuggestions }] =
    useGetAutocompleteSuggestionsMutation();

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
      setSuggestions(fetchedSuggestions);
      setShowSuggestions(fetchedSuggestions.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (debouncedInputLocation.length >= 3) {
      fetchSuggestions(debouncedInputLocation);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedInputLocation]);

  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    const locationText = suggestion.displayName;
    setInputLocationValue(locationText);
    form.setValue("location", locationText);

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
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Location</FormLabel>
          <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your location"
                    value={inputLocationValue}
                    onChange={(e) => setInputLocationValue(e.target.value)}
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
                    <span className="text-sm">{suggestion.displayName}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationInput;
