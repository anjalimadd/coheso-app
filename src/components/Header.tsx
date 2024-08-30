import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-semibold tracking-wide cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Coheso Request Manager
        </h1>
        <Link to="/create">
          <Button className="bg-white text-blue-600 border border-transparent rounded-lg px-4 py-2 font-medium hover:bg-gray-100 hover:border-gray-300 transition duration-300 ease-in-out">
            Add Request Type
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
