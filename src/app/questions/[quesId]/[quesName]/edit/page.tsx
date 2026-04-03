import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";

const Page = async ({ params }: { params: { quesId: string; quesName: string } }) => {
    const { quesId } = await params;
    const question = await databases.getDocument(db, questionCollection, quesId);

    const plainQuestion = {
        title: question.title,
        content: question.content,
        attachmentId: question.attachmentId,
        authorId: question.authorId,
        tags: question.tags,
        $id: question.$id,
        $createdAt: question.$createdAt,
        $updatedAt: question.$updatedAt,
    };

    return <EditQues question={plainQuestion as any} />;
};

export default Page;