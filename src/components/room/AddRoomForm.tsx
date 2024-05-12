"use client";
import * as z from "zod";
import { Hotel, Room } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast, useToast } from "../ui/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import { Loader2, XCircle } from "lucide-react";

interface AddHotelFormProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogueOpen: ({
    hotel,
    room,
    handleDialogueOpen,
  }: AddHotelFormProps) => void;
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be 3 character long",
  }),
  description: z.string().min(10, {
    message: "Description must be 10 character long",
  }),
  bedCount: z.coerce.number().min(1, { message: " Bed count is required" }),
  guestCount: z.coerce.number().min(1, { message: " Guest count is required" }),
  bathroomCount: z.coerce
    .number()
    .min(1, { message: " Bathroom count is required" }),
  kingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.string().min(1, { message: "Image is required" }),
  breakFastPrice: z.coerce.number().optional(),
  roomPrice: z.coerce.number().min(1, { message: " Room Price is required" }),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProofed: z.boolean().optional(),
});

const AddRoomForm = ({
  hotel,
  room,
  handleDialogueOpen,
}: AddHotelFormProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const {toast} = useToast()

  


 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      title: "",
      description: "",
      bedCount: 0,
      guestCount: 0,
      bathroomCount: 0,
      kingBed: 0,
      queenBed: 0,
      image: "",
      breakFastPrice: 0,
      roomPrice: 0,
      roomService: false,
      TV: false,
      balcony: false,
      freeWifi: false,
      cityView: false,
      oceanView: false,
      forestView: false,
      mountainView: false,
      airCondition: false,
      soundProofed: false,
    },
  });

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf('/') * 1);

    axios
      .post('/api/uploadthing/delete', { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage('');
          toast({
            variant: 'success',
            description: 'Image removed'
          });
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          description: 'Something went wrong'
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Title *</FormLabel>
                <FormDescription>
                  Kindly provide your Room Number
                </FormDescription>
                <FormControl>
                  <Input placeholder="Double Room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Description *</FormLabel>
                <FormDescription>
                  Kindly Describe the kind of room you desire
                </FormDescription>
                <FormControl>
                  <Input placeholder="Room that gives you a nice ocean view" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Choose Room Amenities</FormLabel>
            <FormDescription>What makes this room a nice choice </FormDescription>
            <div className="grid gird-cols-2 mt-2">
            <FormField
                  control={form.control}
                  name='roomService'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> 24/7 Room Service</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='TV'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Watch Your Favorite Shows</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='balcony'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> View The World</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='freeWifi'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> We help You Connect To The World From Our Hotel</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cityView'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Have a View Of The City</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='oceanView'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Take A Peek On The Atlantic</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='forestView'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> See Wild Games</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='mountainView'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Take A Peek On The Highest Mountains</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='airCondition'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Ofcourse We All Love Airconditioned Room</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='soundProofed'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Soundproof Sounds Nice?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </div>
          <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-3'>
                  <FormLabel>Please upload your image*</FormLabel>
                  <FormDescription>
                    Kindly select an image for your hotel
                  </FormDescription>
                  <FormControl>
                    {image ? (
                      <>
                        <div className='relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200] mt-4 '>
                          <Image
                            fill
                            src={image}
                            alt='Hotel Image'
                            className='object-contain'
                            style={{ width: "auto", height: "auto" }}
                          />
                          <Button
                            onClick={() => handleImageDelete(image)}
                            type='button'
                            size='icon'
                            variant='ghost'
                            className='absolute right-[-12px] top-0'
                          >
                            {imageIsDeleting ? <Loader2 /> : <XCircle />}
                          </Button>
                        </div>
                      </> 
                      ) : ( 
                      <>
                        <div className='flex flex-col items-center max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4'>
                          <UploadButton
                            endpoint='imageUploader'
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              console.log("Files: ", res);
                              setImage(res[0].url);
                              toast({
                                variant: 'success',
                                description: 'Upload Successful',
                              });
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                variant: 'destructive',
                                description: 'ERROR! ${error.message}',
                              });
                            }}
                          />
                        </div>
                      </>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
        </form>
      </Form>
    </div>
  );
};

export default AddRoomForm;
