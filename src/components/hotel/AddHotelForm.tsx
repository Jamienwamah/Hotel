'use client';
import * as z from 'zod';
import { Hotel, Room } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { UploadButton } from '@/utils/uploadthing';
import { Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import useLocation from '../../../hooks/useLocation';
import { ICity, IState } from 'country-state-city';

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};
const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be atleast 3 characters long',
  }),
  description: z.string().min(10, {
    message: 'Description must be atleast 10 characters long',
  }),
  image: z.string().min(1, {
    message: 'Please upload your image',
  }),
  country: z.string().min(1, {
    message: 'Kindly fill in your country to continue',
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: 'Title must be atleast 3 characters long',
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  resturant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNight: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
});
const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const countries = getAllCountries();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      country: '',
      state: '',
      city: '',
      locationDescription: '',
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      resturant: false,
      shopping: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNight: false,
      swimmingPool: false,
      coffeeShop: false,
    },
  });

  useEffect(() => {
    const selectedCountry = form.watch('country');
    const selectedState = form.watch('state');
    const stateCities = getStateCities(selectedCountry, selectedState);
    if (stateCities) {
      setCities(stateCities);
    }
  }, [form.watch('country'), form.watch('state'), getStateCities]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <h3 className='text-lg  font-semibold'>
            {hotel ? 'update your hotel' : 'Describe your hotel'}
          </h3>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1 flex flex-col gap-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Title *</FormLabel>
                    <FormDescription>
                      Kindly provide your hotel name
                    </FormDescription>
                    <FormControl>
                      <Input placeholder='Veron Hotel' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Description *</FormLabel>
                    <FormDescription>
                      Established as one of the best of her kind, <br />
                      veron hotel is out to serve the public with lots of
                      services that suits
                      <br />
                      you while you decide to lodge with us
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder='Give a description of what you want and we will be pleased to serve you'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Services We Offer *</FormLabel>
                <FormDescription>
                  Veron hotel greatly values her customers, <br /> therefore
                  provides lots of services to her customer,
                  <br /> kindly select what service you want and we will be
                  pleased to serve you better
                </FormDescription>
              </div>
              <div className='grid grid-cols-2 gap-4 mt-2'>
                <FormField
                  control={form.control}
                  name='gym'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Gym</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='spa'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Spa</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bar'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Bar</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='laundry'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Laundry</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='resturant'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Resturant</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='shopping'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Shopping</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='freeParking'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Free Parking</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bikeRental'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Bike Rental</FormLabel>
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
                      <FormLabel> Free Wifi</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='movieNight'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Movie Night</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='swimmingPool'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Swimming Pool</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='coffeeShop'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Morning Coffee</FormLabel>
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
          </div>
          <div className='flex-1 flex flex-col gap-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Country *</FormLabel>
                    <FormDescription>
                      In which country is your property located
                    </FormDescription>
                    <Select
                    disabled = {isLoading}
                    onValueChange={field.onChange}
                    value = {field.value}
                    defaultValue = {field.value}
                    >
                      <SelectTrigger className='bg-background'>
                        <SelectValue defaultValue={field.value} placeholder='Choose a country' />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => {
                          return <SelectItem key ={country.isoCode} value={country.isoCode}>{country.name}</SelectItem>
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='state'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select State *</FormLabel>
                    <FormDescription>
                      Kindly select the state your property located
                    </FormDescription>
                    <Select
                    disabled = {isLoading || states.length < 1} 
                    onValueChange={field.onChange}
                    value = {field.value}
                    defaultValue = {field.value}
                    >
                      <SelectTrigger className='bg-background'>
                        <SelectValue defaultValue={field.value} placeholder='Choose a state' />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => {
                          return <SelectItem key ={state.isoCode} value={state.isoCode}>{state.name}</SelectItem>
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddHotelForm;
