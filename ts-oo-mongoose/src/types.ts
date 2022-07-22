export namespace Types {
  export type Indexable = {
    id: string
  }

  export type Validator<T> = {
    validate(unknown: unknown): Promise<T>
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

  export type SaleProduct = Indexable & {
    saleId: Indexable['id']
    productId: Indexable['id']
    description: string
    quantity: number
    price: number
    unit: string
  }

  export type Sale = Indexable & {
    sellerName: string
    purchaserName: string
  }
  export namespace Sale {
    export type WithProducts = Sale & {
      products: Array<SaleProduct>
    }
    export type Add = Omit<Sale, keyof Indexable> & {
      products: Array<Omit<SaleProduct, 'productId' | 'saleId'>>
    }
    export type Edit = Partial<Omit<Sale, keyof Indexable>> & {
      products?: Array<Omit<SaleProduct, 'productId' | 'saleId'>>
    }
  }
}

export namespace Cases {
  export namespace Products {
    export type CheckExists = {
      exists(
        id: Types.Product['id']
      ): Promise<void>
    }

    export type Remove = {
      remove(
        id: Types.Product['id']
      ): Promise<void>
    }

    export type Edit = {
      edit(
        id: Types.Product['id'],
        changes: Types.Product.Edit
      ): Promise<void>
    }

    export type Get = {
      get(
        id: Types.Product['id']
      ): Promise<Types.Product>
    }

    export type Add = {
      add(
        data: Types.Product.Add
      ): Promise<Types.Product['id']>
    }

    export type List = {
      list(): Promise<Array<Types.Product>>
    }
  }

  export namespace Sales {
    export type CheckExists = {
      exists(
        id: Types.Sale['id']
      ): Promise<void>
    }

    export type Remove = {
      remove(
        id: Types.Sale['id']
      ): Promise<void>
    }

    export type Edit = {
      edit(
        id: Types.Sale['id'],
        changes: Types.Sale.Edit
      ): Promise<void>
    }

    export type Get = {
      get(
        id: Types.Sale['id']
      ): Promise<Types.Sale.WithProducts>
    }

    export type Add = {
      add(
        data: Types.Sale.Add
      ): Promise<Types.Sale['id']>
    }

    export type List = {
      list(): Promise<Types.Sale>
    }
  }
}
