import {getAllCompanions} from "@/lib/actions/companion.actions";
import CompanionForm from "@/components/CompanionForm";
import CompanionCard from "@/components/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SubjectFilter from "@/components/SubjectFilter";
import SearchInput from "@/components/SearchInput";


const CompanionsLibrary = async({ searchParams }: SearchParams) => {
    const filters = await searchParams;

    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const companions =  await getAllCompanions({ subject, topic});

    console.log('companions:',companions);

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter/>
                </div>
            </section>
            <section className="companions-grid">
                {companions.map((companion) => (
                    <CompanionCard key={companion.id}
                                   {...companion}
                        color = {getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        </main>
    )
}
export default CompanionsLibrary
