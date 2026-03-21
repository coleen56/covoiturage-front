export default function FormLink({href, text}: Readonly<{ href: string, text: string}>) {
    return (
        <a className={'mt-2 text-lg underline underline-offset-3'} href={href}>{text}</a>
    )
}