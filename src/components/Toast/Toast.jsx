import { useToastDispatchContext } from 'context/ToastContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillClockCircle } from 'react-icons/ai'
import { getExplorerURL } from 'utils/Helpers';
import { shortAddress } from 'utils/Helpers';

export default function Toast({ type, title, message, txHash, id }) {
  const dispatch = useToastDispatchContext();
  return (
    <>
      <div className='max-w-md w-full bg-darkBorder shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mt-2 border border-darkBorder'>
        <div className='flex-1 w-0 p-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>
              {type === 'success' ? (<AiFillCheckCircle className='text-green-500 text-[20px]' />) : null}
              {type === 'error' ? (<AiFillCloseCircle className='text-red-500 text-[20px]' />) : null}
              {type === 'loading' ? (<AiFillClockCircle className='text-yellow-500 text-[20px]' />) : null}
            </div>
            <div className='ml-3 flex-1'>
              <p className='text-sm font-medium text-darkText'>
                {title}
              </p>
              {message && (
                <p className='mt-1 text-sm text-gray-500 '>
                  {message}
                </p>
              )}
              {txHash && (
                <a href={`${getExplorerURL('txn', txHash)}`} target='_blank' rel="noreferrer" className='mt-1 text-sm text-gray-500'>View: {shortAddress(txHash, 6)}</a>
              )}
            </div>
          </div>
        </div>
        <div className='flex'>
          <button onClick={() => {
            dispatch({ type: 'DELETE_TOAST', id: id });
          }} className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary'>
            X
          </button>
        </div>
      </div>
    </>
  );
}