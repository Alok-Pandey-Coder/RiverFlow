import React from "react";
import QuestionForm from "@/components/QuestionForm";

const Page = () => {
    return (
        <div className="container mx-auto px-4 pb-20 pt-36">
            <h1 className="mb-6 text-3xl font-bold">Ask a question</h1>
            <QuestionForm />
        </div>
    );
};

export default Page;
