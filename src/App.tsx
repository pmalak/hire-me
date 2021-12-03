import { ChildList } from "components/ChildList";
import { ReactQueryProvider } from "containers/ReactQueryProvider";

function App() {
  return (
    <>
      <ReactQueryProvider>
        <ChildList
          groupId="86413ecf-01a1-44da-ba73-1aeda212a196"
          institutionId="dc4bd858-9e9c-4df7-9386-0d91e42280eb"
        />
      </ReactQueryProvider>
    </>
  );
}

export default App;
