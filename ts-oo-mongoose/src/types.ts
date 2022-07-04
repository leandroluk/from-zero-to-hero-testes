export type Indexable = {
  id: string
}

export type Product = Indexable & {
  description: string
  price: number
  unit: string
}

export type AddProduct = Omit<Product, keyof Indexable>
export type EditProduct = Partial<Omit<Product, keyof Indexable>>

export type Sale = Indexable & {
  sellerName: string
  purchaserName: string
}

export type SaleProduct = Indexable & {
  saleId: number
  productId: number
  description: string
  quantity: number
  price: number
  unit: string
}

export type FullSale = Sale & {
  products: SaleProduct[]
}
export type SaleProducts = Omit<SaleProduct, 'productId' | 'saleId'>[]
export type AddSale = Omit<Sale, keyof Indexable> & {
  products: SaleProducts
}
export type EditSale = Partial<Omit<Sale, keyof Indexable>> & {
  products?: SaleProducts
}
