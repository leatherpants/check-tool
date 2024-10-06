import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { fetchOneCheck } from '../utils/fetchData';
import { useDispatch } from 'react-redux';
import { addItem, updateLocalStorage } from '../features/checkListSlice';

const scannerContainerId = "html5qr-code-full-region";

type ScannerProps = {
  fps: number,
  qrbox: number,
  verbose: boolean,
  // qrCodeSuccessCallback: (decodedText: string, result: Html5QrcodeResult) => void,
  // qrCodeErrorCallback: (errorMessage: string, error: Html5QrcodeError) => void,
};

export default function Scanner({ fps, qrbox, verbose }: ScannerProps) {

  const cache = useRef('');

  const dialog = useRef<HTMLDialogElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(scannerContainerId, { fps, qrbox }, verbose);
    async function qrCodeSuccessCallback(decodedText: string) {
      if (cache.current !== decodedText) {
        cache.current = decodedText;

        html5QrcodeScanner.pause();
        dialog.current?.showModal();

        const check = await fetchOneCheck(decodedText);
        dispatch(addItem(check));
        dispatch(updateLocalStorage());

        if (check) {
          dialog.current?.close();
          html5QrcodeScanner.resume();
        }
      }
    }

    function qrCodeErrorCallback() {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
    }

    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (<>
    <dialog ref={dialog}>
      <h1>Fetching data.</h1>
    </dialog>
    <div id={scannerContainerId} />
  </>);
};