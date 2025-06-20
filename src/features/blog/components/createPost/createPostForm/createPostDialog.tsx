import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

type CreatePostDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    children: ReactNode;
};

export const CreatePostDialog = ({ open, onClose, onSubmit, children }: CreatePostDialogProps) => {
    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new post for your page</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">{children}</div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
