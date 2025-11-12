import React from 'react'
import { View } from 'react-native'
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { UserContext } from '@/context/user';
import { Text } from 'react-native-paper';
export const MyDocs = () => {
    const { user } = React.useContext(UserContext);
    const [documents, setDocuments] = React.useState<any[]>([]);
    React.useEffect(() => {
        const fetchDocuments = async () => {
            if (user) {
                const docsCol = collection(db, 'users', user.uid, 'documents');
                const docsSnapshot = await getDocs(docsCol);
                const docsList = docsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDocuments(docsList);
            }
        };
        fetchDocuments();
    }, []);
  return (
    <View>
      {documents.map(doc => (
        <View key={doc.id}>
          <Text>{doc.title}</Text>
        </View>
      ))}
    </View>
  )
}
