import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 1. Move your existing state here
  const [EnabledDark, setEnabledDark] = useState(false);
  const [TestingPayClicked,setTestingPayClicked] = useState(true);
  const [MyProductsClicked,setMyProductsClicked] = useState(false);
  const [SellerDashboardClicked,setSellerDashboardClicked] = useState(true);
  const [NotLoggedIn, setNotLoggedIn] = useState(false);
  const [PopUpPaidShow,setPopUpPaidShow] = useState(false);
  const [CreateProductOpen,setCreateProductOpen] = useState(false);
  const [LoginSellerOpen,setLoginSellerOpen] = useState(false);
  const [EditProductOpen,setEditProductOpen] = useState(false);
  const [TransactionID,setTransactionID] = useState('');
  const [Seller,setSeller] = useState([]);

  // 2. Move your existing database/realtime useEffect here
  useEffect(() => {
    // Your existing realtime database logic that updates setDarkTheme goes here
  }, []);

  return (
    <ThemeContext.Provider value={{ EnabledDark, setEnabledDark , NotLoggedIn, setNotLoggedIn, PopUpPaidShow, setPopUpPaidShow, TransactionID, setTransactionID, TestingPayClicked, setTestingPayClicked, CreateProductOpen, setCreateProductOpen, MyProductsClicked, setMyProductsClicked, SellerDashboardClicked, setSellerDashboardClicked, LoginSellerOpen, setLoginSellerOpen, EditProductOpen, setEditProductOpen, Seller, setSeller}}>
      {children}
    </ThemeContext.Provider>
  );
}

// Shortcut hook to grab the state anywhere
export const useTheme = () => useContext(ThemeContext);
