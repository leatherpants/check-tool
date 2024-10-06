import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import ListItem from "./ListItem";
import { clearAll } from "../features/checkListSlice";

export default function CheckList() {

  const checklist = useSelector((state: RootState) => state.checklist);
  const dispatch = useDispatch();

  function onButtonClick() {
    dispatch(clearAll());
  }
  return (<>
    <button onClick={onButtonClick}>Clear All</button>
    <div className="list">
      {checklist.list.map(item => <ListItem key={item.id} listItem={item} />)}
    </div>
  </>);
}


