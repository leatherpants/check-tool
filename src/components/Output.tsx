import './Output.scss';
import { CheckListItem } from '../features/checkListSlice';
import { CHECK_LIST_LOCAL_STORAGE_ID } from '../App';

export default function Output() {

  const checklist = JSON.parse(localStorage.getItem(CHECK_LIST_LOCAL_STORAGE_ID) ?? '');

  const pagesForRendering = [];

  const { totalSum, totalNds } = getTotal(checklist);

  if (checklist.length < 7) {
    pagesForRendering.push(
      generatePage(checklist, 'first-page', true, totalSum, totalNds),
    );
  } else {
    const copiedList = [...checklist];
    const first7ListItems = copiedList.splice(0, 7);
    pagesForRendering.push(
      generatePage(first7ListItems, 'first-page')
    );

    while (copiedList.length > 11) {
      const twelveItems = copiedList.splice(0, 12);
      pagesForRendering.push(
        generatePage(twelveItems, 'another-page')
      );
    }
    pagesForRendering.push(
      generatePage(copiedList, 'another-page', true, totalSum, totalNds),
    );
  }

  return (<>
    <button id="button" onClick={() => { window.print() }}>print</button>
    {pagesForRendering}
  </>);
}

function generatePage(list: CheckListItem[], pageClass: string, hasTotal = false, totalSum = 0, totalNds = 0) {
  return (<div className={pageClass + ' page'}>
    <div className="container">
      {list.map(item => {
        return (
          <div className="row" key={item.id}>
            <div className="name">{getTypeName(item.company)}</div>
            <div className="date">{item.date}</div>
            <div className="number">{item.checkNumber}</div>
            <div className="company">{item.company}</div>
            <div className="sum">
              <div className="price">
                {(item.sum / 100).toFixed(2)}
              </div>
              <div className="nds">
                {(((item.nds10 ?? 0) + (item.nds20 ?? 0)) / 100).toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
      {hasTotal && (
        <div className="row">
          <div className="name">{'Итоги'}</div>
          <div className="sum">
            <div className="price">
              {(totalSum / 100).toFixed(2)}
            </div>
            <div className="nds">
              {(totalNds / 100).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>);
}

function getTotal(list: CheckListItem[]) {
  const totalSum = list.map(item => item.sum).reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const totalNds = list.map(item => (item.nds10 ?? 0) + (item.nds20 ?? 0)).reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  return { totalSum, totalNds };
}

function getTypeName(companyName: string): string {
  if (companyName === 'ООО "Агроторг"') return 'Продукты';
  if (companyName === 'ООО "ДВ НЕВАДА"') return 'Продукты';
  if (companyName === 'АО "ННК-ХАБАРОВСКНЕФТЕПРОДУКТ"') return 'Бензин';

  return 'Продукты';
}