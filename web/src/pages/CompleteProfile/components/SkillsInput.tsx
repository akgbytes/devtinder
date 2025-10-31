import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BadgeCheck, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllSkillsQuery } from "@/services/skillsApi";
import type { CompleteProfileFormValues } from "@/validations";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/types/api";

interface SkillsInputProps {
  form: UseFormReturn<CompleteProfileFormValues>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const SkillsInput = ({ form, skills, setSkills }: SkillsInputProps) => {
  const { data } = useGetAllSkillsQuery();
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [inputSkill, setInputSkill] = useState("");
  const [show, setShow] = useState(false);
  const debouncedInputSkill = useDebounce(inputSkill, 100);

  useEffect(() => {
    if (data) {
      setSkillsData(data.data);
      setFilteredSkills(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (!debouncedInputSkill) {
      setFilteredSkills(skillsData);
      setShow(false);
      return;
    }

    const filtered = skillsData.filter((val) =>
      val.name.toLowerCase().includes(debouncedInputSkill.toLowerCase())
    );
    setFilteredSkills(filtered);
    setShow(filtered.length > 0);
  }, [debouncedInputSkill, skillsData]);

  const handleSelect = (skill: Skill) => {
    setInputSkill("");
    setSkills((prev) => [...prev, skill]);
    setSkillsData((prev) => {
      const removed = prev.filter((s) => s.name !== skill.name);
      return removed;
    });
    setShow(false);
  };

  return (
    <FormField
      control={form.control}
      name="skills"
      render={() => (
        <FormItem className="relative">
          <FormLabel>Skill</FormLabel>
          <FormControl>
            <Input
              placeholder="E.g. React, Node.js, LangChain..."
              value={inputSkill}
              onChange={(e) => {
                setInputSkill(e.target.value);
                setShow(true);
              }}
              autoComplete="off"
            />
          </FormControl>

          {show && filteredSkills.length > 0 && (
            <div className="absolute left-0 right-0 bottom-full mb-2 z-50 rounded-md border bg-popover shadow-md max-h-60 overflow-auto transition-all duration-150 ease-in-out">
              {filteredSkills.map((skill) => (
                <button
                  key={skill._id}
                  type="button"
                  onClick={() => handleSelect(skill)}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-accent"
                >
                  <BadgeCheck className="h-4 w-4" />
                  {skill.name}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4 mt-1 md:mb-0">
            {skills.map((skill) => (
              <Badge
                key={skill._id}
                className="flex items-center h-fit gap-1 bg-rose-600/20 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(225,29,72,0.4)] hover:bg-rose-600/30 transition"
              >
                <BadgeCheck className="w-4 h-4" />
                <span>{skill.name}</span>
                <button
                  type="button"
                  onClick={() =>
                    setSkills((prev) =>
                      prev.filter((s) => s.name !== skill.name)
                    )
                  }
                  className="cursor-pointer"
                >
                  <X className="w-3 h-3 hover:opacity-70" />
                </button>
              </Badge>
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SkillsInput;
