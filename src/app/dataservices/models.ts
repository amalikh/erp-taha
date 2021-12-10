import { Injectable } from "@angular/core";
import { NumberValueAccessor } from "@angular/forms";
@Injectable(
    {
        providedIn: 'root'
    }
)

export class GeneralDT {
    id: number;
    parentId: number;
    typeId: number;
    description: string;
    key: string;
    val: string;
}

export class Branch {
    id: number;
    title: String;
    address: String;
}

//Inventory Module
export class Warehouses {
    id: number;
    name: String;
    branch_title: String;
    branch: number;
}

export class Categories {
    id: number;
    parentId: string;
    title: string;
}

export class Product {
    id: number;
    branch: number;
    branch_title: string;
    sku: string;
    name: string;
    price: number;
    photo: string;
    category: number;
    category_title: string;
    description: string;
    purchaseunit: number;
    salesunit: number;
    purchaseunit_name: string;
    salesunit_name: string;
}

export class ProductAttribute {
    id: number;
    name: String;
    unit: String;
    attributeId: number
}

export class ProductAttributeVal {
    id: number;
    product_id: number;
    attribute_id: number;
    value: string;
    attribute_name: string;
    product_name: string;
}

export class Currency {
    id: number;
    Currency: string;
    ShortName: string;
    Symbol: string;
    ExchangeRate:number;
    IsBaseCurrency: string;
    branch: number;
    branch_name: string;
}

export class ProductUOM {
    id: number;
    name: string;
    unit: string;
    quantity: number;
}

export class Account {
    id: Number;
    account_name:string;
}

export class BankPayment {
    date: string;
    voucher_no: number;
    account_debit:string;
    account_credit: string;
    debit_account: string;
    credit_account: string;
    amount: number;
    narration:number;
}

export class BankReceipt {
    date: string;
    voucher_no: number;
    account_debit:string;
    account_credit: string;
    debit_account: string;
    credit_account: string;
    amount: number;
    narration:number;
}

export class CashPayment {
    date: string;
    voucher_no: number;
    account_name:string;
    paid_amount: number;
    account: string;
    received_by: string
}

export class CashReceipt {
    date: string;
    voucher_no: number;
    account_name:string;
    paid_amount: number;
    account: string;
    received_by: string
}

export class stockitems {
    id: number;
    product: number;
    Product_sku: string;
    product_name: string;
    warehouse: number;
    warehouse_name: string;
    qty_onhand: number;
    qty_available: number;
    expiry_date: Date;
}

export class Sessions {
    id: number;
    POS: string;
    opened_by: string;
    closed_by: string;
    opening_date: Date;
    closing_date: Date;
    status: string;
}

export class Supplier {
    id: number;
    branch: number;
    branch_title: string;
    fullname: string;
    company: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    bankName: string;
    benificiaryName: string;
    bankAccountNumber: string;
    bankSwiftCode: string;
}

export class Customer {
    id: number;
    branch: number;
    branch_title: string;
    fullname: string;
    company: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
}

export class Purchase {
    id: number;
    documentNumber: string;
    documentDate: string;
    branch: number;
    warehouse: number;
    branch_title: string;
    supplier: number;
    supplier_name: string;
    status: string;
    remarks: string;
    expected_delivery: Date;
    advancePayment: number;
    TotalDiscount: number;
    TotalAmount: number;
    items: PurchaseProduct[];
    constructor(obj: PurchaseProduct[]) {
        this.items = obj;
    }
}

export class PurchaseProduct {
    id: number;
    supplier_name: string;
    supplier: number;
    purchaseId: number;
    product: number;
    product_name: string;
    product_price: number;
    quantity: number;
    totalAmount: number;
    discountRate: number;
    totalDiscount: number;
    constructor(product: number, product_name: string, product_price: number) {
        this.product = product;
        this.product_name = product_name;
        this.product_price = product_price;
    }
}

export class Sale {
    id: number;
    sessionId: number;
    documentNumber: string;
    documentDate: Date;
    branch: number;
    warehouse: number;
    branch_title: string;
    customer: number;
    customer_name: string;
    status: string;
    remarks: string;
    advancePayment: number;
    discountRate: number;
    totalDiscount: number;
    totalAmount: number;
    items: SaleProduct[];
    constructor(obj: SaleProduct[]) {
        this.items = obj;
    }
}

export class SaleProduct {
    id: number;
    saleId: number;
    product: number;
    product_name: string;
    product_price: number;
    sale_price: number = 0;
    sold_quantity: number = 0;
    totalAmount: number = 0;
    discountRate: number = 0;
    totalDiscount: number = 0;
    settotalPrice(price) {
        this.product_price = price;
    }
    setDicountRate(disc) {
        this.discountRate = disc;
    }
    setQty(qty) {
        this.sold_quantity = qty;
    }
    CalculateTotalAmount() {
        if (this.sold_quantity > 0) {
            this.totalAmount = this.sold_quantity * this.product_price;

        }
        if (this.discountRate > 0) {
            this.totalDiscount = this.discountRate / 100 * this.totalAmount;
            this.totalAmount = this.totalAmount - this.totalDiscount;
        }
    }
    constructor(product: number, product_name: string, product_price: number) {
        this.product = product;
        this.product_name = product_name;
        this.product_price = product_price;
        this.sale_price = product_price;
    }

}

export class Roles {
    id: number;
    name: String;
    // form: String;
    // form_name: String;
    form_read: String;
    // read: Boolean;
    // form_write: String;
    // write: Boolean;
    // form_read_write: String;
    // read_write: Boolean;
}

export class Forms {
    id: number;
    name: String;
}

// export class userObj {
//     username:string;
//     password:string;
//     email:string;
// }
