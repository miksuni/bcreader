import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductList } from '../../providers/productlist/productlist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productNumber: string = "..";
  productName: string = "..";
  productNameInitials: string = "";

  //productInfo = {ISBN:'',Tuotenro:'',Tuote:'',Kpl:'',Hinta:''};

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public productList: ProductList) {
  }

  init() {
    console.log('>> home.init');
    console.log(this.productList.getProductList());
    //console.log(this.productList.getTestObj());
  }

  readProduct() {
    console.log('>> home.readProduct');
    this.init();

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.productNumber = barcodeData.text;
      var productInfo = this.productList.getProduct(this.productNumber);
      this.productName = productInfo.Tuote;
      console.log('>> ' + JSON.stringify(productInfo));
    }).catch(err => {
      console.log('Error', err);
    });
  }

  onProductNameUpdated() {
    console.log('>> home.onProductNameUpdated: ' + this.productNameInitials);
    var found = this.productList.getProductName(this.productNameInitials);
    console.log('>> found: ' + found.length);
    console.log('>> json: ' + JSON.stringify(found));
    if (found.length == 1) {
      console.log('>> found item: ' + found[0].Tuote);
      this.productName = found[0].Tuote;
      this.productNumber = found[0].ISBN;
    }
  }
}
