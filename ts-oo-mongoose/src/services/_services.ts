import { Schema } from 'joi';

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
