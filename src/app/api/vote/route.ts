import { voteCollection, db, questionCollection, answerCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

type VoteStatus = "upvoted" | "downvoted";

export async function POST(request: NextRequest) {
  try {
    const { votedById, voteStatus, type, typeId } = await request.json();

    if (!votedById || !voteStatus || !type || !typeId) {
      return NextResponse.json({ error: "Missing vote payload" }, { status: 400 });
    }

    if (!["question", "answer"].includes(type) || !["upvoted", "downvoted"].includes(voteStatus)) {
      return NextResponse.json({ error: "Invalid vote payload" }, { status: 400 });
    }

    // find existing vote from this user on this target
    const existingList = await databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("typeId", typeId),
      Query.equal("votedById", votedById),
      Query.limit(1),
    ]);

    const existing = existingList.documents[0] || null;

    // target author
    const target = await databases.getDocument(
      db,
      type === "question" ? questionCollection : answerCollection,
      typeId
    );

    const authorId = target.authorId;
    const authorPrefs = await users.getPrefs<UserPrefs>(authorId);

    let newVoteDoc: typeof existing = existing;
    let reputationDelta = 0;

    const applyDelta = (status: VoteStatus, direction: "add" | "remove") => {
      const value = status === "upvoted" ? 1 : -1;
      reputationDelta += direction === "add" ? value : -value;
    };

    // toggle logic
    if (existing) {
      await databases.deleteDocument(db, voteCollection, existing.$id);
      applyDelta(existing.voteStatus as VoteStatus, "remove");

      if (existing.voteStatus !== voteStatus) {
        newVoteDoc = await databases.createDocument(db, voteCollection, ID.unique(), {
          type,
          typeId,
          voteStatus,
          votedById,
        });
        applyDelta(voteStatus, "add");
      } else {
        newVoteDoc = null;
      }
    } else {
      newVoteDoc = await databases.createDocument(db, voteCollection, ID.unique(), {
        type,
        typeId,
        voteStatus,
        votedById,
      });
      applyDelta(voteStatus, "add");
    }

    if (reputationDelta !== 0) {
      await users.updatePrefs<UserPrefs>(authorId, {
        reputation: Number(authorPrefs.reputation || 0) + reputationDelta,
      });
    }

    const [upvotes, downvotes] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "upvoted"),
        Query.limit(1),
      ]),
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "downvoted"),
        Query.limit(1),
      ]),
    ]);

    return NextResponse.json(
      {
        data: {
          document: newVoteDoc,
          voteResult: upvotes.total - downvotes.total,
        },
        message: "vote handled",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error handling vote" },
      { status: error?.status || error?.code || 500 }
    );
  }
}
