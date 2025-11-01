const Breadcrumb = () => {
  return (
    <div className="bg-red-500 py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-white">
        <h2 className="text-lg font-semibold">Login</h2>
        <p className="text-xs">
          <a href="#" className="hover:underline">
            Home
          </a>
          <span className="mx-1">&gt;</span>
          <span>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Breadcrumb;
