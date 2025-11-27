import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const viewTitle = {
  '/account': 'My Account',
  '/add-address': 'Add_Address',
  '/dashboard': 'Home',
  '/cart': 'Cart',
  '/wishlist': 'Wishlist',
};

const Breadcrumb = ({ currentView }) => {
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    console.log('CurrentView: ' + currentView);
    setTitle(viewTitle[currentView] || 'page');
  }, [currentView]);

  return (
    <div className="bg-red-500 py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-white">
        <h2 className="text-lg font-semibold">{title}</h2>
        {title !== 'Home' && (
          <p className="text-xs">
            <a
              onClick={() => navigate('/dashboard')}
              className="hover:underline cursor-pointer"
              // Note: You'll want to make this link navigate home later
              // onClick={onNavigateToDashboard} // (You would need to pass this prop)
            >
              Home
            </a>
            <span className="mx-1">&gt;</span>
            <span>{title}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
