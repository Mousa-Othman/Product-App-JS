var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var addBtn =document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var inputs=document.getElementsByClassName('form-control');
var searchInput=document.getElementById('search');
var nameAlert=document.getElementById('nameAlert');
var priceAlert=document.getElementById('priceAlert');
var categoryeAlert=document.getElementById('categoryeAlert');
var descAlert=document.getElementById('descAlert');
//console.log(productNameInput); //test
var currentIndex;
var products=[];
if (localStorage.getItem('ourProduct')!= null){
    products=JSON.parse(localStorage.getItem('ourProduct'));
    displayProduct()
}

// productNameInput.onkeyup=nameValidation();//decleration function 
productNameInput.onkeyup=nameValidation;//decleration function 
function nameValidation(){
    var nameRejex=/^[A-Z][a-z]{2,8}$/;
    if (!nameRejex.test(productNameInput.value)){ 
        addBtn.disabled='true';
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
        return false;
    }
    else{
        addBtn.removeAttribute('disabled');
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
        return true;
    }
};
// productNameInput.addEventListener(onkeyup ,nameValidation);//false =>error
// productNameInput.addEventListener('keyup' ,nameValidation);//true => not error
// productPriceInput.onkeyup=priceValidation();//decleration function=>error 
productPriceInput.onkeyup=priceValidation;//decleration function 
function priceValidation(){
    var priceRejex=/^[1-9][0-9]{1,5}$/;
    if (!priceRejex.test(productPriceInput.value)){ 
        //addBtn.disabled='true';
        productPriceInput.classList.add('is-invalid');
        productPriceInput.classList.remove('is-valid');
        priceAlert.classList.remove('d-none');
        return false;
    }
    else{
        addBtn.removeAttribute('disabled');
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
        priceAlert.classList.add('d-none');
        return true;
    }
};
// productCategoryInput.onkeyup=categoryeValidation();//decleration function 
productCategoryInput.onkeyup=categoryeValidation;//decleration function 
function categoryeValidation(){
    var categoryRejex=/[a-zA-Z]/;
    if (!categoryRejex.test(productCategoryInput.value)){ 
        addBtn.disabled='true';
        productCategoryInput.classList.add('is-invalid');
        productCategoryInput.classList.remove('is-valid');
        categoryeAlert.classList.remove('d-none');
        return false;
    }
    else{
        addBtn.removeAttribute('disabled');
        productCategoryInput.classList.add('is-valid');
        productCategoryInput.classList.remove('is-invalid');
        categoryeAlert.classList.add('d-none');
        return true;
    }
};

// productDescInput.onkeyup= descValidation ();
productDescInput.onkeyup= descValidation;
function descValidation (){
    var descRejex=/[a-zA-Z]/;
    if (!descRejex.test(productDescInput.value)){ 
        addBtn.disabled='true';
        productDescInput.classList.add('is-invalid');
        productDescInput.classList.remove('is-valid');
        descAlert.classList.remove('d-none');
        return false;
    }
    else{
        addBtn.removeAttribute('disabled');
        productDescInput.classList.add('is-valid');
        productDescInput.classList.remove('is-invalid');
        descAlert.classList.add('d-none');
        return true;
    }
};



addBtn.onclick=function() {
    
    if (nameValidation() && priceValidation()&&categoryeValidation()&& descValidation ()){
        addProduct()

    }
    else{
        alert('blease Enter sucess data');
    }

    clearForm()
    displayProduct()
};

updateBtn.onclick = function() {
    saveUpdatedProduct();
};

function addProduct(){
    var product ={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value
        
    } 
    
    products.push(product);
    console.log(products);
    localStorage.setItem('ourProduct' , JSON.stringify(products));

};


function clearForm(){
//     productNameInput.value='';
//     productPriceInput.value='';
//     productCategoryInput.value='';
//     productDescInput.value='';
    for(var i=0;i<inputs.length;i++){
        inputs[i].value='';

    }
};

function displayProduct(){
    var listproduct=``;
    for (var i=0 ;i <products.length ; i++){
        listproduct +=`
                <tr>
                    <td>${i}</td>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].desc}</td>
                    <td><button onclick='updateProduct(${i})' class="btn btn-outline-info ">update</button></td>
                    <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
                </tr>
        `
    }
    document.getElementById('tableBody').innerHTML=listproduct;
}

function deleteProduct(index){
    products.splice(index,1);
    localStorage.setItem('ourProduct' , JSON.stringify(products));
    displayProduct();
}
searchInput.onkeyup=function(){
    var term =searchInput.value;
    var listproduct=``;
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(term.toLowerCase())==true){
            listproduct +=`
                <tr>
                    <td>${i}</td>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].desc}</td>
                    <td><button onclick='updateProduct(${i})' class="btn btn-outline-info ">update</button></td>
                    <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
                </tr>
        ` 
        }
    }
    document.getElementById('tableBody').innerHTML=listproduct;


}
// function searchProduct(term){
//     var listproduct=``;
//     for(var i=0;i<products.length;i++){
//         if(products[i].name.toLowerCase().includes(term.toLowerCase())==true){
//             listproduct +=`
//                 <tr>
//                     <td>${i}</td>
//                     <td>${products[i].name}</td>
//                     <td>${products[i].price}</td>
//                     <td>${products[i].category}</td>
//                     <td>${products[i].desc}</td>
//                     <td><button onclick='updateProduct(${i})' class="btn btn-outline-info ">update</button></td>
//                     <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
//                 </tr>
//         ` 
//         }
//     }
//     document.getElementById('tableBody').innerHTML=listproduct;
// }

function updateProduct(index){
    //console.log(index);//test
    productNameInput.value=products[index].name;
    productPriceInput.value=products[index].price;
    productCategoryInput.value=products[index].category;
    productDescInput.value=products[index].desc;
    currentIndex = index; 
    
    updateBtn.style.display = 'inline'; 
    addBtn.style.display = 'none'; 
}


function saveUpdatedProduct() {
    // تحديث بيانات المنتج المختار
    products[currentIndex].name = productNameInput.value;
    products[currentIndex].price = productPriceInput.value;
    products[currentIndex].category = productCategoryInput.value;
    products[currentIndex].desc = productDescInput.value;

    // حفظ التحديثات في localStorage
    localStorage.setItem('ourProduct', JSON.stringify(products));

    // إعادة عرض القائمة المحدثة
    displayProduct();

    // إعادة تعيين النموذج
    clearForm();
    
    // إظهار زر الإضافة مرة أخرى وإخفاء زر التحديث
    addBtn.style.display = 'inline';
    updateBtn.style.display = 'none';
}

