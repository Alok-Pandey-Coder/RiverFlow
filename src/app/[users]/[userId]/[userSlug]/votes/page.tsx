import Pagination from "@/components/Pagination";
import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import convertDateToRelativeTime from "@/utils/relativeTime";
import slugify from "@/utils/slugify";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Query } from "node-appwrite";

type VoteQuestion = {
    $id: string;
    title: string;
};

const Page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ userId: string; userSlug: string }>;
    searchParams: Promise<{ page?: string; voteStatus?: "upvoted" | "downvoted" }>;
}) => {
    const [{ userId, userSlug }, searchParamsValue] = await Promise.all([params, searchParams]);
    if (!userId) return notFound();
    const page = Number.parseInt(searchParamsValue?.page ?? "1", 10);
    const currentPage = Number.isFinite(page) && page > 0 ? page : 1;
    const voteStatus = searchParamsValue?.voteStatus;

    const query = [
        Query.equal("votedById", userId),
        Query.orderDesc("$createdAt"),
        Query.offset((currentPage - 1) * 25),
        Query.limit(25),
    ];

    if (voteStatus) query.push(Query.equal("voteStatus", voteStatus));

    const votes = await databases.listDocuments(db, voteCollection, query);

    const resolveVoteTarget = async (vote: (typeof votes.documents)[number]) => {
        if (vote.type === "question") {
            const question = (await databases.getDocument(db, questionCollection, vote.typeId, [
                Query.select(["title"]),
            ])) as unknown as VoteQuestion;

            return {
                ...vote,
                question,
            };
        }

        const answer = await databases.getDocument(db, answerCollection, vote.typeId);
        const questionOfTypeAnswer = (await databases.getDocument(
            db,
            questionCollection,
            answer.questionId,
            [Query.select(["title"])]
        )) as unknown as VoteQuestion;

        return {
            ...vote,
            question: questionOfTypeAnswer,
        };
    };

    const settledVotes = await Promise.allSettled(votes.documents.map(resolveVoteTarget));
    const safeVotes = settledVotes
        .filter((result): result is PromiseFulfilledResult<(typeof votes.documents)[number] & { question: { $id: string; title: string } }> => result.status === "fulfilled")
        .map(result => result.value);

    return (
        <div className="px-4">
            <div className="mb-4 flex justify-between">
                <p>{votes.total} votes</p>
                <ul className="flex gap-1">
                    <li>
                        <Link
                            href={`/users/${userId}/${userSlug}/votes`}
                            className={`block w-full rounded-full px-3 py-0.5 duration-200 ${
                                !voteStatus ? "bg-white/20" : "hover:bg-white/20"
                            }`}
                        >
                            All
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/users/${userId}/${userSlug}/votes?voteStatus=upvoted`}
                            className={`block w-full rounded-full px-3 py-0.5 duration-200 ${
                                voteStatus === "upvoted"
                                    ? "bg-white/20"
                                    : "hover:bg-white/20"
                            }`}
                        >
                            Upvotes
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/users/${userId}/${userSlug}/votes?voteStatus=downvoted`}
                            className={`block w-full rounded-full px-3 py-0.5 duration-200 ${
                                voteStatus === "downvoted"
                                    ? "bg-white/20"
                                    : "hover:bg-white/20"
                            }`}
                        >
                            Downvotes
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mb-4 max-w-3xl space-y-6">
                {safeVotes.map(vote => (
                    <div
                        key={vote.$id}
                        className="rounded-xl border border-white/40 p-4 duration-200 hover:bg-white/10"
                    >
                        <div className="flex">
                            <p className="mr-4 shrink-0">{vote.voteStatus}</p>
                            <p>
                                <Link
                                    href={`/questions/${vote.question.$id}/${slugify(vote.question.title)}`}
                                    className="text-orange-500 hover:text-orange-600"
                                >
                                    {vote.question.title}
                                </Link>
                            </p>
                        </div>
                        <p className="text-right text-sm">
                            {convertDateToRelativeTime(new Date(vote.$createdAt))}
                        </p>
                    </div>
                ))}
            </div>
            <Pagination total={votes.total} limit={25} />
        </div>
    );
};

export default Page;