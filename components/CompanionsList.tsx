import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn, getSubjectColor} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionListProps {
    title: string,
    companions?: Companion[],
    classNames?: string,
}

const CompanionsList = ({ title, companions, classNames}: CompanionListProps) => {
    // @ts-ignore
    // @ts-ignore
    return (
        <article className={cn('companion-list', classNames)}>

        <h2 className="font-bold text-2xl">{title}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg">subject</TableHead>
                        <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map(({ id, subject, name, topic, duration}) => (
                        <TableRow key={id}>
                            <TableCell>
                                <Link href={`/companions/${id}`}>
                                    <div className=" flex items-center gap-2">
                                        <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{backgroundColor: getSubjectColor(subject)}}>
                                            <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />

                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-2xl font-bold">{name}</p>
                                            <p className="text-lg">{topic}</p>
                                        </div>
                                    </div>

                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden" >{subject}</div>

                                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden gap-2" style={{backgroundColor: getSubjectColor(subject)}}>

                                <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                                </div>
                            </TableCell>
                            <TableCell className="text-right">{duration} mins</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </article>
    )
}
export default CompanionsList
