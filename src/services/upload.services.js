import axios from "axios"

class UploadServices {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/upload`
        })
    }

    uploadImage(imageData) {
        return this.api.post(`/image`, imageData)
    }
}

const uploadServices = new UploadServices()

export default uploadServices