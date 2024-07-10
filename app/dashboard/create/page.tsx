'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CreatePostFormSchema } from '@/lib/schemas';
import { UploadDropzone } from '@/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function CreatePage() {
  const router = useRouter();
  const pathname = usePathname();
  const isCreatePage = pathname === '/dashboard/create';

  const form = useForm<z.infer<typeof CreatePostFormSchema>>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      fileUrl: undefined,
      caption: '',
    },
  });

  function onSubmit(values: z.infer<typeof CreatePostFormSchema>) {
    console.log(values);
  }

  const fileUrl = form.watch('fileUrl');

  return (
    <Dialog
      open={isCreatePage}
      onOpenChange={(isOpen) => !isOpen && router.back()}
    >
      <DialogContent aria-describedby="" className="outline-none">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <Separator className="bg-gray-200 dark:bg-neutral-700" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            {!!fileUrl ? (
              <AspectRatio className="relative">
                <Image
                  src={fileUrl}
                  fill
                  alt="post preview"
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            ) : (
              <FormField
                control={form.control}
                name="fileUrl"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <UploadDropzone
                        appearance={{
                          container: 'outline-none cursor-pointer',
                          label: 'w-fit px-2',
                          button: 'font-semibold',
                        }}
                        content={{
                          uploadIcon: (
                            <ImageUp className="w-14 h-14" strokeWidth="1px" />
                          ),
                          label: 'Drag and drop a photo here',
                        }}
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue('fileUrl', res[0].url);
                          toast.success('Upload complete');
                        }}
                        onUploadError={(error: Error) => {
                          console.error(error);
                          toast.error('Upload failed');
                        }}
                        config={{ mode: 'auto' }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {!!fileUrl && (
              <>
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="caption">Caption</FormLabel>
                      <FormControl>
                        <Input
                          type="caption"
                          id="caption"
                          placeholder="Write a caption..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-x-4 mt-4">
                  <Button variant="outline" onClick={() => form.reset()}>
                    Reset
                  </Button>

                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
