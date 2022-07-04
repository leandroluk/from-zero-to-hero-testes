import { Schema } from 'joi';
import { Types } from 'mongoose';

export const toObjectId = (value: unknown) => new Types.ObjectId(value as string);

export const runSchema = <T>(schema: Schema<T>) => (
  async (unknown: unknown): Promise<T> => {
    const { error, value } = schema.validate(unknown);
    if (error) {
      error.message = error.details[0].message;
      throw error;
    }
    return value;
  }
);
