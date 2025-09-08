import React, {useState, useRef} from 'react';

const PROFILE_NAME = "Pradum Sahani";
const PROFILE_EMAIL = "sahanipradum98@gmail.com";
const UPI_ID = "sahanipradum98-1@okicici";
const PROFILE_PHOTO_URL = "/profile.jpg";

export default function App(){
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [medicineQuery, setMedicineQuery] = useState('');
  const fileRef = useRef(null);

  const sampleDB = {
    paracetamol: {name:'Paracetamol', use:'Fever / Pain relief', dose:'500 mg every 4-6 hrs', caution:'Liver caution'},
    ibuprofen: {name:'Ibuprofen', use:'Pain / Inflammation', dose:'200-400 mg every 6-8 hrs', caution:'Take with food'},
    amoxicillin: {name:'Amoxicillin', use:'Bacterial infections', dose:'As per doctor', caution:'Allergy to penicillin'}
  };

  function pickFile(e){
    const f = e.target.files?.[0];
    if(!f) return;
    setFile(f);
    setFileUrl(URL.createObjectURL(f));
  }
  function removeFile(){
    if(fileUrl) URL.revokeObjectURL(fileUrl);
    setFile(null); setFileUrl(''); if(fileRef.current) fileRef.current.value = '';
  }

  function mailToMe(){
    const subject = encodeURIComponent('Prescription Guidance: ' + (patientName||'(no name)'));
    const body = encodeURIComponent(`Name: ${patientName}\nPhone: ${phone}\nNotes: ${notes}\nFile: ${file?.name || '(no file)'}`);
    window.location.href = `mailto:${PROFILE_EMAIL}?subject=${subject}&body=${body}`;
  }

  function payViaUpi(){
    const url = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PROFILE_NAME)}&tn=${encodeURIComponent('Consultation')}&cu=INR`;
    window.open(url, '_blank');
  }

  const info = (() => {
    const k = (medicineQuery||'').trim().toLowerCase();
    return k ? (sampleDB[k] || null) : null;
  })();

  return (
    <div style={{fontFamily:'system-ui',padding:20,maxWidth:1000,margin:'0 auto'}}>
      <header style={{display:'flex',gap:12,alignItems:'center',marginBottom:24}}>
        <img src={PROFILE_PHOTO_URL} alt="profile" style={{width:84,height:84,borderRadius:999,objectFit:'cover',border:'1px solid #ddd'}} />
        <div>
          <h1 style={{margin:0}}>{PROFILE_NAME}</h1>
          <div style={{color:'#555'}}>{PROFILE_EMAIL} • Registered Pharmacist</div>
        </div>
      </header>

      <main>
        <section style={{background:'#fff',padding:16,borderRadius:10,boxShadow:'0 6px 20px rgba(0,0,0,0.06)'}}>
          <h2>Prescription Upload & Guidance</h2>
          <input value={patientName} onChange={e=>setPatientName(e.target.value)} placeholder="Patient name" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" />
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" />
          <input ref={fileRef} type='file' accept='image/*,application/pdf' onChange={pickFile} />
          {file && <div><b>{file.name}</b> <button onClick={removeFile}>Remove</button></div>}

          <div style={{marginTop:10}}>
            <button onClick={mailToMe}>Email Request</button>
            <button onClick={()=>{navigator.clipboard?.writeText(UPI_ID); alert('UPI copied')}}>Copy UPI</button>
            <button onClick={payViaUpi}>Pay via UPI</button>
          </div>
        </section>

        <section style={{marginTop:20,background:'#fff',padding:16,borderRadius:10}}>
          <h3>Medicine Knowledge</h3>
          <input placeholder="Search e.g. paracetamol" value={medicineQuery} onChange={e=>setMedicineQuery(e.target.value)} />
          {info ? <div><b>{info.name}</b><div>{info.use}</div><div>{info.dose}</div><div>{info.caution}</div></div> : <div>Type medicine name</div>}
        </section>
      </main>
    </div>
  )
      }
