
import Title from './../../components/Title/Title';
import { assets } from './../../assets/assets';
import Subscribe from '../../components/Subscribe/Subscribe';

const About = () => {

  return (
    <div className="py-10 border-t">
      {/* Title */}
      <div className='mb-10'><Title text1={"ABOUT"} text2={"US"} /></div>
      {/* Start Contect */}
      <div className='flex flex-col sm:flex-row gap-10'>
        {/* Left Side */}
        <div className='w-full sm:w-2/5'>
          <img src={assets.about_img} alt='about-image' className='h-full' />
        </div>
        {/* Right Side */}
        <div className='w-full sm:w-3/4 flex flex-col gap-5 justify-center text-gray-600 text-md'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <p className='font-medium text-gray-950'>Our Mission</p>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
      {/* End Contect */}
      {/* Start Why Choose Us */}
      <div className='mt-20'>
        <div className='flex items-start mb-5'><Title text1={"WHY"} text2={"CHOOSE US"} /></div>
        {/* BoxeS */}
        <div className='flex flex-col sm:grid sm:grid-cols-[1fr_1fr_1fr]'>
          <div className='p-10 lg:p-16 border rounded border-gray-300'>
            <p className='mb-2 font-semibold'>Quality Assurance:</p>
            <p className='text-sm text-gray-600 w-full lg:w-3/4'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='p-10 lg:p-16 border rounded border-gray-300'>
            <p className='mb-2 font-semibold'>Convenience:</p>
            <p className='text-sm text-gray-600 w-full lg:w-3/4'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='p-10 lg:p-16 border rounded border-gray-300'>
            <p className='mb-2 font-semibold'>Exceptional Customer Service:</p>
            <p className='text-sm text-gray-600 w-full lg:w-3/4'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>
      {/* End Why Choose Us */}
      {/* Subscribe */}
      <div className='my-10'>
        <Subscribe />
      </div>
    </div>
  );
};

export default About;
