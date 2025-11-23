import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function documentExist(type: string, owner_id: string): Promise<boolean> {
    const ref = collection(db, "documents");

    const q = query(
        ref,
        where("tipo", "==", type),
        where("owner_id", "==", owner_id),
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty;
}
