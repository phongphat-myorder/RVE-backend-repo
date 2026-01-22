import mongoose, { Document, Model, Schema } from "mongoose";

export interface IWorkshop extends Document {
  result: string;
  sender: string;
  created_at: Date;
  updated_at: Date;
}

const WorkshopSchema: Schema = new Schema({
    result: { type: String, require:true },
    sender: { type: String, require:true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const WorkshopModel: Model<IWorkshop> = mongoose.model<IWorkshop>("response" , WorkshopSchema)

export class WorkshopRepository {
  private model: Model<IWorkshop>;

  constructor() {
    this.model = WorkshopModel;
  }

  public async recordData(result:string, sender:string): Promise<void> {
    await this.model.create({ result, sender });
    return;
  }
  
  public async getAllData(): Promise<IWorkshop[]> {
    return this.model.find().exec();
  }
 
}