import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, updateLocalStorage } from "../features/checkListSlice";
import { fetchChecks } from "../utils/fetchData";

export default function InputArea() {

  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  async function onButtonClick() {
    // get request array
    const requestArr = input.trim().split('\n');
    // fetch data via api
    const listItems = await fetchChecks(requestArr);
    // add to store
    listItems.forEach(item => dispatch(addItem(item)));
    // set local storage
    dispatch(updateLocalStorage());
  }

  return (<>
    <textarea name="input" id="input" value={input} onChange={(e) => { setInput(e.target.value) }}></textarea>
    <button className="button" onClick={onButtonClick}>Save</button>
  </>);
}