import * as mongoose from 'mongoose';

//Interface that describe the properties that are required to create a new job
interface EnsemblVepAttrs {
    job: string;
    useTest: string;
    chr: string;
    start_position: string;
    stop_position: string;
    alleles: string;
    strand: string;
}

// An interface that describes the extra properties that a model has
//collection level methods
interface EnsemblVepModel extends mongoose.Model<EnsemblVepDoc> {
    build(attrs: EnsemblVepAttrs): EnsemblVepDoc;
}

//An interface that describes a properties that a document has
export interface EnsemblVepDoc extends mongoose.Document {
    id: string;
    version: number;
    useTest: boolean;
    chr: number;
    start_position: number;
    stop_position: number;
    alleles: number;
    strand: number;
}

const EnsemblVepSchema = new mongoose.Schema<EnsemblVepDoc, EnsemblVepModel>(
    {
        useTest: {
            type: Boolean,
            trim: true,
        },
        chr: {
            type: Number,
            trim: true,
        },
        start_position: {
            type: Number,
            trim: true,
        },
        stop_position: {
            type: Number,
            trim: true,
        },
        alleles: {
            type: Number,
            trim: true,
        },
        strand: {
            type: Number,
            trim: true,
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EnsemblVepJob',
            required: true,
        },
        version: {
            type: Number,
        },
    },
    {
        timestamps: true,
        versionKey: 'version',
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                // delete ret._id;
                // delete ret.__v;
            },
        },
    },
);

//increments version when document updates
EnsemblVepSchema.set('versionKey', 'version');

//collection level methods
EnsemblVepSchema.statics.build = (attrs: EnsemblVepAttrs) => {
    return new EnsemblVepModel(attrs);
};

//create mongoose model
const EnsemblVepModel = mongoose.model<EnsemblVepDoc, EnsemblVepModel>(
    'EnsemblVep',
    EnsemblVepSchema,
    'ensemblvep',
);

export {EnsemblVepModel};
