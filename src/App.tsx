import { useDispatch } from "react-redux";
import { initializeList } from "./features/checkListSlice";
import { useState } from "react";
import Output from "./components/Output";
import Home from "./components/Home";

export const REQUEST_ARRAY_LOCAL_STORAGE_ID = 'REQUEST_ARRAY_LOCAL_STORAGE_ID';
export const CHECK_LIST_LOCAL_STORAGE_ID = 'CHECK_LIST_LOCAL_STORAGE_ID';

export default function App() {


  // initialize store
  const dispatch = useDispatch();

  const localStore = localStorage.getItem(CHECK_LIST_LOCAL_STORAGE_ID);
  if (localStore) {
    const payload = JSON.parse(localStore);
    dispatch(initializeList(payload))
  }

  const [isPrinting, setIsPrinting] = useState(false);

  return (<>
    {isPrinting && <Output />}
    <button onClick={() => { setIsPrinting(!isPrinting) }}>{isPrinting ? 'Back' : 'Generate blank'}</button>
    {!isPrinting && <Home />}
  </>);
}