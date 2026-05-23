const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    // index.js에 있는 것과 동일한 서비스 계정 정보
    type: "service_account",
    project_id: "leaf-clan",
    private_key_id: "2d7a01da488307bad250b58e8219c6bc98745965",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+7hqK5PqCArdx\nkSwFAz9J2upYQqaAxapxcAWKfnUnHz8fCMgDLvhjOAKkRxoxMdsu5u7ZgRCL6RXa\naXuAJMZaplmUfbYhhD39EfmTyAJEQjsOu7mWuAk98fA4ZpW9bDz1gJ6PZEE8hzCP\nO/As56xbjPYqY/g22sXC9RJzdbZkw8pKl0RHiDhlnLBvvsIyfDztBXUC536xbVvW\nPE42wPlPOHgJYoM6amiOyoqV+/365/mksyMmKcucoaGLCbKFzLdNBpoiB1c3JIb/\nu964fLeaWva9BjaKV/7SiUuvSJ7I6TOKYQGyL1jM8Dy/PhCVb9DbEG4/WwA94l8g\nzNBW/O+XAgMBAAECggEAIQl6NkZgwlZN/6yq/UMOlGz418TQor+ROoezrb8r7lUN\nywTt9v8No71xV5OmCJUj4/25npEil9MBIQXXhNjYKZ9XKMaH2UzUnRGbKeMV4VHE\nfkwlVNsLXliaxGebyWcNNT3IMe+bCioqUN6CNILx4/WEMtmRfYxlY9KcGrZnlQ+v\nTXy8t43UQmj72jIVBd/50Rt4oET7fAHS4PDVmHyWp0wHcPhzoA6+PtxvkfAIz7aJ\nzi/FODfL0J4zoaM0172LSX4a/aAy2E1G+SsjtknkM7Ula/C/jTSD050NOaJqoAug\nKv8Jc/RBTPa96C9TnHaMFJu4NMPYEyD67Xusr2PlQQKBgQDiKUa7PVC3PzJyQBWo\n0K06psxn8DPxxVuM/XBtb8GL+3VVEOuhSSdpZyOmD67bn7p/VF4CMwZS4VEOk+TK\nhA53VK6KA7KcJYIjQLN1t71MgWyW6eijGFDSEVJ6JZhPMzErdtxaxO/i/YUHblA1\nD3tOsCYu1MwiRprcs+Ht3fQHyQKBgQDYHuAnDtrccBJUgj3AE5YggBNyfFDbu0cz\nScSYx09Fge9peN+G0YNUFz9DjocLbPs8n2ZMkJk4ykJNE7SEbgyP0R9YANI8o0kC\nWQliMrzVbzozX2R5CKWJlH7y+ns1br+zxG74T0ZijIFykEqwudQrOlxeSbAUFCbG\nRns5ohusXwKBgAiyPZ4FhY0GSRJLlImhPIf80e9NNTIevJ53QFN08KRJTwGuXOEe\nxv0ukhhYkgiv46PxwoujGqMlNtCwryN6YHQGNY/pBH0slAx2+G+WWRkQAPTsmZ1r\n2e+56sn3mBuzhDh/oYl7+R1pUiwu+baQmdU0wMMcO501yc6ivBVBa5jBAoGAbAuj\njGNEz4fH4i/qpygjmcPt9QJpejC6e82ZV7fszZcUFeqz9TaxLU0h96g9o1ysjbYy\n8nwn3dhgJSCA0uQhq5Sk0t42PNJ1IZNZuZocBahBtIUwOcI03/85KEhJaIEhncHK\nqKEZUxNjc97nOEru412d6BV2zdL1P5Lk7/83TokCgYAqDPHKYgW2zkMBl5/+33qm\nT9QitDqI0cgBAE4HFIrHZgI/LfRay4Q25+lGuVNleViZa0qUVYHcsHHcSSfegANW\nN6tOOXD5CqBEhU/OxgjGJTCaCSU8Cte5kvJwdtsjxL5GOgVvepX9zyJMk4KngBzK\nhXBe1fWeh3Z1BsNEeXxJew==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@leaf-clan.iam.gserviceaccount.com",
    client_id: "101683078848437603286",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40leaf-clan.iam.gserviceaccount.com"
  })
});

const db = admin.firestore();

async function main() {
  const snap = await db.collection('intros').get();
  const batch = db.batch();
  snap.forEach(doc => {
    batch.update(doc.ref, { lastScanned: admin.firestore.FieldValue.serverTimestamp() });
  });
  await batch.commit();
  console.log('완료! ' + snap.size + '개 문서에 lastScanned 설정됨');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
