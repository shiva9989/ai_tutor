import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getRecentSessions, getUserCompanions, getUserSessions} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async() => {
       const user = await currentUser();
       if(!user) redirect('/sign-in');
        const companions = await getUserCompanions(user.id);
        const sessionHistory = await getUserSessions(user.id);


    return (
        <main className="min-lg:w-3/4">
            <section className="flex justify-between gap-4 max-sm:flex-col items-center">
                <div className="flex items-center gap-4">
                    <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110} />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {user.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex gap-2 border border-black rounded-lg p-3 flex-col h-fit">
                        <div className="flex items-center gap-2">
                            <Image src="/icons/check.svg" alt="checkmark" width={20} height={20}/>
                            <p className="text-2xl font-bold">
                                {sessionHistory.length}
                            </p>
                        </div>
                        <div>
                            Lessions Completed
                        </div>

                    </div>
                    <div className="flex gap-2 border border-black rounded-lg p-3 flex-col h-fit">
                        <div className="flex items-center gap-2">
                            <Image src="/icons/cap.svg" alt="cap" width={20} height={20}/>
                            <p className="text-2xl font-bold">
                                {companions.length}
                            </p>
                        </div>
                        <div>
                            Companions created
                        </div>

                    </div>
                </div>
            </section>
            <Accordion type="multiple" >
                <AccordionItem value="recent">
                    <AccordionTrigger className="text-2xl font-bold">Recent Sessions</AccordionTrigger>
                    <AccordionContent>
                       <CompanionsList title="Recent Sessions" companions={sessionHistory}  />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="companions">
                    <AccordionTrigger className="text-2xl font-bold">My Companions {`(${companions.length})`}</AccordionTrigger>
                    <AccordionContent>
                        <CompanionsList title="My Companions" companions={companions}  />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    )
}
export default Profile
