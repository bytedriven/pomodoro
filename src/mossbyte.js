import crypto from 'crypto'
import axios from 'axios'

const base_url = 'https://mossbyte.com/api/v1'

export default class Mossbyte {
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
        let booleanReturn = false
        const payload = {
            object: objectPayload,
            keys: {
                read: [{
                    label: `${this.keys.string}_read_pomodoro`,
                    key: this.keys.read,
                }],
                admin: [{
                    label: `${this.keys.string}_admin_pomodoro`,
                    key: this.keys.admin,
                }],
            }
        }
        console.log(payload)
        axios.post(`${base_url}/${this.keys.app.public}`, payload)
        .then((response) => {
        console.log('Response: ', response)
            booleanReturn = response.status
        })
        return booleanReturn
    }

    select() {
        //
    }

    selectRaw() {
        //
    }

    update(objectPayload) {
        //
    }

    delete() {
        //
    }
}
