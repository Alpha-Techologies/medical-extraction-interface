"use client";

// import Next/React related libraries
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// import third party libraries
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// import redux toolkit libraries
import { useDispatch } from "react-redux";

// import custom utils
import { useAuth } from "@/hooks/useAuth";
import { LoginValidation } from "@/utils/schema";

// import icons and ui-libraries
import { Form, Input, Button } from "antd";

type Props = {};

export default function Login({}: Props) {
  // local states
  const [haveProfile, setHaveProfile] = useState(false);
  const [loginForm] = Form.useForm();

  // hook variables
  const router = useRouter();
  const dispatch = useDispatch();

  // auth state
  // const auth = useAuth();
  // const {
  //   data: profileData,
  //   isLoading: waiting,
  //   error: theError,
  //   refetch: getStartupProfile,
  // } = useGetStartupProfileQuery();

  const {
    loginHandler,
    auth: { isAuthenticated, isLoading, error },
  } = useAuth();

  // re-route to home page if authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setShowErrorBorder(false);
  //     router.replace("/");
  //   } else {
  //     setShowErrorBorder(true);
  //   }
  // }, [isAuthenticated]);

  // Login validation with yup
  const yupSync: any = {
    async validator({ field }: { field: string }, value: string) {
      await LoginValidation.validateSyncAt(field, { [field]: value });
    },
  };

  let response: any;
  const handleSubmit = async (ev: any) => {
    const values = loginForm.getFieldsValue();
    if (values.email && values.password) {
      const credentials = {
        email: values.email,
        password: values.password,
      };
      const res = await loginHandler(credentials);

      if (res && "data" in res) {
        if (res?.data?.success && !res.data.isVerified) {
          router.push("/app");
        }
        if (res?.data?.isVerified) {
          toast.success("Login Successful");
        }
      } else if (res && "error" in res) {
        const { error } = res as any;
        if (error.status === "FETCH_ERROR") {
          toast.error("There is network error!");
        } else {
          const errorMessage = error.data?.message;
          toast.error(errorMessage);
        }
      } else {
      }
    }
  };

  return (
    <div className='h-full w-full flex items-start justify-center font-inter py-8'>
      <div className='w-2/3 gap-4'>
        <div className='flex items-start flex-col mb-8'>
          <h1 className='text-4xl justified font-roboto text-black mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-600'>
            Sign in ot continue using our services
          </p>
        </div>

        <Form
          className='flex flex-col space-y-2 mb-3 text-secondary'
          form={loginForm}
          name='horizontal_login'
          layout='inline'
          onFinish={handleSubmit}>
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
                "Login"
              )}
            </Button>
          </Form.Item>
        </Form>
        {/* End of Login Form */}

        {/* Forgot Password Link */}
        <div className='text-center pt-2 mt-3'>
          <div className='text-12 flex justify-center items-center'>
            <Link
              href='/auth/reset-password'
              className='text-blue-500 hover:underline cursor-pointer'>
              Forgot Password?{" "}
            </Link>
          </div>
        </div>
        <div className='text-center pt-2 mt-3'></div>
        {/* End of Forgot Password Link */}

        {/* Signup Link */}
        <div className='text-center pt-2 mt-3'>
          <div className='text-12 flex justify-center items-center'>
            <p className='text-black'>I don{"'"}t have an account?</p>
            <Link
              href='/auth/waitlist'
              className='pl-2'>
              <span className='text-primary hover:underline'>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
      {/* End of Signup Link */}

      {/* Toast Container */}
      {/* <ToastContainer /> */}
      {/* End of Toast Container */}
    </div>
  );
}
