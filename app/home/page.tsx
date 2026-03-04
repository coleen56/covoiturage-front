import TripList from "@/app/home/trip-list";

export default function HomePage() {
    return (
        <main className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl p-5'>Bienvenue !</h1>
        <TripList />
        </main>
    )
}