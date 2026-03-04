interface SuccessAlertProps {
    message: string
}

export default function SuccessAlert({message}: SuccessAlertProps) {
    return (
        <div className='mt-3 bg-green-200 border border-green-600 rounded-md px-3 py-2'>
            <p className='text-green-900 text-sm'>{message}</p>
        </div>
    );
}