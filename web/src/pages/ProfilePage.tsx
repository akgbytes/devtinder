import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, X, BadgeCheck, Save } from "lucide-react";
import { Uploader } from "@/components/Uploader";
import { useSnackbar } from "notistack";
import { capitalize } from "@/utils/capitalize";
import {
  useUpdateAboutMutation,
  useUpdateProfilePictureMutation,
  useUpdateSkillsMutation,
} from "@/services/usersApi";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import type { Skill } from "@/types/api";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllSkillsQuery } from "@/services/skillsApi";

export default function ProfilePage() {
  const { enqueueSnackbar } = useSnackbar();
  const user = useAppSelector((state) => state.auth.user);

  const [editingAbout, setEditingAbout] = useState(false);
  const [about, setAbout] = useState(user?.about || "");
  const [updateAbout, { isLoading: aboutLoading }] = useUpdateAboutMutation();

  const saveAbout = async () => {
    const { error, data } = await tryCatch(updateAbout({ about }).unwrap());

    if (error) {
      handleApiError(error);
    }

    if (data) {
      setEditingAbout(false);
      console.log("about update response: ", data);
      enqueueSnackbar({ message: data.message, variant: "success" });
      // refetch user
    }
  };

  const [editingSkills, setEditingSkills] = useState(false);
  const [skills, setSkills] = useState(user?.skills || []);
  const { data } = useGetAllSkillsQuery();
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [inputSkill, setInputSkill] = useState("");
  const [show, setShow] = useState(false);
  const debouncedInputSkill = useDebounce(inputSkill, 100);

  const [updateSkills, { isLoading: skillsLoading }] =
    useUpdateSkillsMutation();

  const saveSkills = async () => {
    const { error, data } = await tryCatch(updateSkills({ skills }).unwrap());

    if (error) {
      handleApiError(error);
    }

    if (data) {
      setEditingAbout(false);
      console.log("skill update response: ", data);
      enqueueSnackbar({ message: data.message, variant: "success" });
    }
  };

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

  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || ""
  );

  const [saveProfilePicture, { isLoading: profilePictureLoading }] =
    useUpdateProfilePictureMutation();

  if (!user) return <p className="text-center mt-20">No profile found.</p>;

  const age = Math.floor(
    (new Date().getTime() - new Date(user.dateOfBirth).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center text-center bg-background/70 border border-border rounded-2xl p-8 shadow-sm backdrop-blur-md">
        {/* Profile Picture */}

        <div className="w-full">
          <Uploader
            value={profilePicture}
            onChange={(url) => {
              console.log("updated pic");
              setProfilePicture(url!);
            }}
            onUpload={(img) => {
              saveProfilePicture({ profilePicture: img });
            }}
            successMessage="Profile picture updated"
          />
        </div>

        <h1 className="mt-4 text-2xl font-semibold">{user.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {capitalize(user.gender)}, {age}
        </p>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-2">
          <MapPin className="h-4 w-4" />
          {`${user.location.city}, ${user.location.state}`}
        </div>

        <div className="max-w-sm">
          <div className="mt-6">
            {editingAbout ? (
              <>
                <div className="flex items-center justify-between">
                  <h2>About</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={saveAbout}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    disabled={aboutLoading}
                  >
                    {aboutLoading ? (
                      <>
                        <Spinner />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="size-3" />
                        <span>Save</span>
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={about}
                  className="resize-none w-full"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2>About</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingAbout(true)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-3" />
                    Edit
                  </Button>
                </div>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed break-words overflow-hidden">
                  {about}
                </p>
              </>
            )}
          </div>

          <div className="mt-6">
            {editingSkills ? (
              <>
                <div className="flex items-center justify-between">
                  <h2>Skills</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={saveSkills}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    disabled={skillsLoading}
                  >
                    {skillsLoading ? (
                      <>
                        <Spinner />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="size-3" />
                        <span>Save</span>
                      </>
                    )}
                  </Button>
                </div>
                <div>
                  <Input
                    placeholder="E.g. React, Node.js, LangChain..."
                    value={inputSkill}
                    onChange={(e) => {
                      setInputSkill(e.target.value);
                      setShow(true);
                    }}
                    autoComplete="off"
                  />

                  {show && filteredSkills.length > 0 && (
                    <div className="mb-2 z-50 rounded-md border bg-popover shadow-md max-h-60 overflow-auto transition-all duration-150 ease-in-out">
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

                  <div className="flex flex-wrap gap-2 mb-4 mt-2 md:mb-0">
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
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2>Skills</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setEditingSkills(true)}
                  >
                    <Pencil className="size-3" />
                    Edit
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-1 md:mb-0">
                  {skills.map((skill) => (
                    <Badge
                      key={skill._id}
                      className="flex items-center h-fit gap-1 bg-rose-600/20 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(225,29,72,0.4)] hover:bg-rose-600/30 transition"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      <span>{skill.name}</span>
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Joined date */}
        <p className="text-xs text-muted-foreground mt-6">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
