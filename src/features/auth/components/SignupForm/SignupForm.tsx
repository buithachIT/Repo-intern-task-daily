'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InputPassword } from '@/components/ui/passwordInputCustom';
import Link from 'next/link';
import { lusitana } from '@/config/fonts';
import { signupFormSchema, SignupFormValues } from './SignupSchema';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { asyncHandlerWrapper } from '@/helper/api';
import { signUpAPI } from '@/lib/action/auth';

const SignupForm = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      accept: false,
    },
  });
  const onSubmit = async (data: SignupFormValues) => {
    await asyncHandlerWrapper(
      async () => {
        await signUpAPI(data);
        toast.success('Đăng ký thành công');
        router.push('/login');
      },
      (error) => {
        toast.error(error);
      },
    );
  };
  return (
    <div className="p-10 shadow-xl">
      {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre> */}

      <p className={`${lusitana.className} text-3xl font-bold mb-2`}>
        Create to share your feeling!
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    className="px-[15px] py-3 text-[12px] text-sm"
                    {...field}
                    placeholder="Enter first name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    className="px-[15px] py-3 text-[12px] text-sm"
                    {...field}
                    placeholder="Enter last name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="px-[15px] py-3 text-[12px] text-sm"
                    {...field}
                    placeholder="Enter email address"
                    maxLength={255}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="justify-between items-center ">
            <div className=" items-center gap-[6px]">
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <InputPassword
                          className="px-[15px] py-3 text-[12px] text-sm"
                          placeholder="Enter password"
                          maxLength={16}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <InputPassword
                          className="px-[15px] py-3 text-[12px] text-sm"
                          {...field}
                          placeholder="Re-enter password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="accept"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center space-y-0">
                    <FormControl>
                      <Checkbox
                        className=""
                        onCheckedChange={field.onChange}
                        checked={field.value}
                      />
                    </FormControl>
                    <FormLabel className="font-normal mt-3 text-sm">
                      By signing up you agree to our{' '}
                      <Link
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Terms & Conditions
                      </Link>{' '}
                      and&nbsp;
                      <Link
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Link href="" className="text-[12px] mt-2 text-primary flex flex-end">
              Forgot password?
            </Link>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
export default SignupForm;
