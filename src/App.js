import Form from "./components/Form";

function App() {
  return (
    <div className="flex flex-col items-center bg-slate-500 pl-3 pr-3 pt-5 pb-5 min-h-screen space-y-4">
      <h1 className="text-white text-3xl font-thin font-mono"> TODO LIST</h1>
      <Form />
    </div>
  );
}

export default App;
