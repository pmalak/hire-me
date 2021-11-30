import { ChildList } from "components/ChildList";
import { Item } from "components/Item";
import { ReactQueryProvider } from "containers/ReactQueryProvider";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {

  return (
    <div className="App">
      <ReactQueryProvider>
        <ChildList />
      </ReactQueryProvider>
    </div>
  );
}

export default App;
