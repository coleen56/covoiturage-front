import {JSX} from "react";

interface ErrorAlertProps {
    message: string;
}

export default function ErrorAlert({message}: ErrorAlertProps): JSX.Element {
    return (
        <div className='mt-3 bg-red-200 border border-red-600 rounded-md px-3 py-2'>
            <p className='text-red-900 text-sm'>{message}</p>
        </div>
    );
}