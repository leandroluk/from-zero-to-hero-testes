import { Model, ModelStatic } from 'sequelize'

export type Indexable = {
  id: number
}

export type Product = Indexable & {
  description: string
  price: number
  unit: string
}

export namespace Product {
  export type Add = Omit<Product, keyof Indexable>
  export type Edit = Partial<Omit<Product, keyof Indexable>>
}

export type Sale = Indexable & {
  sellerName: string
  purchaserName: string
}

export namespace Sale {
  export type Full = Sale & {
    products: SaleProduct[]
  }
  export type Products = Omit<SaleProduct, 'productId' | 'saleId'>[]
  export type Add = Omit<Sale, keyof Indexable> & { products: Products }
  export type Edit = Partial<Omit<Sale, keyof Indexable>> & { products?: Products }
}

export type SaleProduct = Indexable & {
  saleId: number
  productId: number
  description: string
  quantity: number
  price: number
  unit: string
}

export type SequelizeModel<A = any, C = any> = ModelStatic<Model<A, C>> & {
  associate?: (
    model: SequelizeModel<A, C>,
    models: Record<string, SequelizeModel>
  ) => void
}
