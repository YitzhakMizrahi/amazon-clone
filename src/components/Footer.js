import Image from 'next/image';

function Footer() {
  const smoothScroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <footer className="bg-amazon_blue-light">
      <div
        className="flex flex-grow mx-auto justify-center py-3 bg-[#37475A] text-white hover:bg-[#445870] cursor-pointer mt-14"
        onClick={smoothScroll}
      >
        Back to top
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 p-2 max-w-screen-2xl mx-auto text-sm md:text-base text-white ">
        <div className="col-span-2 justify-self-center my-10 max-w-[130px] md:max-w-none">
          <p className="font-bold">Get to Know us</p>
          <div className="text-xs md:text-sm font-light mt-3 space-y-2">
            <p className="link">Careers</p>
            <p className="link">Blog</p>
            <p className="link">About Amazon</p>
            <p className="link">Investor Relations</p>
            <p className="link">Amazon Devices</p>
            <p className="link">Amazon Tours</p>
          </div>
        </div>
        <div className="col-span-2 justify-self-center my-10 max-w-[130px] md:max-w-none">
          <p className="font-bold">Make Money With Us</p>
          <div className="text-xs md:text-sm font-light mt-3 space-y-2">
            <p className="link">Sell products on Amazon</p>
            <p className="link">Sell on Amazon Business</p>
            <p className="link">Sell apps on Amazon</p>
            <p className="link">Become an Affiliate</p>
            <p className="link">Advertise Your Products</p>
            <p className="link">Self-Publish with Us</p>
            <p className="link">Host an Amazon Hub</p>
          </div>
        </div>
        <div className="col-span-2 justify-self-center my-10 max-w-[130px] md:max-w-none">
          <p className="font-bold">Amazon Payment Products</p>
          <div className="text-xs md:text-sm font-light mt-3 space-y-2">
            <p className="link">Amazon Business Card</p>
            <p className="link">Shop with Points</p>
            <p className="link">Reload Your Balance</p>
            <p className="link">Amazon Currency Converter</p>
          </div>
        </div>
        <div className="col-span-2 justify-self-center my-10 max-w-[130px] md:max-w-none">
          <p className="font-bold">Let Us Help You</p>
          <div className="text-xs md:text-sm font-light mt-3 space-y-2">
            <p className="link">Amazon and COVID-19</p>
            <p className="link">Your Account</p>
            <p className="link">Your Orders</p>
            <p className="link">Shipping Rates & Policies</p>
            <p className="link">Returns & Replacements</p>
            <p className="link">Manage Your Content and Devices</p>
            <p className="link">Amazon Assistant</p>
            <p className="link">Help</p>
          </div>
        </div>
        <div className="col-span-full border-b border-gray-600 pb-4 -mt-8 mb-5" />
        <div className="col-span-full justify-self-center py-2">
          <Image
            src="https://links.papareact.com/f90"
            width={120}
            height={30}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
