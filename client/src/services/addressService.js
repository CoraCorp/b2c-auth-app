import * as firebase from 'firebase/app';
import 'firebase/auth';

function getUid() {
  return firebase.auth().currentUser.uid;
}

async function getToken() {
  try {
    return await firebase.auth().currentUser.getIdToken(true);
  } catch {
    return null;
  }
}

export async function saveAddress(address) {
  const idToken = await getToken();

  return fetch(`http://localhost:8080/api/user/${getUid()}/address`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: idToken ? `Bearer ${idToken}` : ''
    },
    body: JSON.stringify(address)
  });
}

export async function getAddress() {
  const idToken = await getToken();
  return fetch(`http://localhost:8080/api/user/${getUid()}/address`, {
    method: 'GET',
    headers: {
      Authorization: idToken ? `Bearer ${idToken}` : ''
    }
  }).then(res => res.json());
}
