import { cn } from "@/lib/utils";

import { users } from "@/models/server/config";
import { Models, Query } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";
import { avatars } from "@/models/client/config";

const Notification = ({ user, rank }: { user: Models.User<UserPrefs>; rank: number }) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-100 transform cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <span className="w-8 shrink-0 text-center text-sm font-semibold text-orange-300">
                    #{rank}
                </span>
                <picture>
                    <img
                        src={avatars.getInitials(user.name, 40, 40)}
                        alt={user.name}
                        className="rounded-2xl"
                    />
                </picture>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
                        <span className="text-sm sm:text-lg">{user.name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">
                            {convertDateToRelativeTime(new Date(user.$updatedAt))}
                        </span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        <span>Reputation</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{user.prefs.reputation}</span>
                    </p>
                </div>
            </div>
        </figure>
    );
};

export default async function TopContributers() {
    try {
        const usersList = await users.list<UserPrefs>([Query.limit(100)]);

        const topUsers = usersList.users
            .slice()
            .sort((a, b) => {
                const reputationDiff = Number(b.prefs?.reputation || 0) - Number(a.prefs?.reputation || 0);
                if (reputationDiff !== 0) return reputationDiff;

                // Keep tie ordering deterministic so ranks don't jump between refreshes.
                return a.name.localeCompare(b.name);
            })
            .slice(0, 10);

        return (
            <div className="bg-background relative flex max-h-100 min-h-100 w-full max-w-lg flex-col overflow-hidden rounded-lg p-6 shadow-lg">
                <div className="space-y-3 overflow-y-auto pr-1">
                    {topUsers.map((user, index) => (
                        <Notification user={user} rank={index + 1} key={user.$id} />
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Failed to load top contributors", error);
        return <p className="text-sm text-gray-500">Top contributors unavailable right now.</p>;
    }
}