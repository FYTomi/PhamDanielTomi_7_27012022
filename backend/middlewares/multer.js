const multer = require('multer')

// Destination et nom du fichier
const multerConfig = multer.diskStorage({
    // Où le fichier sera enregistré
    destination: (req, file, callback) => {
        callback(null, 'images')    
    },
    // Le nom du fichier
    filename: (req, file, callback) => {
        // Récupération de l'extension
        const extension = file.mimetype.split('/')[1] 
        callback(null, `image-${Date.now()}.${extension}`) // On crée le nom du fichier contenant la date et son extension
    }
})

// Vérifie si c'est une image
const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith('image')) { // Vérifie si le mimetype commence avec image
        callback(null, true)
    } else {
        callback(new Error('Image seulement !'))
    }
}

// Configuration de Multer
const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
})

exports.uploadImage = upload.single('photo') // Pour envoyer une seule image, 'photo' doit être indiqué dans le frontend

