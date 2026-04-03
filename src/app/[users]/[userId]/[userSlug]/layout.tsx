import { users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";
import React from "react";
import EditButton from "./EditButton";
import Navbar from "./Navbar";
import { IconClockFilled, IconUserFilled } from "@tabler/icons-react";

const Layout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ userId: string; userSlug: string }>;
}) => {
    const { userId } = await params;
    const user = await users.get<UserPrefs>(userId);

    const initials = user.name
        .split(" ")
        .map(part => part[0]?.toUpperCase())
        .join("")
        .slice(0, 2);

    return (
        <div className="container mx-auto space-y-4 px-4 pb-20 pt-32">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-40 shrink-0">
                    <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-teal-300 text-5xl font-bold text-black">
                        {initials || "U"}
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex items-start justify-between">
                        <div className="block space-y-0.5">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">User</p>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-lg text-gray-500">{user.email}</p>
                            <p className="flex items-center gap-1 text-sm font-bold text-gray-500">
                                <IconUserFilled className="w-4 shrink-0" /> Dropped {convertDateToRelativeTime(new Date(user.$createdAt))},
                            </p>
                            <p className="flex items-center gap-1 text-sm text-gray-500">
                                <IconClockFilled className="w-4 shrink-0" /> Last activity {convertDateToRelativeTime(new Date(user.$updatedAt))}
                            </p>
                        </div>
                        <div className="shrink-0">
                            <EditButton />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Navbar />
                <div className="w-full">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
