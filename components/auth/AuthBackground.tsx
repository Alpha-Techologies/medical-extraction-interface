import Image from "next/image";

const AuthBackground = () => {
  return (
    <div className='relative w-full h-screen bg-auth bg-cover bg-center text-white'>
      <div className='absolute inset-0 bg-black opacity-5'></div>
      <div className='flex flex-col items-center py-4 h-full'>
        <div className='absolute bottom-8'>
          {/* <div className='flex flex-col items-center justify-center'>
            <h2 className='font-normal text-2xl text-white'>
              Launch Your Startup
            </h2>
            <p className='font-light '>
              Kickstart your journey by showcasing your venture to potential
              investors
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default AuthBackground;
