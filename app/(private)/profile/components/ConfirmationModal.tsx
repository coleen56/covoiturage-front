'use client'

interface ConfirmationModalProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    title?: string
    message?: string
}

export default function ConfirmationModal({ isOpen, onConfirm, onCancel, title = "Confirmer la suppression", message = "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible." }: Readonly<ConfirmationModalProps>) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* backdrop */}
            <div className="fixed inset-0 bg-gray-900/50" onClick={onCancel} />

            {/* panel */}
            <div className="relative bg-gray-800 rounded-lg shadow-xl p-6 sm:w-full sm:max-w-lg mx-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6 text-red-400">
                            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-base font-semibold text-white">{title}</h3>
                        <p className="mt-2 text-sm text-gray-400">{message}</p>
                    </div>
                </div>
                <div className="mt-5 sm:flex sm:flex-row-reverse gap-2">
                    <button type="button" onClick={onConfirm} className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:w-auto">
                        Confirmer
                    </button>
                    <button type="button" onClick={onCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 sm:mt-0 sm:w-auto">
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    )
}