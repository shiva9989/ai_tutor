import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";


const NewCompanion = async() => {
    const { userId } = await auth();
    if(!userId) redirect('/sign-in?redirect=companions/new');
    return (
        <main className="min-lg:w-1/3 items-center justify-center">
            <article className="w-full gap-4 flex flex-col">
                <h1>Companion Builder</h1>
                <CompanionForm />
            </article>
        </main>
    );
}
export default NewCompanion
