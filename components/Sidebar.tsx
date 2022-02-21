import Link from "next/link"
import { Button } from "./Button"

export const Sidebar = () => {
    return (
        <>
            <aside className={"text-white text-xl sticky h-screen bg-red-900 mr-4 p-4"}>
                <Link href={`/`}>
                    <div className={"rounded-sm bg-red-500 b-2 border-red-700 p-4"}>
                        Home
                    </div>
                </Link>
            </aside>
        </>
    )
}