import {
  Account,
  Cart,
  Phone,
  Search,
  TextAlignment,
  Wishlist,
} from './Icons.jsx';
import logo from '../../assets/logo.svg';
const Header = ({
  user,
  onNavigateToAccount,
  onNavigateToDashboard,
  onNavigateToCart,
  onNavigateToWishlistpage,
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="bg-gray-50 py-1 px-4 sm:px-6 lg:px-8 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center">
            <button className="mr-3 p-1">
              {/*3 Line Icon*/}
              <TextAlignment />
            </button>
          </div>

          {/*Navigation Bar*/}
          <nav>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium text-sm"
              >
                Home
              </a>
              {/* Add dropdown menus for Category, Products etc. later */}
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium text-sm"
              >
                Category
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium text-sm"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium text-sm"
              >
                Pages
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium text-sm"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium text-sm"
              >
                Elements
              </a>
            </div>
          </nav>

          <div className="flex items-center space-x-2">
            {/*/!* Language/Currency Dropdown Placeholder *!/*/}
            {/*<span>English</span>*/}
            {/*<span>USD</span>*/}
            {/* Phone Icon Placeholder */}
            <Phone />
            <span className="text-gray-400">+123 ( 456 ) ( 7896 ) </span>
          </div>
        </div>
      </div>

      {/* main Header */}
      <div className="container mx-auto py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/*Logo*/}
        <a onClick={onNavigateToDashboard} className="cursor-pointer">
          <div className="flex items-center flex-shrink-0">
            <img src={logo} alt="PantryHub Logo" className="h-10 mr-2" />
            <div>
              <span className="block text-3xl font-bold text-green-600 leading-none ">
                PantryHub
              </span>
              <span className="block text-xs text-gray-500 leading-none">
                A Treasure of Tastes
              </span>
            </div>
          </div>
        </a>

        {/*Search Bar*/}
        <div className="flex-grow mx-4 lg:mx-8 hidden lg:block max-w-xl">
          <form className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search for items...."
              className="px-4 py-2 w-full text-sm focus:outline-none focus:right-1 focus:ring-green-500"
            />
            {/*<select*/}
            {/*  className="px-3 py-2 bg-gray-50 border-l border-gray-300 text-sm text-gray-600 focus:outline-none appearance-none pr-8 bg-no-repeat bg-right"*/}
            {/*  style={{*/}
            {/*    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <option>All Categories</option>*/}
            {/*  /!* Add categories *!/*/}
            {/*</select>*/}
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
            >
              <Search />
            </button>
          </form>
        </div>

        {/*Icons*/}
        <div className="flex items-center space-x-4 text-sm">
          <a
            onClick={onNavigateToAccount}
            className="flex items-center text-gray-600 hover:text-green-600 cursor-pointer"
          >
            <Account />
            Account
          </a>

          <a
            onClick={onNavigateToWishlistpage}
            className="flex items-center text-gray-600 hover:text-green-600 cursor-pointer"
          >
            <Wishlist />
            Wishlist
          </a>

          <a
            onClick={onNavigateToCart}
            className="flex items-center text-gray-600 hover:text-green-600 cursor-pointer"
          >
            <Cart />
            Cart
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
