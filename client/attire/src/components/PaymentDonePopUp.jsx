import React from 'react'
import { useTheme } from './ThemeContext';
import { Link } from 'react-router-dom';

const PaymentDonePopUp = () => {

    const { PopUpPaidShow ,setPopUpPaidShow } = useTheme(false);
    const { TransactionID ,setTransactionID } = useTheme('');
    const { EnabledDark ,setEnabledDark } = useTheme(false);
    const { TestingPayClicked ,setTestingPayClicked } = useTheme(true);

  return (
    <>
    
    
    <div className={`h-full rounded-md ${EnabledDark == true? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-200 border-zinc-300'} border gap-3  w-full py-7 px-5 flex flex-col items-center justify-center`}>
        <h1 className={`text-2xl ${EnabledDark == true? 'text-cyan-300' : 'text-cyan-600'} font-semibold tracking-tighter`}>Amount Paid !!!</h1>
        <h1 className='text-xl font-semibold tracking-tighter'>Transaction ID : {TransactionID}</h1>
        <Link to='/profile' className={`text-md ${EnabledDark == true? 'text-cyan-300' : 'text-orange-600'} hover:underline font-semibold tracking-tighter`}>Track your Order</Link>
        <button onClick={(e) => {
            setPopUpPaidShow(false);
            setTestingPayClicked(true);
        }} className='h-auto px-3 py-1.5 w-18 font-semibold tracking-tight text-lg bg-cyan-500 text-zinc-100 rounded-md cursor-pointer'>OK</button>
    </div>
    
    </>
  )
}

export default PaymentDonePopUp