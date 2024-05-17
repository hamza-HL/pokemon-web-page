import { Provider } from "react-redux";
import { store } from "./store";
import Pokemons from "./components/Pokemons";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
          <Pokemons />
        </div>
      </Provider>
    </>
  );
}

export default App;
