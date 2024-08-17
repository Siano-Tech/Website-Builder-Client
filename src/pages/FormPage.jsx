import React, { useState, useEffect } from 'react'
import { PhotoIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { getBanners, getClinicData, submitForm } from '../api/formBuilder';
import toast from 'react-hot-toast';
import { UploadFile } from '../utils/UploadFile';
import { getUser, getUserId } from '../utils/Utils';
import { DiagnosisData, ProceduresData, QualificationData, SpecialisationData, SpecialityData } from '../utils/Data';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ComboBox } from './ComboBox';
import { MultiSelection } from './MultiSelection';

export const FormPage = () => {
    
    const uid = getUserId();
    const user = getUser();
    const [banners, setBanners] = useState([]);
    const [selectedBanners, setSelectedBanners] = useState([]);
    const [imageFile, setImageFile] = useState({});
    const [uploadProgress, setUploadProgress] = useState({});
    const [downloadURL, setDownloadURL] = useState({});
    const [clinicData, setClinicData] = useState();
    const [selectedDiagnosis, setSelectedDiagnosis] = useState([]);
    const [selectedQualification, setSelectedQualification] = useState([]);
    const [selectedSpecialisation, setSelectedSpecialisation] = useState([]);
    const [selectedProcedures, setSelectedProcedures] = useState([]);
    const [doctorPic, setDoctorPic] = useState();
    const [qualification, setQualification] = useState('MBBS');
    const qualificationDetsTemplate = {id: 0, qualification: 'MBBS', collegeName: '', yog: ''};
    const [qualificationDets, setQualificationDets] = useState([qualificationDetsTemplate]);
    const workExperienceTemplate = {id: 0, hospitalName: '', workYrs: ''};
    let [workExperience, setWorkExperience] = useState([workExperienceTemplate]);
    const clinicAddrTemplate = {id: 0, clinicName: '', clinicPhoneNo: '', clinicTimings: '', clinicAddress: ''};
    let [clinicAddr, setClinicAddr] = useState([clinicAddrTemplate]);

    // console.log(selectedDiagnosis)

    useEffect(() => {
        getBanners().then((resp) => {
            if(resp.status === 200 || resp.status === 201) {
                const ban = resp.data.map(e => { e.checked = false; return e })
                setBanners(ban);
              } else {
                const status = resp.data.message;
                toast.error(status);
              }
        })

        getClinicData(uid).then((resp) => {
            if(resp.status === 200 || resp.status === 201) {
                const clinicData = resp.data?.data;
                // console.log(clinicData);
                if(clinicData) {
                    setClinicData(clinicData);
                    setDoctorPic(clinicData.doctorPic);
                    setImageFile({...Object.values(clinicData?.clinicGallery)});
                    setDownloadURL({...Object.values(clinicData?.clinicGallery)});
                    setSelectedDiagnosis(clinicData.diagnosis);
                    setSelectedProcedures(clinicData.procedures);
                    if(clinicData.qualificationDets) {
                        setQualificationDets(clinicData.qualificationDets);
                        setSelectedQualification(clinicData.qualificationDets)
                    }
                    if(clinicData.workExperience) {
                        setWorkExperience(clinicData.workExperience);
                    }
                    if(clinicData.clinicAddr) {
                        setClinicAddr(clinicData?.clinicAddr);
                    }
                }
              } else {
                const status = resp.data.message;
                toast.error(status);
              }
        })
    }, []);

    const handleMultiSelection = (key, e) => {
        if (key === 'diagnosis') {
            setSelectedDiagnosis([...e]);
        } else if(key === 'procedures') {
            setSelectedProcedures([...e]);
        } else if(key === 'qualification') {
            setSelectedQualification([...e]);
            setQualification(e.map(e => e.name).join(', '))
        } else {
            setSelectedSpecialisation([...e]);
        }
    }

    console.log({qualification, selectedSpecialisation});

    const onChangeQualification = (val) => {
        setQualification(val);
        let temp = qualificationDets;
        if(val === 'MBBS') {
            temp = [qualificationDetsTemplate];
        } else if(val === 'MD') {
            const exists = temp.find(e => e.qualification === 'DM');
            if(exists) {
                temp = temp.filter(e => e.qualification !== 'DM');
            } else {
                temp = [
                    ...temp,
                    {...qualificationDetsTemplate, id: temp.length, qualification: 'MD'},
                ]
            }
        } else if(val === 'DM') {
            const exists = qualificationDets.find(e => e.qualification === 'MD');
            if(exists) {
                temp = [
                    ...temp,
                    {...qualificationDetsTemplate, id: temp.length + 1, qualification: 'DM'}
                ]
            } else {
                temp = [
                    ...temp,
                    {...qualificationDetsTemplate, id: temp.length, qualification: 'MD'},
                    {...qualificationDetsTemplate, id: temp.length + 1, qualification: 'DM'}
                ]
            }
        }
        setQualificationDets(temp);
    }

    const addExperience = (e) => {
        e.preventDefault();
        if(workExperience.length === 5) {
            return;
        }
        let temp = [
            ...workExperience,
            {...workExperienceTemplate, id: workExperience.length}
        ]
        setWorkExperience(temp);
    }

    const removeExperience = (e) => {
        if(workExperience.length === 1) {
            return;
        }
        let temp = workExperience.filter(f => e.id !== f.id);
        setWorkExperience(temp);
    }

    const addClinicAddr = (e) => {
        e.preventDefault();
        if(clinicAddr.length === 5) {
            return;
        }
        let temp = [
            ...clinicAddr,
            {...clinicAddrTemplate, id: clinicAddr.length}
        ]
        setClinicAddr(temp);
    }

    const removeClinicAddr = (e) => {
        if(clinicAddr.length === 1) {
            return;
        }
        let temp = clinicAddr.filter(f => e.id !== f.id);
        setClinicAddr(temp);
    }

    const selectBanner = (banner) => {
        let selBan = banners;
        selBan.map(e => {
            if(e.bannerId === banner.bannerId) {
                e.checked = !e.checked
            }
            return e;
        })
        setBanners([...selBan]);
        setSelectedBanners(selBan.filter(e => e.checked));
    }

    const onFileUpload = (e, id) => {
        if(id === 'doctorPic') {
            if(e.target.files && e.target.files.length>0) {
                const img = URL.createObjectURL(e.target.files[0])
                setDoctorPic(img);
            };
        } else {
            if(e.target.files && e.target.files.length>0) {
                imageFile[id] = URL.createObjectURL(e.target.files[0])
                setImageFile(imageFile);
            };
        }
        handleUpload(e.target.files[0], id);
      }
    
    const handleUpload = (file, id) => {
        if (file) {
            if(id === 'doctorPic') {
                UploadFile(
                    'doctor-image-'+id,
                    file,
                    (status) => { toast.remove(); status === 'success' ? toast.success(status) :toast.loading(status)},
                    (progress) => {},
                    (url) => setDoctorPic(url),
                    uid
                  );
            } else {
                UploadFile(
                  'clinic-image-'+id,
                  file,
                  (status) => { toast.remove(); status === 'success' ? toast.success(status) :toast.loading(status)},
                  (progress) => setUploadProgress({...uploadProgress, [id]: progress}),
                  (url) => setDownloadURL({...downloadURL, [id]: url}),
                  uid
                );
            }
        }
    };

    const handleSubmit = (e) => {
        toast.loading('Submitting...');
        e.preventDefault();
        const formData = new FormData(e.target)
        const clinicData = {}
        for (let entry of formData.entries()) {
            // Removing file uploads from the form
            if(!entry[0].includes('file-')) {
                clinicData[entry[0]] = entry[1];
            }
        }
        clinicData.speciality = selectedSpecialisation.map((e) => e.name).join(', ')
        clinicData.doctorPic = doctorPic;
        clinicData.clinicGallery = Object.values(downloadURL);
        clinicData.banners = selectedBanners;
        clinicData.uid = uid;
        clinicData.diagnosis = selectedDiagnosis;
        clinicData.procedures = selectedProcedures;
        clinicData.workExperience = workExperience;
        clinicData.qualificationDets = selectedQualification;
        clinicData.clinicAddr = clinicAddr;
        clinicData.phoneNo = user?.phoneNo;
        // console.log(clinicData);
        submitForm(clinicData).then((d) => {
            // console.log('Clinic data submitted successfully : ', d);
            toast.remove();
            toast.success('Clinic Data Submitted');
            openUrl()
        });
    }

    const openUrl = () => {
        if(window.location.hostname.includes('localhost')) {
            window.open('http://127.0.0.1:5501/website/?id='+uid, 'self');
        } else {
            window.open('https://digi-clinik-doctor-template.vercel.app/?id='+uid, 'self');
        }
    }


    return (
        <div className='mx-auto max-w-5xl p-6 lg:px-8'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Doctor Details</h2>
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                        <div className="mt-5 sm:mt-10  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Image
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        {!doctorPic && <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> }
                                        {doctorPic && <img width={300} src={doctorPic} style={{maxWidth: '200px'}} />}
                                        <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor={"file-upload-doctor-pic"}
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>{doctorPic ? 'Change image' :'Upload an image'}</span>
                                                <input id={"file-upload-doctor-pic"} name={"file-upload-doctor-pic"} type="file" className="sr-only" 
                                                    accept="image/*"
                                                    onChange={(e) => onFileUpload(e, 'doctorPic')}
                                                />
                                            </label>
                                            {doctorPic && <p className="pl-1">or drag and drop</p>}
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="sm:col-span-2 mb-8">
                                    <label htmlFor="doctorName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Doctor Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="doctorName"
                                            name="doctorName"
                                            type="text"
                                            autoComplete="given-name"
                                            required
                                            defaultValue={clinicData?.doctorName ?? 'Dr. '}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 mb-8">
                                    <label htmlFor="qualification" className="block text-sm font-medium leading-6 text-gray-900">
                                        Qualification
                                    </label>
                                    {/* <div className="mt-2">
                                        <select
                                            id="qualification"
                                            name="qualification"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={clinicData?.qualification}
                                            onChange={(e) => onChangeQualification(e.target.value)}
                                        >
                                            {QualificationData().map((e) => !e.disabled && <option key={e.id}>{e.name}</option>)}
                                        </select>
                                    </div> */}
                                    <div className="mt-2">
                                        {/* <ComboBox data={DiagnosisData().derma.data} displayKey={'name'} onSelected={setSelectedDiagnosis} placeholder={'Please select diagnosis'} /> */}
                                        <MultiSelection data={QualificationData().filter((e) => !e.disabled)} selectedData={selectedQualification} onSelected={(e) => handleMultiSelection('qualification', e)}/>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 mb-8">
                                    <label htmlFor="speciality" className="block text-sm font-medium leading-6 text-gray-900">
                                        Specialisation
                                    </label>
                                    {/* <div className="mt-2">
                                        <select
                                            id="speciality"
                                            name="speciality"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={clinicData?.speciality}
                                        >
                                            {SpecialityData().map((e) => !e.disabled &&  <option key={e.id}>{e.name}</option>)}
                                        </select>
                                    </div> */}
                                    <div className="mt-2">
                                        {/* <ComboBox data={DiagnosisData().derma.data} displayKey={'name'} onSelected={setSelectedDiagnosis} placeholder={'Please select diagnosis'} /> */}
                                        <MultiSelection data={SpecialisationData().derma.data.filter((e) => !e.disabled)} selectedData={selectedSpecialisation} onSelected={(e) => handleMultiSelection('specialisation', e)}/>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 mb-8">
                                    <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">
                                        Total Experience (yrs)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="experience"
                                            name="experience"
                                            type="tel"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={clinicData?.experience}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="patientsConsulted" className="block text-sm font-medium leading-6 text-gray-900">
                                        How many patients have you treated since the beginning of your practice?
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="patientsConsulted"
                                            name="patientsConsulted"
                                            type="tel"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={clinicData?.patientsConsulted}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                {/* <div className="sm:col-span-2 mb-8">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={clinicData?.email}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 mb-8">
                                    <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Doctor Phone No
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phoneNo"
                                            name="phoneNo"
                                            type="tel"
                                            maxLength={10}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={clinicData?.phoneNo ?? user?.phoneNo}
                                        />
                                    </div>
                                    <p className='mt-2 text-xs text-muted'>(This mobile no. will not be visible for patients on your website, it will be used to send appointment related notifications from DigiClinik)</p>
                                </div> */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        In which city are you practicing?
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={clinicData?.city}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Education Details</h2>
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                        {selectedQualification.map((e) => <div key={e.id} className="mt-5 sm:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 hidden">
                                <label htmlFor="qualification" className="block text-sm font-medium leading-6 text-gray-900">
                                    Qualification
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="qualification"
                                        name="qualification"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        required
                                        defaultValue={e?.name}
                                        onChange={(f) => e.name = f.target.value}
                                    >
                                        <option>{e?.name}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="collegeName" className="block text-sm font-medium leading-6 text-gray-900">
                                    College Name ({e?.name})
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="collegeName"
                                        name="collegeName"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        defaultValue={e?.collegeName}
                                        onChange={(f) => e.collegeName = f.target.value}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="yog" className="block text-sm font-medium leading-6 text-gray-900">
                                    Year of completion ({e?.name})
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="yog"
                                        name="yog"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        defaultValue={e?.yog}
                                        onChange={(f) => e.yog = f.target.value}
                                    />
                                </div>
                            </div>
                        </div>)}
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Work Experience</h2>
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                        {workExperience.map((e) => <div key={e.id} className="mt-5 sm:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="hospitalName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Hospital/Clinic Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="hospitalName"
                                        name="hospitalName"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        defaultValue={e?.hospitalName}
                                        onChange={(f) => e.hospitalName = f.target.value}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="workYrs" className="block text-sm font-medium leading-6 text-gray-900">
                                    Duration (From - To year) (Eg: 2012-2014)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="workYrs"
                                        name="workYrs"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        defaultValue={e?.workYrs}
                                        onChange={(f) => e.workYrs = f.target.value}
                                    /> 
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="yog" className="hidden sm:block text-sm font-medium leading-6 text-gray-900">
                                    {' '}<br></br>
                                </label>
                                {workExperience.length !== 1 && <div className="mt-2">
                                    <button
                                        onClick={() => removeExperience(e)}
                                        className="w-full flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        <TrashIcon className='w-5 h-5 text-white ' />
                                    </button>
                                </div>}
                            </div>
                        </div>)}
                        <button
                            onClick={addExperience}
                            className="mt-5 sm:mt-10 w-40 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {' +  '} Add More
                        </button>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Awards & Recognition</h2>
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                        <div className="mt-5 sm:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                {/* <label htmlFor="hospitalName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Awards
                                </label> */}
                                {/* <div className="mt-2">
                                    <input
                                        id="hospitalName"
                                        name="hospitalName"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        defaultValue={e?.name}
                                    />
                                </div> */}
                                <div className="mt-2">
                                    <textarea
                                        id="awards"
                                        name="awards"
                                        type="text"
                                        rows={3}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={clinicData?.awards}
                                    />
                                </div>
                            </div>
                            {/* <div className="sm:col-span-2">
                                <label htmlFor="workYrs" className="block text-sm font-medium leading-6 text-gray-900">
                                    Work Year (From - To year) (2012-2014)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="workYrs"
                                        name="workYrs"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        defaultValue={e?.workYrs}
                                    /> 
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="yog" className="block text-sm font-medium leading-6 text-gray-900">
                                    {' '}<br></br>
                                </label>
                                <div className="mt-2">
                                    <button
                                        onClick={() => removeExperience(e)}
                                        className="w-full flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        <TrashIcon className='w-5 h-5 text-white ' />
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Clinic Services</h2>
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                        <div className="mt-5 sm:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <label htmlFor="doctorName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cosmetic Services
                                </label>
                                <div className="mt-2">
                                    {/* <ComboBox data={ProceduresData().derma.data} displayKey={'name'} onSelected={setSelectedProcedures} placeholder={'Please select procedures'} /> */}
                                    <MultiSelection data={ProceduresData().derma.data} selectedData={selectedProcedures} onSelected={(e) => handleMultiSelection('procedures', e)}/>
                                </div>
                            </div>
                            <div className="sm:col-span-full">
                                <label htmlFor="doctorName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Diagnosis Treated
                                </label>
                                <div className="mt-2">
                                    {/* <ComboBox data={DiagnosisData().derma.data} displayKey={'name'} onSelected={setSelectedDiagnosis} placeholder={'Please select diagnosis'} /> */}
                                    <MultiSelection data={DiagnosisData().derma.data} selectedData={selectedDiagnosis} onSelected={(e) => handleMultiSelection('diagnosis', e)}/>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Clinic Details</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Details of your current practice</p>
                        {clinicAddr.map((e) => <div key={e.id} className="mt-5 sm:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="clinicName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Clinic Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="clinicName"
                                            name="clinicName"
                                            type="text"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={e?.clinicName}
                                            onChange={(f) => e.clinicName = f.target.value}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 mt-7">
                                    <label htmlFor="clinicPhoneNo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Clinic Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="clinicPhoneNo"
                                            name="clinicPhoneNo"
                                            type="tel"
                                            autoComplete="tel"
                                            maxLength={10}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={e?.clinicPhoneNo}
                                            onChange={(f) => e.clinicPhoneNo = f.target.value}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="clinicTimings" className="block text-sm font-medium leading-6 text-gray-900">
                                        Clinic Timings
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="clinicTimings"
                                            name="clinicTimings"
                                            type="text"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            defaultValue={e?.clinicTimings}
                                            onChange={(f) => e.clinicTimings = f.target.value}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1 mt-1">
                                    <label htmlFor="yog" className="hidden sm:block text-sm font-medium leading-6 text-gray-900">
                                        {' '}<br></br>
                                    </label>
                                    {clinicAddr.length !== 1 && <div className="mt-8">
                                        <button
                                            onClick={() => removeClinicAddr(e)}
                                            className="w-full flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            <TrashIcon className='w-5 h-5 text-white ' />
                                        </button>
                                </div>}
                            </div>
                            </div>
                            <div className='sm:col-span-2'>
                                <div className="sm:col-span-2">
                                    <label htmlFor="clinicAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                        Clinic Address
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="clinicAddress"
                                            name="clinicAddress"
                                            type="text"
                                            rows={5}
                                            autoComplete="address"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={e?.clinicAddress}
                                            onChange={(f) => e.clinicAddress = f.target.value}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        <button
                            onClick={addClinicAddr}
                            className="mt-10 sm:w-40 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            + Add one more clinic
                        </button>
                    </div>

                    <div className="hidden border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Banner Images</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Select some photos to be displayed in the banner when a user lands on the screen</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {banners && banners.map((e) => <div key={e.id} className="sm:col-span-2" onClick={() => selectBanner(e)}>
                                <input type="checkbox" name="selBanner" id="selBanner" checked={e.checked} />
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo {e.id}
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <img src={e.bannerImgUrl} alt="Banner" />
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Hero Section</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Provide a title and some information to be added to the website</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="ratings" className="block text-sm font-medium leading-6 text-gray-900">
                                    Overall customer ratings (1-5)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="ratings"
                                        name="ratings"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={clinicData?.ratings}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="patientsConsulted" className="block text-sm font-medium leading-6 text-gray-900">
                                    Customers serverd
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="patientsConsulted"
                                        name="patientsConsulted"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        defaultValue={clinicData?.patientsConsulted}
                                    >
                                        <option>1000</option>
                                        <option>2000</option>
                                        <option>3000</option>
                                        <option>4000</option>
                                        <option>5000</option>
                                        <option>6000</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Popular Treatments</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Select all the popular treatments given at your clininc</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Treatment 1
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Dermatology</option>
                                        <option>Peadiatrition</option>
                                        <option>Rheumatology</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Treatment 2
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Dermatology</option>
                                        <option>Paediatrition</option>
                                        <option>Rheumatology</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Popular Treatment Banners</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Upload some photos to be displayed in the banner when a user lands on the screen</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo 1
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo 2
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo 3
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Professional Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="specialisation" className="block text-sm font-medium leading-6 text-gray-900">
                                    Specialisation
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="specialisation"
                                        name="specialisation"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="qualification" className="block text-sm font-medium leading-6 text-gray-900">
                                    Degree/Qualification
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="qualification"
                                        name="qualification"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">
                                    Experience (yrs)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="experience"
                                        name="experience"
                                        type="experience"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about-you" className="block text-sm font-medium leading-6 text-gray-900">
                                    About you
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about-you"
                                        name="about-you"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="highlights-1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Key Hightlights 1
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="highlights-1"
                                        name="highlights-1"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="highlights-2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Key Hightlights 2
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="highlights-2"
                                        name="highlights-2"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="highlights-3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Key Hightlights 3
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="highlights-3"
                                        name="highlights-3"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Treatment Options</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Explore our treatment options.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="specialisation" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="specialisation"
                                        name="specialisation"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <label htmlFor="cover-photo" className="mt-3 block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>

                                <label htmlFor="highlights-1" className="mt-3 block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="highlights-1"
                                        name="highlights-1"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="specialisation" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="specialisation"
                                        name="specialisation"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <label htmlFor="cover-photo" className="mt-3 block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>

                                <label htmlFor="highlights-1" className="mt-3 block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="highlights-1"
                                        name="highlights-1"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="specialisation" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="specialisation"
                                        name="specialisation"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <label htmlFor="cover-photo" className="mt-3 block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>

                                <label htmlFor="highlights-1" className="mt-3 block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="highlights-1"
                                        name="highlights-1"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Treatment Options Banners</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Upload some photos to be displayed in the banner when a user lands on the screen</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo 1
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo 2
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo 3
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Patient Testimonials Video Links</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="link-1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Link 1
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="link-1"
                                        name="link-1"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="link-2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Link 2
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="link-2"
                                        name="link-2"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="link-3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Link 3
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="link-3"
                                        name="link-3"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="link-4" className="block text-sm font-medium leading-6 text-gray-900">
                                    Link 4
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="link-4"
                                        name="link-4"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="link-5" className="block text-sm font-medium leading-6 text-gray-900">
                                    Link 5
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="link-5"
                                        name="link-5"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="link-6" className="block text-sm font-medium leading-6 text-gray-900">
                                    Link 6
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="link-6"
                                        name="link-6"
                                        type="text"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Patient Testimonials</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="testimonial-1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Testimonial 1
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="testimonial-1"
                                        name="testimonial-1"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="testimonial-2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Testimonial 2
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="testimonial-2"
                                        name="testimonial-2"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="testimonial-3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Testimonial 3
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="testimonial-3"
                                        name="testimonial-3"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="testimonial-4" className="block text-sm font-medium leading-6 text-gray-900">
                                    Testimonial 4
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="testimonial-4"
                                        name="testimonial-4"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="testimonial-5" className="block text-sm font-medium leading-6 text-gray-900">
                                    Testimonial 5
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="testimonial-5"
                                        name="testimonial-5"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="testimonial-6" className="block text-sm font-medium leading-6 text-gray-900">
                                    Testimonial 6
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="testimonial-6"
                                        name="testimonial-6"
                                        type="text"
                                        rows={5}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Clinic gallery</h2>
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Upload some good clinic photos to be displayed when a user lands on the screen</p> */}
                        <div className="mt-5 sm:mt-10 grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-6">
                            {[0,1,2,3,4,5].map((e) => <div className="sm:col-span-1" key={e}>
                                {/* <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo {e+1}
                                </label> */}
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-2">
                                    <div className="text-center">
                                        {!imageFile[e] && <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> }
                                        {imageFile[e] && <img width={300} src={imageFile[e]} />}
                                        <div className="mt-4 flex flex-col md:flex-row justify-center text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor={"file-upload"+e}
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>{imageFile[e] ? 'Change image' :'Upload an image'}</span>
                                                <input id={"file-upload"+e} name={"file-upload"+e} type="file" className="sr-only" 
                                                    value={imageFile[e]?.fileName}
                                                    accept="image/*"
                                                    onChange={(f) => onFileUpload(f, e)}
                                                />
                                            </label>
                                            {!imageFile[e] && <p className="pl-1">or drag and drop</p>}
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="janesmith"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent p-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 p-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            We'll always let you know about important changes, but you pick what else you want to hear about.
                        </p>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Candidates
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                Offers
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div> */}
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {!clinicData ?  'Launch My Site' : 'Update & Launch my site'}
                    </button>
                </div>
            </form>
        </div>
    )
}
