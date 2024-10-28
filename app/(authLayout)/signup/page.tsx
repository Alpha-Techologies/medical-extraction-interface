"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { SignUpValidation } from "@/utils/schema";
import { useSignupMutation } from "@/redux/features/user";

export default function SignUp() {
  const [signupForm] = Form.useForm();
  console.log("signup page");

  // auth state
  const authState = useSelector(selectAuth);
  const [signup, { isLoading, error, isError }] = useSignupMutation();

  // Signup validation with yup
  const yupSync: any = {
    async validator({ field }: { field: string }, value: string) {
      await SignUpValidation.validateSyncAt(field, { [field]: value });
    },
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const credentials = signupForm.getFieldsValue();
    const res = await signup(credentials);
    console.log(res.error);
    if (res && "access_token" in res) {
      toast.success("Account Successfully Created");
    } else if (res && "error" in res) {
      const { error } = res as any;
      const errorMessage = error.data?.message;
      toast.error(errorMessage);
    } else {
      toast.error("All fields are required");
    }

    return (
      //@ts-ignore
      <div className='h-screen w-full flex items-start justify-center font-inter py-8'>
        <div className='w-2/3 gap-4'>
          <div className='flex items-start-start flex-col mb-8'>
            <h1 className='text-4xl justified font-roboto text-black mb-2'>
              Welcome
            </h1>
            <p className='text-gray-600'>Sign up to use our services</p>
          </div>

          {/* Signup Form */}
          {isError && (
            <div className='text-red-500'>
              You are not connected to the internet!
            </div>
          )}
          <Form
            className='flex flex-col space-y-2 mb-3 text-secondary'
            form={signupForm}
            name='horizontal_login'
            layout='inline'
            onFinish={handleSubmit}>
            <Form.Item
              name='first_name'
              className='w-full '
              rules={[yupSync]}>
              <Input
                className='h-9'
                placeholder='First Name'
              />
            </Form.Item>
            <Form.Item
              name='last_name'
              className='w-full '
              rules={[yupSync]}>
              <Input
                className='h-9'
                placeholder='Last Name'
              />
            </Form.Item>
            <Form.Item
              name='email'
              className='w-full '
              rules={[yupSync]}>
              <Input
                className='h-9'
                placeholder='Email'
              />
            </Form.Item>
            <Form.Item
              name='password'
              className='w-full'
              rules={[yupSync]}>
              <Input.Password
                type='password'
                className='h-9'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item
              name='organization'
              className='w-full '
              rules={[yupSync]}>
              <Input
                className='h-9'
                placeholder='Organization'
              />
            </Form.Item>
            <Form.Item className='w-full'>
              <Button
                disabled={isLoading}
                className='bg-primary font-medium text-sm py-3 w-full flex items-center justify-center text-white cursor-pointer border border-[primary] hover:bg-white hover:text-primary transition duration-150 ease-linear rounded-3xl my-3'
                htmlType='submit'>
                {isLoading ? (
                  <div className='flex items-center justify-center gap-x-3 bg-transparent'>
                    <div className='spinner'></div>
                    <span>Processing . . .</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </Form.Item>
          </Form>
          {/* End of Signup Form */}

          {/* Terms and Conditions */}
          {/* <div className='text-center pt-2 mt-3'>
          <div className='text-11 flex justify-center items-center'>
            <p className='text-black'>
              By continuing you confirmed that you agreed to our{" "}
              <span className='text-blue-500 hover:underline'>
                Terms and conditions
              </span>{" "}
              &{" "}
              <span className='text-blue-500 hover:underline'>
                Privacy policy.
              </span>{" "}
            </p>
          </div>
        </div> */}
          {/* End of Terms and Conditions */}

          {/* Signin Link */}
          <div className='text-center pt-2 mt-3'>
            <div className='text-12 flex justify-center items-center'>
              <p className='text-black'>I have an account?</p>
              <Link
                href='/login'
                className=' font-medium pl-2'>
                <span className='text-blue-500 hover:underline'>Sign in</span>
              </Link>
            </div>
          </div>
          {/* End of Signin Link */}
        </div>
      </div>
    );
  };
}
