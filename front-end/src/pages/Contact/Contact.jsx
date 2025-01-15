
import { assets } from '../../assets/assets';
import Subscribe from '../../components/Subscribe/Subscribe';
import Title from './../../components/Title/Title';
;
const Contact = () => {

  return (
    <div className="py-10 border-t">
      {/* Title */}
      <div className='mb-10'><Title text1={"CONTACT"} text2={"US"} /></div>
      {/* Start Content */}
      <div className='flex justify-center'>
        <div className='flex flex-col gap-5 sm:flex-row w-full sm:w-3/4 '>
          {/* Image */}
          <div className='w-full sm:w-1/2'>
            <img src={assets.contact_img} alt='contact-image' className='w-full' />
          </div>
          {/* Details */}
          <div className='w-full sm:w-1/2 flex flex-col gap-4 justify-center'>
            <p className='text-xl font-semibold text-gray-700'>Our Store</p>
            <div className='text-gray-500 text-md'>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>
            <div className='text-gray-500 text-md'>
              <p>Tel: (415) 555-0132</p>
              <p>Email: admin@forever.com</p>
            </div>
            <p className='text-xl font-semibold text-gray-700'>Careers at Forever</p>
            <p className='text-gray-400'>Learn more about our teams and job openings.</p>
            <button className='bg-white border w-fit py-3 px-5 border-gray-700 transition hover:bg-black hover:text-white'>Explore Jobs</button>
          </div>
        </div>
      </div>
      {/* End Content */}
      <div className='py-10'>
        <Subscribe />
      </div>
    </div>
  );
};

export default Contact;
