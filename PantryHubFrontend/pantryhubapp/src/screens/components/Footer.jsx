import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LocationIcon,
  Phone,
  SendIcon,
  XIcon,
} from './Icons.jsx';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200 mt-16 text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-500">
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-bold text-green-600 mb-2">PantryHub</h3>
          <p className="mb-4">
            PantryHub is the biggest market of grocery products. Get your daily
            needs from our store.
          </p>
          <address className="not-italic space-y-2">
            <p className="flex items-start">
              <LocationIcon />
              <span>
                51 Green St. Huntington ohio beach ontario, NY 11746 KY 4782,
                USA.
              </span>
            </p>
            <p className="flex items-center">
              <EmailIcon />
              <a
                href="maito:example@email.com"
                className="hover:text-green-600"
              >
                example@email.com
              </a>
            </p>
            <p className="flex items-center">
              <Phone />
              <a
                href="tel: +911234567890"
                className="ml-2 hover:text-green-600"
              >
                +911234567890
              </a>
            </p>
          </address>
        </div>

        {/*Company Links*/}
        <div>
          <h4 className="font-semibold mb-4 text-green-700">Comany</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-600">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Delivery Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Support Center
              </a>
            </li>
          </ul>
        </div>

        {/*Category Links*/}
        <div>
          <h4 className="font-semibold mb-4 text-gray-700">Category</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-600">
                Dairy & Bakery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Fruits & Vegetable
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Snack & Spice
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Juice & Drinks
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Chicken & Meat
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600">
                Fast Food
              </a>
            </li>
          </ul>
        </div>

        {/*Subscribe*/}
        <div>
          <h4 className="font-semibold mb-4 text-gray-700">
            Subscribe our Newsletter
          </h4>
          <form className="flex border border-gray-300 rounded-md overflow-hidden mb-4">
            <input
              type="email"
              placeholder="Seach Hear...."
              className="px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-gray-500 hover:bg-green-600 text-white px-3 py-2"
            >
              <SendIcon />
            </button>
          </form>

          {/*Social Icons */}
          <div className="flex space-x-3 mb-4">
            <a href="#" className="text-gray-400 hover:text-green-600 p-1">
              <FacebookIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600 p-1">
              <XIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600 p-1">
              <InstagramIcon />
            </a>
          </div>

          {/*Images for footer thumbnails*/}
          <div className="grid grid-cols-3 gap-2">
            <img
              src="../../assets/img_1.png"
              alt="Thumbnail 1"
              className="rounded-md object-cover w-full h-16"
            />
            <img
              src="../../assets/img_2.png"
              alt="Thumbnail 2"
              className="rounded-md object-cover w-full h-16"
            />
            <img
              src="../../assets/img_3.png"
              alt="Thumbnail 3"
              className="rounded-md object-cover w-full h-16"
            />
            <img
              src="../../assets/img_4.png"
              alt="Thumbnail 4"
              className="rounded-md object-cover w-full h-16"
            />
            <img
              src="../../assets/img_5.png"
              alt="Thumbnail 5"
              className="rounded-md object-cover w-full h-16"
            />
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-8 pt-8 border-t border-gray-100">
        © 2025 PantryHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
