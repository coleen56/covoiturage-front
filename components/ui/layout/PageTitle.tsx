export default function PageTitle({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={"text-center"}>
            <h1 className='text-5xl p-5'>
                {children}
            </h1>
        </div>
    )
}