import { useState } from "react";
import Scanner from "./Scanner";
import InputArea from "./InputArea";
import CheckList from "./CheckList";

export default function Home() {
  const [isQR, setIsQR] = useState(true);
  function handleRadioClick(e: any) {
    setIsQR(e.target?.id === 'qrcode');
  }

  return (<>
    <h1>From</h1>
    <label htmlFor="qrcode"><input type="radio" name="input-method" id="qrcode" value='qrcode' onChange={handleRadioClick} checked={isQR} />QR Code</label>
    <label htmlFor="text"><input type="radio" name="input-method" id="text" value='text' onChange={handleRadioClick} checked={!isQR} />Clipboard</label>
    {isQR && <Scanner fps={10} qrbox={250} verbose={false} />}
    {!isQR && <InputArea />}
    <CheckList />
  </>);
}