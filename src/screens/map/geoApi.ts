import { geohashQueryBounds, Geopoint ,distanceBetween} from 'geofire-common';
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
export class GeoApi {
    async getNearbyPoliceStations(lat: number, lon: number): Promise<Cuarteles[]> {
        try {
            const center = [lat, lon] as Geopoint;
            const radiusInKm = 10 * 1000;
            const bounds = geohashQueryBounds(center, radiusInKm);
            const promises = [];
            for (const b of bounds) {
                const q = query(
                    collection(db as any, "cuarteles"),
                    orderBy("geohash"),
                    startAt(b[0]),
                    endAt(b[1])
                );
                promises.push(getDocs(q));
            }

            const snapshots = await Promise.all(promises);

            const matchingDocs = [];
            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    const data = doc.data();
                    const distance = distanceBetween([data.latitude, data.longitude], center);
                    if (distance <= radiusInKm) {
                        matchingDocs.push(data);
                    }
                }
            }
            console.log('Bounds:', bounds);
            console.log('Center:', center);
            console.log('Matching Docs:', matchingDocs);


            return matchingDocs as Cuarteles[];
        } catch (error) {
            console.error('Error fetching police stations:', error);
            return [];
        }
    }
}