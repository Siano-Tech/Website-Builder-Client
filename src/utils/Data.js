export const QualificationData = () => {
    return [
        {  id: 1, name: 'MBBS', disabled: false },
        {  id: 2, name: 'MD - Dermatology', disabled: false },
        {  id: 3, name: 'MD - Dermatology, Venereology & Leprosy', disabled: false },
        {  id: 4, name: 'Diploma - Dermatology, Venereology & Leprosy', disabled: false },
        {  id: 5, name: 'DNB - Dermatology, Venereology & Leprosy', disabled: false }
    ]
}

export const SpecialityData = () => {
    return [
        {  id: 'derma', name: 'Dermatologist', disabled: false },
        {  id: 'dental', name: 'Dentist', disabled: true },
        {  id: 'physio', name: 'Physiotherapist', disabled: true },
    ]
}

export const SpecialisationData = () => {
    return {  
        derma: {
            id: 'derma', 
            disabled: false,
            data: [
                {  id: 1, name: 'Dermatologist', disabled: false },
                {  id: 2, name: 'Dermatosurgeon', disabled: false },
                {  id: 3, name: 'Cosmetologist', disabled: false },
                {  id: 4, name: 'Hair Transplant Surgeon', disabled: false },
                {  id: 5, name: 'Pediatric Dermatologist', disabled: false },
                {  id: 6, name: 'Aesthetic Dermatologist', disabled: false },
                {  id: 7, name: 'Trichologist', disabled: false },
                {  id: 8, name: 'Venereologist', disabled: false },
                {  id: 9, name: 'Immunodermatologist', disabled: false },
            ]
        }
    }
}

export const DiagnosisData = () => {
    return {  
        derma: {
            id: 'derma', 
            disabled: false,
            data: [
                {  id: 1, name: 'Skin Infections', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-1.webp?alt=media&token=a99308d5-1b94-4e16-b644-b6e2a110d37a' },
                {  id: 2, name: 'Dandruff / Seborrhoeic Captis', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-2.webp?alt=media&token=d1be0d36-d888-4624-98a2-ed2f7d4ba9a1' },
                {  id: 3, name: 'Atopic Dermatitis', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-3.webp?alt=media&token=7758fe9e-e57b-4b1a-9df6-a6b6fa5f2adb' },
                {  id: 4, name: 'Psoriasis', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 5, name: 'Eczema', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 6, name: 'Acne & Rosacea', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 7, name: 'Pediatric Dermatology', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 8, name: 'Keloids & Scars', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 9, name: 'Urticaria', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 10, name: 'Vitiligo', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 11, name: 'Warts & Corn', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 12, name: 'Hairfall', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 13, name: 'Alopecia Areata', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 14, name: 'Androgenetic Alopecia', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' }
            ]
        }
    }
}

export const ProceduresData = () => {
    return {
        derma: {
            id: 'derma', 
            disabled: false,
            data: [
                {  id: 1, name: 'Skin Tag / Mole Removal', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 2, name: 'Chemical Peels', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 3, name: 'Microdermabrasion', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 4, name: 'Hydrafacial', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 5, name: 'Laser Hair Reduction', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 6, name: 'Microneedling RF - Acne Scars', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 7, name: 'PRP Face / Vampire Facial', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 8, name: 'PRP Scalp - Hair Growth', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
                {  id: 9, name: 'Growth Factor Concentrate GFC', disabled: false, imgUrl: 'https://firebasestorage.googleapis.com/v0/b/digiclinik-live.appspot.com/o/website-builder%2Fservices%2Fderma-4.webp?alt=media&token=b5584ada-dd58-44c2-84c9-a4608a270f83' },
            ]
        }
    }
}