
import Header from "./components/Header";
import Shop from "./components/Shop";
import  CartContextProvider from "./store/shopping-cart";


function App() {
  
  
  return (
    <CartContextProvider>
      <Header 
      
      
      />
      <Shop/>
    </CartContextProvider>
  );
}

export default App;