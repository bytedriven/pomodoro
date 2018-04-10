import crypto from 'crypto'
import axios from 'axios'

const base_url = 'https://mossbyte.com/api/v1'

export default class Mossbyte {

    // TODO: Refactor this to be more generic
    constructor(stringKey, publicKey) {
        const stringRawRead = `com.bytedriven.pomodoro_${stringKey}_read`
        const stringRawAdmin = `com.bytedriven.pomodoro_${stringKey}_admin`
        this.keys = {
            app: {
                public: publicKey,
            },
            string: stringKey
        }
        this.keys.read = crypto.createHash('md5').update(stringRawRead).digest('hex')
        this.keys.admin = crypto.createHash('md5').update(stringRawAdmin).digest('hex')
    }

    create(objectPayload) {
        return new Promise((resolve, reject) => {
            // Build the payload
            const payload = {
                object: objectPayload,
                keys: {
                    read: [{
                        label: `${this.keys.string}_read`,
                        key: this.keys.read,
                    }],
                    admin: [{
                        label: `${this.keys.string}_admin`,
                        key: this.keys.admin,
                    }],
                }
            }    
            // Submit the payload
            axios.post(`${base_url}/${this.keys.app.public}`, payload)
            .then((response) => resolve(response.data))
            .catch(err => reject)
        })
    }

    select() { 
        return new Promise((resolve, reject) => {
            axios.get(`${base_url}/${this.keys.read}`)
            .then((response) => resolve(response.data))
            .catch(err => reject)
        })
    }

    selectRaw() { 
        return new Promise((resolve, reject) => {
            axios.get(`${base_url}/${this.keys.admin}`)
            .then((response) => resolve(response.data))
            .catch(err => reject)
        })
    }

    update(objectPayload) {
        return new Promise((resolve, reject) => {
            axios.put(`${base_url}/${this.keys.admin}`, objectPayload)
            .then((response) => resolve(response.data))
            .catch(err => reject)
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            axios.delete(`${base_url}/${this.keys.admin}`)
            .then((response) => resolve(response.data))
            .catch(err => reject)
        })
    }

    /**
     * Check to see if the requested mossbyte exists or not, and create it if it does not
     * @objectPayload object - the data you want to save into the initial mossByte
     * @return object - the returned mossByte after select/creation
     */

    findOrCreate(objectPayload) {
        return new Promise((resolve, reject) => {
            this.select()
            .then((data) => {
                if (data.status !== true) {
                    // False, so the object doesn't exists
                    this.create(objectPayload)
                    .then(data => resolve)
                    .catch(err => reject)
                }
                resolve(data)
            })
            .catch(err => reject)    
        })
    }
}
