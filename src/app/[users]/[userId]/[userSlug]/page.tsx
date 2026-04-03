import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { MagicCard, MagicContainer } from "@/components/magicui/magic-card";
import NumberTicker from "@/components/magicui/number-ticker";
import { answerCollection, db, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ userId: string; userSlug: string }> }) => {
    const { userId } = await params;

    const [user, questions, answers] = await (async () => {
        try {
            const userPromise = users.get<UserPrefs>(userId);
            const questionsPromise = databases.listDocuments(db, questionCollection, [
                Query.equal("authorId", userId),
            ]);
            const answersPromise = databases.listDocuments(db, answerCollection, [
                Query.equal("authorId", userId),
            ]);

            return await Promise.all([userPromise, questionsPromise, answersPromise]);
        } catch (error: any) {
            console.error("Failed to load user profile", error);
            return notFound();
        }
    })();

    return (
        <MagicContainer className="flex w-full flex-col gap-4 lg:flex-row">
            <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-16 shadow-2xl">
                <div className="absolute inset-x-4 top-4">
                    <h2 className="text-xl font-medium">Reputation</h2>
                </div>
                <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                    <NumberTicker value={user.prefs.reputation} />
                </p>
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            </MagicCard>
            <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-16 shadow-2xl">
                <div className="absolute inset-x-4 top-4">
                    <h2 className="text-xl font-medium">Questions asked</h2>
                </div>
                <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                    <NumberTicker value={questions.total} />
                </p>
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            </MagicCard>
            <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-16 shadow-2xl">
                <div className="absolute inset-x-4 top-4">
                    <h2 className="text-xl font-medium">Answers given</h2>
                </div>
                <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                    <NumberTicker value={answers.total} />
                </p>
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            </MagicCard>
        </MagicContainer>
    );
};

export default Page;