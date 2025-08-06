"use client";
import {isBookmarked, removeBookmark} from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useState, useEffect} from "react";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
    bookmarked?: boolean;
}

const CompanionCard = ({
                           id,
                           name,
                           topic,
                           subject,
                           duration,
                           color,
                           bookmarked,
                       }: CompanionCardProps) => {

    const [bookmark, setBookmark] = useState(false);
    const [svgElement, setSvgElement] = useState<HTMLObjectElement | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const checkBookmark = async () => {
            const isMarked = await isBookmarked(id);
            setBookmark(isMarked || false);
        };

        checkBookmark();
    }, [id]);

    // Update SVG class when bookmark state changes
    useEffect(() => {
        if (svgElement) {
            const svgDoc = svgElement.contentDocument;
            if (svgDoc) {
                const path = svgDoc.querySelector('.bookmark-path');
                if (path) {
                    if (bookmark) {
                        path.classList.add('filled');
                    } else {
                        path.classList.remove('filled');
                    }
                }
            }
        }
    }, [bookmark, svgElement]);

    const handleBookmark = async () => {
        if (bookmark) {
            await removeBookmark(id, pathname);
            setBookmark(false);
        } else {
            await addBookmark(id, pathname);
            setBookmark(true);
        }
    };
    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge">{subject}</div>
                <button className="companion-bookmark" onClick={handleBookmark}>
                    <object
                        data="/icons/bookmark-dynamic.svg"
                        type="image/svg+xml"
                        width={12.5}
                        height={15}
                        className="bookmark-icon"
                        ref={(el) => {
                            if (el) {
                                setSvgElement(el);
                                el.onload = () => {
                                    const svgDoc = el.contentDocument;
                                    if (svgDoc) {
                                        const path = svgDoc.querySelector('.bookmark-path');
                                        if (path) {
                                            if (bookmark) {
                                                path.classList.add('filled');
                                            } else {
                                                path.classList.remove('filled');
                                            }
                                        }
                                    }
                                };
                            }
                        }}
                    />
                </button>
            </div>

            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">{topic}</p>
            <div className="flex items-center gap-2">
                <Image
                    src="/icons/clock.svg"
                    alt="duration"
                    width={13.5}
                    height={13.5}
                />
                <p className="text-sm">{duration} minutes</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Lesson
                </button>
            </Link>
        </article>
    );
};

export default CompanionCard;
