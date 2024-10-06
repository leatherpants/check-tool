import { useDispatch } from "react-redux";
import { CheckListItem, removeItem, updateLocalStorage } from "../features/checkListSlice";

export default function ListItem({ listItem: { id, date, checkNumber, company, sum, nds20, nds10 } }: Props) {

  const dispatch = useDispatch();

  function handleBtnClick() {
    dispatch(removeItem(id));
    dispatch(updateLocalStorage());
  }

  return (<>
    <div className="list-item">
      <div className="cell"><p className="text">{date.toString()}</p></div>
      <div className="cell"><p className="text">{checkNumber}</p></div>
      <div className="cell"><p className="text">{company}</p></div>
      <div className="cell"><p className="text">{sum}</p></div>
      <div className="cell"><p className="text">{nds20}</p></div>
      <div className="cell"><p className="text">{nds10}</p></div>
      <button className="delete-btn" onClick={handleBtnClick}>X</button>
    </div>
  </>);
}

type Props = {
  listItem: CheckListItem,
}