import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";
import { type EditableQuestion } from "@/components/QuestionForm";

const Page = async ({ params }: { params: { quesId: string; quesName: string } }) => {
    const { quesId } = await params;
    const question = await databases.getDocument(db, questionCollection, quesId);

    const plainQuestion: EditableQuestion = {
        title: question.title,
        content: question.content,
        attachmentId: question.attachmentId,
        authorId: question.authorId,
        tags: question.tags,
        $id: question.$id,
    };

    return <EditQues question={plainQuestion} />;
};

export default Page;