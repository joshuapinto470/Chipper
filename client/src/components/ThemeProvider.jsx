import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={'light'}>
      <div className="bg-white text-gray-900 dark:text-gray-200 dark:bg-black">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
