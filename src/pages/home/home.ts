import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductList } from '../../providers/productlist/productlist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  product: string = "..";

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public productList: ProductList) {

  }

  readProduct() {
  	console.log('>> home.readProduct');
  	this.init();

  	/*this.barcodeScanner.scan().then(barcodeData => {
 		console.log('Barcode data', barcodeData);
 		this.product = barcodeData.text;
	}).catch(err => {
    	console.log('Error', err);
	});*/
  }

  init() {
    console.log('>> home.init');
   	console.log(this.productList.getProductList());
    //console.log(this.productList.getTestObj());
  }
}
