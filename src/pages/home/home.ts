import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductList } from '../../providers/productlist/productlist';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productNumber: string = "..";
  productName: string = "..";
  productNumberInitials: string = "";
  productNameInitials: string = "";
  price: string = "";
  amountInStock: string = "";
  inProductionInfo: string = "";
  //searchResult = []; //*-* Chrome
  searchResult: any; //*-* Android

  productInfoStr: any;
  //productInfo = {ISBN:'',Tuotenro:'',Tuote:'',Kpl:'',Hinta:''};
  productInfo = { createdAt:'', updatedAt:'', ISBN:'', order:'', exerciseId:'', targetArea:'',
                pauseInSec:'', setCount:'', repeatsInSet:'', objectId:'' };

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public productList: ProductList, public httpClient: HttpClient, public restProvider: RestProvider) {
    console.log('>> home.constructor');
  }

  init() {
    console.log('>> home.init');
    console.log(this.productList.getProductList());
  }

  saveProducts() {
    console.log('>> home.saveProducts');
    //var productCount = this.productList.getProductCount();
    //for (var i = 0; i < productCount; i++) {
    //  this.restProvider.addProduct(this.productList.getProductByIndex(i));
    //}
  }

  readProduct() {
    console.log('>> home.readProduct');
    this.init();

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.productNumber = barcodeData.text;
      this.showProduct( this.productList.getProductByNumber(this.productNumber));
    }).catch(err => {
      console.log('Error', err);
    });
  }

  onProductNumberUpdated() {
    console.log('>> home.onProductNumberUpdated: ' + this.productNameInitials);
    var found = this.productList.getProductByNumber(this.productNameInitials);
    this.searchResult = found;
    //console.log('>> found: ' + found.length);
    console.log('>> json: ' + JSON.stringify(found));
    if (this.searchResult.length == 1) {
      console.log('>> found item: ' + found[0].Tuote);
      this.productName = found[0].productName;
      this.productNumber = found[0].ISBN;
    }
  }

  onProductNameUpdated() {
    console.log('>> home.onProductNameUpdated: ' + this.productNameInitials);
    var found = this.productList.getProductByName(this.productNameInitials);
    this.searchResult = found;
    console.log('>> found: ' + found.length);
    console.log('>> json: ' + JSON.stringify(found));
    this.clear();
    if (found.length == 1) {
      console.log('>> found item: ' + found[0].productName);
      this.showProduct(found[0]);
    }
  }

  onProductSelected(productName, index) {
    console.log('>> home.onProductSelected: ' + productName + ' index: ' + index);
    //this.productName = productName;
    this.productNumber = this.searchResult[index].ISBN;
    this.productName = this.searchResult[index].productName;
    this.price = this.searchResult[index].price;
    this.amountInStock = this.searchResult[index].amountInStock;
    if (!this.searchResult[index].availableFromPublisher) {
      this.inProductionInfo = "Poistunut tuote";
    }
  }

  showProduct(productInfo) {
      this.productNumber = productInfo.ISBN;
      this.productName = productInfo.productName;
      this.price = productInfo.price;
      this.amountInStock = productInfo.amountInStock;
      if (!productInfo.availableFromPublisher) {
        this.inProductionInfo = "Poistunut tuote";
      }
      console.log('>> ' + JSON.stringify(productInfo));
  }

  clear() {
    this.productNumber = "";
    this.productName = "";
    this.price = "";
    this.amountInStock = "";
    this.inProductionInfo = "";
  }
}
