import { Camera } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProfilePhotoUploadForm from "../../public/Authentication/User-Form/profile-photo-upload-form";

const ProfileImageDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="icon-xs" />}>
        <Camera className="size-4" />
      </DialogTrigger>
      <DialogContent className=" max-w-lg!">
        <ProfilePhotoUploadForm openChange={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageDialog;
