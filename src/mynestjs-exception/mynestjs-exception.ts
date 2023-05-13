import { randomBytes } from "crypto"; 

export class MynestjsException extends Error{
    public readonly id: string;
    public readonly timestamp: Date;

    constructor( 
        public readonly errCode: string,
        public readonly message: string
    ) {
        super(message);
        this.id = randomBytes(16).toString('hex')
        this.timestamp = new Date();
    }

}
