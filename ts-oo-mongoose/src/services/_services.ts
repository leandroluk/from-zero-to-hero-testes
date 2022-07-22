import { Types } from 'mongoose';

export const toObjectId = (value: unknown) => new Types.ObjectId(value as string);
